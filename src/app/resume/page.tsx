"use client";

import { motion } from "framer-motion";
import { Download, Mail, ExternalLink } from "lucide-react";
import { portfolioData } from "@/constants/data";
import { fadeInUp, staggerContainer } from "@/components/motion/variants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import PageTransition from "@/components/ui/PageTransition";

export default function ResumePage() {
    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        title="MY"
                        accent="RESUME"
                        subtitle="Professional background and qualifications."
                        index="05"
                    />

                    {/* Resume Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="glass rounded-[2.5rem] p-8 md:p-12 border border-white/5 mb-12"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">
                                    {portfolioData.name}
                                </h2>
                                <p className="text-lg text-accent-primary font-medium">
                                    {portfolioData.title}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-white font-bold text-sm uppercase tracking-wider hover:bg-accent-primary/90 transition-colors"
                                >
                                    <Download size={16} />
                                    Download PDF
                                </a>
                                <a
                                    href={`mailto:${portfolioData.contact.email}`}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 font-bold text-sm uppercase tracking-wider hover:border-accent-primary/30 transition-all"
                                >
                                    <Mail size={16} />
                                    Email Me
                                </a>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-3 text-foreground/60">
                                <Mail size={16} className="text-accent-primary" />
                                <span>{portfolioData.contact.email}</span>
                            </div>
                            <a
                                href={portfolioData.contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-foreground/60 hover:text-accent-primary transition-colors"
                            >
                                <ExternalLink size={16} />
                                <span>LinkedIn Profile</span>
                            </a>
                            <a
                                href={portfolioData.contact.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-foreground/60 hover:text-accent-primary transition-colors"
                            >
                                <ExternalLink size={16} />
                                <span>GitHub Profile</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Education Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-12"
                    >
                        <h3 className="text-2xl font-bold tracking-tighter mb-6 flex items-center gap-3">
                            <span className="w-8 h-0.5 bg-accent-primary" />
                            Education
                        </h3>
                        <div className="space-y-4">
                            {portfolioData.education.map((edu, index) => (
                                <motion.div
                                    key={edu.institution}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass rounded-2xl p-6 border border-white/5 hover:border-accent-primary/20 transition-colors"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                        <h4 className="text-lg font-bold">{edu.institution}</h4>
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-accent-primary/60">
                                            {edu.date}
                                        </span>
                                    </div>
                                    <p className="text-foreground/70 mb-2">{edu.degree}</p>
                                    {edu.highlight && (
                                        <p className="text-sm text-foreground/50">{edu.highlight}</p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Skills Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-12"
                    >
                        <h3 className="text-2xl font-bold tracking-tighter mb-6 flex items-center gap-3">
                            <span className="w-8 h-0.5 bg-accent-primary" />
                            Technical Skills
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {portfolioData.skills.map((category, catIndex) => (
                                <motion.div
                                    key={category.category}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: catIndex * 0.1 }}
                                    className="glass rounded-2xl p-6 border border-white/5"
                                >
                                    <h4 className="text-sm font-black uppercase tracking-[0.2em] text-accent-primary/60 mb-4">
                                        {category.category}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {category.items.map((skill) => (
                                            <span
                                                key={skill.name}
                                                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-foreground/70"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Projects Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h3 className="text-2xl font-bold tracking-tighter mb-6 flex items-center gap-3">
                            <span className="w-8 h-0.5 bg-accent-primary" />
                            Selected Projects
                        </h3>
                        <div className="space-y-4">
                            {portfolioData.projects.slice(0, 5).map((project, index) => (
                                <motion.a
                                    key={project.id}
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="block glass rounded-2xl p-6 border border-white/5 hover:border-accent-primary/20 transition-colors group"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-lg font-bold group-hover:text-accent-primary transition-colors">
                                            {project.title}
                                        </h4>
                                        <ExternalLink size={16} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <p className="text-sm text-foreground/50 mb-3 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.slice(0, 4).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 rounded bg-white/5 text-[10px] font-black uppercase tracking-[0.15em] text-foreground/40"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Note about PDF */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
                    >
                        <p className="text-sm text-foreground/40">
                            For a detailed PDF resume with complete work history, please{" "}
                            <a href="/contact" className="text-accent-primary hover:underline">
                                contact me
                            </a>{" "}
                            directly.
                        </p>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
}
