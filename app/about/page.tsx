import type { Metadata } from "next"
import Image from "next/image"
import { SectionShell } from "@/components/section-shell"
import { siteInfo } from "@/lib/site-data"
import { canonicalMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...canonicalMetadata("/about"),
  title: "About",
  description: "Learn about Hangzhou Hengli Mould Machinery Factory, the manufacturing company behind MAXTECH."
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-white via-mist to-[#fff7f7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-burgundy">About MAXTECH</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-graphite">Practical precision manufacturing backed by nearly four decades of experience.</h1>
            <p className="mt-6 text-lg leading-8 text-steel">
              {siteInfo.company} focuses on precision mechanical processing, non-standard parts manufacturing, and small-to-medium batch custom production.
            </p>
          </div>
          <Image src="/images/factory/factory-exterior.jpg" alt="MAXTECH factory" width={780} height={560} className="h-96 rounded-md object-cover shadow-soft" />
        </div>
      </section>
      <SectionShell eyebrow="Factory profile" title="A machining partner for buyers who need flexible production and accountable execution.">
        <div className="grid gap-6 lg:grid-cols-3">
          {siteInfo.stats.map((stat) => (
            <div key={stat.label} className="rounded-md border border-graphite/10 bg-white p-6 shadow-sm">
              <p className="text-4xl font-semibold text-graphite">{stat.value}<span className="text-lg text-burgundy">{stat.suffix}</span></p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-steel">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Image src="/images/factory/entrance.jpg" alt="Factory entrance" width={720} height={520} className="h-80 rounded-md object-cover shadow-sm" />
          <div className="rounded-md border border-graphite/10 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-graphite">From samples to repeat orders</h2>
            <p className="mt-5 text-base leading-8 text-steel">
              The factory supports product design assistance, sample development, machining route planning, and batch production coordination for overseas industrial projects.
            </p>
            <p className="mt-5 text-base leading-8 text-steel">{siteInfo.address}</p>
          </div>
        </div>
      </SectionShell>
    </>
  )
}
