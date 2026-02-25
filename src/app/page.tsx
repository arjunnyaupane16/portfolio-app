"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { portfolioData } from "@/constants/data";
import { fadeIn, fadeInUp, scaleIn, blurIn, staggerContainer } from "@/components/motion/variants";

const STATS = [
  { label: "Projects Built", value: `${portfolioData.projects.length}+` },
  { label: "Tech Stack", value: `${portfolioData.skills.reduce((a, c) => a + c.items.length, 0)}+` },
  { label: "Status", value: "Active", accent: true },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ═══ Hero Section ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
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
        <div className="z-10 text-center max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            className="inline-flex items-center gap-2 px-5 py-2 mb-10 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase border border-accent-primary/20 rounded-full glass-colored text-accent-primary"
          >
            <Sparkles size={14} className="animate-pulse" />
            {portfolioData.title}
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="sr-only"
          >
            {portfolioData.name} - {portfolioData.title}
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={blurIn}
            className="mb-8"
          >
            <div className="text-4xl sm:text-5xl md:text-[6vw] lg:text-[5vw] font-bold tracking-tighter leading-[0.9] select-none" aria-hidden="true">
              <span className="block text-foreground/20 italic font-extralight text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.3em] mb-4">Hello, I&apos;m</span>
              <span className="block gradient-text">{portfolioData.name}</span>
              <span className="block text-foreground/40 text-xl sm:text-2xl md:text-3xl font-light mt-2 tracking-normal">({portfolioData.nickname})</span>
            </div>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={0.3}
            className="text-lg md:text-xl text-foreground/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          >
            {portfolioData.bio.short}
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={0.5}
            className="w-full max-w-xl mx-auto mt-12"
          >
            <div className="glass rounded-2xl px-6 py-4 grid grid-cols-3 gap-4 border border-white/5">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-xl md:text-2xl font-bold ${stat.accent ? "text-green-400" : "gradient-text"}`}>
                    {stat.value}
                  </div>
                  <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={0.7}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <Link
              href="/projects"
              className="group px-8 py-4 rounded-2xl bg-accent-primary text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-accent-primary/90 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]"
            >
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-2xl glass border border-white/10 font-bold text-sm uppercase tracking-wider hover:border-accent-primary/30 hover:bg-white/[0.04] transition-all hover:scale-105"
            >
              About Me
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ Quick About Teaser ═══ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-primary mb-4 block">About Me</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
                Crafting code that <span className="gradient-text">matters</span>
              </h2>
              <p className="text-foreground/50 leading-relaxed text-base md:text-lg mb-8">
                {portfolioData.bio.full}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-accent-primary font-bold text-sm uppercase tracking-wider hover:gap-4 transition-all"
              >
                Read More <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
              {portfolioData.skills.map((category) => (
                <div key={category.category} className="glass rounded-2xl p-6 border border-white/5 hover:border-accent-primary/20 transition-all group">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/30 group-hover:text-accent-primary transition-colors">{category.category}</span>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {category.items.map((item) => (
                      <span key={item.name} className="text-sm font-medium text-foreground/60">{item.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
