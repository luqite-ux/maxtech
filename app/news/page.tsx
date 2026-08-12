import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SectionShell } from "@/components/section-shell"
import { getPublishedArticles } from "@/lib/articles-db"

export const revalidate = 60

export const metadata: Metadata = {
  title: "News",
  description: "MAXTECH machining insights, sourcing guidance, and custom CNC manufacturing updates."
}

export default async function NewsPage() {
  const articles = await getPublishedArticles()

  return (
    <>
      <section className="bg-gradient-to-br from-white via-mist to-[#fff7f7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-burgundy">News</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-graphite">Machining insights and sourcing notes.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-steel">Read practical updates about custom CNC machining, drawing preparation, and industrial equipment parts.</p>
        </div>
      </section>
      <SectionShell>
        <div className="grid gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}`} className="rounded-md border border-graphite/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
              <Image src={article.image} alt={article.title} width={640} height={360} className="aspect-video rounded-md object-cover" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-burgundy">{article.date}</p>
              <h2 className="mt-2 text-xl font-semibold text-graphite">{article.title}</h2>
              <p className="mt-3 text-sm leading-7 text-steel">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </SectionShell>
    </>
  )
}
