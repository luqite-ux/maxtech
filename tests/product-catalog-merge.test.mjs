import assert from "node:assert/strict"
import test from "node:test"

const { mergeProductRowsWithCatalog } = await import("../lib/product-catalog-merge.ts")

test("catalogued products keep their reviewed transparent image over stale database images", () => {
  const [product] = mergeProductRowsWithCatalog([
    {
      slug: "automotive-parts-01",
      name_i18n: { en: "Brake Disc" },
      description_i18n: { en: "Database copy" },
      category_slug: "automotive-parts",
      features_i18n: null,
      applications_i18n: null,
      specs: null,
      image_url: "https://example.com/stale-equipment-image.png",
    },
  ], "automotive-parts")

  assert.equal(
    product.image,
    "/images/products-processed/automotive-parts/automotive-parts-01-brake-disc.png",
  )
})

test("category placeholder rows are not appended as products", () => {
  const products = mergeProductRowsWithCatalog([
    {
      slug: "automotive-parts",
      name_i18n: { en: "Automotive Parts" },
      description_i18n: { en: "Legacy category placeholder" },
      category_slug: "automotive-parts",
      features_i18n: null,
      applications_i18n: null,
      specs: null,
      image_url: "https://example.com/oversized-equipment-image.png",
    },
  ], "automotive-parts")

  assert.equal(products.length, 12)
  assert.ok(products.every((product) => product.slug !== "automotive-parts"))
  assert.ok(products.every((product) => !product.image.includes("oversized-equipment-image")))
})
