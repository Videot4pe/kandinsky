"use client";

import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { signUp } from "@/shared/actions/auth";
import { useFormState, useFormStatus } from "react-dom";
import { AuthFormButton } from "@/features/auth/ui/auth-form-button";

export function SignupForm() {
  const [formState, action] = useFormState(signUp, {
    errors: {},
  });
  const { pending } = useFormStatus();

  return (
    <form action={action}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
          {formState?.errors.email && (
            <div className="text-sm text-red-500">
              {formState.errors.email.join(", ")}
            </div>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
          {formState?.errors.password && (
            <div className="text-sm text-red-500">
              {formState.errors.password.join(", ")}
            </div>
          )}
        </div>
        <AuthFormButton label="Create an account" />
      </div>
    </form>
  );
}
