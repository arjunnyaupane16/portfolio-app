"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import Link from "next/link";
import { fadeInUp, staggerContainer, drawLine } from "../motion/variants";

const socialLinks = [
    { href: "https://github.com/arjunnyaupane16", icon: <Github size={18} />, label: "GitHub" },
    { href: "https://linkedin.com/in/arjunnyaupane16", icon: <Linkedin size={18} />, label: "LinkedIn" },
    { href: "mailto:arjunnyaupane16@gmail.com", icon: <Mail size={18} />, label: "Email" },
];

const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
];

export default function Footer() {
    return (
        <footer className="relative px-6 pb-8 pt-24">
            {/* Top gradient border */}
            <motion.div
                variants={drawLine}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full h-px bg-gradient-to-r from-transparent via-accent-primary/40 to-transparent mb-16"
            />

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="max-w-7xl mx-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand */}
                    <motion.div variants={fadeInUp}>
                        <h3 className="text-2xl font-bold tracking-tighter mb-3">
                            <span className="gradient-text">Arjun</span>
                        </h3>
                        <p className="text-foreground/40 text-sm leading-relaxed max-w-xs">
                            TypeScript developer exploring the frontiers of AI/ML. Building the future, one line of code at a time.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-6">Navigation</h4>
                        <ul className="flex flex-col gap-3">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-foreground/50 hover:text-accent-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Social */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-6">Connect</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-xl glass border border-white/5 flex items-center justify-center text-foreground/40 hover:text-accent-primary hover:border-accent-primary/30 transition-all hover:scale-110"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    variants={fadeInUp}
                    className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em]"
                >
                    <span className="opacity-20 flex items-center gap-1.5">
                        Made with <Heart size={10} className="text-accent-secondary fill-accent-secondary" /> by Arjun
                    </span>
                    <div className="flex items-center gap-2 text-accent-primary/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span>All Systems Operational</span>
                    </div>
                    <span className="opacity-20">© {new Date().getFullYear()}</span>
                </motion.div>
            </motion.div>
        </footer>
    );
}
