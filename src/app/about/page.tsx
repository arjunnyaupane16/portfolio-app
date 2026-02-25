"use client";

import { motion } from "framer-motion";
import { BookOpen, GraduationCap, MapPin, Calendar, Code2, Brain } from "lucide-react";
import Image from "next/image";
import { portfolioData } from "@/constants/data";
import { fadeInUp, fadeInRight, staggerContainer, blurIn, drawLine } from "@/components/motion/variants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import PageTransition from "@/components/ui/PageTransition";

function calculateAge(birthday: string) {
    const birth = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
}

const highlights = [
    { icon: <Calendar size={20} />, label: "Age", value: `${calculateAge(portfolioData.age)} years` },
    { icon: <MapPin size={20} />, label: "Based In", value: "Roorkee, India" },
    { icon: <Code2 size={20} />, label: "Focus", value: "TypeScript" },
    { icon: <Brain size={20} />, label: "Exploring", value: "AI / ML" },
];

export default function AboutPage() {
    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="ABOUT"
                        accent="ME"
                        subtitle="The story behind the code."
                        index="01"
                    />

                    {/* ═══ Hero Split ═══ */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center mb-32"
                    >
                        {/* Photo */}
                        <motion.div variants={blurIn} className="relative">
                            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden glass border border-white/5 animate-pulse-glow">
                                <Image
                                    src="/profile.png"
                                    alt={portfolioData.name}
                                    fill
                                    className="object-cover object-[center_15%] saturate-[0.9]"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                            </div>
                            {/* Floating tag */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                viewport={{ once: true }}
                                className="absolute -bottom-4 -right-4 md:right-8 glass-colored px-6 py-3 rounded-2xl border border-accent-primary/20"
                            >
                                <span className="text-sm font-bold text-accent-primary">Available for work 🚀</span>
                            </motion.div>
                        </motion.div>

                        {/* Bio */}
                        <motion.div variants={fadeInRight} className="space-y-8">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">
                                    {portfolioData.name}
                                </h2>
                                <p className="text-lg text-accent-primary font-medium italic">
                                    aka &quot;{portfolioData.nickname}&quot;
                                </p>
                            </div>

                            <p className="text-foreground/60 leading-relaxed text-base md:text-lg">
                                {portfolioData.bio.full}
                            </p>

                            {/* Highlight Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {highlights.map((h) => (
                                    <div key={h.label} className="glass rounded-2xl p-4 border border-white/5 hover:border-accent-primary/20 transition-all group">
                                        <div className="text-accent-primary/60 group-hover:text-accent-primary transition-colors mb-2">
                                            {h.icon}
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/30 block">{h.label}</span>
                                        <span className="text-sm font-bold mt-1 block">{h.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ═══ Education Timeline ═══ */}
                    <div className="mb-16">
                        <motion.h3
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-4xl md:text-6xl font-bold tracking-tighter mb-4"
                        >
                            THE <span className="text-accent-secondary italic font-extralight">JOURNEY</span>
                        </motion.h3>
                        <motion.div
                            variants={drawLine}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="w-24 h-0.5 bg-accent-secondary mb-16"
                        />
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Timeline Line */}
                        <div className="absolute left-[18px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-accent-secondary/50 via-white/10 to-transparent" />

                        <div className="flex flex-col gap-16">
                            {portfolioData.education.map((edu, index) => (
                                <motion.div
                                    key={edu.institution}
                                    variants={fadeInUp}
                                    className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Node */}
                                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 w-9 h-9 flex items-center justify-center rounded-full glass border border-accent-secondary/30 z-10 shadow-[0_0_20px_rgba(244,63,94,0.2)] group-hover:scale-125 transition-transform">
                                        {index === 0 ? (
                                            <GraduationCap size={16} className="text-accent-secondary" />
                                        ) : (
                                            <BookOpen size={16} className="text-accent-secondary" />
                                        )}
                                    </div>

                                    {/* Card */}
                                    <div className={`ml-14 md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
                                        <div className="glass rounded-[2rem] p-8 border border-white/5 hover:border-accent-secondary/20 transition-all group">
                                            <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-accent-secondary mb-3 opacity-70 group-hover:opacity-100">
                                                {edu.date}
                                            </span>
                                            <h4 className="text-xl md:text-2xl font-bold mb-2 tracking-tight group-hover:text-accent-secondary transition-colors">
                                                {edu.institution}
                                            </h4>
                                            <p className="text-foreground/60 italic mb-3">{edu.degree}</p>
                                            {edu.highlight && (
                                                <div className="inline-block text-xs text-foreground/40 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                                    {edu.highlight}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Spacer for the other side */}
                                    <div className="hidden md:block md:w-[calc(50%-40px)]" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
}
