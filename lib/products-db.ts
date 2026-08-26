import { createPublicSupabaseClient, getTenantId } from "@/lib/supabase"
import { productCategories, type ProductCategory } from "@/lib/site-data"
import { mergeProductRowsWithCatalog, type DatabaseProductRow } from "@/lib/product-catalog-merge"

type CategoryRow = {
  slug: string
  name_i18n: Record<string, string> | null
  description_i18n: Record<string, string> | null
}

function pickText(value: Record<string, string> | null | undefined, fallback: string) {
  return value?.en || Object.values(value ?? {})[0] || fallback
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    const supabase = createPublicSupabaseClient()
    const { data, error } = await supabase
      .from("product_categories")
      .select("slug,name_i18n,description_i18n")
      .eq("tenant_id", getTenantId())
      .eq("is_active", true)
      .order("sort_order", { ascending: true })

    if (error || !data?.length) return productCategories

    return (data as CategoryRow[]).map((row) => {
      const fallback = productCategories.find((item) => item.slug === row.slug) ?? productCategories[0]
      return {
        ...fallback,
        slug: row.slug,
        name: { en: pickText(row.name_i18n, fallback.name.en) },
        summary: pickText(row.description_i18n, fallback.summary)
      }
    })
  } catch {
    return productCategories
  }
}

export async function getProductCategory(slug: string) {
  const categories = await getProductCategories()
  return categories.find((category) => category.slug === slug)
}

export async function getProductsForCategory(slug: string) {
  try {
    const supabase = createPublicSupabaseClient()
    const { data, error } = await supabase
      .from("products")
      .select("slug,name_i18n,description_i18n,category_slug,features_i18n,applications_i18n,specs,image_url")
      .eq("tenant_id", getTenantId())
      .eq("category_slug", slug)
      .eq("is_active", true)
      .order("sort_order", { ascending: true })

    if (error) return mergeProductRowsWithCatalog([], slug)
    return mergeProductRowsWithCatalog((data ?? []) as DatabaseProductRow[], slug)
  } catch {
    return mergeProductRowsWithCatalog([], slug)
  }
}
