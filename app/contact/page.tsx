import type { Metadata } from "next"
import { MessageCircle, Phone, MapPin } from "lucide-react"
import { RfqForm } from "@/components/contact/rfq-form"
import { SectionShell } from "@/components/section-shell"
import { siteInfo } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Contact & RFQ",
  description: "Contact MAXTECH and send an RFQ for custom CNC machining and precision mechanical parts."
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-white via-mist to-[#fff7f7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-burgundy">Contact</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-graphite">Send your custom machining requirements to MAXTECH.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-steel">Share drawings, material, quantity, and application notes so the team can review the machining route.</p>
        </div>
      </section>
      <SectionShell>
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className="grid content-start gap-4">
            <Info icon={<Phone className="h-5 w-5" />} title="Phone" text={siteInfo.phone} />
            <Info icon={<MessageCircle className="h-5 w-5" />} title="WhatsApp" text={siteInfo.whatsapp} />
            <Info icon={<MapPin className="h-5 w-5" />} title="Factory address" text={siteInfo.address} />
          </div>
          <div id="rfq">
            <RfqForm />
          </div>
        </div>
      </SectionShell>
    </>
  )
}

function Info({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-md border border-graphite/10 bg-white p-6 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#fff0f1] text-burgundy">{icon}</div>
      <h2 className="mt-5 text-lg font-semibold text-graphite">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-steel">{text}</p>
    </div>
  )
}
