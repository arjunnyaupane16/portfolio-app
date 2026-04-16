"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                    },
                }}
                exit={{
                    opacity: 0,
                    y: -10,
                    filter: "blur(4px)",
                    transition: {
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    },
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
