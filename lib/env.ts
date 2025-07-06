// env.ts
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL:          z.string().url(),
    GITHUB_CLIENT_ID:      z.string().min(1),
    GITHUB_CLIENT_SECRET:  z.string().min(1),
    BETTER_AUTH_SECRET:    z.string().min(1),
    BETTER_AUTH_URL:       z.string().url(),
  },
  client: {
    BETTER_AUTH_URL:  z.string().url(),
    GITHUB_CLIENT_ID: z.string().min(1),
  },
  // for @t3-oss/env-nextjs v0.13+ you usually don’t need to manually pass process.env;
  // the plugin will wire it up for you.
});
