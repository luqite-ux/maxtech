import { getCatalogProductsByCategory } from "./product-catalog.ts"

export type DatabaseProductRow = {
  slug: string
  name_i18n: Record<string, string> | null
  description_i18n: Record<string, string> | null
  category_slug: string | null
  features_i18n: Record<string, string[]> | null
  applications_i18n: Record<string, string[]> | null
  specs: Record<string, string> | null
  image_url: string | null
}

export type ProductViewModel = {
  slug: string
  category: string
  name: string
  description: string
  image: string
  features: string[]
  applications: string[]
  specs: Record<string, string>
}

function pickText(value: Record<string, string> | null | undefined, fallback: string) {
  return value?.en || Object.values(value ?? {})[0] || fallback
}

function pickList(value: Record<string, string[]> | null | undefined, fallback: string[]) {
  return value?.en || Object.values(value ?? {})[0] || fallback
}

export function mergeProductRowsWithCatalog(rows: DatabaseProductRow[], category: string): ProductViewModel[] {
  const catalog = getCatalogProductsByCategory(category)
  const rowsBySlug = new Map(rows.map((row) => [row.slug, row]))
  const merged = catalog.map((product) => {
    const row = rowsBySlug.get(product.slug)
    if (!row) {
      return {
        slug: product.slug,
        category,
        name: product.name,
        description: product.description,
        image: product.image,
        features: [],
        applications: [],
        specs: {},
      }
    }

    rowsBySlug.delete(product.slug)
    return {
      slug: row.slug,
      category,
      name: pickText(row.name_i18n, product.name),
      description: pickText(row.description_i18n, product.description),
      image: product.image,
      features: pickList(row.features_i18n, []),
      applications: pickList(row.applications_i18n, []),
      specs: row.specs ?? {},
    }
  })

  for (const row of Array.from(rowsBySlug.values())) {
    merged.push({
      slug: row.slug,
      category,
      name: pickText(row.name_i18n, row.slug),
      description: pickText(row.description_i18n, "Custom part manufactured to the buyer's drawing and project requirements."),
      image: row.image_url || "/images/equipment/cnc-machining-center.png",
      features: pickList(row.features_i18n, []),
      applications: pickList(row.applications_i18n, []),
      specs: row.specs ?? {},
    })
  }

  return merged
}
