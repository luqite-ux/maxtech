import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const nextConfig = (await import("../next.config.mjs")).default

test("Next image optimization allows the verified MAXTECH R2 asset host", () => {
  const patterns = nextConfig.images?.remotePatterns ?? []
  assert.ok(
    patterns.some(
      (pattern) =>
        pattern.protocol === "https" &&
        pattern.hostname === "pub-c7a22068052144a5805830c30d280128.r2.dev" &&
        pattern.pathname === "/tenants/maxtech/images/**",
    ),
  )
})

test("every indexed page declares route-specific canonical metadata", () => {
  const staticRoutes = new Map([
    ["app/page.tsx", "/"],
    ["app/products/page.tsx", "/products"],
    ["app/capabilities/page.tsx", "/capabilities"],
    ["app/quality/page.tsx", "/quality"],
    ["app/news/page.tsx", "/news"],
    ["app/about/page.tsx", "/about"],
    ["app/faq/page.tsx", "/faq"],
    ["app/contact/page.tsx", "/contact"],
  ])

  for (const [file, route] of staticRoutes) {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), "utf8")
    assert.ok(source.includes(`canonicalMetadata("${route}")`), `${file} is missing ${route} canonical metadata`)
  }

  const products = readFileSync(new URL("../app/products/[slug]/page.tsx", import.meta.url), "utf8")
  assert.ok(products.includes("canonicalMetadata(`/products/${params.slug}`)"))

  const news = readFileSync(new URL("../app/news/[slug]/page.tsx", import.meta.url), "utf8")
  assert.ok(news.includes("canonicalMetadata(`/news/${params.slug}`)"))
})
