import Link from "next/link"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "About · Gannon Notes",
}

/**
 * A short, plain About page.
 *
 * What was here before was a leftover placeholder: a maroon-to-gold gradient
 * headed "What Our Users Say", carrying invented testimonials from invented
 * students -- one of them a lorem-ipsum joke about burning your mouth. It was
 * reachable by anyone and sat on a real university's site.
 */
export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            About
          </p>
          <h1 className="font-display mt-5 text-[34px] leading-[1.08] md:text-[44px]">
            A note library run by the STEM Center.
          </h1>

          <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Gannon Notes is where students in STEM courses put the notes they
              take, so the people in the same class can find them. It is run by
              the Gannon University STEM Center and staffed by the same tutors
              who hold hours there.
            </p>
            <p>
              The part that makes it worth using is the review. Anything
              uploaded is read by a tutor before it becomes visible, and they
              write back when something needs fixing — a page that did not scan,
              a formula copied down wrong. Nothing reaches the rest of your
              class unchecked.
            </p>
            <p>
              Uploading during the semester also enters you in the raffle the
              STEM Center runs each term.
            </p>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <h2 className="text-[15px] font-medium text-foreground">Questions</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Come by the STEM Center, or read more about what it does on the{" "}
              <a
                href="https://www.gannon.edu/academics/centers-of-excellence/stem-center/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-primary"
              >
                university site
              </a>
              .
            </p>
          </div>

          <div className="mt-12">
            <Link
              href="/signup"
              className="text-[15px] text-primary underline underline-offset-4"
            >
              Create an account →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
