export type ProtoSandboxRoleCard = {
  id: string;
  startupName: string;
  logoMark: string;
  logoBg: string;
  logoInk: string;
  role: string;
  task: string;
  timeLimit: string;
  model: string;
  canConnectMcp: boolean;
  videoRecordedPushToMain: boolean;
};

/** First /proto feature box — three live sandbox roles shown in staggered cards. */
export const PROTO_SANDBOX_ROLE_CARDS: readonly ProtoSandboxRoleCard[] = [
  {
    id: "harmony",
    startupName: "Harmony Health",
    logoMark: "H",
    logoBg: "#E8F4F0",
    logoInk: "#1A6B52",
    role: "Product Manager",
    task: "Ship a patient intake flow that scores completion rates and flags drop-off in the first 48 hours.",
    timeLimit: "90 min",
    model: "Claude Sonnet",
    canConnectMcp: true,
    videoRecordedPushToMain: true,
  },
  {
    id: "ledger",
    startupName: "Ledger AI",
    logoMark: "L",
    logoBg: "#EEF0FF",
    logoInk: "#3B4FCC",
    role: "Full-Stack Engineer",
    task: "Build a billing webhook handler that reconciles Stripe events against your internal ledger schema.",
    timeLimit: "60 min",
    model: "GPT-4o",
    canConnectMcp: true,
    videoRecordedPushToMain: true,
  },
  {
    id: "northwind",
    startupName: "Northwind Ops",
    logoMark: "N",
    logoBg: "#FFF4E8",
    logoInk: "#B45309",
    role: "Growth Lead",
    task: "Draft and A/B test a cold-outbound sequence targeting Series B fintech CTOs.",
    timeLimit: "45 min",
    model: "Fable 5",
    canConnectMcp: false,
    videoRecordedPushToMain: true,
  },
] as const;
