import React from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export function PageShell({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-secondary/50">

      <div
        className="absolute inset-0 opacity-60"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-5 py-20 text-center">

        {eyebrow && (
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-saffron">
            {eyebrow}
          </p>
        )}

        <h1 className="font-display text-5xl text-maroon md:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        )}

        <div className="mx-auto mt-7 h-px w-32 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

      </div>
    </section>
  );
}