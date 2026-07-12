import React from "react";
import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { BrainProvider } from "@/lib/store";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

// Accessibility alternative font — designed for reading clarity, toggled
// on from Account > Accessibility. See globals.css `.dyslexia-font`.
const dyslexic = Atkinson_Hyperlegible({
  subsets: ["latin"],
  variable: "--font-dyslexic",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ReviseIQ — GCSE revision, precisely measured",
  description:
    "ReviseIQ builds a live model of what each student knows, then decides exactly what they should revise next.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${dyslexic.variable}`}
    >
      <body className="font-sans antialiased">
        <BrainProvider>{children}</BrainProvider>
      </body>
    </html>
  );
}
