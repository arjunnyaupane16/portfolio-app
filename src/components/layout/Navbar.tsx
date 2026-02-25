"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 50);
        setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Desktop Navigation */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: isVisible ? 0 : -100,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden md:block transition-all duration-300 ${isScrolled ? "glass-strong" : "glass"
                    } px-2 py-2 rounded-full border border-white/10`}
            >
                <ul className="flex gap-1 items-center">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={`relative px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-all duration-300 block ${isActive
                                            ? "text-white"
                                            : "text-foreground/40 hover:text-foreground/80"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-active"
                                            className="absolute inset-0 bg-accent-primary/20 border border-accent-primary/30 rounded-full"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </motion.nav>

            {/* Mobile Menu Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
                className="fixed top-6 right-6 z-[120] md:hidden p-4 rounded-full glass-strong border border-white/10 text-accent-primary shadow-2xl active:scale-95 transition-transform"
            >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>

            {/* Mobile Overlay */}
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[110] bg-background/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
                    >
                        <ul className="flex flex-col gap-10 text-center">
                            {NAV_LINKS.map((link, i) => {
                                const isActive = pathname === link.href;
                                return (
                                    <motion.li
                                        key={link.name}
                                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        transition={{ delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`text-4xl font-black tracking-tighter uppercase transition-all ${isActive ? "text-accent-primary text-glow" : "text-foreground/60 hover:text-foreground"
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.li>
                                );
                            })}
                        </ul>

                        {/* Decorative orb */}
                        <div className="absolute bottom-20 w-64 h-64 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
