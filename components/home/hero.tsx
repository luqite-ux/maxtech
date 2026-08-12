import Image from "next/image"
import { Gauge, Ruler, Sparkles } from "lucide-react"
import { RfqCta } from "@/components/rfq-cta"
import { siteInfo } from "@/lib/site-data"

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ice px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="absolute inset-0 -z-20">
        <Image src="/images/factory/workshop-floor.png" alt="MAXTECH workshop floor" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/92 to-white/58" />
      <div className="machining-grid absolute inset-y-0 right-0 -z-10 w-2/3 opacity-70" />
      <div className="scan-line absolute top-28 h-px w-1/2 bg-gradient-to-r from-transparent via-burgundy to-transparent" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-burgundy/20 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-burgundy shadow-sm">
            <Sparkles className="h-4 w-4" />
            Custom Precision Manufacturing
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-graphite sm:text-6xl lg:text-7xl">
            Precision CNC Machining for Custom Industrial Parts
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-steel sm:mt-7 sm:text-lg sm:leading-8">
            MAXTECH helps global buyers turn drawings, samples, and project requirements into accurate machined parts for robot equipment, carbon fiber machinery, steel structures, molds, automotive programs, and motorcycle applications.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <RfqCta />
            <RfqCta label="Send Drawings for Review" variant="secondary" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4">
            {siteInfo.stats.map((stat) => (
              <div key={stat.label} className="rounded-md border border-white/80 bg-white/78 p-4 shadow-sm backdrop-blur">
                <p className="text-3xl font-semibold text-graphite">
                  {stat.value}<span className="text-base text-burgundy">{stat.suffix}</span>
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-steel">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[330px] sm:min-h-[430px]">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-burgundy/12 blur-3xl" />
          <div className="relative overflow-hidden rounded-md border border-white bg-white/74 p-3 shadow-soft backdrop-blur-md">
            <Image
              src="/images/equipment/cnc-machining-center.png"
              alt="CNC machining center"
              width={900}
              height={680}
              className="h-[260px] w-full rounded-md object-cover sm:h-[360px]"
            />
          </div>
          <div className="float-chip absolute left-0 top-8 hidden rounded-md border border-graphite/10 bg-white/90 p-4 shadow-soft backdrop-blur sm:block">
            <p className="flex items-center gap-2 text-sm font-semibold text-graphite"><Gauge className="h-4 w-4 text-burgundy" /> CNC controlled</p>
            <p className="mt-1 text-xs text-steel">Milling · Drilling · Tapping</p>
          </div>
          <div className="float-chip absolute bottom-7 right-4 hidden rounded-md border border-graphite/10 bg-white/90 p-4 shadow-soft backdrop-blur sm:block" style={{ animationDelay: "1.2s" }}>
            <p className="flex items-center gap-2 text-sm font-semibold text-graphite"><Ruler className="h-4 w-4 text-burgundy" /> Drawing-based</p>
            <p className="mt-1 text-xs text-steel">Samples to batch production</p>
          </div>
        </div>
      </div>
    </section>
  )
}
