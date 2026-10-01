"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Magnetic from "@/components/ui/Magnetic";
import { portfolioData } from "@/constants/data";

const NAV_LINKS = [
  { label: "Home", href: "/", num: "01" },
  { label: "Work", href: "/projects", num: "02" },
  { label: "About", href: "/about", num: "03" },
  { label: "Contact", href: "/contact", num: "04" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // In Dennis Snellenberg, hamburger button ONLY appears when scrolled past hero
      if (window.scrollY > 120) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Magnetic hover effect on floating button
  useEffect(() => {
    const btn = menuBtnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const displayName = portfolioData.nickname || portfolioData.name.split(" ")[0];

  return (
    <>
      {/* ── Top Header Navigation Bar (Dennis Snellenberg Top Bar) ── */}
      <nav className="dennis-navbar">
        <Magnetic strength={0.3}>
          <Link href="/" className="dennis-nav-brand">
            <span>©</span>
            <span>Code by {displayName}</span>
          </Link>
        </Magnetic>

        {/* Desktop inline links */}
        <ul className="dennis-nav-links">
          <li>
            <Magnetic strength={0.35}>
              <Link
                href="/projects"
                className={`dennis-nav-link ${pathname === "/projects" ? "active" : ""}`}
              >
                Work
              </Link>
            </Magnetic>
          </li>
          <li>
            <Magnetic strength={0.35}>
              <Link
                href="/about"
                className={`dennis-nav-link ${pathname === "/about" ? "active" : ""}`}
              >
                About
              </Link>
            </Magnetic>
          </li>
          <li>
            <Magnetic strength={0.35}>
              <Link
                href="/contact"
                className={`dennis-nav-link ${pathname === "/contact" ? "active" : ""}`}
              >
                Contact
              </Link>
            </Magnetic>
          </li>
        </ul>
      </nav>

      {/* ── Floating Round Magnetic Hamburger Button (Dennis Signature) ── */}
      {/* Visible ONLY when scrolled past hero or when drawer is active */}
      <button
        ref={menuBtnRef}
        type="button"
        aria-label="Toggle Navigation Menu"
        onClick={() => setIsOpen(!isOpen)}
        className={`dennis-floating-menu-btn ${isOpen ? "open" : ""}`}
        style={{
          opacity: scrolled || isOpen ? 1 : 0,
          pointerEvents: scrolled || isOpen ? "auto" : "none",
          transform: scrolled || isOpen ? "scale(1)" : "scale(0)",
          transition: "transform 0.45s cubic-bezier(0.7, 0, 0.2, 1), opacity 0.35s ease, background-color 0.3s ease",
        }}
      >
        <div className="burger-icon">
          <div className="burger-line" />
          <div className="burger-line" />
        </div>
      </button>

      {/* ── Drawer Backdrop ── */}
      <div
        className={`dennis-drawer-backdrop ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* ── Dennis Snellenberg Slide-out Navigation Drawer ── */}
      <aside className={`dennis-drawer ${isOpen ? "open" : ""}`}>
        <div>
          <div className="dennis-drawer-label">Navigation</div>
          <ul className="dennis-drawer-nav">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`dennis-drawer-link ${isActive ? "active" : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="link-dot" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="dennis-drawer-footer">
          <span className="social-title">Socials</span>
          <div className="dennis-drawer-socials">
            {portfolioData.socials?.github && (
              <a
                href={portfolioData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            )}
            {portfolioData.socials?.linkedin && (
              <a
                href={portfolioData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            )}
            {portfolioData.socials?.instagram && (
              <a
                href={portfolioData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            )}
            {portfolioData.socials?.facebook && (
              <a
                href={portfolioData.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            )}
            {portfolioData.socials?.twitter && (
              <a
                href={portfolioData.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
