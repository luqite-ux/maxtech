import { NextResponse, type NextRequest } from "next/server"
import { createPublicSupabaseClient, getTenantId } from "@/lib/supabase"
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from "@/lib/inquiry-captcha"

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

  if (missing.length) {
    return NextResponse.json({ error: "Please complete the required fields before submitting your RFQ.", fields: missing }, { status: 400 })
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

  let captcha
  try {
    const { store, tenantId: captchaTenantId, siteScope } = createSupabaseCaptchaContextFromEnv()
    captcha = await verifyCaptchaSubmission({
      secret: process.env.CAPTCHA_SECRET ?? "",
      store,
      tenantId: captchaTenantId,
      siteScope,
      scope: String(formData.get("captchaScope") || ""),
      token: String(formData.get("captchaToken") || ""),
      answer: String(formData.get("captchaAnswer") || ""),
    })
  } catch {
    return NextResponse.json({ error: "The verification service is temporarily unavailable." }, { status: 503 })
  }
  if (!captcha.ok) {
    return NextResponse.json({ error: "The verification code is invalid or expired. Please try the new image." }, { status: 400 })
  }

  try {
    const supabase = createPublicSupabaseClient()
    const inquiryId = crypto.randomUUID()
    const { error } = await supabase.from("inquiries").insert({
      id: inquiryId,
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
    })

    if (error) throw error
    await notifyInquiryEmail(getTenantId(), inquiryId)
  } catch {
    return NextResponse.json({ error: "The RFQ could not be submitted. Please check the form and try again." }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
