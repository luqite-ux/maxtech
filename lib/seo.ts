import type { Metadata } from "next"

const siteOrigin = (process.env.NEXT_PUBLIC_SITE_URL || "https://hl-precision.com").replace(/\/$/, "")

export function canonicalMetadata(pathname: string): Pick<Metadata, "alternates" | "openGraph"> {
  const canonical = new URL(pathname, `${siteOrigin}/`).toString()
  return {
    alternates: { canonical },
    openGraph: { url: canonical },
  }
}
