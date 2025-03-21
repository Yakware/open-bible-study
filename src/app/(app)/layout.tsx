"use client";
import { AppSidebar } from "@/modules/common/components/app-sidebar";
import { SidebarProvider } from "@/modules/common/components/ui/sidebar";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AppHeader } from "@/modules/common/components/app-header";
import { useIsAuthenticated } from "@/lib/context/auth-context";
import { NuqsAdapter } from "nuqs/adapters/next/app";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
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
  );
}
