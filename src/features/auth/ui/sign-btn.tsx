"use client";

import { LogIn, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { Profile } from "@/features/auth/ui/profile";

export const SignBtn = () => {
  const { data: session } = useSession();

  if (session === null) {
    window.location.href = "/sign-in";
  }

  const avatar = session?.user?.image;

  return (
    <>
      {session && (
        <div className="flex">
          <Profile avatar={avatar} />
          <LogOut
            className="size-4 cursor-pointer self-center"
            onClick={() => signOut()}
          />
        </div>
      )}
      {!session && (
        <LogIn
          className="size-4 cursor-pointer self-center"
          onClick={() => signIn()}
        />
      )}
    </>
  );
};
