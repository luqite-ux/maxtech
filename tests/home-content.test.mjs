import assert from "node:assert/strict"
import test from "node:test"

const { homeSections, industryApplications, featuredCatalogProducts } = await import("../lib/home-content.ts")

test("the enriched home page covers the complete overseas buyer journey", () => {
  assert.deepEqual(
    homeSections.map((section) => section.id),
    ["hero", "proof", "categories", "capabilities", "workflow", "equipment", "quality", "industries", "products", "faq", "rfq"],
  )
  assert.equal(new Set(homeSections.map((section) => section.layout)).size >= 4, true)
})

test("home content represents multiple applications and all supplied product categories", () => {
  assert.equal(industryApplications.length, 6)
  assert.equal(featuredCatalogProducts.length, 8)
  assert.equal(new Set(featuredCatalogProducts.map((product) => product.category)).size, 6)
})

