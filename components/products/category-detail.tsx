import { notFound } from "next/navigation"
import { RfqCta } from "@/components/rfq-cta"
import { SectionShell } from "@/components/section-shell"
import { getProductCategory, getProductsForCategory } from "@/lib/products-db"
import { ProductCard } from "@/components/products/product-card"

export async function CategoryDetail({ slug }: { slug: string }) {
  const category = await getProductCategory(slug)
  if (!category) notFound()
  const products = await getProductsForCategory(slug)

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-mist to-[#fff7f7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="machining-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-burgundy">Custom machined parts</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-graphite">{category.name.en}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-steel">{category.summary}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <RfqCta label="Request Custom Parts" />
            <RfqCta label="Send Drawings for Review" variant="secondary" />
          </div>
        </div>
      </section>

      <SectionShell eyebrow="Manufacturing scope" title="Configured around your drawing, sample, material, and quantity.">
        <div className="grid gap-6 lg:grid-cols-3">
          <DetailBlock title="Applications" items={category.applications} />
          <DetailBlock title="Machining processes" items={category.processes} />
          <DetailBlock title="Common materials" items={category.materials} />
        </div>
      </SectionShell>

      {products.length > 0 && (
        <SectionShell
          className="bg-gradient-to-br from-white via-mist to-white"
          eyebrow="Customer-supplied product gallery"
          title={`Explore ${products.length} ${category.name.en.toLowerCase()} references.`}
          intro="These images show previous manufacturing references. Send your own drawing, sample, material, and quantity for a project-specific review."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </SectionShell>
      )}

      <SectionShell className="bg-white" eyebrow="RFQ guidance" title="What to include when you contact us.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {["2D or 3D drawings", "Material and surface requirements", "Target quantity", "Assembly or inspection notes"].map((item) => (
            <div key={item} className="rounded-2xl border border-graphite/10 bg-mist p-5 text-sm font-semibold text-graphite">
              {item}
            </div>
          ))}
        </div>
      </SectionShell>
    </>
  )
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-graphite/10 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-graphite">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <p key={item} className="rounded-xl bg-mist px-4 py-3 text-sm font-medium text-steel">
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}
