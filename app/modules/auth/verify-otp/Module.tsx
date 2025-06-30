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
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

function VerifyOTPModule() {
      const [otp, setOtp] = useState("");
      const [EmailPending, startTransition] = useTransition();
    
      const isOTPCompleted = otp.length === 6;
    
      const params = useSearchParams();
      const router = useRouter();
    
      const email = params.get("email") as string;
    
      function verifyOtp() {
        startTransition(async () => {
          await authClient.signIn.emailOtp.verifyOtp({
            email: email,
            otp: otp,
            fetchOptions: {
              onSuccess: () => {
                toast.success("Email verified");
                router.push("/");
              },
              onError: () => {
                toast.error("Error verifying OTP");
              },
            },
          });
        });
      }
    
  return (
        <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email</CardTitle>
        <CardDescription>
          We have sent you a verification code to your email address. Please
          enter the code below to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            maxLength={6}
            className="gap-2"
            onChange={(value) => setOtp(value)}
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
          <p className="text-sm text-muted-foreground mt-3">
            Enter 6 digit code sent to your email
          </p>
        </div>

        <Button
          className="w-full"
          onClick={verifyOtp}
          disabled={EmailPending || !isOTPCompleted}
        >
          {EmailPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span className="ml-2">Loading...</span>
            </>
          ) : (
            <>
              <span>Verify Account</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export default VerifyOTPModule