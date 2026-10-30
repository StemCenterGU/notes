"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useUser } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { ProductPreview } from "@/components/marketing/product-preview"

/**
 * Three steps, as an editorial sequence rather than a row of cards.
 *
 * The previous version was three centred cards with a coloured icon each and
 * copy about a "collective knowledge base" -- the generic shape that makes a
 * page look generated. A numbered list separated by hairlines carries the same
 * information, takes less room, and reads like a university page.
 */
const STEPS = [
  {
    n: "01",
    title: "Upload what you took down",
    body: "A photo of your notebook, a PDF, a lab write-up. Tag it with the course and the semester so it lands in the right place.",
  },
  {
    n: "02",
    title: "A tutor reads it",
    body: "Someone from the STEM Center checks it is accurate and legible before anyone studies from it, and writes back if something needs fixing.",
  },
  {
    n: "03",
    title: "It shows up in your course",
    body: "Approved notes appear for everyone taking the class. Upload during the semester and you are entered in the raffle.",
  },
]

export default function Page() {
  const { user, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) router.replace("/dashboard")
  }, [user, isLoading, router])

  if (!isLoading && user) return null

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        {/* Hero ------------------------------------------------------------ */}
        <section className="px-6 pb-16 pt-20 lg:px-10 lg:pt-28">
          <div className="mx-auto w-full max-w-5xl">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Gannon University STEM Center
            </p>
            <h1 className="font-display mt-5 max-w-3xl text-[40px] leading-[1.04] sm:text-[56px] md:text-[68px]">
              The notes your class already wrote.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
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
                <Button size="lg" variant="ghost" className="h-11 px-5">
                  Sign in
                </Button>
              </Link>
            </div>

            {/* Show the thing rather than describing it. */}
            <div className="mt-16 lg:mt-20">
              <ProductPreview />
            </div>
          </div>
        </section>

        {/* What it is ------------------------------------------------------ */}
        <section className="border-t border-border px-6 py-20 lg:px-10">
          <div className="mx-auto grid w-full max-w-5xl gap-x-16 gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
            <h2 className="font-display text-[26px] leading-tight md:text-[30px]">
              Run by the STEM Center, not a startup.
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Every semester the same thing happens: you miss a lecture, the slides
                do not cover it, and the person who sat through it has perfectly good
                notes sitting in a notebook nobody else will ever see.
              </p>
              <p>
                This is where those go. Tutors read what gets uploaded, so what you
                find here has been looked at by someone who knows the material —
                which is the part a group chat full of photos can never give you.
              </p>
            </div>
          </div>
        </section>

        {/* How it works ---------------------------------------------------- */}
        <section id="how-it-works" className="scroll-mt-20 border-t border-border px-6 py-20 lg:px-10">
          <div className="mx-auto w-full max-w-5xl">
            <h2 className="font-display text-[26px] leading-tight md:text-[30px]">
              How it works
            </h2>

            <div className="mt-10 divide-y divide-border border-t border-border">
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  className="grid gap-x-10 gap-y-2 py-7 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.4fr)]"
                >
                  <span className="tabular text-sm text-muted-foreground/70">{step.n}</span>
                  <h3 className="text-[15px] font-medium text-foreground">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Close ----------------------------------------------------------- */}
        <section className="border-t border-border px-6 py-24 lg:px-10">
          <div className="mx-auto w-full max-w-5xl">
            <h2 className="font-display text-[30px] leading-tight md:text-[40px]">
              Start with one note.
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Upload something from this week and you are in the raffle.
            </p>
            <div className="mt-8">
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
