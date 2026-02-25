/**
 * @file components/motion/variants.ts
 * @description Centralized Framer Motion orchestrator.
 * Premium animation vocabulary for every interaction.
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

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -40 },
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

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 40 },
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

export const blurIn: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: (custom: number = 0) => ({
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            duration: 1,
            delay: custom,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export const rotateIn: Variants = {
    hidden: { opacity: 0, rotate: -5, scale: 0.95 },
    visible: (custom: number = 0) => ({
        opacity: 1,
        rotate: 0,
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

export const staggerContainerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
};

export const letterReveal: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export const pageTransition: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export const slideUp: Variants = {
    hidden: { y: "100%" },
    visible: {
        y: "0%",
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export const drawLine: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: (custom: number = 0) => ({
        scaleX: 1,
        transition: {
            duration: 1.2,
            delay: custom,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};
