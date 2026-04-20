import type { ResourceBlogItem } from "@/lib/cms/types";

export const RESOURCES_RSS_FEED_URL = "https://rss.app/feeds/tiOAnwzgFZaJCNHj.xml";

const FETCH_TIMEOUT_MS = 12_000;

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractCdataOrText(raw: string): string {
  const trimmed = raw.trim();
  const cd = trimmed.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  if (cd) return cd[1].trim();
  return trimmed;
}

function extractTagBlock(block: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = block.match(re);
  if (!m) return "";
  return extractCdataOrText(m[1]);
}

function excerptFromDescription(descriptionHtml: string, maxLen = 220): string | undefined {
  const plain = stripTags(descriptionHtml);
  if (!plain) return undefined;
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen - 1).trim()}…`;
}

function parsePubDate(pubDateRaw: string): { sortKey: number; display?: string } {
  const d = new Date(pubDateRaw.trim());
  if (Number.isNaN(d.getTime())) return { sortKey: 0 };
  return {
    sortKey: d.getTime(),
    display: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  };
}

function parseRss2Items(xml: string): ResourceBlogItem[] {
  const chunks = xml.split("<item>").slice(1);
  const rows: { sortKey: number; item: ResourceBlogItem }[] = [];

  for (const chunk of chunks) {
    const block = chunk.split("</item>")[0];
    if (!block) continue;

    const title = extractTagBlock(block, "title");
    const link = extractTagBlock(block, "link").trim();
    if (!title || !link) continue;

    const description = extractTagBlock(block, "description");
    const pubRaw = extractTagBlock(block, "pubDate");
    const { sortKey, display } = parsePubDate(pubRaw);

    const guid = extractTagBlock(block, "guid");
    const id = guid || link;

    rows.push({
      sortKey,
      item: {
        id: `rss-${id.replace(/\s+/g, " ").slice(0, 120)}`,
        title,
        excerpt: excerptFromDescription(description),
        url: link,
        date: display,
      },
    });
  }

  rows.sort((a, b) => b.sortKey - a.sortKey);
  return rows.map((r) => r.item);
}

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url.trim());
}

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url.trim());
    u.hash = "";
    const href = u.href.replace(/\/$/, "");
    return href.toLowerCase();
  } catch {
    return url.trim().toLowerCase();
  }
}

/**
 * Curated on-site articles (relative URLs) first, then RSS items (newest first),
 * then any external CMS links not already present in the feed.
 */
export function mergeCmsAndRssItems(cms: ResourceBlogItem[], rss: ResourceBlogItem[]): ResourceBlogItem[] {
  const internal = cms.filter((i) => !isExternalUrl(i.url));
  const externalCms = cms.filter((i) => isExternalUrl(i.url));
  const rssUrls = new Set(rss.map((i) => normalizeUrl(i.url)));
  const extraExternal = externalCms.filter((i) => !rssUrls.has(normalizeUrl(i.url)));
  return [...internal, ...rss, ...extraExternal];
}

/** Pull latest articles from the RSS feed (RSS 2.0). */
export async function fetchRssBlogItems(feedUrl: string = RESOURCES_RSS_FEED_URL): Promise<ResourceBlogItem[]> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(feedUrl, {
      signal: ac.signal,
      headers: { Accept: "application/rss+xml, application/xml, text/xml, */*" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    if (!xml.includes("<rss") || !xml.includes("<item")) return [];
    return parseRss2Items(xml);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}
