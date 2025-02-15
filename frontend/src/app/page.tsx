"use client";
import { Button } from "@/components/ui/button";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
      <Button onClick={() => signIn("google")}>Log In using Google</Button>
      <p className="font-medium text-lg">
        {status !== "authenticated" ? "User not logged in" : ""}
      </p>
      {status === "authenticated" && (
        <div className="flex flex-col items-center space-y-2">
          <Button onClick={() => signOut()}>Sign Out</Button>
          <p>Signed in</p>
          <p>{session?.user?.name}</p>
          <p>{session?.user?.email}</p>
        </div>
      )}
    </div>
  );
}
