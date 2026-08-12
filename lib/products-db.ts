import { createPublicSupabaseClient, getTenantId } from "@/lib/supabase"
import { productCategories, type ProductCategory } from "@/lib/site-data"

type CategoryRow = {
  slug: string
  name_i18n: Record<string, string> | null
  description_i18n: Record<string, string> | null
}

type ProductRow = {
  slug: string
  name_i18n: Record<string, string> | null
  description_i18n: Record<string, string> | null
  category_slug: string | null
  features_i18n: Record<string, string[]> | null
  applications_i18n: Record<string, string[]> | null
  specs: Record<string, string> | null
}

function pickText(value: Record<string, string> | null | undefined, fallback: string) {
  return value?.en || Object.values(value ?? {})[0] || fallback
}

function pickList(value: Record<string, string[]> | null | undefined, fallback: string[]) {
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
      .select("slug,name_i18n,description_i18n,category_slug,features_i18n,applications_i18n,specs")
      .eq("tenant_id", getTenantId())
      .eq("category_slug", slug)
      .eq("is_active", true)
      .order("sort_order", { ascending: true })

    if (error || !data?.length) return []

    return (data as ProductRow[]).map((row) => ({
      slug: row.slug,
      name: pickText(row.name_i18n, row.slug),
      description: pickText(row.description_i18n, ""),
      features: pickList(row.features_i18n, []),
      applications: pickList(row.applications_i18n, []),
      specs: row.specs ?? {}
    }))
  } catch {
    return []
  }
}
