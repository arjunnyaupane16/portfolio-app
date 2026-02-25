import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/ui/StructuredData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import SmoothScroll from "@/components/ui/SmoothScroll";
import RouteTransition from "@/components/ui/RouteTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const siteConfig = {
  name: "Chandraprakash Nyaupane",
  title: "TypeScript Developer & AI/ML Passionate | Full Stack Engineer",
  description: "Portfolio of Chandraprakash Nyaupane (Arjun), a TypeScript developer and AI/ML passionate developer building scalable web applications and exploring intelligent solutions.",
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
    "Chandra Nyaupane",
    "Arjun Nyaupane",
    "Chandraprakash",
    "TypeScript Developer",
    "AI ML Passionate",
    "Full Stack Developer",
    "Next.js Portfolio",
    "Node.js Developer",
    "Firebase Developer",
    "Software Engineer",
    "Chandraprakash Portfolio",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased`}
      >
        <StructuredData />
        <div className="bg-noise fixed inset-0 z-50 pointer-events-none" />
        <SmoothScroll>
          <AnimatedBackground />
          <Navbar />
          <main className="relative min-h-screen">
            <RouteTransition>
              {children}
            </RouteTransition>
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
