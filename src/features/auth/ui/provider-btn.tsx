"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/shared/ui/button";

export function ProviderBtn({
  provider,
  type = "signin",
}: {
  provider: any;
  type: "signup" | "signin";
}) {
  const label = type === "signup" ? "Sign up with" : "Sign in with";

  return (
    <Button variant="outline" onClick={() => signIn(provider.id)}>
      {label} {provider.name}
    </Button>
  );
}
