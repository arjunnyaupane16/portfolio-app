"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight, Copy, Check, Send } from "lucide-react";
import { useState, useCallback } from "react";
import { portfolioData } from "@/constants/data";
import { fadeInUp, staggerContainer, scaleIn } from "@/components/motion/variants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import PageTransition from "@/components/ui/PageTransition";
import ContactForm from "@/components/sections/ContactForm";

const socialCards = [
    {
        href: portfolioData.contact.linkedin,
        icon: <Linkedin size={28} />,
        label: "Network",
        title: "LinkedIn",
        description: "Let's connect professionally",
    },
    {
        href: portfolioData.contact.github,
        icon: <Github size={28} />,
        label: "Source",
        title: "GitHub",
        description: "Explore my open source work",
    },
];

export default function ContactPage() {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(portfolioData.contact.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    return (
        <PageTransition>
            <div className="pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="LET'S"
                        accent="CONNECT"
                        subtitle="Available for collaborations, interesting projects, and technical discussions."
                        index="04"
                    />

                    <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
                        {/* Left - Info */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <motion.div variants={fadeInUp}>
                                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
                                    Have a project in <span className="gradient-text">mind?</span>
                                </h2>
                                <p className="text-foreground/50 text-base md:text-lg leading-relaxed max-w-md">
                                    I&apos;m always excited to work on meaningful projects. Whether it&apos;s a web app, a mobile experience, or an AI-powered solution — let&apos;s talk.
                                </p>
                            </motion.div>

                            {/* Email Copy */}
                            <motion.div variants={fadeInUp}>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-3 block">Direct Channel</span>
                                <button
                                    onClick={handleCopy}
                                    aria-label="Copy email address"
                                    className="group w-full flex items-center justify-between gap-4 px-6 py-5 rounded-2xl glass border border-white/10 hover:border-accent-primary/50 transition-all text-left"
                                >
                                    <div className="flex items-center gap-4 min-w-0 flex-1">
                                        <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Mail className="text-accent-primary" size={18} />
                                        </div>
                                        <span className="text-base md:text-lg font-bold tracking-tight truncate">{portfolioData.contact.email}</span>
                                    </div>
                                    {copied ? (
                                        <div className="flex items-center gap-2 text-green-400">
                                            <Check size={16} />
                                            <span className="text-xs font-bold">Copied!</span>
                                        </div>
                                    ) : (
                                        <Copy className="opacity-20 group-hover:opacity-100 transition-opacity flex-shrink-0" size={16} />
                                    )}
                                </button>
                            </motion.div>

                            {/* Social Cards */}
                            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
                                {socialCards.map((social) => (
                                    <motion.a
                                        key={social.title}
                                        variants={scaleIn}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="glass p-6 rounded-[2rem] group hover:bg-white/[0.04] transition-all border border-white/5 hover:border-accent-primary/30"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-6 text-accent-primary group-hover:scale-110 transition-transform">
                                            {social.icon}
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30 block mb-1">
                                            {social.label}
                                        </span>
                                        <span className="text-lg font-bold flex items-center justify-between">
                                            {social.title}
                                            <ArrowUpRight size={16} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                        </span>
                                        <p className="text-xs text-foreground/30 mt-2">{social.description}</p>
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right - Form */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            custom={0.2}
                        >
                            <div className="glass rounded-[2.5rem] p-8 md:p-12 border border-white/5 relative overflow-hidden">
                                {/* Decorative glow */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-[80px] pointer-events-none" />

                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                                        <Send className="text-accent-primary" size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">Send a Message</h3>
                                        <p className="text-xs text-foreground/40">I&apos;ll get back to you within 24h</p>
                                    </div>
                                </div>

                                <ContactForm />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
