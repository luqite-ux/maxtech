import type { Metadata } from "next"
import { CategoryDetail } from "@/components/products/category-detail"
import { productCategories } from "@/lib/site-data"
import { canonicalMetadata } from "@/lib/seo"

type PageProps = {
  params: { slug: string }
}

export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = productCategories.find((item) => item.slug === params.slug)
  return {
    ...canonicalMetadata(`/products/${params.slug}`),
    title: category ? category.name.en : "Product Category",
    description: category?.summary
  }
}

export default function ProductCategoryPage({ params }: PageProps) {
  return <CategoryDetail slug={params.slug} />
}
