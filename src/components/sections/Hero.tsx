"use client";

/**
 * @file components/sections/Hero.tsx
 * @description Immersive aterrizaje section with high-impact visual depth.
 */

import { motion } from "framer-motion";
import { PortfolioData } from "@/types/portfolio";
import Image from "next/image";
import { fadeIn, fadeInUp, scaleIn } from "../motion/variants";

export default function Hero({ data }: { data: Pick<PortfolioData, "title" | "name" | "bio"> }) {
    return (
        <section id="vision" className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
            {/* Visual Ambience Engines */}
            <div className="absolute top-1/4 -left-20 w-72 md:w-96 h-72 md:h-96 bg-accent-primary/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-72 md:w-96 h-72 md:h-96 bg-accent-secondary/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />

            {/* Hero Visual Artifact */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="absolute inset-0 z-0 opacity-20 md:opacity-40 pointer-events-none"
            >
                <div className="relative w-full h-full">
                    <Image
                        src="/profile.jpg"
                        alt={`Chandraprakash Nyaupane (Arjun) - ${data.title}`}
                        fill
                        priority
                        quality={100}
                        className="object-cover object-[center_20%] md:object-[center_15%] grayscale saturate-[0.7] brightness-[0.4] md:brightness-[0.8]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
                </div>
            </motion.div>

            <div className="z-10 text-center max-w-5xl">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={scaleIn}
                    custom={0.2}
                    className="inline-block px-4 py-1.5 mb-8 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase border border-white/10 rounded-full glass text-accent-primary"
                >
                    {data.title}
                </motion.div>

                <div className="flex flex-col items-center">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="sr-only"
                    >
                        {data.name} - {data.title}
                    </motion.h1>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-7xl sm:text-8xl md:text-[12vw] lg:text-[10vw] font-bold tracking-tighter mb-4 md:mb-8 leading-[0.85] select-none"
                        aria-hidden="true"
                    >
                        <span className="block italic font-extralight opacity-30 uppercase">THE</span>
                        <span className="block text-glow uppercase">Vision</span>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-end text-left mt-10 md:mt-16">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={0.4}>
                        <p className="text-lg md:text-2xl text-foreground/70 leading-relaxed font-light font-body">
                            {data.bio.short}
                        </p>
                    </motion.div>

                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} custom={0.6} className="flex flex-col gap-6 w-full">
                        <div className="h-px w-full bg-white/10" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1">Status</span>
                                <span className="text-xs md:text-sm font-medium text-green-400/80">Active Deployment</span>
                            </div>
                            <div className="flex flex-col text-right md:text-left">
                                <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1">Based In</span>
                                <span className="text-xs md:text-sm font-medium italic">Roorkee, India</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Interaction Cue */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                custom={1.2}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity"
            >
                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold">Initiate Scroll</span>
                <div className="w-px h-16 bg-gradient-to-b from-accent-primary via-accent-primary/50 to-transparent" />
            </motion.div>
        </section>
    );
}
