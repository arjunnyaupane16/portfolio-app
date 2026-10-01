"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Word splitter ── */
function splitWords(el: Element) {
  const original = el.innerHTML;
  const text = el.textContent || "";
  if (!text.trim()) return null;
  el.innerHTML = text
    .split(/\s+/).filter(Boolean)
    .map(w => `<span class="gs-word"><span class="gs-inner">${w}</span></span>`)
    .join(" ");
  return () => { el.innerHTML = original; };
}

/* ── Char splitter ── */
function splitChars(el: Element) {
  const text = el.textContent || "";
  if (!text.trim()) return;
  el.innerHTML = text.split("")
    .map(c => c === " " ? " " : `<span class="gs-char">${c}</span>`)
    .join("");
}

/* ── Observe elements with .reveal class ── */
function setupRevealObserver() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in-view"); observer.unobserve(e.target); } }),
    { threshold: 0.1 }
  );
  els.forEach(el => observer.observe(el));
  return () => observer.disconnect();
}

export default function GlobalAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    const cleanupReveal = setupRevealObserver();

    const ctx = gsap.context(() => {
      const ease      = "power3.out";
      const easeSilk  = "power2.out";
      const easeBack  = "back.out(1.8)";
      const easeSpring = "elastic.out(1, 0.55)";

      /* ══ 1. Page section panels ── fade + lift ══ */
      gsap.utils.toArray<Element>("section").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: easeSilk,
            delay: i === 0 ? 0.1 : 0,
            scrollTrigger: { trigger: el, start: "top 90%", once: true } }
        );
      });

      /* ══ 2. Section eyebrow labels ── slide right ══ */
      gsap.utils.toArray<Element>(".section-label, [data-label], span[style*='uppercase'], span[style*='letterSpacing']").forEach(el => {
        gsap.fromTo(el,
          { x: -28, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.65, ease,
            scrollTrigger: { trigger: el, start: "top 92%", once: true } }
        );
      });

      /* ══ 3. H1 — char stagger drop-in ══ */
      gsap.utils.toArray<Element>("h1:not(.no-anim)").forEach(el => {
        splitChars(el);
        gsap.fromTo(el.querySelectorAll(".gs-char"),
          { y: 90, opacity: 0, rotateZ: 5 },
          { y: 0, opacity: 1, rotateZ: 0, duration: 0.7, ease,
            stagger: { amount: 0.6, from: "start" },
            scrollTrigger: { trigger: el, start: "top 88%", once: true } }
        );
      });

      /* ══ 4. H2 — word-by-word reveal ══ */
      gsap.utils.toArray<Element>("h2:not(.no-anim)").forEach(el => {
        const restore = splitWords(el);
        gsap.fromTo(el.querySelectorAll(".gs-inner"),
          { y: "115%", opacity: 0, skewY: 3 },
          { y: "0%", opacity: 1, skewY: 0, duration: 0.85, ease,
            stagger: 0.055,
            scrollTrigger: { trigger: el, start: "top 84%", once: true,
              onLeaveBack: () => restore?.() } }
        );
      });

      /* ══ 5. H3 — blur + slide up ══ */
      gsap.utils.toArray<Element>("h3:not(.no-anim)").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 35, opacity: 0, filter: "blur(6px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, ease,
            delay: (i % 3) * 0.08,
            scrollTrigger: { trigger: el, start: "top 87%", once: true } }
        );
      });

      /* ══ 6. H4, H5, H6 ── fade up ══ */
      gsap.utils.toArray<Element>("h4:not(.no-anim), h5:not(.no-anim)").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease,
            delay: i * 0.06,
            scrollTrigger: { trigger: el, start: "top 90%", once: true } }
        );
      });

      /* ══ 7. Paragraphs ── staggered float up ══ */
      gsap.utils.toArray<Element>("p:not(.no-anim)").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.72, ease,
            delay: (i % 4) * 0.07,
            scrollTrigger: { trigger: el, start: "top 88%", once: true } }
        );
      });

      /* ══ 8. Images — clip-path top wipe + descale ══ */
      gsap.utils.toArray<Element>("img:not([class*='profile']):not([class*='avatar'])").forEach(el => {
        gsap.fromTo(el,
          { clipPath: "inset(100% 0 0 0)", scale: 1.08 },
          { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.15, ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 86%", once: true } }
        );
      });

      /* ══ 9. Service cards ── spring stagger ══ */
      gsap.fromTo(".service-card",
        { y: 80, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: easeBack,
          stagger: { amount: 0.35, from: "start" },
          scrollTrigger: { trigger: ".services-grid", start: "top 80%", once: true } }
      );

      /* ══ 10. Service nums / badges ── 3D flip ══ */
      gsap.fromTo(".service-card-num, .service-card-badge",
        { rotateX: -90, opacity: 0, transformOrigin: "top center" },
        { rotateX: 0, opacity: 1, duration: 0.65, ease: easeBack,
          stagger: 0.12,
          scrollTrigger: { trigger: ".services-grid", start: "top 80%", once: true } }
      );

      /* ══ 11. Service desc lines ── stagger fade ══ */
      gsap.fromTo(".service-card-desc",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease,
          stagger: 0.1,
          scrollTrigger: { trigger: ".services-grid", start: "top 75%", once: true } }
      );

      /* ══ 12. Work rows ── slide from left ══ */
      gsap.utils.toArray<Element>(".work-row-item").forEach((el, i) => {
        gsap.fromTo(el,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease,
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 88%", once: true } }
        );
      });

      /* ══ 13. Work row year ── fade from right ══ */
      gsap.fromTo(".work-row-year",
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease, stagger: 0.07,
          scrollTrigger: { trigger: ".work-section", start: "top 78%", once: true } }
      );

      /* ══ 14. Work section header ── scale-x wipe ══ */
      gsap.fromTo(".work-header-row",
        { scaleX: 0, transformOrigin: "left", opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.2, ease,
          scrollTrigger: { trigger: ".work-header-row", start: "top 88%", once: true } }
      );

      /* ══ 15. Buttons ── scale spring pop ══ */
      gsap.utils.toArray<Element>(".btn-round, .btn-normal").forEach((el, i) => {
        gsap.fromTo(el,
          { scale: 0.75, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, ease: easeBack,
            delay: 0.1 + i * 0.06,
            scrollTrigger: { trigger: el, start: "top 92%", once: true } }
        );
      });

      /* ══ 16. All other <button> elements ══ */
      gsap.utils.toArray<Element>("button:not(.no-anim)").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease,
            delay: i * 0.05,
            scrollTrigger: { trigger: el, start: "top 93%", once: true } }
        );
      });

      /* ══ 17. Nav links ── drop stagger ══ */
      gsap.fromTo(".nav-link",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease, stagger: 0.07, delay: 0.25 }
      );

      /* ══ 18. Hamburger btn entrance ══ */
      gsap.fromTo(".floating-hamburger",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: easeBack, delay: 0.5 }
      );

      /* ══ 19. Globe ── elastic bounce ══ */
      gsap.fromTo(".digital-ball",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: easeSpring, delay: 1.1 }
      );

      /* ══ 20. Hanger ── slide + bounce ══ */
      gsap.fromTo(".hanger",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: easeBack, delay: 0.2 }
      );

      /* ══ 21. Role title ── words cascade ══ */
      gsap.fromTo(".role-title span",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.75, ease,
          stagger: 0.12, delay: 0.9 }
      );

      /* ══ 22. Arrow icon ── rotate in ══ */
      gsap.fromTo(".arrow-icon",
        { rotate: -45, scale: 0, opacity: 0 },
        { rotate: 0, scale: 1, opacity: 1, duration: 0.8, ease: easeBack, delay: 0.8 }
      );

      /* ══ 23. Marquee name ── slide up ══ */
      gsap.fromTo(".big-name",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease, delay: 0.45 }
      );

      /* ══ 24. Marquee items ── stagger scale ══ */
      gsap.fromTo(".marquee-item",
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.8, ease, stagger: 0.08, delay: 0.6 }
      );

      /* ══ 25. Footer ── full theatrical entrance ══ */
      const footerTl = gsap.timeline({
        scrollTrigger: { trigger: ".dennis-footer", start: "top 85%", once: true }
      });
      footerTl
        .fromTo(".dennis-footer-avatar",
          { scale: 0, rotate: -15, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, duration: 0.7, ease: easeBack }, 0)
        .fromTo(".dennis-footer-cta-row",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease }, 0.5)
        .fromTo(".dennis-footer-contact-pill",
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: easeBack, stagger: 0.1 }, 0.65)
        .fromTo(".dennis-footer-divider",
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 1, ease }, 0.8)
        .fromTo(".dennis-footer-nav a",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease, stagger: 0.06 }, 0.9)
        .fromTo(".dennis-footer-credits",
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease }, 1.1);

      /* ══ 26. Tag / badge pills ══ */
      gsap.utils.toArray<Element>(".badge, .tag, .tech-tag").forEach((el, i) => {
        gsap.fromTo(el,
          { scale: 0.6, opacity: 0, y: 10 },
          { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: easeBack,
            delay: i * 0.04,
            scrollTrigger: { trigger: el, start: "top 90%", once: true } }
        );
      });

      /* ══ 27. Education / timeline rows ══ */
      gsap.utils.toArray<Element>(".edu-row, [data-row]").forEach((el, i) => {
        gsap.fromTo(el,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.75, ease,
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 86%", once: true } }
        );
      });

      /* ══ 28. Skill bars ══ */
      gsap.utils.toArray<HTMLElement>(".skill-bar-fill, [data-bar]").forEach(el => {
        const w = el.getAttribute("data-width") || el.style.width || "80%";
        gsap.fromTo(el,
          { width: "0%", opacity: 0 },
          { width: w, opacity: 1, duration: 1.4, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true } }
        );
      });

      /* ══ 29. Social icons ══ */
      gsap.utils.toArray<Element>(".social-link, .social-icon, [class*='social']").forEach((el, i) => {
        gsap.fromTo(el,
          { scale: 0, opacity: 0, rotate: -30 },
          { scale: 1, opacity: 1, rotate: 0, duration: 0.55, ease: easeBack,
            delay: 0.1 + i * 0.09,
            scrollTrigger: { trigger: el, start: "top 92%", once: true } }
        );
      });

      /* ══ 30. Dividers / <hr> ── wipe ══ */
      gsap.utils.toArray<Element>("hr, .divider").forEach(el => {
        gsap.fromTo(el,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 1.1, ease,
            scrollTrigger: { trigger: el, start: "top 92%", once: true } }
        );
      });

      /* ══ 31. Project grid items ── stagger ══ */
      gsap.utils.toArray<Element>(".project-card, [class*='project-grid'] > *").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 70, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: easeBack,
            delay: (i % 3) * 0.12,
            scrollTrigger: { trigger: el, start: "top 84%", once: true } }
        );
      });

      /* ══ 32. Contact inputs ── stagger rise ══ */
      gsap.utils.toArray<Element>("input, textarea, select, label").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease,
            delay: i * 0.07,
            scrollTrigger: { trigger: el, start: "top 90%", once: true } }
        );
      });

      /* ══ 33. Profile portrait ── clip reveal + scale ══ */
      gsap.fromTo(".personal-portrait, .about-portrait",
        { clipPath: "inset(15% 0% 0% 0%)", scale: 1.07, opacity: 0 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, duration: 1.3, ease: "power2.out",
          scrollTrigger: { trigger: ".personal-portrait, .about-portrait", start: "top 82%", once: true } }
      );

      /* ══ 34. Numbers / counters ══ */
      gsap.utils.toArray<HTMLElement>(".counter, [data-count]").forEach(el => {
        const target = parseFloat(el.getAttribute("data-count") || el.textContent || "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 1.8, ease: "power2.out",
          onUpdate: () => { el.textContent = Math.round(obj.val).toString(); },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      /* ══ 35. Page header dark banner ── parallax scrub ══ */
      gsap.utils.toArray<Element>("[style*='background: var(--color-dark)']").forEach(el => {
        gsap.fromTo(el,
          { backgroundPositionY: "0%" },
          { backgroundPositionY: "30%", ease: "none",
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1.5 } }
        );
      });

      /* ══ 36. Hero image parallax ══ */
      ScrollTrigger.create({
        trigger: ".home-header",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: self => {
          const el = document.querySelector<HTMLElement>(".personal-image-wrap");
          if (el) el.style.transform = `translateX(-50%) translateY(${self.progress * 90}px)`;
        },
      });

      /* ══ 37. Horizontal scrolling marquee speed ══ */
      let lastY = window.scrollY;
      const onScroll = () => {
        const speed = window.scrollY - lastY;
        lastY = window.scrollY;
        const track = document.querySelector<HTMLElement>(".marquee-track");
        if (track) {
          gsap.to(track, { x: `-=${speed * 0.7}`, duration: 0.3, ease: "power1.out", overwrite: "auto" });
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      /* ══ 38. Line separators between sections ══ */
      gsap.utils.toArray<Element>("[style*='borderTop'], [style*='border-top']").forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease,
            scrollTrigger: { trigger: el, start: "top 90%", once: true } }
        );
      });

      /* ══ 39. About skills category headers ══ */
      gsap.fromTo(".skills-category, [class*='skills'] h3",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65, ease, stagger: 0.12,
          scrollTrigger: { trigger: ".skills-section, [class*='skills']", start: "top 82%", once: true } }
      );

      /* ══ 40. Resume page blocks ══ */
      gsap.utils.toArray<Element>("[class*='resume'], [id*='resume']").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease,
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 86%", once: true } }
        );
      });

      /* ══ 41. Intro bio text ── letter-spacing relax ══ */
      gsap.fromTo(".home-intro-desc",
        { y: 35, opacity: 0, letterSpacing: "0.05em" },
        { y: 0, opacity: 1, letterSpacing: "inherit", duration: 0.9, ease,
          scrollTrigger: { trigger: ".home-intro-desc", start: "top 85%", once: true } }
      );

      /* ══ 42. Intro headline ── word cascade ══ */
      const introH = document.querySelector(".home-intro-headline");
      if (introH) {
        const restore = splitWords(introH);
        gsap.fromTo(introH.querySelectorAll(".gs-inner"),
          { y: "110%", opacity: 0, skewX: 4 },
          { y: "0%", opacity: 1, skewX: 0, duration: 0.8, ease, stagger: 0.045,
            scrollTrigger: { trigger: introH, start: "top 83%", once: true,
              onLeaveBack: () => restore?.() } }
        );
      }

      /* ══ 43. Services headline ── slide up ══ */
      gsap.fromTo(".services-headline",
        { y: 55, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease,
          scrollTrigger: { trigger: ".services-headline", start: "top 82%", once: true } }
      );

      /* ══ 44. Services section background ── colour fade ══ */
      gsap.fromTo(".services-section",
        { backgroundColor: "transparent" },
        { backgroundColor: "var(--color-lightgray)", duration: 1.2, ease: "none",
          scrollTrigger: { trigger: ".services-section", start: "top 70%", end: "top 30%", scrub: true } }
      );

      /* ══ 45. Footer email link ── underline draw ══ */
      gsap.fromTo(".dennis-footer-email-link",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease,
          scrollTrigger: { trigger: ".dennis-footer-email-link", start: "top 90%", once: true } }
      );

      /* ══ 46. "More work" button ══ */
      gsap.fromTo(".btn-normal",
        { y: 30, opacity: 0, scale: 0.88 },
        { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: easeBack,
          scrollTrigger: { trigger: ".btn-normal", start: "top 90%", once: true } }
      );

      /* ══ 47. Contact page header ══ */
      gsap.fromTo("[class*='contact'] h1",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease,
          scrollTrigger: { trigger: "[class*='contact'] h1", start: "top 88%", once: true } }
      );

      /* ══ 48. Projects page categories filter ══ */
      gsap.fromTo("[class*='category'] button, [class*='filter'] button",
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: easeBack, stagger: 0.07,
          scrollTrigger: { trigger: "[class*='category'], [class*='filter']", start: "top 88%", once: true } }
      );

      /* ══ 49. Grid images — alternating left/right ══ */
      gsap.utils.toArray<Element>("[style*='aspectRatio']").forEach((el, i) => {
        gsap.fromTo(el,
          { x: i % 2 === 0 ? -30 : 30, opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, duration: 0.85, ease,
            scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      /* ══ 50. Floating hamburger nav button ══ */
      gsap.fromTo(".floating-hamburger, [class*='hamburger']",
        { scale: 0, opacity: 0, rotate: 90 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.75, ease: easeBack, delay: 1.4 }
      );

      /* ══ 51. Footer curve flatten ══ */
      gsap.to(".curve-path", {
        attr: { d: "M0 0 Q50 0 100 0 Z" },
        ease: "none",
        scrollTrigger: {
          trigger: ".dennis-footer",
          start: "top bottom",
          end: "top 10%",
          scrub: 0.5,
        }
      });

      /* ══ 52. Interactive 3D Card Tilt with Perspective ══ */
      const tiltCards = document.querySelectorAll<HTMLElement>(
        ".service-card, .project-card, .work-row-item, .about-card, [class*='card']"
      );
      tiltCards.forEach((card) => {
        const handleCardMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -6;
          const rotateY = ((x - centerX) / centerX) * 6;
          gsap.to(card, {
            rotateX,
            rotateY,
            transformPerspective: 1000,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        const handleCardLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto",
          });
        };
        card.addEventListener("mousemove", handleCardMove);
        card.addEventListener("mouseleave", handleCardLeave);
      });

      /* ══ 53. Dynamic Scroll Velocity Skew (Dennis Snellenberg signature) ══ */
      const skewTargets = ".work-row-item, .service-card, .project-card, .skew-on-scroll";
      const skewSetter = gsap.quickSetter(skewTargets, "skewY", "deg");
      const clamp = gsap.utils.clamp(-3, 3);
      const proxy = { skew: 0 };

      ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -350);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3.out",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });

      /* ══ 54. Auto Magnetic Pull on Interactive Buttons & Badges ══ */
      const magneticTargets = document.querySelectorAll<HTMLElement>(
        ".btn-round, .btn-normal, .dennis-footer-contact-pill, .tag, .badge"
      );
      magneticTargets.forEach((btn) => {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power2.out" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power2.out" });

        const handleMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = (e.clientX - centerX) * 0.35;
          const dy = (e.clientY - centerY) * 0.35;
          xTo(dx);
          yTo(dy);
        };

        const handleLeave = () => {
          xTo(0);
          yTo(0);
        };

        btn.addEventListener("mousemove", handleMove);
        btn.addEventListener("mouseleave", handleLeave);
      });

      /* ══ 55. Ambient Floating Breathing Motion on Decorative Elements ══ */
      gsap.to(".digital-ball, .dennis-footer-avatar", {
        y: -10,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".arrow-icon", {
        rotate: 15,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* ══ 56. Global Interactive Click Ripple Sparks ══ */
      const handleGlobalClick = (e: MouseEvent) => {
        const ripple = document.createElement("span");
        ripple.className = "global-click-ripple";
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
      };
      window.addEventListener("click", handleGlobalClick);

      return () => {
        window.removeEventListener("click", handleGlobalClick);
      };
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
      cleanupReveal?.();
    };
  }, [pathname]);

  return null;
}
