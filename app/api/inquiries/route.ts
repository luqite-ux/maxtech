import { NextResponse, type NextRequest } from "next/server"
import { createPublicSupabaseClient, getTenantId } from "@/lib/supabase"

async function notifyInquiryEmail(tenantId: string, inquiryId: string) {
  const secret = process.env.INQUIRY_NOTIFY_SECRET?.trim()
  const adminUrl = (process.env.HUANQIU_ADMIN_URL ?? process.env.NEXT_PUBLIC_ADMIN_URL)?.trim().replace(/\/$/, '')
  if (!secret || !adminUrl) return

  try {
    const response = await fetch(`${adminUrl}/api/inquiries/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-inquiry-notify-secret': secret,
      },
      body: JSON.stringify({ tenantId, inquiryId }),
    })
    if (!response.ok) {
      console.warn('[inquiries] notification request failed', response.status)
    }
  } catch (error) {
    console.warn('[inquiries] notification request error', error)
  }
}
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

  const name = String(formData.get("name") || "").trim()
  const email = String(formData.get("email") || "").trim()
  const company = String(formData.get("company") || "").trim()
  const phone = String(formData.get("phone") || "").trim()
  const category = String(formData.get("category") || "").trim()
  const material = String(formData.get("material") || "").trim()
  const quantity = String(formData.get("quantity") || "").trim()
  const country = String(formData.get("country") || "").trim()
  const drawingNote = String(formData.get("drawingNote") || "").trim()
  const message = String(formData.get("message") || "").trim()

  try {
    const supabase = createPublicSupabaseClient()
    const { data, error } = await supabase.from("inquiries").insert({
      tenant_id: getTenantId(),
      name,
      company,
      email,
      phone,
      subject: `MAXTECH RFQ - ${category || "General custom part"}`,
      message: [
        message,
        `Country / Region: ${country}`,
        `Product Category: ${category}`,
        `Material: ${material}`,
        `Quantity: ${quantity}`,
        `Drawing or File Notes: ${drawingNote}`
      ].join("\n"),
      status: "unread"
    }).select("id").single()

    if (error) throw error
    if (data?.id) await notifyInquiryEmail(getTenantId(), data.id)
  } catch {
    redirectUrl.searchParams.set("status", "error")
    return NextResponse.redirect(redirectUrl, 303)
  }

  redirectUrl.searchParams.set("status", "submitted")
  return NextResponse.redirect(redirectUrl, 303)
}
