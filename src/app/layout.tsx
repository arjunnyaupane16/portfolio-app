import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/ui/StructuredData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import PageCurtain from "@/components/ui/PageCurtain";
import LoadingScreen from "@/components/ui/LoadingScreen";
import GlobalAnimations from "@/components/ui/GlobalAnimations";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const siteConfig = {
  name: "Chandraprakash Nyaupane",
  title: "Chandraprakash Nyaupane — Web & App Developer",
  description:
    "Portfolio of Chandraprakash Nyaupane (Arjun) — a Web and App Developer building clean, performant digital products with React, TypeScript, and React Native.",
  url: "https://chandraprakashnyaupane.com.np",
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Chandraprakash Nyaupane",
    "Arjun Nyaupane",
    "Web Developer",
    "App Developer",
    "Full Stack Developer",
    "Next.js Portfolio",
    "React Developer",
    "TypeScript Developer",
    "React Native Developer",
  ],
  authors: [{ name: "Chandraprakash Nyaupane" }],
  creator: "Chandraprakash Nyaupane",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@arjunnyaupane",
  },
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <StructuredData />

        {/* Global Dennis Magnetic Cursor & Particles */}
        <CustomCursor />

        {/* Top Scroll Progress Bar */}
        <ScrollProgress />

        {/* Ambient Gradient Glow Orbs */}
        <AnimatedBackground />

        {/* Multilingual Preloader */}
        <LoadingScreen />

        {/* Smooth Page Transition Curtain */}
        <PageCurtain />

        <SmoothScroll>
          <GlobalAnimations />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
