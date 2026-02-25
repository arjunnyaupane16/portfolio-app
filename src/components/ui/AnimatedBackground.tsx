"use client";

import { motion } from "framer-motion";

const orbs = [
    { size: 300, x: "10%", y: "20%", color: "var(--color-accent-primary)", delay: 0, duration: 20 },
    { size: 250, x: "80%", y: "60%", color: "var(--color-accent-secondary)", delay: 2, duration: 25 },
    { size: 200, x: "50%", y: "80%", color: "var(--color-accent-primary)", delay: 4, duration: 22 },
    { size: 150, x: "20%", y: "70%", color: "var(--color-accent-secondary)", delay: 1, duration: 18 },
    { size: 180, x: "70%", y: "15%", color: "var(--color-accent-primary)", delay: 3, duration: 24 },
];

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: orb.x,
                        top: orb.y,
                        background: `radial-gradient(circle, ${orb.color}15 0%, transparent 70%)`,
                        filter: "blur(60px)",
                    }}
                    animate={{
                        x: [0, 30, -20, 15, 0],
                        y: [0, -25, 15, -10, 0],
                        scale: [1, 1.1, 0.95, 1.05, 1],
                    }}
                    transition={{
                        duration: orb.duration,
                        delay: orb.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
