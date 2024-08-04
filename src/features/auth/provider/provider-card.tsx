"use client";

import { signIn } from "@/shared/lib/auth";
import { useFormState } from "react-dom";
import { ProviderButton } from "@/features/auth/provider/provider-button";
import { authenticateWithProvider } from "@/shared/actions/auth";
import { Input } from "@/shared/ui/input";

export function ProviderCard({
  provider,
  type = "signin",
}: {
  provider: any;
  type: "signup" | "signin";
}) {
  const label =
    type === "signup"
      ? `Sign up with ${provider.name}`
      : `Sign in with ${provider.name}`;

  const [formState, action] = useFormState(authenticateWithProvider, undefined);

  return (
    <form action={action}>
      <Input defaultValue={provider.id} id="id" name="id" className="hidden" />
      <ProviderButton label={label} />
    </form>
  );
}
