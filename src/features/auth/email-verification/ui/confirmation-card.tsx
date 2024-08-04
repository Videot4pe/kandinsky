"use client";

import { findUserByEmail, verifyEmail } from "@/shared/actions/auth";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/use-toast";

// Defining the Email Verification Component
export default function ConfirmationCard() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const { isLoading, error, isSuccess } = useQuery({
    queryKey: ["verifyEmail", email, token],
    queryFn: () => verifyEmail(email!, token!),
    enabled: !!email && !!token,
    retry: false,
  });

  if (isSuccess) {
    redirect("/sign-in");
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin" />
        </div>
      )}

      {error && (
        <div className="text-red-500 mb-4">
          {error?.message ?? "Something went wrong"}
        </div>
      )}

      <div className="my-3">
        <Button variant="secondary" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          <Link href="/sign-in">Back to Login</Link>
        </Button>
      </div>
    </>
  );
}
