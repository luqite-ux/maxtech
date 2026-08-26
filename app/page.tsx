import { CategoryShowcase } from "@/components/home/category-showcase"
import { EquipmentBand } from "@/components/home/equipment-band"
import { Hero } from "@/components/home/hero"
import { QualityPreview } from "@/components/home/quality-preview"
import { Workflow } from "@/components/home/workflow"
import { RfqCta } from "@/components/rfq-cta"
import { SectionShell } from "@/components/section-shell"
import { faqs } from "@/lib/site-data"
import { CapabilityMatrix } from "@/components/home/capability-matrix"
import { ApplicationIndustries } from "@/components/home/application-industries"
import { FeaturedProducts } from "@/components/home/featured-products"

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="border-y border-graphite/10 bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-graphite/10 lg:grid-cols-4">
          {["Nearly 40 years in manufacturing", "65 supplied product references", "40+ precision machines", "ISO 9001:2015 system"].map((item) => (
            <p key={item} className="flex min-h-24 items-center px-4 text-sm font-semibold leading-6 text-graphite sm:px-6">{item}</p>
          ))}
        </div>
      </section>
      <SectionShell
        eyebrow="Custom part categories"
        title="Built around industrial parts that need accuracy, flexibility, and manufacturing judgment."
        intro="Send drawings, samples, or application notes. MAXTECH reviews the part structure and recommends a practical machining route."
      >
        <CategoryShowcase />
      </SectionShell>
      <section className="bg-graphite px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Machining scope</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Processes selected around part geometry, material, and order stage.</h2>
            <p className="max-w-2xl text-base leading-8 text-white/65">From first-piece evaluation to repeat batches, the manufacturing route is reviewed against the drawing and the practical needs of the assembly.</p>
          </div>
          <div className="mt-12"><CapabilityMatrix /></div>
        </div>
      </section>
      <SectionShell
        className="bg-gradient-to-br from-white via-mist to-white"
        eyebrow="Manufacturing workflow"
        title="A clear path from technical review to shipment coordination."
      >
        <Workflow />
      </SectionShell>
      <SectionShell
        eyebrow="Equipment and process depth"
        title="A practical machining floor for complex, small-batch, and repeat production."
      >
        <EquipmentBand />
      </SectionShell>
      <SectionShell className="bg-gradient-to-br from-[#fff7f7] via-white to-mist">
        <QualityPreview />
      </SectionShell>
      <SectionShell
        eyebrow="Application experience"
        title="Parts for equipment that has to align, move, clamp, support, and repeat."
        intro="The supplied catalogue spans six application groups, giving overseas buyers a clearer view of the types of custom work MAXTECH supports."
      >
        <ApplicationIndustries />
      </SectionShell>
      <SectionShell
        className="bg-gradient-to-br from-white via-mist to-white"
        eyebrow="Selected manufacturing references"
        title="Real customer-supplied product imagery, organized for faster sourcing decisions."
        intro="Browse the full 65-image catalogue by category. Each project is reviewed against its own drawing, material, quantity, and inspection requirements."
      >
        <FeaturedProducts />
      </SectionShell>
      <SectionShell
        eyebrow="Buyer questions"
        title="Fast answers before you send drawings."
        intro="These are the most common questions from overseas buyers evaluating custom machining partners."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {faqs.slice(0, 3).map((faq) => (
            <div key={faq.question} className="rounded-md border border-graphite/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-graphite">{faq.question}</h3>
              <p className="mt-4 text-sm leading-7 text-steel">{faq.answer}</p>
            </div>
          ))}
        </div>
      </SectionShell>
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-md bg-graphite p-8 text-white shadow-soft sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Ready for review</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Send your drawing, sample details, material, and quantity. MAXTECH will review the machining route.
            </h2>
            <RfqCta label="Start Your RFQ" />
          </div>
        </div>
      </section>
    </>
  )
}
