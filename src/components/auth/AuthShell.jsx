"use client"

import Link from "next/link"
import { GannonWordmark } from "@/components/GannonWordmark"

/**
 * Auth page frame. Narrow column, no card chrome — the form is the only
 * thing on screen, so it needs no border to separate it from anything.
 */
export function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-[380px]">
        <Link
          href="/"
          className="flex items-baseline justify-center gap-1.5"
          aria-label="Gannon University Notes, home"
        >
          <GannonWordmark />
          <span className="text-[15px] font-semibold tracking-tight text-foreground">Notes</span>
        </Link>

        <h1 className="font-display mt-8 text-center text-2xl text-foreground">{title}</h1>
        {subtitle && (
          <p className="mt-1.5 text-center text-sm text-muted-foreground">{subtitle}</p>
        )}

        <div className="mt-7">{children}</div>

        {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
      </div>
    </div>
  )
}

export function GoogleButton({ onClick, disabled, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-10 w-full items-center justify-center gap-2.5 rounded-md border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-60"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
      {label}
    </button>
  )
}

export function AuthDivider() {
  return (
    <div className="my-5 flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted-foreground">or</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

export function AuthError({ children }) {
  if (!children) return null
  return (
    <div className="mb-4 rounded-md border border-destructive/25 bg-destructive/10 px-3 py-2 text-sm text-destructive">
      {children}
    </div>
  )
}
