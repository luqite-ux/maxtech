import type { Metadata } from "next"
import { SectionShell } from "@/components/section-shell"
import { faqs } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about MAXTECH custom CNC machining, samples, MOQ, technical documents, and production updates."
}

export default function FaqPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-white via-mist to-[#fff7f7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-burgundy">FAQ</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-graphite">Questions buyers ask before sending drawings.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-steel">Use these answers to prepare your RFQ details and technical requirements.</p>
        </div>
      </section>
      <SectionShell>
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-md border border-graphite/10 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-graphite">{faq.question}</h2>
              <p className="mt-4 text-sm leading-7 text-steel">{faq.answer}</p>
            </article>
          ))}
        </div>
      </SectionShell>
    </>
  )
}
