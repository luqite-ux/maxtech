import type { Metadata } from "next"
import { ProductCategoryCard } from "@/components/products/product-category-card"
import { RfqCta } from "@/components/rfq-cta"
import { SectionShell } from "@/components/section-shell"
import { getProductCategories } from "@/lib/products-db"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Products",
  description: "Explore MAXTECH custom CNC machined parts for robot equipment, carbon fiber equipment, steel structures, molds, automotive, and motorcycle applications."
}

export default async function ProductsPage() {
  const categories = await getProductCategories()
  return (
    <>
      <section className="bg-gradient-to-br from-white via-mist to-[#fff7f7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-burgundy">Products</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-graphite">Custom machined parts made from drawings, samples, and project requirements.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-steel">
            MAXTECH focuses on non-standard mechanical parts and CNC machining services. Select a product category and send your technical requirements for review.
          </p>
          <div className="mt-8">
            <RfqCta label="Send an RFQ" />
          </div>
        </div>
      </section>
      <SectionShell>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <ProductCategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </SectionShell>
    </>
  )
}
