import { Send } from "lucide-react"
import { productCategories } from "@/lib/site-data"

export function RfqForm() {
  return (
    <form className="grid gap-4 rounded-md border border-graphite/10 bg-white p-6 shadow-soft" action="/api/inquiries" method="post">
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
      <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-burgundy px-5 text-sm font-semibold text-white transition hover:bg-[#762128]">
        <Send className="h-4 w-4" />
        Submit RFQ
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
