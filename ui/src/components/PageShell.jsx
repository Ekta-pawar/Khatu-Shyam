import React from "react";
import { motion } from "framer-motion";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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

      <motion.div
        className="relative mx-auto max-w-5xl px-5 py-20 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >

        {eyebrow && (
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-saffron">
            {eyebrow}
          </p>
        )}

        <h1 className="font-display text-3xl bg-linear-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent sm:text-4xl md:text-6xl py-4">
          {title}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        )}

        <div className="mx-auto mt-7 h-px w-32 bg-linear-to-r from-transparent via-yellow-500 to-transparent" />

      </motion.div>
    </section>
  );
}