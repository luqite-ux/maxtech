export const siteInfo = {
  brand: "MAXTECH",
  company: "Hangzhou Hengli Mould Machinery Factory",
  address: "No. 688 Yanan Road, Yaqian Town, Xiaoshan District, Hangzhou City, Zhejiang Province, China",
  phone: "+86-15267035569",
  whatsapp: "+86-15267035569",
  tagline: {
    en: "Precision CNC machining and custom mechanical parts for demanding industrial projects."
  },
  stats: [
    { value: "40", suffix: "yrs", label: "manufacturing experience" },
    { value: "1,500", suffix: "m2", label: "factory workspace" },
    { value: "40+", suffix: "", label: "precision machines" },
    { value: "15", suffix: "", label: "vertical machining centers" }
  ]
}

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Quality", href: "/quality" },
  { label: "News", href: "/news" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
]

export const productCategories = [
  {
    slug: "robot-equipment-parts",
    name: { en: "Robot Equipment Parts" },
    summary: "Custom machined brackets, frames, shafts, fixtures, and precision parts for robot equipment and automation systems.",
    applications: ["Robot assemblies", "Automation fixtures", "Positioning structures"],
    processes: ["CNC milling", "CNC turning", "Drilling", "Inspection"],
    materials: ["Aluminum", "Carbon steel", "Stainless steel", "Engineering plastics"]
  },
  {
    slug: "carbon-fiber-equipment-parts",
    name: { en: "Carbon Fiber Equipment Parts" },
    summary: "Precision mechanical components for carbon fiber production, forming, supporting, and auxiliary equipment.",
    applications: ["Carbon fiber machinery", "Composite processing equipment", "Custom fixtures"],
    processes: ["CNC machining", "Wire cutting", "Grinding", "Surface finishing"],
    materials: ["Alloy steel", "Stainless steel", "Aluminum", "Tool steel"]
  },
  {
    slug: "steel-structure-mechanical-parts",
    name: { en: "Steel Structure Mechanical Parts" },
    summary: "Machined and fabricated mechanical parts for steel structure equipment, industrial frames, and load-bearing assemblies.",
    applications: ["Steel structure machinery", "Industrial frames", "Heavy-duty supports"],
    processes: ["Milling", "Drilling", "Flame cutting", "Grinding"],
    materials: ["Carbon steel", "Alloy steel", "Stainless steel"]
  },
  {
    slug: "stamping-molds",
    name: { en: "Stamping Molds" },
    summary: "Custom mold parts and tooling components made to drawings for stamping, forming, and fixture applications.",
    applications: ["Stamping tooling", "Forming molds", "Custom fixtures"],
    processes: ["CNC milling", "Wire cutting", "Grinding", "Assembly fitting"],
    materials: ["Tool steel", "Alloy steel", "Carbon steel"]
  },
  {
    slug: "automotive-parts",
    name: { en: "Automotive Parts" },
    summary: "Custom machined automotive components for prototypes, replacement programs, tooling, and small-to-medium batch orders.",
    applications: ["Automotive prototypes", "Fixture parts", "Mechanical assemblies"],
    processes: ["CNC turning", "CNC milling", "Drilling", "Dimensional inspection"],
    materials: ["Aluminum", "Steel", "Stainless steel", "Engineering plastics"]
  },
  {
    slug: "motorcycle-parts",
    name: { en: "Motorcycle Parts" },
    summary: "Drawing-based motorcycle mechanical parts and accessories with flexible sample and batch machining support.",
    applications: ["Motorcycle structures", "Accessory parts", "Custom assemblies"],
    processes: ["Turning", "Milling", "Grinding", "Surface preparation"],
    materials: ["Aluminum", "Steel", "Stainless steel"]
  }
]

export const capabilities = [
  "CNC milling",
  "CNC turning",
  "Wire cutting",
  "Grinding",
  "Drilling",
  "Flame cutting",
  "Sample machining",
  "Small and medium batch production"
]

export const workflow = [
  "Drawing and sample review",
  "Material and process planning",
  "CNC machining and multi-step processing",
  "Dimensional inspection and documentation",
  "Packing and delivery coordination"
]

export const faqs = [
  {
    question: "What specifications or models are available?",
    answer:
      "MAXTECH mainly provides non-standard parts and custom machining services. Specifications are confirmed according to drawings, samples, assembly conditions, and application requirements."
  },
  {
    question: "Do you support customized size, material, color, or process?",
    answer:
      "Yes. Size, material, surface treatment, machining process, and inspection requirements can be customized according to project needs."
  },
  {
    question: "Can you provide samples?",
    answer:
      "Yes. Sample machining is available for product verification, assembly testing, and project evaluation before batch production."
  },
  {
    question: "Do you provide technical data sheets or inspection reports?",
    answer:
      "Inspection reports, dimensional records, and related technical documents can be prepared according to customer requirements."
  },
  {
    question: "What industries or applications are your products suitable for?",
    answer:
      "Products are used in robot equipment, carbon fiber equipment, steel structure machinery, stamping tooling, automotive parts, motorcycle parts, and other industrial fields."
  },
  {
    question: "Do you support OEM services?",
    answer:
      "Yes. MAXTECH can machine parts from customer drawings, samples, or technical requirements, covering sample development through batch production."
  },
  {
    question: "What is the minimum order quantity?",
    answer:
      "MOQ depends on part structure, process complexity, material, and order requirements. Single-piece samples and small batch production can be discussed."
  },
  {
    question: "Can you provide production progress updates?",
    answer:
      "Yes. Production status, machining progress, inspection updates, and delivery coordination can be shared according to project needs."
  },
  {
    question: "How do you handle quality issues?",
    answer:
      "If a manufacturing issue is confirmed, MAXTECH reviews the cause and discusses practical corrective actions such as adjustment, rework, or replacement based on the agreed specifications."
  }
]

export type ProductCategory = (typeof productCategories)[number]
