import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises"
import path from "node:path"

const sourceRoot = process.argv[2]
const projectRoot = path.resolve(import.meta.dirname, "..")

if (!sourceRoot) {
  throw new Error("Usage: node scripts/import-supplied-products.mjs <extracted-product-root>")
}

const categories = {
  "automotive part": {
    slug: "automotive-parts",
    fallbackName: "Custom Automotive CNC Part",
    context: "automotive prototypes, brackets, housings, and mechanical assemblies",
  },
  "carbon fiber equpiment parts": {
    slug: "carbon-fiber-equipment-parts",
    fallbackName: "Carbon Fiber Equipment Component",
    context: "carbon-fiber and composite-processing equipment",
  },
  "motorcycle parts": {
    slug: "motorcycle-parts",
    fallbackName: "Custom Motorcycle Component",
    context: "motorcycle structures, engines, and custom assemblies",
  },
  "robot equipment parts": {
    slug: "robot-equipment-parts",
    fallbackName: "Robot Equipment Component",
    context: "robotic equipment, automation fixtures, and positioning systems",
  },
  "stamping molds": {
    slug: "stamping-molds",
    fallbackName: "Custom Stamping Mold",
    context: "stamping, forming, and custom tooling applications",
  },
  "steel structure mechanical parts": {
    slug: "steel-structure-mechanical-parts",
    fallbackName: "Steel Structure Mechanical Part",
    context: "industrial machinery, frames, supports, and mechanical assemblies",
  },
}

const acronymWords = new Map([
  ["cnc", "CNC"],
  ["pvc", "PVC"],
  ["sus304", "SUS304"],
  ["q235a", "Q235A"],
  ["t651", "T651"],
])

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[^\x00-\x7F]/g, " ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function displayName(filename, fallbackName, index) {
  const base = path.parse(filename).name
    .replace(/\d{14}/g, " ")
    .replace(/[^\x00-\x7F]/g, " ")
    .replace(/\bcopy\b/gi, " ")
    .replace(/[_-]+/g, " ")
    .replace(/[(),]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  const generic = !base || /^(?:cnc auto parts?|motorcyle part|stamping mold|mold|end cover|endcover)\s*\d*$/i.test(base)
  if (generic) return `${fallbackName} ${String(index).padStart(2, "0")}`

  return base
    .split(" ")
    .map((word) => acronymWords.get(word.toLowerCase()) ?? `${word[0]?.toUpperCase() ?? ""}${word.slice(1)}`)
    .join(" ")
}

const productRoot = path.join(sourceRoot, "产品分类")
const records = []

for (const [folder, category] of Object.entries(categories)) {
  const sourceDir = path.join(productRoot, folder)
  const entries = (await readdir(sourceDir, { withFileTypes: true }))
    .filter((entry) => entry.isFile())
    .sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }))

  const destinationDir = path.join(projectRoot, "public", "images", "products", category.slug)
  await mkdir(destinationDir, { recursive: true })

  for (const [offset, entry] of entries.entries()) {
    const index = offset + 1
    const name = displayName(entry.name, category.fallbackName, index)
    const extension = path.extname(entry.name).toLowerCase()
    const id = `${category.slug}-${String(index).padStart(2, "0")}`
    const filename = `${id}-${slugify(name).slice(0, 52)}${extension}`
    const image = `/images/products/${category.slug}/${filename}`

    await copyFile(path.join(sourceDir, entry.name), path.join(destinationDir, filename))
    records.push({
      slug: id,
      category: category.slug,
      name,
      description: `${name} shown in a customer-supplied reference image for drawing-based custom manufacturing enquiries involving ${category.context}.`,
      image,
      sourceFilename: entry.name,
    })
  }
}

const output = `export type CatalogProduct = {
  slug: string
  category: string
  name: string
  description: string
  image: string
  sourceFilename: string
}

export const catalogProducts: CatalogProduct[] = ${JSON.stringify(records, null, 2)}

export function getCatalogProductsByCategory(category: string) {
  return catalogProducts.filter((product) => product.category === category)
}

const categoryFeaturedIndexes: Record<string, number> = {
  "automotive-parts": 0,
  "carbon-fiber-equipment-parts": 0,
  "motorcycle-parts": 3,
  "robot-equipment-parts": 0,
  "stamping-molds": 0,
  "steel-structure-mechanical-parts": 10,
}

export function getCategoryFeaturedProduct(category: string) {
  const products = getCatalogProductsByCategory(category)
  return products[categoryFeaturedIndexes[category] ?? 0]
}
`

await writeFile(path.join(projectRoot, "lib", "product-catalog.ts"), output, "utf8")
console.log(`Imported ${records.length} supplied product images.`)
