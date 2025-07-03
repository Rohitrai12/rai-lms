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
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyRequest() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [emailPending, startTransition] = useTransition();
    const params = useSearchParams();
    const email = params.get("email") as string;
    const isOtpCompleted = otp.length === 6;

    function verifyOtp() {
        startTransition(async () => {
            await authClient.signIn.emailOtp({
                email: email,
                otp: otp,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Email verified successfully!");
                        router.push("/");
                    },
                    onError: () => {
                        toast.error(
                            "Invalid or expired code. Please try again."
                        );
                    },
                },
            });
        });
    }

    return (
        <Card className="w-full mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">
                    Please check your email
                </CardTitle>
                <CardDescription>
                    We've sent a 6-digit verification code to your email
                    address. Please check your inbox and enter the code below.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-2">
                    <InputOTP
                        value={otp}
                        onChange={(value) => setOtp(value)}
                        maxLength={6}
                        className="gap-2"
                        pattern={REGEXP_ONLY_DIGITS}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <p className="text-sm text-muted-foreground">
                        Enter the 6-digit code from your email
                    </p>
                </div>
                <Button
                    onClick={verifyOtp}
                    disabled={emailPending || !isOtpCompleted}
                    className="w-full cursor-pointer"
                >
                    {emailPending ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            <span>Verify Email</span>
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}