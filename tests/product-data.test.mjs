import assert from "node:assert/strict"
import test from "node:test"

const { mergeProductRowsWithCatalog } = await import("../lib/product-catalog-merge.ts")

test("an empty database category falls back to every supplied customer product", () => {
  const products = mergeProductRowsWithCatalog([], "automotive-parts")
  assert.equal(products.length, 12)
  assert.ok(products.every((product) => product.image.startsWith("/images/products-processed/automotive-parts/")))
  assert.ok(products.every((product) => product.image.endsWith(".png")))
  assert.ok(products.every((product) => product.name.length > 3))
})

test("a database product overrides matching copy while retaining its supplied image", () => {
  const products = mergeProductRowsWithCatalog(
    [
      {
        slug: "automotive-parts-01",
        name_i18n: { en: "Brake Disc Machining Reference" },
        description_i18n: { en: "Database-authored buyer copy." },
        category_slug: "automotive-parts",
        features_i18n: { en: ["Drawing based"] },
        applications_i18n: { en: ["Automotive assemblies"] },
        specs: { source: "customer drawing" },
        image_url: null,
      },
    ],
    "automotive-parts",
  )

  assert.equal(products.length, 12)
  assert.equal(products[0].name, "Brake Disc Machining Reference")
  assert.equal(products[0].description, "Database-authored buyer copy.")
  assert.match(products[0].image, /brake-disc\.png$/)
})
