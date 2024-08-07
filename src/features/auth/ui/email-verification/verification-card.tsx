"use client";

import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";
import { resendVerificationEmail } from "@/shared/actions/auth";
import { Label } from "@/shared/ui/label";
import ResendButton from "./resend-button";

export function VerificationCard() {
  const searchParams = useSearchParams();

  const email = searchParams?.get("email");
  const verificationSent = Boolean(searchParams?.get("verification_sent"));

  const [formState, action] = useFormState(
    resendVerificationEmail.bind(null, email!),
    undefined
  );

  return (
    <>
      {verificationSent && !formState?.error && (
        <Label>A verification link has been sent to your email.</Label>
      )}
      {formState?.error && (
        <Label className="text-red-500">{formState.error}</Label>
      )}

      <div>
        <form action={action}>
          <ResendButton />
        </form>
      </div>
    </>
  );
}
