"use client";

import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";
import { resendVerificationEmail } from "@/shared/actions/auth";
import ResendButton from "./resend-button";

export function VerificationCard() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const verificationSent = Boolean(searchParams.get("verification_sent"));

  const [formState, action] = useFormState(
    resendVerificationEmail.bind(null, email!),
    undefined
  );

  return (
    <>
      {verificationSent && (
        <div className="text-green-500 mb-4">
          A verification link has been sent to your email.
        </div>
      )}

      <div>
        <form action={action}>
          <ResendButton />
        </form>
      </div>
    </>
  );
}
