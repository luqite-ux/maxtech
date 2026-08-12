import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { productCategories } from "@/lib/site-data"
import { productPath } from "@/lib/routes"

type Category = (typeof productCategories)[number]

export function ProductCategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={productPath(category.slug)}
      className="group flex min-h-80 flex-col rounded-md border border-graphite/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-burgundy/30 hover:shadow-soft"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-graphite">{category.name.en}</h2>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-steel transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-burgundy" />
      </div>
      <p className="mt-5 text-sm leading-7 text-steel">{category.summary}</p>
      <div className="mt-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy">Typical applications</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {category.applications.map((item) => (
            <span key={item} className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-steel">
              {item}
            </span>
          ))}
        </div>
      </div>
      <span className="mt-auto pt-8 text-sm font-semibold text-burgundy">Request custom parts</span>
    </Link>
  )
}
