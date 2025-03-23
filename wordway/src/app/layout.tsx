import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import { AuthContextProvider } from "@/lib/context/auth-context";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "./logto";
import { TooltipProvider } from "@/modules/common/components/ui/tooltip";
import { reading, sans } from "./fonts";
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
  const { isAuthenticated } = await getLogtoContext(logtoConfig);

  return (
    <html lang="en">
      <body className={`${sans.variable} ${reading.variable} antialiased`}>
        <AuthContextProvider isAuthenticated={isAuthenticated}>
          <TooltipProvider>{children}</TooltipProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
