import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import test from "node:test"

const { catalogProducts, getCatalogProductsByCategory, getCategoryFeaturedProduct } = await import("../lib/product-catalog.ts")

const expectedCategoryCounts = {
  "automotive-parts": 12,
  "carbon-fiber-equipment-parts": 5,
  "motorcycle-parts": 6,
  "robot-equipment-parts": 17,
  "stamping-molds": 10,
  "steel-structure-mechanical-parts": 15,
}

const prohibited = /warrant(?:y|ies)|guarantee(?:d)?|质保|保修/i

test("the supplied catalogue exposes every customer image exactly once", () => {
  assert.equal(catalogProducts.length, 65)
  assert.equal(new Set(catalogProducts.map((product) => product.slug)).size, 65)
  assert.equal(new Set(catalogProducts.map((product) => product.image)).size, 65)

  for (const [category, expectedCount] of Object.entries(expectedCategoryCounts)) {
    assert.equal(getCatalogProductsByCategory(category).length, expectedCount)
  }
})

test("each category exposes a curated image for prominent cards", () => {
  for (const category of Object.keys(expectedCategoryCounts)) {
    const product = getCategoryFeaturedProduct(category)
    assert.equal(product?.category, category)
    assert.ok(product?.image)
  }
})

test("every catalogue record has a safe public image and factual buyer-facing copy", () => {
  for (const product of catalogProducts) {
    assert.match(product.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    assert.ok(product.name.trim().length > 3)
    assert.ok(product.description.trim().length > 10)
    assert.ok(!prohibited.test(JSON.stringify(product)))
    assert.ok(product.image.startsWith(`/images/products/${product.category}/`))

    const imageUrl = new URL(`../public${product.image}`, import.meta.url)
    assert.ok(existsSync(fileURLToPath(imageUrl)), `missing image: ${product.image}`)
  }
})
