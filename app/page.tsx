import { CategoryShowcase } from "@/components/home/category-showcase"
import { EquipmentBand } from "@/components/home/equipment-band"
import { Hero } from "@/components/home/hero"
import { QualityPreview } from "@/components/home/quality-preview"
import { Workflow } from "@/components/home/workflow"
import { RfqCta } from "@/components/rfq-cta"
import { SectionShell } from "@/components/section-shell"
import { faqs } from "@/lib/site-data"

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionShell
        eyebrow="Custom part categories"
        title="Built around industrial parts that need accuracy, flexibility, and manufacturing judgment."
        intro="Send drawings, samples, or application notes. MAXTECH reviews the part structure and recommends a practical machining route."
      >
        <CategoryShowcase />
      </SectionShell>
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
