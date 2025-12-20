/**
 * @file hooks/useNavigation.ts
 * @description Logic abstraction for site-wide navigation and visibility states.
 */

import { useState, useEffect } from "react";

export const useNavigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("vision");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Intersection logic could go here, but we'll stick to basic scroll for now
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMobileMenuOpen(false);

    return {
        isMobileMenuOpen,
        activeSection,
        isScrolled,
        toggleMenu,
        closeMenu,
    };
};
