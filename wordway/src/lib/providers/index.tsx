"use client";

import { ReactNode } from "react";
import { TooltipProvider } from "@/modules/common/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SidebarProvider } from "@/modules/common/components/ui/sidebar";
import { NotesContextProvider } from "../context/notes-context";

type ProvidersProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <NuqsAdapter>
      <SidebarProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <NotesContextProvider>{children}</NotesContextProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </SidebarProvider>
    </NuqsAdapter>
  );
}
