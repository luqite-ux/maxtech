import { industryApplications } from "@/lib/home-content"

export function ApplicationIndustries() {
  return (
    <div className="border-t border-graphite/15">
      {industryApplications.map((industry, index) => (
        <div key={industry.title} className="grid gap-3 border-b border-graphite/15 py-6 md:grid-cols-[5rem_1fr_1.2fr] md:items-center">
          <span className="text-sm font-semibold text-burgundy">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="text-xl font-semibold text-graphite sm:text-2xl">{industry.title}</h3>
          <p className="text-sm leading-7 text-steel">{industry.description}</p>
        </div>
      ))}
    </div>
  )
}

