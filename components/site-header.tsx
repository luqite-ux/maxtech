"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { navItems } from "@/lib/site-data"
import { RfqCta } from "@/components/rfq-cta"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-graphite/10 bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="MAXTECH Home">
          <Image src="/images/brand/maxtech-logo.png" alt="MAXTECH" width={188} height={44} className="h-8 w-auto sm:h-10" priority />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-graphite transition hover:text-burgundy">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <RfqCta label="Send RFQ" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-graphite/15 bg-white text-graphite lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-graphite/10 bg-white px-4 py-5 shadow-soft lg:hidden">
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-semibold text-graphite hover:bg-mist"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <RfqCta label="Send Drawings for Review" className="mt-4 w-full" />
        </div>
      )}
    </header>
  )
}
