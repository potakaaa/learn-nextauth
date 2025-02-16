import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconLogin,
} from "@tabler/icons-react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-7 p-10 border-accent border rounded-xl shadow-md">
      <section className="flex flex-col self-left">
        <h2 className="text-left text-xl self-start font-extrabold">
          Welcome to Next-Auth
        </h2>
        <p className="text-sm">Start your Login Journey here!</p>
      </section>

      <form className="space-y-3">
        <LabelInputContainer>
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="freaky123" type="text" />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="gerald@gmail.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="*******" type="password" />
        </LabelInputContainer>
        <Button
          className="w-full hover:bg-muted hover:text-primary relative group/btn"
          type="submit"
        >
          Log In &rarr;
          <BottomGradient />
        </Button>
      </form>
      <div className="bg-gradient-to-r from-transparent via-neutral-500 dark:via-neutral-900 to-transparent my-8 h-[1px] w-full" />
      <div className="flex flex-col w-full space-y-2">
        <Button className="w-full relative group/btn py-5 hover:bg-muted hover:text-primary self-start justify-start px-5">
          <IconBrandGoogle size={20} />
          <p>Log In with Google</p>
          <BottomGradient />
        </Button>
        <Button className="w-full relative group/btn py-5 hover:bg-muted hover:text-primary justify-start px-5">
          <IconLogin size={20} />
          <p>New User? Sign Up</p>
          <BottomGradient />
        </Button>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
