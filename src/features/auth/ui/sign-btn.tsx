"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

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
          {avatar && (
            <Avatar className="size-6 mr-2 self-center">
              <AvatarImage src={avatar} alt="user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          )}
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
