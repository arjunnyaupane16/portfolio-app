"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { portfolioData } from "@/constants/data";
import { fadeIn, fadeInUp, scaleIn, blurIn, staggerContainer, springPop } from "@/components/motion/variants";
import WordCycle from "@/components/ui/WordCycle";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ParticleField from "@/components/ui/ParticleField";
import ScrollProgress from "@/components/ui/ScrollProgress";

const CYCLE_WORDS = ["Web Experiences", "AI Systems", "Real-World Solutions", "Intelligent Products"];

const STATS = [
  { label: "Projects Built", value: portfolioData.projects.length, suffix: "+" },
  { label: "Tech Stack", value: portfolioData.skills.reduce((a, c) => a + c.items.length, 0), suffix: "+" },
  { label: "Status", value: null, accent: true },
];

// Magnetic button wrapper
function MagneticButton({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <ScrollProgress />

      {/* ═══ Hero Section ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Particle field */}
        <ParticleField />

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
          {/* Badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={springPop}
            custom={0}
            className="inline-flex items-center gap-2 px-5 py-2 mb-10 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase border border-accent-primary/20 rounded-full glass-colored text-accent-primary shimmer-border"
          >
            <Sparkles size={14} className="animate-pulse" />
            Web Dev × AI Builder
          </motion.div>

          {/* Name */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={blurIn}
            className="mb-6"
          >
            <div className="text-4xl sm:text-5xl md:text-[6vw] lg:text-[5vw] font-bold tracking-tighter leading-[0.9] select-none" aria-hidden="true">
              <span className="block text-foreground/20 italic font-extralight text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.3em] mb-4">Hello, I&apos;m</span>
              <span className="block gradient-text">{portfolioData.name}</span>
              <span className="block text-foreground/40 text-xl sm:text-2xl md:text-3xl font-light mt-2 tracking-normal">({portfolioData.nickname})</span>
            </div>
          </motion.h1>

          {/* Word Cycle Tagline */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={0.2}
            className="text-lg md:text-xl text-foreground/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          >
            Creating impactful{" "}
            <WordCycle words={CYCLE_WORDS} />
            {" "}at the intersection of technology and intelligence.
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={0.4}
            className="w-full max-w-xl mx-auto mb-10"
          >
            <div className="glass rounded-2xl px-6 py-4 grid grid-cols-3 gap-4 border border-white/5 neon-glow">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-xl md:text-2xl font-bold ${stat.accent ? "text-green-400" : "gradient-text"}`}>
                    {stat.accent ? "Active" : (
                      <AnimatedCounter
                        value={stat.value!}
                        suffix={stat.suffix}
                        duration={1400 + i * 200}
                      />
                    )}
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
            custom={0.6}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton
              href="/projects"
              className="group px-8 py-4 rounded-2xl bg-accent-primary text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-accent-primary/90 transition-colors hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]"
            >
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton
              href="/about"
              className="px-8 py-4 rounded-2xl glass border border-white/10 font-bold text-sm uppercase tracking-wider hover:border-accent-primary/30 hover:bg-white/[0.04] transition-all"
            >
              About Me
            </MagneticButton>
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
                Building tech that <span className="gradient-text">matters</span>
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

            {/* Skill category cards with hover animation */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
              {portfolioData.skills.map((category, i) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(99,102,241,0.12)" }}
                  className="glass rounded-2xl p-6 border border-white/5 hover:border-accent-primary/20 transition-colors group cursor-default"
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/30 group-hover:text-accent-primary transition-colors">{category.category}</span>
                  <div className="mt-3 flex flex-col gap-2">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-foreground/60">{item.name}</span>
                        <div className="flex-1 max-w-[60px] h-0.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1 + 0.3, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
