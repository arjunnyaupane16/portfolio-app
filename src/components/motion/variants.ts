/**
 * @file components/motion/variants.ts
 * @description Centralized Framer Motion orchestrator.
 * Defines a consistent motion language for the entire architecture.
 */

import { Variants } from "framer-motion";

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: (custom: number = 0) => ({
        opacity: 1,
        transition: {
            duration: 0.8,
            delay: custom,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay: custom,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: (custom: number = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            delay: custom,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (custom: number = 0) => ({
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            delay: custom,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};
