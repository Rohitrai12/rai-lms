import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgres",
  }),
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID as string,
      clientSecret: env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        console.log("Sending OTP…", { email, otp });
        await resend.emails.send({
          from: "onboarding@your-domain.com",
          to: [email],
          subject: "Your sign‑in OTP",
          html: `<p>Your OTP is <strong>${otp}</strong></p>`,
        });
        console.log("Resend.emails.send() returned");
      },
    }),
  ],
});
