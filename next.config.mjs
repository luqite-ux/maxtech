/** @type {import('next').NextConfig} */
const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL?.replace(/\/$/, "")

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-c7a22068052144a5805830c30d280128.r2.dev",
        pathname: "/tenants/maxtech/images/**"
      }
    ]
  },
  async rewrites() {
    if (!adminUrl) return []
    return {
      afterFiles: [
        { source: "/admin", destination: `${adminUrl}/admin` },
        { source: "/admin/:path*", destination: `${adminUrl}/admin/:path*` },
        { source: "/api/admin/:path*", destination: `${adminUrl}/api/admin/:path*` }
      ]
    }
  }
}

export default nextConfig
