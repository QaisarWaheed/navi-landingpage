import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceArticleLayout } from "@/components/resources/ResourceArticleLayout";
import { articleBySlug, articleSlugs } from "@/lib/resources/articleRegistry";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug[slug];
  if (!article) {
    return { title: "Article" };
  }
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: `${article.title} | NAVI`,
      description: article.description,
    },
  };
}

export default async function ResourceArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articleBySlug[slug];
  if (!article) {
    notFound();
  }
  const { Content } = article;
  return (
    <ResourceArticleLayout title={article.title} description={article.description} date={article.date}>
      <Content />
    </ResourceArticleLayout>
  );
}
