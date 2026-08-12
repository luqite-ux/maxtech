import type { MetadataRoute } from "next"
import { getPublishedArticles } from "@/lib/articles-db"
import { productCategories } from "@/lib/site-data"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maxtech-murex.vercel.app"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/products", "/capabilities", "/quality", "/news", "/about", "/faq", "/contact"]
  const articles = await getPublishedArticles()
  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date()
    })),
    ...productCategories.map((category) => ({
      url: `${baseUrl}/products/${category.slug}`,
      lastModified: new Date()
    })),
    ...articles.map((article) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: new Date(article.date)
    }))
  ]
}
