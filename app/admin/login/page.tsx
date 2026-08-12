"use client"

import { Suspense, useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

function LoginForm() {
  const params = useSearchParams()
  const [pending, setPending] = useState(false)
  const reason = params.get("reason")
  const error = params.get("error")

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-mist to-[#fff7f7] p-4">
      <div className="w-full max-w-md rounded-md border border-graphite/10 bg-white p-8 shadow-soft">
        <div className="mb-7 text-center">
          <Image src="/images/brand/maxtech-logo.png" alt="MAXTECH" width={188} height={44} className="mx-auto h-10 w-auto" />
          <h1 className="mt-6 text-2xl font-semibold text-graphite">MAXTECH Admin</h1>
          <p className="mt-2 text-sm text-steel">Sign in to manage products, articles, inquiries, and site settings.</p>
        </div>

        {reason === "unauthorized" && (
          <p className="mb-4 rounded-md bg-[#fff7e8] px-3 py-2 text-sm text-[#8a5b00]">Please sign in before opening the admin dashboard.</p>
        )}

        <form action="/api/auth/login" method="post" className="space-y-4" onSubmit={() => setPending(true)}>
          {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
          <label className="grid gap-2 text-sm font-semibold text-graphite">
            Email
            <input name="email" type="email" autoComplete="email" required className="min-h-12 rounded-md border border-graphite/15 px-3 text-sm outline-none focus:border-burgundy" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-graphite">
            Password
            <input name="password" type="password" autoComplete="current-password" required className="min-h-12 rounded-md border border-graphite/15 px-3 text-sm outline-none focus:border-burgundy" />
          </label>
          <button type="submit" disabled={pending} className="min-h-12 w-full rounded-md bg-burgundy px-4 text-sm font-semibold text-white hover:bg-[#762128] disabled:opacity-60">
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-steel">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
