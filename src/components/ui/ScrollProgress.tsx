"use client";

/**
 * @file components/ui/ScrollProgress.tsx
 * @description Thin gradient scroll progress bar pinned to the top of the viewport.
 */

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="scroll-progress"
            style={{ scaleX }}
        />
    );
}
