"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Project } from "@/types/portfolio";
import { SectionHeader } from "../ui/SectionHeader";
import { fadeInUp, staggerContainer } from "../motion/variants";

interface ProjectCardProps {
    project: Project;
    index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 260, damping: 22 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 260, damping: 22 });
    const glow = useTransform([x, y], ([mx, my]: number[]) => {
        const gx = (mx + 0.5) * 100;
        const gy = (my + 0.5) * 100;
        return `radial-gradient(circle at ${gx}% ${gy}%, rgba(99,102,241,0.22), transparent 50%)`;
    });

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
        <motion.div variants={fadeInUp} custom={index * 0.08} className="group flex flex-col">
            <motion.div
                ref={ref}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative aspect-[16/11] overflow-hidden rounded-[2.5rem] glass border border-white/5 mb-8 shadow-2xl transition-transform duration-500 hover:-translate-y-2 hover:border-accent-primary/30"
            >
                <motion.div className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: glow }} />

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

                <motion.div
                    animate={{ x: ["-120%", "120%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: index * 0.4 }}
                    className="pointer-events-none absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl"
                />

                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:bg-none">
                    <div className="flex gap-3 md:gap-4">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-3 md:py-4 rounded-2xl bg-white text-black font-bold hover:bg-neutral-200 transition-colors"
                        >
                            <Github size={18} />
                            <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-black">Source</span>
                        </a>
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-3 md:py-4 rounded-2xl bg-accent-primary text-white font-bold hover:bg-accent-primary/90 transition-colors"
                        >
                            <ExternalLink size={18} />
                            <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-black">Deploy</span>
                        </a>
                    </div>
                </div>

                <div className="absolute top-6 right-6 z-10 glass px-4 py-2 rounded-full border border-white/10 text-[10px] font-black tracking-[0.2em] opacity-60">
                    ID - 0{index + 1}
                </div>
                <div className="absolute top-6 left-6 z-10 flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-emerald-300/20">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black tracking-[0.15em] text-emerald-300/80 uppercase">Live</span>
                </div>
            </motion.div>

            <div className="px-2">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter group-hover:text-accent-primary transition-colors flex items-center gap-4">
                    {project.title}
                    <ArrowRight
                        className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-accent-primary"
                        size={24}
                    />
                </h3>
                <p className="text-foreground/50 mb-8 leading-relaxed text-sm md:text-lg max-w-xl font-light italic">
                    &quot;{project.description}&quot;
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                        <motion.span
                            key={tech}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: techIndex * 0.05 }}
                            className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-foreground/30 group-hover:border-accent-primary/30 group-hover:text-accent-primary transition-all"
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function Artifacts({ projects }: { projects: Project[] }) {
    return (
        <section id="artifacts" className="relative py-24 md:py-32 px-6 bg-white/[0.01] overflow-hidden">
            <motion.div
                aria-hidden="true"
                animate={{ opacity: [0.12, 0.24, 0.12], scale: [1, 1.08, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -top-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-accent-primary/20 blur-[120px]"
            />
            <motion.div
                aria-hidden="true"
                animate={{ opacity: [0.12, 0.2, 0.12], scale: [1.05, 1, 1.05] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -bottom-40 -right-24 h-[26rem] w-[26rem] rounded-full bg-accent-secondary/20 blur-[120px]"
            />

            <div className="max-w-7xl mx-auto text-balance">
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
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20"
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
