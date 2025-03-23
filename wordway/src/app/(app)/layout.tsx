"use client";
import { AppSidebar } from "@/modules/common/components/app-sidebar";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AppHeader } from "@/modules/common/components/app-header";
import { useIsAuthenticated } from "@/lib/context/auth-context";
import { Providers } from "@/lib/providers";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <Providers>
      <div className="flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <AppHeader />
          {children}
        </main>
      </div>
    </Providers>
  );
}
