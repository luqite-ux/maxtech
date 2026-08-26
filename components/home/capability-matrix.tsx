import { capabilities } from "@/lib/site-data"

const groups = [
  { label: "Subtractive", items: capabilities.slice(0, 5) },
  { label: "Preparation", items: capabilities.slice(5, 6) },
  { label: "Order support", items: capabilities.slice(6) },
]

export function CapabilityMatrix() {
  return (
    <div className="grid overflow-hidden rounded-2xl border border-white/15 bg-white/5 lg:grid-cols-3">
      {groups.map((group, groupIndex) => (
        <div key={group.label} className="p-6 sm:p-8 lg:border-l lg:border-white/15 lg:first:border-l-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">{String(groupIndex + 1).padStart(2, "0")} / {group.label}</p>
          <div className="mt-6 grid gap-3">
            {group.items.map((item) => <p key={item} className="border-b border-white/10 pb-3 text-lg font-medium text-white">{item}</p>)}
          </div>
        </div>
      ))}
    </div>
  )
}

