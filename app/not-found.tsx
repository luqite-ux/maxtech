import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <main className="bg-gradient-to-br from-white via-mist to-[#fff7f7] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-burgundy">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-graphite">Page not found.</h1>
        <p className="mt-6 text-lg leading-8 text-steel">
          The page may have moved. Continue to the product range or send drawings and project details for a custom machining review.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/products" className="inline-flex min-h-12 items-center justify-center rounded-md bg-burgundy px-5 text-sm font-semibold text-white transition hover:bg-[#762128]">
            View Products
          </Link>
          <Link href="/contact#rfq" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-graphite/15 bg-white px-5 text-sm font-semibold text-graphite transition hover:border-burgundy hover:text-burgundy">
            Send RFQ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
