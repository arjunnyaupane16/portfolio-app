"use client";

/**
 * @file components/ui/SectionHeader.tsx
 * @description Premium section header with staggered letter reveal and shimmer underline.
 */

import { motion } from "framer-motion";
import { staggerLetters, letterSlide, drawLine } from "../motion/variants";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    accent?: string;
    index?: string;
    className?: string;
}

function AnimatedText({ text, className }: { text: string; className?: string }) {
    return (
        <motion.span
            variants={staggerLetters}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`inline-flex overflow-hidden ${className}`}
            style={{ perspective: "800px" }}
        >
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    variants={letterSlide}
                    className="inline-block"
                    style={{ transformOrigin: "bottom" }}
                >
                    {char === " " ? "\u00a0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
}

export const SectionHeader = ({ title, subtitle, accent, index, className = "" }: SectionHeaderProps) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`mb-16 md:mb-24 ${className}`}
    >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-2xl">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 leading-none uppercase">
                    <AnimatedText text={title + " "} />
                    {accent && (
                        <AnimatedText
                            text={accent}
                            className="gradient-text italic font-extralight"
                        />
                    )}
                </h2>
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="text-foreground/40 text-sm md:text-base leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
            {index && (
                <div className="hidden md:block">
                    <span className="text-sm font-black opacity-10 uppercase tracking-[0.5em]">Node — {index}</span>
                </div>
            )}
        </div>

        {/* Shimmer underline */}
        <motion.div
            variants={drawLine}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
            className="mt-8 w-full h-px shimmer-border rounded-full"
            style={{
                background: "linear-gradient(90deg, rgba(99,102,241,0.4), rgba(244,63,94,0.2), transparent)",
            }}
        />
    </motion.div>
);
