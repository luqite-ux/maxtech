import type { MetadataRoute } from "next"
import { productCategories } from "@/lib/site-data"

const baseUrl = "https://www.maxtech-machining.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/products", "/capabilities", "/quality", "/about", "/faq", "/contact"]
  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date()
    })),
    ...productCategories.map((category) => ({
      url: `${baseUrl}/products/${category.slug}`,
      lastModified: new Date()
    }))
  ]
}
