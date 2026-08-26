# Hengli MAXTECH Site Enrichment Design

## Goal

Upgrade the existing MAXTECH customer site from a sparse industrial template into a content-rich B2B precision-manufacturing site, using the customer's old site and supplied product archive as factual source material without copying its weak copy, inconsistent identity, or prohibited promises.

## Evidence and Sources

- Current site: `https://hl-precision.com`
- Current repository: `luqite-ux/maxtech`
- Reference site supplied by the customer: `https://www.mtcncservices.com/`
- Supplied archive: `1420-恒力模具 独立站优化修改(2).rar`
- Supplied product assets: 65 images across six confirmed categories.
- Confirmed company and capability facts remain those already recorded in the repository: Hangzhou Hengli Mould Machinery Factory, MAXTECH, nearly 40 years, about 1,500 m², about 40 machines, 15 vertical machining centers, ISO 9001:2015.

## Design Read

Reading this as a full redesign of an English B2B manufacturing site for overseas procurement and engineering buyers, with a precise, evidence-led industrial language and a brighter high-density editorial layout rather than a generic card-stack factory template.

Design dials:

- `DESIGN_VARIANCE: 7`
- `MOTION_INTENSITY: 4`
- `VISUAL_DENSITY: 6`

The site keeps a light silver/white base and MAXTECH burgundy accent. It uses existing factory photography and customer-supplied product photography as the visual system. Motion is limited to hierarchy, transitions, and interaction feedback, with reduced-motion fallbacks.

## Information Architecture

Existing public routes and primary navigation labels remain stable: Home, Products, Capabilities, Quality, News, About, FAQ, and Contact. Category routes remain under `/products/[slug]` to avoid breaking existing links and SEO.

The home page becomes a complete buyer journey:

1. Advertising-grade split hero with real equipment imagery and immediate RFQ actions.
2. Proof strip for factory scale and manufacturing experience.
3. Visual category gallery using the supplied product images.
4. Process and material capabilities.
5. Drawing-to-delivery workflow.
6. Equipment and factory evidence.
7. Quality-control narrative and ISO evidence.
8. Application industries.
9. Product gallery drawn from all six categories.
10. FAQ preview and final RFQ.

Products becomes an image-led catalogue. Each category page presents real supplied products, machining context, RFQ guidance, and links to inquiry. It must remain a B2B catalogue with no prices, cart, checkout, or invented specifications.

## Product Asset Model

Every supplied image receives:

- a stable ASCII filename;
- one of the six confirmed category slugs;
- an English display name derived only from the customer filename when available;
- a neutral fallback name such as `Custom Automotive CNC Part` when the filename is generic;
- image dimensions and source provenance in a generated manifest.

The static manifest is the delivery fallback. Supabase remains the primary source when configured, and the data layer merges database records with the supplied catalogue without losing locale-aware JSONB support.

## Content and Compliance

- Preserve customer facts and do not infer machines, tolerances, certifications, materials, or markets not supported by current records.
- Do not copy old-site testimonials or claims that cannot be verified.
- Remove or avoid `warranty`, `warranties`, `guarantee`, `guaranteed`, and Chinese equivalents across source, metadata, structured data, and fallback content.
- Use neutral inspection language instead of service commitments.
- Preserve the verified footer identity and runtime year.
- Do not create demonstration news. Existing empty-state/database behavior remains.

## Responsive and Accessibility Requirements

- Validate at 1440px desktop and 390px mobile widths.
- Keep the header on one line at desktop and maintain 44px minimum touch targets.
- Product images use `object-fit: contain` on clean continuous backgrounds where full subject visibility matters; contextual crops are allowed only for factory/environment imagery.
- All text and controls meet WCAG AA contrast.
- Focus, hover, active, loading, empty, and error states remain usable.
- Respect `prefers-reduced-motion`.

## Verification and Approval Gates

Implementation stays on `codex/hengli-site-enrichment`. Before any push to `main` or Production update:

1. automated tests and production build pass;
2. all 65 supplied product assets are represented and load successfully;
3. source and generated routes pass prohibited-word scans;
4. home, product listing, every category, contact, and representative inner pages are visually reviewed at desktop and 390px;
5. inquiries and existing backend contracts remain intact;
6. Taste review returns `PASS` or all `TARGETED_FIX` findings are corrected and re-reviewed;
7. Impeccable terminal review passes;
8. the user receives real screenshots and approves the visual result before `main` or Production is changed.

