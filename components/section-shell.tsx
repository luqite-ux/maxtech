import type { ReactNode } from "react"

type SectionShellProps = {
  eyebrow?: string
  title?: string
  intro?: string
  className?: string
  children: ReactNode
}

export function SectionShell({ eyebrow, title, intro, className = "", children }: SectionShellProps) {
  return (
    <section className={`px-4 py-14 sm:px-6 sm:py-20 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || intro) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.24em] text-burgundy">{eyebrow}</p>}
            {title && <h2 className="mt-3 text-2xl font-semibold tracking-tight text-graphite sm:text-4xl">{title}</h2>}
            {intro && <p className="mt-4 text-base leading-8 text-steel sm:text-lg">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
