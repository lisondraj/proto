export type ProtoSandboxRoleSummary = {
  pay: string;
  equity: string;
  location: string;
  type: string;
};

export type ProtoSandboxRoleCardId = "harmony" | "ledger" | "northwind";

export type ProtoSandboxRoleCard = {
  id: ProtoSandboxRoleCardId;
  startupName: string;
  role: string;
  taskBrief: string;
  checklist: readonly [string, string, string];
  timeLimit: string;
  model: string;
  canConnectMcp: boolean;
  videoRecordedPushToMain: boolean;
  /** Role facts shown inside the card body (featured Ledger-style layout). */
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

/**
 * Featured role carousel in the first shader — Ledger layout with three companies.
 * Order: Ledger → Harmony → Northwind → Ledger…
 */
export const PROTO_FEATURED_ROLE_SLIDES: readonly ProtoSandboxRoleCard[] = [
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
    roleSummary: {
      pay: "$160–190k",
      equity: "0.10–0.20% equity",
      location: "NYC / Hybrid",
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
    roleSummary: {
      pay: "$150–175k",
      equity: "0.20–0.35% equity",
      location: "Austin, TX",
      type: "Full-time",
    },
  },
] as const;
