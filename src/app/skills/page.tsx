"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/constants/data";
import { fadeInUp, scaleIn, staggerContainer, drawLine } from "@/components/motion/variants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import PageTransition from "@/components/ui/PageTransition";

interface SkillRingProps {
    name: string;
    level: number;
    index: number;
}

const SkillRing = ({ name, level, index }: SkillRingProps) => {
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (level / 100) * circumference;

    return (
        <motion.div
            variants={scaleIn}
            custom={index * 0.1}
            whileHover={{ y: -8, scale: 1.05 }}
            className="glass rounded-[2rem] p-8 border border-white/5 hover:border-accent-primary/30 transition-all group flex flex-col items-center text-center relative overflow-hidden"
        >
            {/* Background glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ background: "radial-gradient(circle at center, var(--color-accent-primary) 0%, transparent 70%)" }}
            />

            {/* Ring */}
            <div className="relative w-32 h-32 mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                    <motion.circle
                        cx="60" cy="60" r={radius}
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset }}
                        transition={{ duration: 1.5, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--color-accent-primary)" />
                            <stop offset="100%" stopColor="var(--color-accent-secondary)" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold gradient-text">{level}%</span>
                </div>
            </div>

            <h3 className="text-lg font-bold tracking-tight group-hover:text-accent-primary transition-colors">
                {name}
            </h3>
        </motion.div>
    );
};

export default function SkillsPage() {
    const allSkills = portfolioData.skills;

    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="THE"
                        accent="CRAFT"
                        subtitle="Technical expertise across multiple domains."
                        index="02"
                    />

                    {/* Categories */}
                    <div className="space-y-24">
                        {allSkills.map((category, catIndex) => (
                            <div key={category.category}>
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                    className="mb-8"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-primary/60">
                                            0{catIndex + 1}
                                        </span>
                                        <h3 className="text-2xl md:text-4xl font-bold tracking-tighter">
                                            {category.category}
                                        </h3>
                                    </div>
                                    <motion.div
                                        variants={drawLine}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="w-16 h-0.5 bg-accent-primary/40"
                                    />
                                </motion.div>

                                <motion.div
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                                >
                                    {category.items.map((skill, index) => (
                                        <SkillRing
                                            key={skill.name}
                                            name={skill.name}
                                            level={skill.level}
                                            index={index}
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Bar */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        custom={0.3}
                        className="mt-24 glass rounded-[2rem] p-8 md:p-12 border border-white/5 text-center"
                    >
                        <p className="text-foreground/40 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                            Continuously expanding my technical horizons — currently deep-diving into{" "}
                            <span className="text-accent-primary font-medium">AI/ML</span> while building with{" "}
                            <span className="text-accent-primary font-medium">TypeScript</span> across the full stack.
                        </p>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
}
