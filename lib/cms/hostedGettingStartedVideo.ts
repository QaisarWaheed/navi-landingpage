/** Path we publish after admin upload (served from /public/videos). */
export const HOSTED_GETTING_STARTED_BASENAME = "getting-started";

export const MAX_GETTING_STARTED_VIDEO_BYTES = 80 * 1024 * 1024;

/** Public URL path for a file we store under public/videos (strict allowlist). */
export function selfHostedGettingStartedSrc(url: string): string | null {
  const t = url.trim();
  if (t.includes("..") || t.includes("\\")) return null;
  if (!/^\/videos\/getting-started\.(mp4|webm)$/i.test(t)) return null;
  return t;
}
