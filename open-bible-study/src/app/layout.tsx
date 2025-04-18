import type { Metadata } from "next";
import { APP_NAME, UMAMI_SRC, UMAMI_WEBSITE_ID } from "@/lib/constants";
import { reading, sans } from "./fonts";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Illuminate Your Spiritual Journey, One Verse at a Time",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${reading.variable} antialiased`}>
        {children}
        <Toaster />
        <Script defer src={UMAMI_SRC} data-website-id={UMAMI_WEBSITE_ID} />
      </body>
    </html>
  );
}
