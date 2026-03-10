"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BookOpen, GraduationCap, MapPin, Calendar, Code2, Brain } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { portfolioData } from "@/constants/data";
import { fadeInUp, fadeInRight, staggerContainer, blurIn, drawLine, springPop } from "@/components/motion/variants";
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
    { icon: <Code2 size={20} />, label: "Focus", value: "Web × AI" },
    { icon: <Brain size={20} />, label: "Exploring", value: "Intelligent Agents" },
];

// 3D tilt card
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

    const handleMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`perspective-card ${className}`}
        >
            {children}
        </motion.div>
    );
}

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
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                                viewport={{ once: true }}
                                className="absolute -bottom-4 -right-4 md:right-8 glass-colored px-6 py-3 rounded-2xl border border-accent-primary/20 shimmer-border"
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

                            {/* Highlight Grid with tilt */}
                            <div className="grid grid-cols-2 gap-4">
                                {highlights.map((h, i) => (
                                    <motion.div
                                        key={h.label}
                                        variants={springPop}
                                        custom={i * 0.1}
                                    >
                                        <TiltCard className="glass rounded-2xl p-4 border border-white/5 hover:border-accent-primary/20 transition-colors group cursor-default h-full">
                                            <div className="text-accent-primary/60 group-hover:text-accent-primary transition-colors mb-2">
                                                {h.icon}
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/30 block">{h.label}</span>
                                            <span className="text-sm font-bold mt-1 block">{h.value}</span>
                                        </TiltCard>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ═══ Skills Section ═══ */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="mb-32"
                    >
                        <motion.h3
                            variants={fadeInUp}
                            className="text-4xl md:text-6xl font-bold tracking-tighter mb-4"
                        >
                            THE <span className="text-accent-primary italic font-extralight">STACK</span>
                        </motion.h3>
                        <motion.div
                            variants={drawLine}
                            custom={0.2}
                            className="w-24 h-0.5 bg-accent-primary mb-16"
                        />
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {portfolioData.skills.map((category, ci) => (
                                <motion.div
                                    key={category.category}
                                    variants={fadeInUp}
                                    custom={ci * 0.1}
                                    whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(99,102,241,0.12)" }}
                                    className="glass rounded-2xl p-6 border border-white/5 hover:border-accent-primary/20 transition-colors group"
                                >
                                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-accent-primary/60 group-hover:text-accent-primary transition-colors block mb-4">
                                        {category.category}
                                    </span>
                                    <div className="flex flex-col gap-4">
                                        {category.items.map((item, ii) => (
                                            <div key={item.name}>
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <span className="text-sm font-medium text-foreground/70">{item.name}</span>
                                                    <span className="text-[10px] text-foreground/30 font-bold">{item.level}%</span>
                                                </div>
                                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${item.level}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1.2, delay: ci * 0.1 + ii * 0.08, ease: "easeOut" }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
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
                                    className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                                >
                                    {/* Node with pulse ring */}
                                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 z-10">
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ type: "spring", stiffness: 400, damping: 20, delay: index * 0.2 }}
                                            className="w-9 h-9 flex items-center justify-center rounded-full glass border border-accent-secondary/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                                        >
                                            {index === 0 ? (
                                                <GraduationCap size={16} className="text-accent-secondary" />
                                            ) : (
                                                <BookOpen size={16} className="text-accent-secondary" />
                                            )}
                                        </motion.div>
                                        {/* Pulse ring */}
                                        <motion.div
                                            className="absolute inset-0 rounded-full border border-accent-secondary/30"
                                            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                        />
                                    </div>

                                    {/* Card */}
                                    <div className={`ml-14 md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
                                        <motion.div
                                            whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(244,63,94,0.1)" }}
                                            className="glass rounded-[2rem] p-8 border border-white/5 hover:border-accent-secondary/20 transition-colors group"
                                        >
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
                                        </motion.div>
                                    </div>

                                    {/* Spacer */}
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
