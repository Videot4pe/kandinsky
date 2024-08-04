"use client";

import { Button } from "@/shared/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import React from "react";

export function AuthFormButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
}
