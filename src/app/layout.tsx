import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import "./globals.css";
import { AuthContextProvider } from "@/lib/context/auth-context";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "./logto";

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
      <body className="antialiased">
        <AuthContextProvider isAuthenticated={isAuthenticated}>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
