"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/shared/api/query-client";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { SessionProvider } from "next-auth/react";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <TooltipProvider>{children}</TooltipProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
