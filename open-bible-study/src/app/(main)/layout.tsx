import { TooltipProvider } from "@radix-ui/react-tooltip";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { redirect } from "next/navigation";
import { getUserSession } from "@/data-access/user";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getUserSession();

  if (!session) {
    redirect("/login");
  }

  return (
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
  );
}
