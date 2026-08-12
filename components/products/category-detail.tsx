import { notFound } from "next/navigation"
import { RfqCta } from "@/components/rfq-cta"
import { SectionShell } from "@/components/section-shell"
import { getProductCategory, getProductsForCategory } from "@/lib/products-db"

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
        <SectionShell className="bg-gradient-to-br from-white via-mist to-white" eyebrow="Database products" title="Active product records from the MAXTECH catalog.">
          <div className="grid gap-4 md:grid-cols-2">
            {products.map((product) => (
              <article key={product.slug} className="rounded-md border border-graphite/10 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-graphite">{product.name}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">{product.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.features.slice(0, 3).map((feature) => (
                    <span key={feature} className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-steel">{feature}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionShell>
      )}

      <SectionShell className="bg-white" eyebrow="RFQ guidance" title="What to include when you contact us.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {["2D or 3D drawings", "Material and surface requirements", "Target quantity", "Assembly or inspection notes"].map((item) => (
            <div key={item} className="rounded-md border border-graphite/10 bg-mist p-5 text-sm font-semibold text-graphite">
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
    <div className="rounded-md border border-graphite/10 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-graphite">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <p key={item} className="rounded-md bg-mist px-4 py-3 text-sm font-medium text-steel">
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}
