import { AuthContextProvider } from "@/lib/context/auth-context";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "./logto";
import { TooltipProvider } from "@/modules/common/components/ui/tooltip";
import { SidebarProvider } from "@/modules/common/components/ui/sidebar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Sidebar } from "@/modules/common/components/sidebar";
import { Header } from "@/modules/common/components/header";
import { redirect } from "next/navigation";

import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import { reading, sans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Illuminate Your Spiritual Journey, One Verse at a Time",
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = await getLogtoContext(logtoConfig);

  if (!isAuthenticated) {
    redirect("/api/login");
  }

  return (
    <html lang="en">
      <body className={`${sans.variable} ${reading.variable} antialiased`}>
        <AuthContextProvider isAuthenticated={isAuthenticated}>
          <TooltipProvider>
            <NuqsAdapter>
              <div className="flex">
                <SidebarProvider>
                  <Sidebar />
                  <main className="flex-1">
                    <Header />
                    {children}
                  </main>
                </SidebarProvider>
              </div>
            </NuqsAdapter>
          </TooltipProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
