import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ProductViewModel } from "@/lib/product-catalog-merge"

export function ProductCard({ product }: { product: ProductViewModel }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-graphite/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-burgundy/30 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f6f7]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-contain p-4 transition duration-500 group-hover:scale-[1.035]"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-burgundy">Drawing-based manufacturing</p>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-graphite">{product.name}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-steel">{product.description}</p>
        <Link
          href={`/contact?category=${encodeURIComponent(product.category)}&product=${encodeURIComponent(product.name)}`}
          className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-burgundy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy"
        >
          Request a similar part <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

