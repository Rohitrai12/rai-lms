'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Loader, LucideGithub } from "lucide-react";
import React, { useTransition } from "react";
import { toast } from "sonner";

function SignInModule() {
  
  const [isPending, startGithubTransition] = useTransition()

  async function SingInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
      provider: "github",
      callbackURL:"/",
      fetchOptions:{
        onSuccess: () => {
          toast.success("Singed In with github, you will be redirected...")
        },
        onError:()=>{
          toast.error("Internal Server Error")
        }
      }
    })
    })
  }
  return (
    <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Sign in with Github or Email to continue</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" className="w-full gap-2"  onClick={SingInWithGithub} disabled={isPending}>
              {
                isPending ? <> <Loader className="size-4 animate-spine"/> <span>Loading...</span></> : <><LucideGithub className="w-5 h-5"/>Sign in with GitHub</>
              }
            </Button>
    
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex-1 h-px bg-border" />
            or continue with email
            <div className="flex-1 h-px bg-border" />
          </div>
    
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your Email" />
            </div>
    
            <Button className="w-full">Continue with Email</Button>
          </CardContent>
        </Card>
  )
}

export default SignInModule