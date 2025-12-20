# Implementation Plan - Portfolio Redesign

## Phase 1: Foundation & Setup
- [ ] Initialize a new **Next.js 15 (App Router)** project with **Tailwind CSS v4** and **TypeScript**.
- [ ] Setup folder structure (Atomic design or feature-based).
- [ ] Configure `tailwind.config.js` with a custom color palette (Dark mode first, neon accents).
- [ ] Define Typography (Google Fonts: Outfit & Inter).

## Phase 2: Design System & Components
- [ ] **UI Components**: Create a library of premium components:
    - `GlassCard`: For modular content.
    - `MagneticButton`: For high-end interactivity.
    - `AnimatedSection`: Wrapper for scroll-triggered animations (Framer Motion).
    - `NoiseBackground`: To add texture/premium feel.

## Phase 3: Content Transformation (Narrative Flow)
1. **The Vision (Hero & About)**:
    - High-impact typography.
    - Split screen: Large "THE VISION" text vs dynamic profile visual.
    - Integrated bio with education as a "Growth Timeline".
2. **The Craft (Skills)**:
    - Modular Bento Grid.
    - Skill intensity visualized through luminosity/glow instead of progress bars.
    - Categorized by "Core Expertise", "Architecture", and "Tools".
3. **The Artifacts (Projects)**:
    - Horizontal scroll or large-scale modular grid.
    - "Case Study" detail view on click/hover.
    - Custom project cards with glassmorphism.
4. **The Connection (Contact)**:
    - Minimalist contact form with floating labels.
    - High-contrast social links with magnetic effects.

## Phase 4: Polish & Performance
- [ ] Implement smooth scrolling.
- [ ] Add micro-animations (hover, scroll-reveal).
- [ ] SEO optimization (Meta tags, OpenGraph).
- [ ] Responsive design (Mobile-first).

## Phase 5: Cleanup & Deployment
- [ ] Remove old Expo-related files (or move to `_old_version`).
- [ ] Final performance check.
