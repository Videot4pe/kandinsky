import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import ConfirmationCard from "@/features/auth/ui/email-verification/confirmation-card";

export default function Verify() {
  return (
    <div className="h-[100dvh] w-full flex flex-col justify-center">
      <Card className="mx-auto max-w-sm min-w-[360px]">
        <CardHeader>
          <CardTitle className="text-2xl">Email verification</CardTitle>
          <CardDescription>Verifying your email</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Suspense>
            <ConfirmationCard />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
