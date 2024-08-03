"use client";

import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { useFormState } from "react-dom";
import { authenticate } from "@/shared/actions/auth";
import { redirect } from "next/navigation";

export function SigninForm() {
  const [formState, action] = useFormState(authenticate, undefined);

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
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
}
