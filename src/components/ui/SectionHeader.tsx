/**
 * @file components/ui/SectionHeader.tsx
 * @description Premium section header with animated underline and letter reveal.
 */

import { motion } from "framer-motion";
import { fadeInUp, drawLine } from "../motion/variants";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    accent?: string;
    index?: string;
    className?: string;
}

export const SectionHeader = ({ title, subtitle, accent, index, className = "" }: SectionHeaderProps) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className={`mb-16 md:mb-24 ${className}`}
    >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-2xl">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 leading-none uppercase">
                    {title}{" "}
                    <span className="gradient-text italic font-extralight">{accent}</span>
                </h2>
                {subtitle && (
                    <p className="text-foreground/40 text-sm md:text-base leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>
            {index && (
                <div className="hidden md:block">
                    <span className="text-sm font-black opacity-10 uppercase tracking-[0.5em]">Node — {index}</span>
                </div>
            )}
        </div>

        {/* Animated underline */}
        <motion.div
            variants={drawLine}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
            className="mt-8 w-full h-px bg-gradient-to-r from-accent-primary/30 via-accent-secondary/20 to-transparent"
        />
    </motion.div>
);
