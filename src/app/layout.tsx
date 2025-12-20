import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chandraprakash Nyaupane | Full Stack & Mobile Dev",
  description: "Senior Portfolio of Chandraprakash Nyaupane, specializing in React, React Native, and Node.js.",
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
        <div className="bg-noise fixed inset-0 z-50 pointer-events-none" />
        {children}
      </body>
    </html>
  );
}

