import Image from "next/image"
import { capabilities } from "@/lib/site-data"

export function EquipmentBand() {
  return (
    <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
      <div className="grid grid-cols-2 gap-3">
        <Image src="/images/equipment/lathe.jpg" alt="CNC lathe" width={520} height={420} className="h-40 rounded-md object-cover shadow-sm sm:h-56" />
        <Image src="/images/equipment/wire-cutting.jpg" alt="Wire cutting machine" width={520} height={420} className="h-40 rounded-md object-cover shadow-sm sm:h-56" />
        <Image src="/images/equipment/inspection-platform.jpg" alt="Inspection platform" width={520} height={420} className="col-span-2 h-48 rounded-md object-cover shadow-sm sm:h-64" />
      </div>
      <div className="rounded-md border border-graphite/10 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-burgundy">Machining capacity</p>
        <h3 className="mt-4 text-3xl font-semibold tracking-tight text-graphite">From one-off samples to stable small and medium batch production.</h3>
        <p className="mt-5 text-base leading-8 text-steel">
          A flexible equipment base allows MAXTECH to combine CNC machining, cutting, drilling, grinding, and inspection around each part's drawing, material, tolerance, and assembly requirements.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {capabilities.map((item) => (
            <div key={item} className="rounded-md bg-mist px-4 py-3 text-sm font-semibold text-graphite">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
