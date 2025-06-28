import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, GraduationCap } from "lucide-react";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-4">
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>

        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <GraduationCap className="h-8 w-8" />
          RAI-LMS
        </Link>

        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6 mt-12">
        {children}

        <div className="text-balance text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <span className="hover:text-primary hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="hover:text-primary hover:underline cursor-pointer">
            Privacy Policy
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
