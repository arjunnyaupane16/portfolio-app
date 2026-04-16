"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { portfolioData } from "@/constants/data";
import { staggerContainer, clipReveal } from "@/components/motion/variants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import PageTransition from "@/components/ui/PageTransition";

function TiltProjectCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

    const handleMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

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

export default function ProjectsPage() {
    const projects = portfolioData.projects;

    return (
        <PageTransition>
            <div className="relative pt-32 pb-24 px-6 overflow-hidden">
                <motion.div
                    aria-hidden="true"
                    animate={{ opacity: [0.08, 0.2, 0.08], scale: [1, 1.06, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="pointer-events-none absolute -top-40 -left-32 h-[30rem] w-[30rem] rounded-full bg-accent-primary/20 blur-[140px]"
                />
                <motion.div
                    aria-hidden="true"
                    animate={{ opacity: [0.08, 0.18, 0.08], scale: [1.05, 1, 1.05] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="pointer-events-none absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent-secondary/20 blur-[140px]"
                />

                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="THE"
                        accent="ARTIFACTS"
                        subtitle="Engineered deployments optimized for high-performance and scalability."
                        index="03"
                    />

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                variants={clipReveal}
                                custom={index * 0.1}
                                whileHover={{ y: -6 }}
                                className="group flex flex-col"
                            >
                                <TiltProjectCard>
                                    <div className="relative aspect-[16/11] overflow-hidden rounded-[2.5rem] glass border border-white/5 mb-6 group-hover:border-accent-primary/30 transition-colors">
                                        <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover saturate-[0.8] brightness-[0.72] group-hover:brightness-100 group-hover:saturate-100 transition-all duration-700"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                                        <motion.div
                                            animate={{ x: ["-120%", "120%"] }}
                                            transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: index * 0.35 }}
                                            className="pointer-events-none absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl"
                                        />

                                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:bg-none">
                                            <div className="flex gap-3">
                                                <motion.a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.05 }}
                                                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white text-black font-bold hover:bg-neutral-200 transition-colors"
                                                >
                                                    <Github size={16} />
                                                    <span className="text-[9px] uppercase tracking-widest font-black">Source</span>
                                                </motion.a>
                                                <motion.a
                                                    href={project.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.05 }}
                                                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-accent-primary text-white font-bold hover:bg-accent-primary/90 transition-colors"
                                                >
                                                    <ExternalLink size={16} />
                                                    <span className="text-[9px] uppercase tracking-widest font-black">Deploy</span>
                                                </motion.a>
                                            </div>
                                        </div>

                                        <div className="absolute top-5 right-5 z-10 glass px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-black tracking-[0.15em] opacity-50">
                                            0{index + 1}
                                        </div>
                                    </div>
                                </TiltProjectCard>

                                <div className="px-2">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tighter group-hover:text-accent-primary transition-colors flex items-center gap-3">
                                        {project.title}
                                        <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-accent-primary" size={20} />
                                    </h3>
                                    <p className="text-foreground/50 mb-6 leading-relaxed text-sm max-w-xl font-light italic">
                                        &quot;{project.description}&quot;
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t) => (
                                            <motion.span
                                                key={t}
                                                whileHover={{ scale: 1.07, y: -2 }}
                                                className="text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-foreground/30 group-hover:border-accent-primary/30 group-hover:text-accent-primary transition-all cursor-default"
                                            >
                                                {t}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
}
