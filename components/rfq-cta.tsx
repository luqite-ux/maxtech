import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"
import { rfqPath } from "@/lib/routes"

type RfqCtaProps = {
  label?: string
  variant?: "primary" | "secondary"
  className?: string
}

export function RfqCta({ label = "Request a Quote", variant = "primary", className = "" }: RfqCtaProps) {
  const styles =
    variant === "primary"
      ? "bg-burgundy text-white shadow-soft hover:bg-[#762128]"
      : "border border-graphite/15 bg-white/80 text-graphite hover:border-burgundy/50 hover:text-burgundy"

  return (
    <Link
      href={rfqPath}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition ${styles} ${className}`}
    >
      {variant === "primary" ? <ArrowRight className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
      <span>{label}</span>
    </Link>
  )
}
