import { Literata, Inter } from "next/font/google";

export const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  fallback: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
});

export const reading = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  fallback: ["Times New Roman", "Times", "serif"],
});
