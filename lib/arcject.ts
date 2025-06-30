import arcjet, {
  fixedWindow,
  detectBot,
  protectSignup,
  sensitiveInfo,
  shield,
  type ShieldOptions,
} from "@arcjet/next";

const arcjetConfig = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["fingerprint"],
  rules: [
    shield({
      mode: "LIVE",
    }),
  ],
});

export {
  fixedWindow,
  detectBot,
  protectSignup,
  sensitiveInfo,
  shield,
  ShieldOptions,
};

export default arcjetConfig;
