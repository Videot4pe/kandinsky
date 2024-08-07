import { VerificationCard } from "@/features/auth/ui/email-verification/verification-card";

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
      <Card className="mx-auto max-w-sm min-w-[360px]">
        <CardHeader>
          <CardTitle className="text-2xl">Email verification</CardTitle>
          <CardDescription>Please verify your email first</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Suspense>
            <VerificationCard />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
