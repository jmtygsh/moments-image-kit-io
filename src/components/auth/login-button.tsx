"use client";

import {useRouter} from "next/navigation";
import {useState} from "react";

import {LogIn, LogOut, User} from "lucide-react";
import {signOut, useSession} from "next-auth/react";

import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AuthModal from "./auth-modal";

const LoginButton = () => {
  const {data: session, status} = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({redirect: false});
      // Redirect to home page after successful logout
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <Button
        className="cursor-pointer rounded-full bg-gradient-to-bl from-pink-400 to-pink-800 px-5 text-white opacity-50"
        disabled
      >
        Loading...
      </Button>
    );
  }

  if (session?.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="cursor-pointer rounded-full bg-gradient-to-bl from-pink-400 to-pink-800 px-5 text-white"
            disabled={isLoading}
          >
            <User className="h-4 w-4" />
            {session.user.name || session.user.email}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem disabled>
            <User className="mr-2 h-4 w-4" />
            {session.user.email}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} disabled={isLoading}>
            <LogOut className="mr-2 h-4 w-4" />
            {isLoading ? "Signing out..." : "Sign out"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button
        className="cursor-pointer rounded-full bg-gradient-to-bl from-pink-400 to-pink-800 px-5 text-white"
        onClick={() => setAuthModalOpen(true)}
        disabled={isLoading}
      >
        <LogIn className="h-4 w-4" />
        Login
      </Button>
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
};

export default LoginButton;
