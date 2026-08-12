import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone } from "lucide-react"
import { navItems, productCategories, siteInfo } from "@/lib/site-data"
import { productPath } from "@/lib/routes"
import { RfqCta } from "@/components/rfq-cta"

export function SiteFooter() {
  return (
    <footer className="border-t border-graphite/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_.8fr_.8fr] lg:px-8">
        <div>
          <Image src="/images/brand/maxtech-logo.png" alt="MAXTECH" width={190} height={44} className="h-10 w-auto" />
          <p className="mt-5 max-w-md text-sm leading-7 text-steel">{siteInfo.tagline.en}</p>
          <div className="mt-6 grid gap-3 text-sm text-steel">
            <p className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 text-burgundy" /> {siteInfo.phone}</p>
            <p className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-burgundy" /> {siteInfo.address}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-graphite">Navigation</h3>
          <div className="mt-5 grid gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-steel transition hover:text-burgundy">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-graphite">Custom Parts</h3>
          <div className="mt-5 grid gap-3">
            {productCategories.slice(0, 4).map((item) => (
              <Link key={item.slug} href={productPath(item.slug)} className="text-sm text-steel transition hover:text-burgundy">
                {item.name.en}
              </Link>
            ))}
          </div>
          <RfqCta label="Start an RFQ" className="mt-7" />
        </div>
      </div>
      <div className="border-t border-graphite/10 px-4 py-5 text-center text-xs text-steel">
        © {new Date().getFullYear()} MAXTECH. Precision machining for custom industrial projects.
      </div>
    </footer>
  )
}
