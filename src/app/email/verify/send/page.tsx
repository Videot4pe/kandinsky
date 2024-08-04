import { EmailVerificationForm } from "@/features/auth/ui/email-verification-form";

import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

export default function Send() {
  return (
    <div className="h-[100dvh] w-full flex flex-col justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="mb-4">Please verify your email first.</div>
          <Suspense>
            <EmailVerificationForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
