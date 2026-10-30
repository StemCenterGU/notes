"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/AuthContext"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { StemCenterSection } from "@/components/stem-center-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function Page() {
  const { user, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/dashboard')
    }
  }, [user, isLoading, router])

  if (!isLoading && user) return null

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <main className="relative z-10">
        {/* Hero */}
        <section className="flex min-h-[78vh] items-center">
          <div className="mx-auto w-full max-w-4xl px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Gannon University STEM Center
              </p>
              <h1 className="font-display mt-4 max-w-3xl text-[44px] leading-[1.03] md:text-[68px]">
                The notes your class already wrote.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Share what you took down, find what you missed, and get it checked by a
                tutor before you study from it.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup">
                  <Button size="lg" className="h-11 px-6">
                    Create an account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="h-11 px-6">
                    Sign in
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <StemCenterSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TestimonialsSection />

        {/* Final CTA */}
        <section className="border-t border-border py-24">
          <div className="mx-auto w-full max-w-4xl px-6 lg:px-10">
            <h2 className="font-display text-[32px] md:text-[40px]">Start with one note.</h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Upload something from this week and you are in the raffle.
            </p>
            <div className="mt-7">
              <Link href="/signup">
                <Button size="lg" className="h-11 px-6">
                  Create an account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}