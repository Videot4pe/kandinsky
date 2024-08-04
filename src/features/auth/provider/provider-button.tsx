"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/shared/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

export function ProviderButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="secondary"
      className="w-full"
      disabled={pending}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
}
