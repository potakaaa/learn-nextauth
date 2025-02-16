"use client";
import { Button } from "@/components/ui/button";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
      <Link
        href={"/login"}
        className="bg-foreground text-white px-5 py-2 font-bold rounded-full shadow-md hover:text-primary hover:bg-transparent hover:shadow-none transition duration-300"
      >
        Enter Log In Page
      </Link>
    </div>
  );
}
