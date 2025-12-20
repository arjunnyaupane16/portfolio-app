"use client";

/**
 * @file components/sections/Journey.tsx
 * @description Narrative timeline illustrating growth and academic foundations.
 */

import { motion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";
import { Education, BioData } from "@/types/portfolio";
import { SectionHeader } from "../ui/SectionHeader";
import { fadeInUp, staggerContainer } from "../motion/variants";

interface EducationNodeProps {
    edu: Education;
    index: number;
}

const EducationNode = ({ edu, index }: EducationNodeProps) => (
    <motion.div variants={fadeInUp} className="group relative pl-12 pb-2 last:pb-0">
        {/* Connection Port */}
        <div className="absolute left-[-4px] top-1 w-9 h-9 flex items-center justify-center rounded-full glass border border-accent-secondary/30 group-hover:scale-125 group-hover:bg-accent-secondary/20 transition-all duration-500 z-10 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
            {index === 0 ? (
                <GraduationCap size={16} className="text-accent-secondary" />
            ) : (
                <BookOpen size={16} className="text-accent-secondary" />
            )}
        </div>

        <div className="glass rounded-[2rem] p-8 md:p-10 hover:bg-white/[0.04] transition-all duration-500 border border-white/5 hover:border-accent-secondary/20">
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-accent-secondary mb-4 opacity-70 group-hover:opacity-100">
                {edu.date}
            </span>

            <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight group-hover:text-accent-secondary transition-colors ">
                {edu.institution}
            </h3>
            <p className="text-base md:text-xl text-foreground/70 mb-6 font-light italic">{edu.degree}</p>

            {edu.highlight && (
                <div className="inline-flex flex-wrap gap-2 text-xs md:text-sm text-foreground/40 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                    {edu.highlight}
                </div>
            )}
        </div>
    </motion.div>
);

export default function Journey({ bio, education }: { bio: BioData; education: Education[] }) {
    return (
        <section id="journey" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
                {/* Descriptive Column */}
                <div className="lg:w-1/3">
                    <SectionHeader title="THE" accent="JOURNEY" className="mb-8" />
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-foreground/50 leading-relaxed text-base md:text-lg lg:max-w-md"
                    >
                        {bio.full}
                    </motion.p>
                </div>

                {/* Timeline Column */}
                <div className="lg:w-2/3 flex flex-col gap-10 md:gap-16 relative">
                    <div className="absolute left-[18px] top-4 bottom-4 w-px bg-gradient-to-b from-accent-secondary/50 via-white/5 to-transparent" />

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {education.map((edu, index) => (
                            <EducationNode key={edu.institution} edu={edu} index={index} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
