"use client";

import { ReactNode } from "react";
import { TooltipProvider } from "@/modules/common/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SidebarProvider } from "@/modules/common/components/ui/sidebar";

type ProvidersProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <NuqsAdapter>
      <SidebarProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>{children}</TooltipProvider>
        </QueryClientProvider>
      </SidebarProvider>
    </NuqsAdapter>
  );
}
