import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_KR } from "next/font/google";
import { SITE_URL } from "@/lib/i18n";
import "./globals.css";

// One family for Korean and Latin, plus a mono for labels and numbers.
const sans = IBM_Plex_Sans_KR({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-plex-sans", display: "swap" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: "Jaeyoung Choi — AI Engineer",
  description:
    "Jaeyoung Choi (최재영), AI Engineer: evaluation-first, safety-aware AI agents, multimodal pipelines, LLM + deterministic decision systems, medical imaging data and edge AI.",
  keywords: [
    "Jaeyoung Choi", "최재영", "재영", "AI Engineer", "AI Agent", "Agent Engineer", "Multimodal AI", "LLM",
    "Evaluation", "Python", "C++", "Computer Vision", "Edge AI", "On-device AI", "Jetson Orin Nano",
    "Medical AI", "DICOM", "AWS", "Portfolio",
  ],
  authors: [{ name: "Jaeyoung Choi", url: "https://github.com/nalziori" }],
  creator: "Jaeyoung Choi",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0c" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} antialiased`}>
      <body>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
