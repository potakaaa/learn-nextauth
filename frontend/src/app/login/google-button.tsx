"use client";

import { BottomGradient } from "@/components/ui/bottom-gradient";
import { Button } from "@/components/ui/button";
import { IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import React from "react";

const GoogleButton = () => {
  return (
    <Button
      className="w-full relative group/btn py-5 hover:bg-muted hover:text-primary self-start justify-start px-5"
      onClick={() => signIn("github")}
    >
      <IconBrandGoogle size={20} />
      <p>Log In with Google</p>
      <BottomGradient />
    </Button>
  );
};

export default GoogleButton;
