import { AppHeader } from "@/components/app-header"

export default function MarketingLayout({ children }) {
  return (
    <>
      <AppHeader variant="marketing" />
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </>
  )
}
