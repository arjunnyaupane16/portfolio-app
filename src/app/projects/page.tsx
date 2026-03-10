"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { portfolioData } from "@/constants/data";
import { fadeInUp, staggerContainer, clipReveal } from "@/components/motion/variants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import PageTransition from "@/components/ui/PageTransition";

// Spotlight cursor-follow effect on the featured card
function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <div ref={ref} onMouseMove={handleMove} className={`relative ${className}`} style={{ overflow: "hidden" }}>
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([mx, my]) =>
                            `radial-gradient(400px circle at ${mx}px ${my}px, rgba(99,102,241,0.12), transparent 70%)`
                    ),
                }}
            />
            {children}
        </div>
    );
}

// 3D tilt on project grid cards
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

export default function ProjectsPage() {
    const projects = portfolioData.projects;

    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="THE"
                        accent="ARTIFACTS"
                        subtitle="Engineered deployments optimized for high-performance and scalability."
                        index="03"
                    />

                    {/* Featured Project */}
                    {projects.length > 0 && (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="mb-24"
                        >
                            <SpotlightCard className="group rounded-[3rem] glass border border-white/5 hover:border-accent-primary/20 transition-colors">
                                <div className="grid lg:grid-cols-2">
                                    {/* Image */}
                                    <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden rounded-t-[3rem] lg:rounded-l-[3rem] lg:rounded-tr-none">
                                        <Image
                                            src={projects[0].image}
                                            alt={projects[0].title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 hidden lg:block" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent lg:hidden" />
                                    </div>

                                    {/* Info */}
                                    <div className="relative p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                                        <motion.span
                                            variants={clipReveal}
                                            className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-primary mb-4 block"
                                        >
                                            Featured Project
                                        </motion.span>
                                        <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 group-hover:text-accent-primary transition-colors">
                                            {projects[0].title}
                                        </h3>
                                        <p className="text-foreground/50 mb-8 leading-relaxed text-base md:text-lg font-light">
                                            {projects[0].description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {projects[0].tech.map((t) => (
                                                <motion.span
                                                    key={t}
                                                    whileHover={{ scale: 1.07, y: -2 }}
                                                    className="text-[10px] font-black uppercase tracking-[0.15em] px-4 py-2 rounded-xl bg-accent-primary/10 border border-accent-primary/20 text-accent-primary cursor-default"
                                                >
                                                    {t}
                                                </motion.span>
                                            ))}
                                        </div>
                                        <div className="flex gap-4">
                                            <motion.a
                                                href={projects[0].github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.04, y: -2 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-colors"
                                            >
                                                <Github size={16} /> Source
                                            </motion.a>
                                            <motion.a
                                                href={projects[0].demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.04, y: -2 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-white font-bold text-sm hover:bg-accent-primary/90 transition-colors"
                                            >
                                                <ExternalLink size={16} /> Live Demo
                                            </motion.a>
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    )}

                    {/* Project Grid */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                    >
                        {projects.slice(1).map((project, index) => (
                            <motion.div
                                key={project.id}
                                variants={clipReveal}
                                custom={index * 0.1}
                                className="group flex flex-col"
                            >
                                <TiltProjectCard>
                                    {/* Image */}
                                    <div className="relative aspect-[16/11] overflow-hidden rounded-[2.5rem] glass border border-white/5 mb-6">
                                        <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover saturate-[0.8] brightness-[0.7] group-hover:brightness-100 group-hover:saturate-100 transition-all duration-700"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                                        {/* Hover Overlay */}
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
                                            0{index + 2}
                                        </div>
                                    </div>
                                </TiltProjectCard>

                                {/* Info */}
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
