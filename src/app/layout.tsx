import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/ui/StructuredData";

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
  title: "MERN Stack & App Developer | Full Stack Engineer",
  description: "Portfolio of Chandraprakash Nyaupane (Arjun), a high-performance MERN Stack and App Developer specializing in scalable React, React Native, and Node.js ecosystems.",
  url: "https://chandraprakashnyaupane.com.np",
  ogImage: "/og-image.png",
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
    "MERN Stack Developer",
    "Full Stack Developer Nepal",
    "React Native Developer India",
    "Next.js Portfolio",
    "Software Engineer Roorkee",
    "App Developer Nepal",
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
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
        className={`${inter.variable} ${outfit.variable} antialiased selection:bg-accent-primary selection:text-white`}
      >
        <StructuredData />
        <div className="bg-noise fixed inset-0 z-50 pointer-events-none" />
        {children}
      </body>
    </html>
  );
}

