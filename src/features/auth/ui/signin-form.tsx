"use client";

import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import Link from "next/link";
import { useFormState } from "react-dom";
import { authenticateWithCredentials } from "@/shared/actions/auth";
import { redirect } from "next/navigation";
import { AuthFormButton } from "@/features/auth/ui/auth-form-button";

export function SigninForm() {
  const [formState, action] = useFormState(
    authenticateWithCredentials,
    undefined
  );

  if (formState?.startsWith("EMAIL_NOT_VERIFIED")) {
    redirect(`/email/verify/send?email=${formState?.split(":")[1]}`);
  }

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
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        <AuthFormButton label="Login" />
        {formState && <div className="text-sm text-red-500">{formState}</div>}
      </div>
    </form>
  );
}
