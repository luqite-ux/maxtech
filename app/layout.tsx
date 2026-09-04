import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "MAXTECH | Precision CNC Machining & Custom Mechanical Parts",
    template: "%s | MAXTECH"
  },
  description:
    "MAXTECH provides precision CNC machining, custom mechanical parts, and drawing-based manufacturing for global industrial buyers.",
  icons: {
    icon: "/icon.png"
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_TENANT_ID && (
          <script
            async
            src={`https://admin.globle-trade.com/api/public/analytics.js?tenantId=${encodeURIComponent(process.env.NEXT_PUBLIC_TENANT_ID)}`}
          />
        )}
      </body>
    </html>
  )
}
