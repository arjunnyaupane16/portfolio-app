"use client";

import { useState } from "react";
import Image from "next/image";
import Magnetic from "@/components/ui/Magnetic";
import { portfolioData } from "@/constants/data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${portfolioData.contact.email}?subject=Project Inquiry from ${encodeURIComponent(
      formData.name
    )} (${encodeURIComponent(formData.company || "Individual")})&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nOrganization: ${formData.company}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <div style={{ background: "var(--color-dark)", color: "var(--color-white)", minHeight: "100vh" }}>
      {/* ── Contact Header ── */}
      <section
        style={{
          padding: "clamp(140px, 18vw, 220px) clamp(24px, 5vw, 90px) clamp(60px, 8vw, 100px)",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "32px",
            borderBottom: "1px solid var(--color-border-light)",
            paddingBottom: "clamp(40px, 6vw, 80px)",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.8rem, 6.8vw, 7.5rem)",
              fontWeight: 450,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "850px",
              color: "var(--color-white)",
            }}
          >
            Let&apos;s start a <br /> project together
          </h1>

          <div
            style={{
              position: "relative",
              width: "clamp(75px, 8vw, 110px)",
              height: "clamp(75px, 8vw, 110px)",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid var(--color-border-light)",
              flexShrink: 0,
            }}
          >
            <Image
              src="/profile.png"
              alt={portfolioData.name}
              fill
              className="object-cover"
              sizes="120px"
              unoptimized
              priority
            />
          </div>
        </div>

        {/* ── 2-Column Form & Details Layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.8fr 1fr",
            gap: "clamp(48px, 8vw, 120px)",
            marginTop: "clamp(48px, 6vw, 90px)",
          }}
          className="contact-grid-responsive"
        >
          {/* Left: Numbered Inquiry Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {/* 01 Name */}
            <div style={{ borderBottom: "1px solid var(--color-border-light)", paddingBottom: "24px" }}>
              <span style={{ fontSize: "0.85rem", color: "#8C8E90", display: "block", marginBottom: "12px" }}>
                01
              </span>
              <label
                htmlFor="name"
                style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)", fontWeight: 450, display: "block", marginBottom: "12px", color: "var(--color-white)" }}
              >
                What&apos;s your name?
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="John Doe *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--color-white)",
                  fontSize: "1.1rem",
                }}
              />
            </div>

            {/* 02 Email */}
            <div style={{ borderBottom: "1px solid var(--color-border-light)", paddingBottom: "24px" }}>
              <span style={{ fontSize: "0.85rem", color: "#8C8E90", display: "block", marginBottom: "12px" }}>
                02
              </span>
              <label
                htmlFor="email"
                style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)", fontWeight: 450, display: "block", marginBottom: "12px", color: "var(--color-white)" }}
              >
                What&apos;s your email?
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="john@doe.com *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--color-white)",
                  fontSize: "1.1rem",
                }}
              />
            </div>

            {/* 03 Organization */}
            <div style={{ borderBottom: "1px solid var(--color-border-light)", paddingBottom: "24px" }}>
              <span style={{ fontSize: "0.85rem", color: "#8C8E90", display: "block", marginBottom: "12px" }}>
                03
              </span>
              <label
                htmlFor="company"
                style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)", fontWeight: 450, display: "block", marginBottom: "12px", color: "var(--color-white)" }}
              >
                What&apos;s the name of your organization?
              </label>
              <input
                id="company"
                type="text"
                placeholder="Company / Startup &reg;"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--color-white)",
                  fontSize: "1.1rem",
                }}
              />
            </div>

            {/* 04 Service */}
            <div style={{ borderBottom: "1px solid var(--color-border-light)", paddingBottom: "24px" }}>
              <span style={{ fontSize: "0.85rem", color: "#8C8E90", display: "block", marginBottom: "12px" }}>
                04
              </span>
              <label
                htmlFor="service"
                style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)", fontWeight: 450, display: "block", marginBottom: "12px", color: "var(--color-white)" }}
              >
                What services are you looking for?
              </label>
              <input
                id="service"
                type="text"
                placeholder="Web Design, Web Development, Mobile App ..."
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--color-white)",
                  fontSize: "1.1rem",
                }}
              />
            </div>

            {/* 05 Message */}
            <div style={{ borderBottom: "1px solid var(--color-border-light)", paddingBottom: "24px" }}>
              <span style={{ fontSize: "0.85rem", color: "#8C8E90", display: "block", marginBottom: "12px" }}>
                05
              </span>
              <label
                htmlFor="message"
                style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)", fontWeight: 450, display: "block", marginBottom: "12px", color: "var(--color-white)" }}
              >
                Your message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                placeholder={`Hello ${portfolioData.nickname}, can you help me with ... *`}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--color-white)",
                  fontSize: "1.1rem",
                  resize: "vertical",
                }}
              />
            </div>

            {/* Submit Button */}
            <div style={{ marginTop: "16px" }}>
              <Magnetic strength={0.4}>
                <button
                  type="submit"
                  className="btn-round blue-bg"
                  style={{ width: "clamp(150px, 15vw, 190px)", height: "clamp(150px, 15vw, 190px)", border: "none" }}
                >
                  <div className="btn-round-fill" />
                  <span className="btn-round-text">Send it!</span>
                </button>
              </Magnetic>
              {submitted && (
                <p style={{ marginTop: "16px", color: "var(--color-blue)" }}>
                  Thank you! Opening your email client to send the message.
                </p>
              )}
            </div>
          </form>

          {/* Right: Contact Details & Socials */}
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8C8E90", display: "block", marginBottom: "12px" }}>
                Contact Details
              </span>
              <a
                href={`mailto:${portfolioData.contact.email}`}
                style={{ color: "var(--color-white)", fontSize: "1.15rem", textDecoration: "none", display: "block", marginBottom: "8px" }}
              >
                {portfolioData.contact.email}
              </a>
              {portfolioData.contact.phone && (
                <a
                  href={`tel:${portfolioData.contact.phone}`}
                  style={{ color: "var(--color-white)", fontSize: "1.15rem", textDecoration: "none", display: "block" }}
                >
                  {portfolioData.contact.phone}
                </a>
              )}
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8C8E90", display: "block", marginBottom: "12px" }}>
                Location
              </span>
              <p style={{ fontSize: "1.15rem", color: "var(--color-white)" }}>
                {portfolioData.contact.location}
              </p>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8C8E90", display: "block", marginBottom: "16px" }}>
                Socials
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {portfolioData.socials?.github && (
                  <a
                    href={portfolioData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-white)", textDecoration: "none", fontSize: "1.05rem" }}
                  >
                    GitHub
                  </a>
                )}
                {portfolioData.socials?.linkedin && (
                  <a
                    href={portfolioData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-white)", textDecoration: "none", fontSize: "1.05rem" }}
                  >
                    LinkedIn
                  </a>
                )}
                {portfolioData.socials?.twitter && (
                  <a
                    href={portfolioData.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-white)", textDecoration: "none", fontSize: "1.05rem" }}
                  >
                    Twitter
                  </a>
                )}
                {portfolioData.socials?.instagram && (
                  <a
                    href={portfolioData.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-white)", textDecoration: "none", fontSize: "1.05rem" }}
                  >
                    Instagram
                  </a>
                )}
                {portfolioData.socials?.facebook && (
                  <a
                    href={portfolioData.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-white)", textDecoration: "none", fontSize: "1.05rem" }}
                  >
                    Facebook
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
