/** @type {import('next').NextConfig} */

// Storage host is derived from the configured Supabase project so this never
// drifts from the environment the app is actually talking to.
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined

const nextConfig = {
  images: {
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
      : [],
  },
  // The floating dev badge sits on top of the sidebar account row.
  devIndicators: false,
}

export default nextConfig
