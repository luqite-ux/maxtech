import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { productCategories } from "@/lib/site-data"
import { productPath } from "@/lib/routes"
import Image from "next/image"
import { getCatalogProductsByCategory } from "@/lib/product-catalog"

export function CategoryShowcase() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {productCategories.map((category, index) => {
        const image = getCatalogProductsByCategory(category.slug)[0]?.image
        return (
        <Link
          key={category.slug}
          href={productPath(category.slug)}
          className={`group overflow-hidden rounded-2xl border border-graphite/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-burgundy/30 hover:shadow-soft ${index === 0 || index === 5 ? "lg:col-span-2" : ""}`}
        >
          <div className={`relative bg-[#f4f6f7] ${index === 0 || index === 5 ? "aspect-[16/7]" : "aspect-[16/10]"}`}>
            {image && <Image src={image} alt="" fill className="object-contain p-5 transition duration-500 group-hover:scale-[1.04]" />}
          </div>
          <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="text-sm font-semibold text-burgundy">{String(index + 1).padStart(2, "0")}</span>
            <ArrowRight className="h-5 w-5 text-steel transition group-hover:translate-x-1 group-hover:text-burgundy" />
          </div>
          <h3 className="mt-8 text-xl font-semibold text-graphite">{category.name.en}</h3>
          <p className="mt-4 text-sm leading-7 text-steel">{category.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {category.processes.slice(0, 3).map((process) => (
              <span key={process} className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-steel">
                {process}
              </span>
            ))}
          </div>
          </div>
        </Link>
      )})}
    </div>
  )
}
