# Hengli MAXTECH Site Enrichment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enrich the MAXTECH site with the customer's 65 supplied product images, a more complete B2B page narrative, and verified responsive presentation while preserving its existing routes, inquiry integration, SEO, and customer facts.

**Architecture:** Add a typed static product catalogue as the reliable fallback and merge it through the existing server-side product data layer. Recompose existing marketing components into a denser image-led industrial system while keeping dynamic Supabase reads and inquiry APIs unchanged.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS 3, Supabase, Node test runner.

**Spec:** `docs/superpowers/specs/2026-08-26-hengli-site-enrichment-design.md`

## Global Constraints

- Work only on `codex/hengli-site-enrichment`; do not push `main` or update Production before screenshot approval.
- Preserve Home, Products, Capabilities, Quality, News, About, FAQ, Contact, and existing `/products/[slug]` routes.
- Use only confirmed customer facts and the 65 supplied images; do not invent specifications, equipment, certificates, testimonials, or markets.
- No `warranty`, `warranties`, `guarantee`, `guaranteed`, `质保`, or `保修` in public content.
- Keep Supabase reads server-side and retain locale-aware JSONB fallbacks.
- Keep inquiry persistence and CAPTCHA contracts unchanged.
- Verify desktop at 1440px and mobile at 390px.

---

### Task 1: Supplied Product Catalogue

**Files:**
- Create: `lib/product-catalog.ts`
- Create: `scripts/import-supplied-products.mjs`
- Create: `tests/product-catalog.test.mjs`
- Create: `public/images/products/<category>/<stable-name>.<ext>`

**Interfaces:**
- Produces: `CatalogProduct`, `catalogProducts`, `getCatalogProductsByCategory(slug)`.
- Produces: normalized static image paths consumed by homepage, product listing, category pages, and database fallback.

- [ ] Write a failing Node test asserting exactly 65 catalogue records, six confirmed category slugs, unique slugs and image paths, existing image files, non-empty English names, and zero prohibited terms.
- [ ] Run `node --test tests/product-catalog.test.mjs` and confirm failure because the catalogue does not exist.
- [ ] Copy and normalize all supplied images, then implement the typed catalogue and deterministic import manifest.
- [ ] Run the catalogue test and confirm all assertions pass.
- [ ] Commit catalogue, images, script, and test.

### Task 2: Product Data Fallback and Image-Led Category Pages

**Files:**
- Modify: `lib/products-db.ts`
- Modify: `components/products/category-detail.tsx`
- Modify: `components/products/product-category-card.tsx`
- Modify: `app/products/page.tsx`
- Create: `components/products/product-card.tsx`
- Create: `tests/product-rendering.test.mjs`

**Interfaces:**
- Consumes: `getCatalogProductsByCategory(slug)` from Task 1.
- Produces: merged product view models with `image`, `name`, `description`, `features`, `applications`, and `specs`.

- [ ] Write failing tests asserting static catalogue fallback is returned when Supabase has no products and every category surface renders a real image and RFQ path.
- [ ] Run the focused test and confirm the missing fallback/image behavior fails.
- [ ] Implement merge/fallback logic and reusable product cards without changing route slugs.
- [ ] Run focused and existing tests; confirm all pass.
- [ ] Commit the product data and category presentation changes.

### Task 3: Rich Home-Page Narrative

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/home/hero.tsx`
- Modify: `components/home/category-showcase.tsx`
- Modify: `components/home/equipment-band.tsx`
- Modify: `components/home/quality-preview.tsx`
- Modify: `components/home/workflow.tsx`
- Create: `components/home/capability-matrix.tsx`
- Create: `components/home/application-industries.tsx`
- Create: `components/home/featured-products.tsx`
- Create: `tests/home-enrichment.test.mjs`

**Interfaces:**
- Consumes: catalogue and existing `siteInfo`, `workflow`, `capabilities`, `faqs`.
- Produces: complete ten-stage homepage buyer journey with real images and unchanged RFQ routes.

- [ ] Write failing source-contract tests for the proof strip, six image-led categories, capabilities, workflow, equipment, quality, industries, featured products, FAQ, and final RFQ.
- [ ] Run the focused test and confirm the missing sections fail.
- [ ] Recompose the homepage with four or more distinct section layout families, one burgundy accent, consistent radii, and reduced-motion-safe interactions.
- [ ] Run focused and existing tests and confirm all pass.
- [ ] Commit the homepage enrichment.

### Task 4: Supporting Page Content and SEO Integrity

**Files:**
- Modify: `app/capabilities/page.tsx`
- Modify: `app/quality/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/faq/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/sitemap.ts`
- Create: `tests/content-compliance.test.mjs`

**Interfaces:**
- Consumes: confirmed site facts and existing route helpers.
- Produces: richer evidence-led supporting pages and stable SEO metadata/sitemap.

- [ ] Write failing tests for required facts, stable routes, metadata, dynamic footer identity, explicit Home nav, and prohibited-word absence.
- [ ] Run the focused test and confirm missing richness/compliance assertions fail.
- [ ] Enrich supporting pages using existing factory, equipment, certificate, and supplied product evidence without invented claims.
- [ ] Run focused and existing tests and confirm all pass.
- [ ] Commit supporting page and SEO changes.

### Task 5: Responsive Visual Review and Targeted Fixes

**Files:**
- Modify: only files implicated by screenshot evidence.
- Create: `deliverables/hengli-site-enrichment/visual-review.md`
- Create: `deliverables/hengli-site-enrichment/screenshots/*`

**Interfaces:**
- Produces: desktop/mobile evidence and a Taste verdict with six-dimension scoring.

- [ ] Run the local production-equivalent server and capture real 1440px and 390px screenshots for Home, Products, each of six categories, Capabilities, Quality, About, FAQ, Contact, News empty/data state, and representative interactive states.
- [ ] Record the six Taste scores and return exactly one verdict: `PASS`, `TARGETED_FIX`, `REDESIGN_REQUIRED`, or `NOT_VISUALLY_VERIFIED`.
- [ ] For every `TARGETED_FIX`, add a failing regression assertion where automatable, implement only the evidenced fix, rerun tests, and recapture affected screenshots.
- [ ] Repeat review until Taste reaches `PASS`.
- [ ] Commit visual fixes and evidence.

### Task 6: Terminal Verification and Customer-Issue Closure

**Files:**
- Create: `deliverables/hengli-site-enrichment/final-review.md`

**Interfaces:**
- Produces: final checklist mapping every customer request to evidence.

- [ ] Run `node --test tests/*.test.mjs`, `pnpm exec tsc --noEmit`, and `pnpm build`.
- [ ] Scan source and generated routes for all prohibited Chinese and English terms.
- [ ] Verify all 65 image URLs, navigation routes, sitemap routes, RFQ form states, mobile menu, focus states, and console logs.
- [ ] Perform Impeccable responsive/accessibility/performance review and record every item as `PASS`, `FAIL`, or `NOT_VISUALLY_VERIFIED` with route, viewport, and evidence.
- [ ] Confirm the three customer issues are closed: the site is no longer sparse, old-site richness was selectively incorporated, and all supplied product imagery is represented.
- [ ] Commit the final review evidence and present screenshots for user approval; do not push `main` or Production before that approval.

