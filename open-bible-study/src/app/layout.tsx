import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import { AuthContextProvider } from "@/lib/context/auth-context";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "./logto";
import { TooltipProvider } from "@/modules/common/components/ui/tooltip";
import { reading, sans } from "./fonts";
import { SidebarProvider } from "@/modules/common/components/ui/sidebar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AppSidebar } from "@/modules/common/components/app-sidebar";
import { AppHeader } from "@/modules/common/components/app-header";
import { redirect } from "next/navigation";
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
                  <AppSidebar />
                  <main className="flex-1">
                    <AppHeader />
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
