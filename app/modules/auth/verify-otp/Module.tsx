"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useTransition, useEffect } from "react";
import { toast } from "sonner";

function VerifyOTPModule() {
  const [otp, setOtp] = useState("");
  const [isPending, startTransition] = useTransition();

  const params = useSearchParams();
  const router = useRouter();

  const email = params.get("email");

  useEffect(() => {
    if (!email) {
      toast.error("No email provided in the URL");
      router.push("/sign-in"); // fallback redirect
    }
  }, [email, router]);

  const isOTPCompleted = otp.length === 6;

 function verifyOtp() {
  if (!email) return;

  startTransition(async () => {
    try {
      await authClient.emailOtp.verifyEmail({ email, otp });

      toast.success("Email verified successfully!");
      router.push("/");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Invalid or expired OTP. Please try again."
      );
    }
  });
}


  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Verify Your Email</CardTitle>
        <CardDescription>
          Enter the 6-digit verification code we sent to your email address.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            maxLength={6}
            className="gap-2"
            value={otp}
            onChange={setOtp}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground mt-2">
            6-digit code sent to your email.
          </p>
        </div>

        <Button
          className="w-full"
          onClick={verifyOtp}
          disabled={isPending || !isOTPCompleted}
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span className="ml-2">Verifying...</span>
            </>
          ) : (
            <>Verify Account</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

export default VerifyOTPModule;
