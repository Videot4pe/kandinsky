"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/shared/api/query-client";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { SessionProvider } from "next-auth/react";

export default function Providers({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <TooltipProvider>{children}</TooltipProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
