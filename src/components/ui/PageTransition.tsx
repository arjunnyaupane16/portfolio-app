"use client";

import { motion } from "framer-motion";

const variants = {
    hidden: {
        opacity: 0,
        y: 30,
        filter: "blur(8px)",
    },
    enter: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as const,
            staggerChildren: 0.1,
        },
    },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="enter"
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}
