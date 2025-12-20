"use client";

/**
 * @file components/sections/Artifacts.tsx
 * @description Highly engineered project showcase with modular architecture.
 */

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Project } from "@/types/portfolio";
import { SectionHeader } from "../ui/SectionHeader";
import { fadeInUp, staggerContainer } from "../motion/variants";

interface ProjectCardProps {
    project: Project;
    index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => (
    <motion.div variants={fadeInUp} className="group flex flex-col">
        <div className="relative aspect-[16/11] overflow-hidden rounded-[2.5rem] glass border border-white/5 mb-8 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
            {/* Dynamic Visual Layer */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 saturate-[0.8] brightness-[0.7] group-hover:brightness-100 group-hover:saturate-100"
                style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Interactive Controls */}
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

            <div className="absolute top-6 right-6 z-10 glass px-4 py-2 rounded-full border border-white/10 text-[10px] font-black tracking-[0.2em] opacity-50">
                ID — 0{index + 1}
            </div>
        </div>

        <div className="px-2">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter group-hover:text-accent-primary transition-colors flex items-center gap-4">
                {project.title}
                <ArrowRight
                    className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-accent-primary"
                    size={24}
                />
            </h3>
            <p className="text-foreground/50 mb-8 leading-relaxed text-sm md:text-lg max-w-xl font-light italic">
                "{project.description}"
            </p>
            <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                    <span
                        key={t}
                        className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-foreground/30 group-hover:border-accent-primary/30 group-hover:text-accent-primary transition-all"
                    >
                        {t}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

export default function Artifacts({ projects }: { projects: Project[] }) {
    return (
        <section id="artifacts" className="py-24 md:py-32 px-6 bg-white/[0.01]">
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
