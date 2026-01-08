import { AppHeader } from "@/components/app-header"

export default function AppLayout({ children }) {
  return (
    <>
      <AppHeader variant="app" />
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </>
  )
}
