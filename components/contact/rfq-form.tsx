"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { productCategories } from "@/lib/site-data"

const statusCopy: Record<string, string> = {
  submitted: "Thank you. Your RFQ has been received, and the MAXTECH team will review the details.",
  error: "The RFQ could not be submitted. Please check the form and try again.",
  missing: "Please complete the required fields before submitting your RFQ."
}

export function RfqForm({ status }: { status?: string }) {
  const [pending, setPending] = useState(false)
  const message = status ? statusCopy[status] : undefined

  return (
    <form className="grid gap-4 rounded-md border border-graphite/10 bg-white p-6 shadow-soft" action="/api/inquiries" method="post" onSubmit={() => setPending(true)}>
      <p className="rounded-md bg-mist px-4 py-3 text-sm leading-6 text-steel">
        Share your drawing, material, quantity, and application notes. The MAXTECH team will review the machining route and respond through the contact details you provide.
      </p>
      {message ? (
        <p className={`rounded-md px-4 py-3 text-sm leading-6 ${status === "submitted" ? "bg-[#eef8f1] text-[#17633a]" : "bg-[#fff0f1] text-burgundy"}`}>
          {message}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Company" name="company" />
        <Field label="Country / Region" name="country" required />
        <Field label="Phone / WhatsApp" name="phone" />
        <label className="grid gap-2 text-sm font-semibold text-graphite">
          Product Category
          <select name="category" className="min-h-12 rounded-md border border-graphite/15 bg-white px-3 text-sm text-graphite outline-none focus:border-burgundy">
            {productCategories.map((category) => (
              <option key={category.slug}>{category.name.en}</option>
            ))}
          </select>
        </label>
        <Field label="Material" name="material" />
        <Field label="Quantity" name="quantity" />
      </div>
      <label className="grid gap-2 text-sm font-semibold text-graphite">
        Drawing or File Notes
        <input
          name="drawingNote"
          placeholder="Tell us whether 2D/3D drawings, samples, or photos are available."
          className="min-h-12 rounded-md border border-graphite/15 bg-white px-3 text-sm text-graphite outline-none focus:border-burgundy"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-graphite">
        Project Requirements
        <textarea
          name="message"
          rows={6}
          required
          placeholder="Part function, tolerance needs, surface treatment, delivery target, and any inspection document requirements."
          className="rounded-md border border-graphite/15 bg-white px-3 py-3 text-sm text-graphite outline-none focus:border-burgundy"
        />
      </label>
      <button type="submit" disabled={pending} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-burgundy px-5 text-sm font-semibold text-white transition hover:bg-[#762128] disabled:cursor-not-allowed disabled:bg-steel">
        <Send className="h-4 w-4" />
        {pending ? "Submitting..." : "Submit RFQ"}
      </button>
    </form>
  )
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-graphite">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="min-h-12 rounded-md border border-graphite/15 bg-white px-3 text-sm text-graphite outline-none focus:border-burgundy"
      />
    </label>
  )
}
