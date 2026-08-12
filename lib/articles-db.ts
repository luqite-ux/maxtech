import { createPublicSupabaseClient, getTenantId } from "@/lib/supabase"

export type Article = {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  image: string
}

type ArticleRow = {
  slug: string
  title_i18n: Record<string, string> | null
  excerpt_i18n: Record<string, string> | null
  content_i18n: Record<string, string> | null
  featured_image: string | null
  published_at: string | null
  created_at: string
}

function pick(value: Record<string, string> | null | undefined, fallback: string) {
  return value?.en || Object.values(value ?? {})[0] || fallback
}

export async function getPublishedArticles(): Promise<Article[]> {
  try {
    const supabase = createPublicSupabaseClient()
    const { data, error } = await supabase
      .from("articles")
      .select("slug,title_i18n,excerpt_i18n,content_i18n,featured_image,published_at,created_at")
      .eq("tenant_id", getTenantId())
      .eq("is_published", true)
      .order("published_at", { ascending: false, nullsFirst: false })

    if (error || !data?.length) return []

    return (data as ArticleRow[]).map((row) => ({
      slug: row.slug,
      title: pick(row.title_i18n, row.slug),
      excerpt: pick(row.excerpt_i18n, ""),
      content: pick(row.content_i18n, ""),
      date: (row.published_at ?? row.created_at).slice(0, 10),
      image: row.featured_image || "/images/equipment/cnc-machining-center.png"
    }))
  } catch {
    return []
  }
}

export async function getArticleBySlug(slug: string) {
  const articles = await getPublishedArticles()
  return articles.find((article) => article.slug === slug)
}
