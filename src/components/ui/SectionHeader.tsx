/**
 * @file components/ui/SectionHeader.tsx
 * @description Atomic component for section branding.
 */

import { motion } from "framer-motion";
import { fadeInUp } from "../motion/variants";

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
        className={`mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 ${className}`}
    >
        <div className="max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-4 leading-none uppercase">
                {title} <span className="text-accent-primary italic font-extralight">{accent}</span>
            </h2>
            {subtitle && <p className="text-foreground/40 text-sm md:text-base leading-relaxed">{subtitle}</p>}
        </div>
        {index && (
            <div className="hidden md:block">
                <span className="text-sm font-black opacity-10 uppercase tracking-[0.5em]">Node — {index}</span>
            </div>
        )}
    </motion.div>
);
