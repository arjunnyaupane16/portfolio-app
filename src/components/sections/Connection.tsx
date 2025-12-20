"use client";

/**
 * @file components/sections/Connection.tsx
 * @description Final conversion node with social integration and contact logic.
 */

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight, Copy, Check } from "lucide-react";
import { ContactData } from "@/types/portfolio";
import { useState, useCallback } from "react";
import { fadeInUp, staggerContainer } from "../motion/variants";
import ContactForm from "./ContactForm";

interface SocialCardProps {
    href: string;
    label: string;
    title: string;
    icon: React.ReactNode;
    variant?: "primary" | "secondary";
}

const SocialCard = ({ href, label, title, icon, variant = "secondary" }: SocialCardProps) => (
    <motion.a
        variants={fadeInUp}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] group hover:bg-white/[0.05] transition-all flex flex-col justify-between aspect-square md:aspect-auto md:h-72 border border-white/5 hover:border-accent-primary/30`}
    >
        <div
            className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${variant === "primary" ? "bg-accent-primary/10" : "bg-white/5"
                }`}
        >
            <div className="text-accent-primary scale-75 md:scale-100">{icon}</div>
        </div>
        <div>
            <span className="block text-[8px] md:text-[10px] opacity-30 uppercase tracking-[0.3em] font-black mb-1 md:mb-2">{label}</span>
            <span className="text-lg md:text-2xl font-bold flex items-center justify-between tracking-tight">
                {title}{" "}
                <ArrowUpRight className="scale-75 md:scale-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform opacity-40 group-hover:opacity-100" />
            </span>
        </div>
    </motion.a>
);

export default function Connection({ contact }: { contact: ContactData }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(contact.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [contact.email]);

    return (
        <section id="connection" className="py-24 md:py-32 px-6">
            <div className="max-w-7xl mx-auto glass rounded-[3rem] md:rounded-[5rem] p-6 md:p-24 overflow-hidden relative border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                {/* Environmental FX */}
                <div className="absolute top-[-20%] right-[-10%] w-[150%] aspect-square bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-accent-secondary/5 rounded-full blur-[100px] pointer-events-none" />

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative z-10 grid lg:grid-cols-2 gap-16 md:gap-32 items-center"
                >
                    <div className="order-2 lg:order-1">
                        <motion.h2 variants={fadeInUp} className="text-6xl md:text-8xl lg:text-[10vw] font-bold tracking-tighter mb-8 leading-[0.85] uppercase">
                            REACH <br />
                            <span className="text-accent-primary italic font-extralight">OUT</span>
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-lg md:text-2xl text-foreground/50 mb-12 max-w-sm font-light leading-relaxed"
                        >
                            Available for high-impact collaborations and technical leadership roles in the multi-platform sphere.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col gap-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-2">Direct Channel</span>
                            <button
                                onClick={handleCopy}
                                aria-label="Copy email address"
                                className="group w-full flex items-center justify-between gap-4 px-6 md:px-8 py-5 md:py-6 rounded-2xl md:rounded-3xl glass border border-white/10 hover:border-accent-primary/50 transition-all text-left"
                            >
                                <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                                    <Mail className="text-accent-primary flex-shrink-0" size={20} />
                                    <span className="text-base md:text-2xl font-bold tracking-tight truncate block">{contact.email}</span>
                                </div>
                                {copied ? (
                                    <Check className="text-green-400 flex-shrink-0" size={18} />
                                ) : (
                                    <Copy className="opacity-20 group-hover:opacity-100 transition-opacity flex-shrink-0" size={18} />
                                )}
                            </button>
                        </motion.div>
                    </div>

                    <div className="w-full flex flex-col gap-10 md:gap-12 order-1 lg:order-2">
                        <ContactForm />

                        <div className="grid grid-cols-2 gap-4">
                            <SocialCard href={contact.linkedin} icon={<Linkedin size={24} />} title="LinkedIn" label="Network" variant="primary" />
                            <SocialCard href={contact.github} icon={<Github size={24} />} title="GitHub" label="Source" />
                        </div>
                    </div>
                </motion.div>

                {/* System Trace Footer */}
                <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.5em]">
                    <span className="opacity-20">© 2024 / Arjun Nyaupane</span>
                    <div className="flex items-center gap-2 text-accent-primary">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span>Deployment Status: Operational</span>
                    </div>
                    <span className="opacity-20 italic">Precision Core v5.1.0</span>
                </div>
            </div>
        </section>
    );
}
