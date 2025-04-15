import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "../logto";
import { getUserByExternalId } from "@/data-access/user";
import { redirect } from "next/navigation";
import { AuthContextProvider } from "@/lib/context/auth-context";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { claims, isAuthenticated } = await getLogtoContext(logtoConfig);

  if (!claims || !isAuthenticated) {
    redirect("/api/login");
  }

  const externalId = claims.sub;
  const user = await getUserByExternalId(externalId);
  if (!user?.onboardingCompletedAt) {
    redirect("/onboarding");
  }

  return (
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
  );
}
