/**
 * @file types/portfolio.ts
 * @description Core domain types for the portfolio architecture.
 * Engineered for scalability and strict type safety.
 */

export interface Education {
    institution: string;
    degree: string;
    date: string;
    highlight?: string;
    link: string;
}

export interface SkillItem {
    name: string;
    level: number;
}

export interface SkillCategory {
    category: string;
    items: SkillItem[];
}

export interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    image: string;
    demo?: string;
    github?: string;
    color?: string;
    category?: string;
    year?: string;
    links?: {
        live?: string;
        github?: string;
    };
    tags?: string[];
}

export interface ContactData {
    email: string;
    linkedin: string;
    github: string;
    phone?: string;
    location?: string;
}

export interface SocialsData {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
}

export interface BioData {
    short: string;
    full: string;
}

export interface PortfolioData {
    name: string;
    nickname: string;
    title: string;
    age: string;
    bio: BioData;
    education: Education[];
    skills: SkillCategory[];
    projects: Project[];
    contact: ContactData;
    socials: SocialsData;
}
