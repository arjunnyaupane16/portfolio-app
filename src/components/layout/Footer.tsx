"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Magnetic from "@/components/ui/Magnetic";
import { portfolioData } from "@/constants/data";

export default function Footer() {
  const pathname = usePathname();
  const [localTime, setLocalTime] = useState("");
  const year = new Date().getFullYear();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Kathmandu (NPT) or Asia/Kolkata (IST)
      const formatted = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kathmandu",
      }).format(now);
      setLocalTime(`${formatted} NPT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="dennis-footer" style={{ position: "relative", marginTop: "150px" }}>
      {/* SVG Scroll Curve - matches preceding section background */}
      <div className="dennis-footer-curve" style={{ position: "absolute", top: "-2px", left: 0, width: "100%", height: "clamp(80px, 12vw, 200px)", zIndex: 1, pointerEvents: "none" }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
          <path className="curve-path" d="M0 0 Q50 200 100 0 Z" fill={pathname === "/contact" ? "var(--color-dark)" : "var(--color-white)"} />
        </svg>
      </div>

      <div className="dennis-footer-inner" style={{ position: "relative", zIndex: 2, paddingTop: "clamp(40px, 8vw, 80px)" }}>
        {/* Top: Arrow + Heading with Avatar */}
        <div className="dennis-footer-top-row">
          <div className="dennis-footer-heading-wrap">
            <div className="dennis-footer-avatar">
              <Image
                src="/profile.png"
                alt={portfolioData.name}
                fill
                unoptimized
                priority
                className="object-cover"
                style={{ objectPosition: "center 28%" }}
                sizes="120px"
              />
            </div>
            <div>
              <h2 className="dennis-footer-heading no-anim">
                <span>Let&apos;s work</span>
                <span>together</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Divider Stripe with Giant "Get in touch" Round Button */}
        <div className="dennis-footer-cta-row">
          <Magnetic strength={0.4}>
            <Link href="/contact" className="btn-round blue-bg">
              <div className="btn-round-fill" />
              <span className="btn-round-text">Get in touch</span>
            </Link>
          </Magnetic>
        </div>

        {/* Contact Pill Buttons */}
        <div className="dennis-footer-contact-buttons">
          <Magnetic strength={0.3}>
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className="btn-normal dark-theme"
            >
              <div className="btn-normal-fill" />
              <span className="btn-normal-text">
                <span>{portfolioData.contact.email}</span>
              </span>
            </a>
          </Magnetic>

          {portfolioData.contact.phone && (
            <Magnetic strength={0.3}>
              <a
                href={`tel:${portfolioData.contact.phone}`}
                className="btn-normal dark-theme"
              >
                <div className="btn-normal-fill" />
                <span className="btn-normal-text">
                  <span>{portfolioData.contact.phone}</span>
                </span>
              </a>
            </Magnetic>
          )}
        </div>

        {/* Bottom Metadata & Social Bar */}
        <div className="dennis-footer-bottom-bar">
          {/* Version */}
          <div className="dennis-footer-col">
            <span className="dennis-footer-label">Version</span>
            <span className="dennis-footer-val">{year} &copy; Edition</span>
          </div>

          {/* Local Time */}
          <div className="dennis-footer-col">
            <span className="dennis-footer-label">Local Time</span>
            <span className="dennis-footer-val">{localTime || "12:00 PM NPT"}</span>
          </div>

          {/* Socials */}
          <div className="dennis-footer-col">
            <span className="dennis-footer-label">Socials</span>
            <ul className="dennis-footer-socials">
              {portfolioData.socials?.github && (
                <li>
                  <Magnetic strength={0.3}>
                    <a
                      href={portfolioData.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </Magnetic>
                </li>
              )}
              {portfolioData.socials?.linkedin && (
                <li>
                  <Magnetic strength={0.3}>
                    <a
                      href={portfolioData.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </Magnetic>
                </li>
              )}
              {portfolioData.socials?.twitter && (
                <li>
                  <Magnetic strength={0.3}>
                    <a
                      href={portfolioData.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </Magnetic>
                </li>
              )}
              {portfolioData.socials?.instagram && (
                <li>
                  <Magnetic strength={0.3}>
                    <a
                      href={portfolioData.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </Magnetic>
                </li>
              )}
              {portfolioData.socials?.facebook && (
                <li>
                  <Magnetic strength={0.3}>
                    <a
                      href={portfolioData.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </Magnetic>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
