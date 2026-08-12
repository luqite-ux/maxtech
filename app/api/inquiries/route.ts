import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const required = ["name", "email", "country", "message"]
  const missing = required.filter((field) => !String(formData.get(field) || "").trim())

  const redirectUrl = new URL("/contact", request.url)
  redirectUrl.hash = "rfq"

  if (missing.length) {
    redirectUrl.searchParams.set("status", "missing")
    redirectUrl.searchParams.set("fields", missing.join(","))
    return NextResponse.redirect(redirectUrl, 303)
  }

  redirectUrl.searchParams.set("status", "submitted")
  return NextResponse.redirect(redirectUrl, 303)
}
