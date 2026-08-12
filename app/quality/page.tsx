import type { Metadata } from "next"
import Image from "next/image"
import { SectionShell } from "@/components/section-shell"

export const metadata: Metadata = {
  title: "Quality",
  description: "MAXTECH follows ISO 9001:2015 quality management and inspection workflows for custom machined parts."
}

export default function QualityPage() {
  const checks = ["Technical requirement review", "Raw material confirmation", "In-process checks", "Dimensional inspection", "Final packing review"]

  return (
    <>
      <section className="bg-gradient-to-br from-white via-mist to-[#fff7f7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-burgundy">Quality management</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-graphite">Inspection and process control for drawing-based manufacturing.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-steel">
            MAXTECH aligns production with drawings, samples, materials, and agreed technical requirements through structured checks and documented review steps.
          </p>
        </div>
      </section>
      <SectionShell>
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <Image src="/images/certificates/iso-9001.jpg" alt="ISO 9001:2015 certificate" width={620} height={900} className="max-h-[760px] rounded-md object-cover object-top shadow-soft" />
          <div className="grid content-start gap-4">
            {checks.map((item, index) => (
              <div key={item} className="rounded-md border border-graphite/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-burgundy">0{index + 1}</p>
                <h2 className="mt-2 text-xl font-semibold text-graphite">{item}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">Each step helps confirm that the machining plan and finished parts stay aligned with project requirements.</p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>
    </>
  )
}
