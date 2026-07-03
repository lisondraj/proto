export type ProtoSandboxRoleSummary = {
  pay: string;
  equity: string;
  location: string;
  type: string;
};

export type ProtoSandboxRoleCard = {
  id: "harmony" | "ledger" | "northwind";
  startupName: string;
  role: string;
  taskBrief: string;
  checklist: readonly [string, string, string];
  timeLimit: string;
  model: string;
  canConnectMcp: boolean;
  videoRecordedPushToMain: boolean;
  /** Role facts shown inside the card body (second shader Ledger layout). */
  roleSummary?: ProtoSandboxRoleSummary;
};

/** First /proto feature box — three live sandbox roles shown in staggered cards. */
export const PROTO_SANDBOX_ROLE_CARDS: readonly ProtoSandboxRoleCard[] = [
  {
    id: "harmony",
    startupName: "Harmony Health",
    role: "Product Manager",
    taskBrief: "Ship the patient intake flow",
    checklist: [
      "Define completion metrics",
      "Write mobile acceptance criteria",
      "Pick two launch experiments",
    ],
    timeLimit: "90 min",
    model: "Claude Sonnet",
    canConnectMcp: true,
    videoRecordedPushToMain: true,
  },
  {
    id: "ledger",
    startupName: "Ledger AI",
    role: "Full-Stack Engineer",
    taskBrief: "Build the Stripe webhook sync",
    checklist: [
      "Handle invoice + subscription events",
      "Map payloads to ledger schema",
      "Test a failed webhook replay",
    ],
    timeLimit: "60 min",
    model: "GPT-4o",
    canConnectMcp: true,
    videoRecordedPushToMain: true,
    roleSummary: {
      pay: "$180–220k",
      equity: "0.15–0.25% equity",
      location: "Remote (US)",
      type: "Full-time",
    },
  },
  {
    id: "northwind",
    startupName: "Northwind Ops",
    role: "Growth Lead",
    taskBrief: "Launch outbound to fintech CTOs",
    checklist: [
      "Draft 3-touch email sequence",
      "Set up A/B copy test",
      "Write reply playbook",
    ],
    timeLimit: "45 min",
    model: "Fable 5",
    canConnectMcp: false,
    videoRecordedPushToMain: true,
  },
] as const;
