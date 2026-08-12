import Image from "next/image"
import { RfqCta } from "@/components/rfq-cta"

export function QualityPreview() {
  return (
    <div className="grid items-center gap-8 rounded-md border border-graphite/10 bg-white p-6 shadow-soft lg:grid-cols-[.8fr_1.2fr] lg:p-8">
      <Image src="/images/certificates/iso-9001.jpg" alt="ISO 9001 certificate" width={520} height={760} className="max-h-[520px] w-full rounded-md object-cover object-top" />
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-burgundy">ISO 9001:2015</p>
        <h3 className="mt-4 text-3xl font-semibold tracking-tight text-graphite">Inspection-led production for drawing-based custom parts.</h3>
        <p className="mt-5 text-base leading-8 text-steel">
          MAXTECH uses raw material checks, process control, dimensional inspection, and final review to keep machined parts aligned with drawings and agreed technical requirements.
        </p>
        <div className="mt-7 grid gap-3 text-sm text-steel sm:grid-cols-2">
          <p className="rounded-md bg-mist p-4">Raw material and process confirmation</p>
          <p className="rounded-md bg-mist p-4">In-process dimensional checks</p>
          <p className="rounded-md bg-mist p-4">Inspection records on request</p>
          <p className="rounded-md bg-mist p-4">Final packing review before shipment coordination</p>
        </div>
        <RfqCta label="Discuss Inspection Requirements" className="mt-8" />
      </div>
    </div>
  )
}
