"use client";
import { Button } from "@/components/ui/button";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <Button onClick={() => signIn()}>Log In using Google</Button>
      <p className="font-medium text-lg">
        {status !== "authenticated" ? "User not logged in" : ""}
      </p>
      {status === "authenticated" && (
        <div>
          <Button onClick={() => signOut()}>Log In using Google</Button>
          <p>Signed in</p>
        </div>
      )}
    </>
  );
}
