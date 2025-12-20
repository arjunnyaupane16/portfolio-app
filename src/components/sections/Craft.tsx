"use client";

/**
 * @file components/sections/Craft.tsx
 * @description Skill expertise matrix with dynamic bento grid architecture.
 */

import { motion } from "framer-motion";
import { SkillCategory } from "@/types/portfolio";
import { SectionHeader } from "../ui/SectionHeader";
import { scaleIn, staggerContainer } from "../motion/variants";

const BENTO_LAYOUTS = [
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-2",
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
];

interface SkillCardProps {
    name: string;
    level: number;
    category: string;
    index: number;
}

const SkillCard = ({ name, level, category, index }: SkillCardProps) => (
    <motion.div
        variants={scaleIn}
        whileHover={{ y: -8, scale: 1.02 }}
        className={`glass rounded-[2rem] p-6 md:p-8 flex flex-col justify-between group overflow-hidden relative border border-white/5 hover:border-accent-primary/30 transition-all duration-500 min-h-[160px] md:min-h-0 ${BENTO_LAYOUTS[index % BENTO_LAYOUTS.length]
            }`}
    >
        {/* Concentric Glow Engine */}
        <div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
            style={{ background: `radial-gradient(circle at center, var(--color-accent-primary) 0%, transparent 75%)` }}
        />

        <div className="flex justify-between items-start z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 group-hover:opacity-80 group-hover:text-accent-primary transition-all">
                {category.split(" ")[0]}
            </span>
            <div className="flex items-center gap-1">
                <span className="text-xl md:text-2xl font-bold opacity-40 group-hover:opacity-100 transition-opacity text-accent-primary font-heading">
                    {level}
                </span>
                <span className="text-[10px] opacity-20">%</span>
            </div>
        </div>

        <div className="z-10 mt-auto">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-accent-primary transition-colors">
                {name}
            </h3>
            <div className="w-full h-px bg-white/5 mt-4 relative md:hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute left-0 top-0 h-full bg-accent-primary"
                />
            </div>
        </div>
    </motion.div>
);

export default function Craft({ skills }: { skills: SkillCategory[] }) {
    const flattenedSkills = skills.flatMap((cat) => cat.items.map((item) => ({ ...item, category: cat.category })));

    return (
        <section id="craft" className="py-24 md:py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    title="THE"
                    accent="CRAFT"
                    subtitle="Specialized technical implementation across multi-platform high-performance ecosystems."
                    index="02"
                />

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:auto-rows-[140px]"
                >
                    {flattenedSkills.map((skill, index) => (
                        <SkillCard key={skill.name} {...skill} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
