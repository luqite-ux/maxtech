import { catalogProducts } from "./product-catalog.ts"

export const homeSections = [
  { id: "hero", layout: "asymmetric-split" },
  { id: "proof", layout: "horizontal-proof" },
  { id: "categories", layout: "editorial-grid" },
  { id: "capabilities", layout: "matrix" },
  { id: "workflow", layout: "process-rail" },
  { id: "equipment", layout: "image-band" },
  { id: "quality", layout: "split-evidence" },
  { id: "industries", layout: "indexed-list" },
  { id: "products", layout: "gallery" },
  { id: "faq", layout: "accordion-preview" },
  { id: "rfq", layout: "conversion-panel" },
] as const

export const industryApplications = [
  { title: "Industrial Robotics", description: "Mounts, end plates, gripper parts, adjustment plates, and automation fixtures." },
  { title: "Automotive Programs", description: "Prototype and batch components for brackets, housings, mounts, and mechanical assemblies." },
  { title: "Motorcycle Systems", description: "Engine casings, mounting brackets, crossover pipes, and drawing-based custom parts." },
  { title: "Composite Equipment", description: "Positioning, guiding, supporting, and transmission components for production equipment." },
  { title: "Stamping Tooling", description: "Custom stamping molds, inserts, and tooling components manufactured from customer drawings." },
  { title: "Industrial Machinery", description: "Rollers, sleeves, bases, connecting parts, and structural mechanical components." },
] as const

const featureIndexes = [0, 12, 17, 23, 40, 50, 6, 59]
export const featuredCatalogProducts = featureIndexes.map((index) => catalogProducts[index])

