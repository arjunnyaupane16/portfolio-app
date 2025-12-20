"use client";

/**
 * @file app/page.tsx
 * @description Orchestration node for the portfolio experience.
 * Optimized for Performance (Section Dynamic Loading) and Reliability (Fault Isolation).
 */

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Loader2 } from "lucide-react";

// Types & Hooks
import { portfolioData } from "@/constants/data";
import { useNavigation } from "@/hooks/useNavigation";

// Reliability Layer
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

// Static Assembly (LCP-Critical)
import Hero from "@/components/sections/Hero";

/**
 * Lazy-loaded Assemblages
 * Optimizes TTFB and minimal initial JS delivery.
 */
const Journey = dynamic(() => import("@/components/sections/Journey"), {
  loading: () => <SectionLoadingSkeleton />,
  ssr: true
});
const Craft = dynamic(() => import("@/components/sections/Craft"), {
  loading: () => <SectionLoadingSkeleton />,
  ssr: true
});
const Artifacts = dynamic(() => import("@/components/sections/Artifacts"), {
  loading: () => <SectionLoadingSkeleton />,
  ssr: true
});
const Connection = dynamic(() => import("@/components/sections/Connection"), {
  loading: () => <SectionLoadingSkeleton />,
  ssr: true
});

const SectionLoadingSkeleton = () => (
  <div className="h-screen flex items-center justify-center opacity-20">
    <Loader2 className="animate-spin" size={48} />
  </div>
);

const NAV_LINKS = [
  { name: "Vision", href: "#vision" },
  { name: "Journey", href: "#journey" },
  { name: "Craft", href: "#craft" },
  { name: "Artifacts", href: "#artifacts" },
  { name: "Connection", href: "#connection" },
];

export default function RootStage() {
  const [mounted, setMounted] = useState(false);
  const { isMobileMenuOpen, toggleMenu, closeMenu } = useNavigation();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ErrorBoundary>
      <main className="relative selection:bg-accent-primary/30 antialiased">
        {/* Navigation Core */}
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] glass px-8 py-4 rounded-full border border-white/10 hidden md:block">
          <ul className="flex gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">
            {NAV_LINKS.map((link) => (
              <li key={link.name} className="hover:text-accent-primary transition-colors cursor-pointer">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Interaction Engine */}
        <div className="fixed top-6 right-6 z-[120] md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation visibility"
            className="p-4 rounded-full glass border border-white/10 text-accent-primary shadow-2xl active:scale-95 transition-transform"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Portal Overlay */}
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="fixed inset-0 z-[110] bg-background/90 md:hidden flex flex-col items-center justify-center"
            >
              <ul className="flex flex-col gap-14 text-center">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="text-5xl font-black tracking-tighter hover:text-accent-primary transition-all uppercase"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modular Narrative Pipeline */}
        <div className="flex flex-col">
          <section id="vision">
            <Hero data={portfolioData} />
          </section>

          <Suspense fallback={<SectionLoadingSkeleton />}>
            <section id="journey" className="scroll-mt-24">
              <Journey bio={portfolioData.bio} education={portfolioData.education} />
            </section>

            <section id="craft" className="scroll-mt-24">
              <Craft skills={portfolioData.skills} />
            </section>

            <section id="artifacts" className="scroll-mt-24">
              <Artifacts projects={portfolioData.projects} />
            </section>

            <section id="connection" className="scroll-mt-24">
              <Connection contact={portfolioData.contact} />
            </section>
          </Suspense>
        </div>

        {/* Future Extension Slot: Add analytics or global overlays here */}
      </main>
    </ErrorBoundary>
  );
}
