"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { portfolioData } from "@/constants/data";
import { fadeIn, fadeInUp, blurIn, staggerContainer, springPop } from "@/components/motion/variants";
import ParticleField from "@/components/ui/ParticleField";
import ScrollProgress from "@/components/ui/ScrollProgress";

const TRUSTED_STACK = ["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL"];

// Magnetic button wrapper
function MagneticButton({ children, className, href, onClick }: { children: React.ReactNode; className?: string; href?: string; onClick?: () => void }) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = (ref.current as HTMLElement)?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  const Component = onClick ? "button" : "a";
  return (
    <motion.div
      ref={ref as any}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {Component === "button" ? (
        <button onClick={onClick as any} className="w-full h-full">
          {children}
        </button>
      ) : (
        <a href={href} className="w-full h-full flex items-center justify-center">
          {children}
        </a>
      )}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <ScrollProgress />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Particle field */}
        <ParticleField />

        <div className="absolute inset-0 animated-grid opacity-40 pointer-events-none" />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 -left-20 w-72 md:w-[500px] h-72 md:h-[500px] bg-accent-primary/8 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-72 md:w-[400px] h-72 md:h-[400px] bg-accent-secondary/8 rounded-full blur-[120px] pointer-events-none animate-float-slow" />

        {/* Background Image */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="absolute inset-0 z-0 opacity-20 md:opacity-30 pointer-events-none"
        >
          <div className="relative w-full h-full">
            <Image
              src="/profile.png"
              alt={`${portfolioData.name} - ${portfolioData.title}`}
              fill
              priority
              quality={100}
              className="object-cover object-[center_20%] md:object-[center_15%] saturate-[0.8] brightness-[0.4]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="z-10 text-center w-full max-w-5xl">
          {/* Badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={springPop}
            custom={0}
            className="inline-flex items-center gap-2 px-5 py-2 mb-10 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase border border-accent-primary/20 rounded-full glass-colored text-accent-primary shimmer-border"
          >
            Web Developer & App Developer
          </motion.div>

          {/* Name */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={blurIn}
            className="mb-6"
          >
            <div className="text-[6.5vw] xs:text-3xl sm:text-5xl md:text-[6vw] lg:text-[5vw] font-bold tracking-tighter leading-[0.9] select-none" aria-hidden="true">
              <span className="block text-foreground/20 italic font-extralight text-sm sm:text-2xl md:text-4xl uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4">Hello, I&apos;m</span>
              <span className="block gradient-text break-words leading-[0.8]">{portfolioData.name}</span>
              <span className="block text-foreground/40 text-[clamp(0.75rem,3vw,1.5rem)] sm:text-2xl md:text-3xl font-light mt-2 tracking-normal">({portfolioData.nickname})</span>
            </div>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={0.2}
            className="text-base md:text-xl text-foreground/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light px-4"
          >
            Building clean, performant web applications and mobile experiences that solve real problems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={0.4}
            className="flex flex-col sm:flex-row gap-4 justify-center px-6 sm:px-0"
          >
            <MagneticButton
              href="/projects"
              className="group px-8 py-4 rounded-2xl bg-accent-primary text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-accent-primary/90 transition-colors hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]"
            >
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton
              onClick={() => window.open("/resume.pdf", "_blank")}
              className="px-8 py-4 rounded-2xl glass border border-white/10 font-bold text-sm uppercase tracking-wider hover:border-accent-primary/30 hover:bg-white/[0.04] transition-all flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Resume
            </MagneticButton>
            <MagneticButton
              href="/contact"
              className="px-8 py-4 rounded-2xl glass border border-white/10 font-bold text-sm uppercase tracking-wider hover:border-accent-primary/30 hover:bg-white/[0.04] transition-all flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              Contact Me
            </MagneticButton>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={0.6}
            className="mt-12"
          >
            <div className="glass rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-black text-foreground/60">Tech Stack</span>
              </div>
              <div className="marquee-track py-3">
                {[...TRUSTED_STACK, ...TRUSTED_STACK].map((item, index) => (
                  <span key={`${item}-${index}`} className="mx-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] uppercase tracking-[0.16em] font-bold text-foreground/70">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hover:opacity-100 transition-opacity cursor-default"
        >
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold">Scroll</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-accent-primary via-accent-primary/50 to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* Quick About Teaser */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="relative">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-primary mb-4 block">About Me</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
                Building products that <span className="gradient-text">work</span>
              </h2>
              <p className="text-foreground/50 leading-relaxed text-base md:text-lg mb-8">
                {portfolioData.bio.full}
              </p>
              <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  "Clean Code",
                  "User-Focused Design",
                  "Modern Tech Stack",
                ].map((pill, index) => (
                  <motion.div
                    key={pill}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs uppercase tracking-[0.16em] font-bold text-foreground/70"
                  >
                    {pill}
                  </motion.div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-accent-primary font-bold text-sm uppercase tracking-wider hover:gap-4 transition-all"
              >
                Read More <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
