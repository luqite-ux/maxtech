import { CheckCircle2 } from "lucide-react"
import { workflow } from "@/lib/site-data"

export function Workflow() {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {workflow.map((step, index) => (
        <div key={step} className="relative rounded-md border border-graphite/10 bg-white p-5 shadow-sm">
          <div className="mb-8 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-steel">Step {index + 1}</span>
            <CheckCircle2 className="h-5 w-5 text-burgundy" />
          </div>
          <p className="text-base font-semibold leading-6 text-graphite">{step}</p>
        </div>
      ))}
    </div>
  )
}
