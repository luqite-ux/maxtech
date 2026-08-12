import type { Metadata } from "next"
import Image from "next/image"
import { SectionShell } from "@/components/section-shell"
import { capabilities } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Capabilities",
  description: "MAXTECH CNC machining capabilities include milling, turning, wire cutting, grinding, drilling, flame cutting, sample machining, and batch production."
}

export default function CapabilitiesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-white via-mist to-[#fff7f7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-burgundy">Capabilities</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-graphite">Flexible machining support for custom industrial parts.</h1>
            <p className="mt-6 text-lg leading-8 text-steel">
              MAXTECH combines CNC machining centers, turning, wire cutting, drilling, grinding, and auxiliary processing to support prototypes, samples, and repeat orders.
            </p>
          </div>
          <Image src="/images/equipment/cnc-machining-center.png" alt="CNC machining center" width={780} height={560} className="h-96 rounded-md object-cover shadow-soft" />
        </div>
      </section>
      <SectionShell eyebrow="Process coverage" title="Machining routes matched to part geometry and production needs.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => (
            <div key={item} className="rounded-md border border-graphite/10 bg-white p-6 shadow-sm">
              <p className="text-lg font-semibold text-graphite">{item}</p>
              <p className="mt-4 text-sm leading-7 text-steel">Applied according to drawing requirements, material, dimensional needs, and order quantity.</p>
            </div>
          ))}
        </div>
      </SectionShell>
    </>
  )
}
