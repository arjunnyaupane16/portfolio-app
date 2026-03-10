"use client";

/**
 * @file components/ui/WordCycle.tsx
 * @description Smoothly cycles through an array of words with fade + slide transitions.
 */

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface WordCycleProps {
    words: string[];
    interval?: number;
    className?: string;
}

export default function WordCycle({ words, interval = 2800, className = "" }: WordCycleProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, interval);
        return () => clearInterval(timer);
    }, [words.length, interval]);

    return (
        <span className={`relative inline-flex overflow-hidden ${className}`} style={{ minWidth: "18ch" }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="gradient-text font-bold"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
