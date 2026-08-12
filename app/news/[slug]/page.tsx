import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { SectionShell } from "@/components/section-shell"
import { getArticleBySlug, getPublishedArticles } from "@/lib/articles-db"

type PageProps = {
  params: { slug: string }
}

export const revalidate = 60

export async function generateStaticParams() {
  const articles = await getPublishedArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  return {
    title: article?.title ?? "News",
    description: article?.excerpt
  }
}

export default async function NewsArticlePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug)
  if (!article) notFound()

  return (
    <>
      <section className="bg-gradient-to-br from-white via-mist to-[#fff7f7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-burgundy">{article.date}</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-graphite">{article.title}</h1>
          <p className="mt-6 text-lg leading-8 text-steel">{article.excerpt}</p>
        </div>
      </section>
      <SectionShell>
        <article className="mx-auto max-w-4xl rounded-md border border-graphite/10 bg-white p-6 shadow-soft sm:p-8">
          <Image src={article.image} alt={article.title} width={960} height={520} className="aspect-video rounded-md object-cover" />
          <div className="mt-8 space-y-5 text-base leading-8 text-steel" dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>
      </SectionShell>
    </>
  )
}
