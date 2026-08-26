import Image from "next/image"
import Link from "next/link"
import { featuredCatalogProducts } from "@/lib/home-content"

export function FeaturedProducts() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {featuredCatalogProducts.map((product, index) => (
        <Link
          key={product.slug}
          href={`/products/${product.category}`}
          className={`group overflow-hidden rounded-2xl border border-graphite/10 bg-white shadow-sm ${index === 0 || index === 5 ? "md:col-span-2" : ""}`}
        >
          <div className={`relative bg-[#f4f6f7] ${index === 0 || index === 5 ? "aspect-[16/8]" : "aspect-square"}`}>
            <Image src={product.image} alt={product.name} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-contain p-3 transition duration-500 group-hover:scale-[1.04]" />
          </div>
          <div className="p-4">
            <p className="line-clamp-2 text-sm font-semibold leading-5 text-graphite">{product.name}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

