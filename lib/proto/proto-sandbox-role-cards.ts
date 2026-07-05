export type ProtoSandboxRoleSummary = {
  pay: string;
  equity: string;
  location: string;
  type: string;
};

export type ProtoSandboxRoleCardId =
  | "harmony"
  | "ledger"
  | "northwind"
  | "atlas"
  | "meridian"
  | "signal"
  | "arc"
  | "canopy"
  | "vertex"
  | "pulse";

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
  /** Role facts shown inside the featured card body. */
  roleSummary?: ProtoSandboxRoleSummary;
};

/** First /proto feature box — three live sandbox roles shown in staggered cards. */
export const PROTO_SANDBOX_ROLE_CARDS: readonly ProtoSandboxRoleCard[] = [
  {
    id: "harmony",
    startupName: "Harmony Health",
    role: "Product Manager II",
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
    roleSummary: {
      pay: "$150–175k",
      equity: "0.20–0.35% equity",
      location: "Austin, TX",
      type: "Full-time",
    },
  },
] as const;

const FEATURED_STACK_EXTRA_ABOVE: readonly ProtoSandboxRoleCard[] = [
  {
    id: "arc",
    startupName: "Arc Compute",
    role: "Platform Engineer",
    taskBrief: "Harden the deploy pipeline",
    checklist: [
      "Add canary rollout step",
      "Wire health checks to pager",
      "Document rollback runbook",
    ],
    timeLimit: "65 min",
    model: "Claude Sonnet",
    canConnectMcp: true,
    videoRecordedPushToMain: true,
    roleSummary: {
      pay: "$175–205k",
      equity: "0.14–0.22% equity",
      location: "Seattle / Hybrid",
      type: "Full-time",
    },
  },
  {
    id: "canopy",
    startupName: "Canopy",
    role: "Staff Designer",
    taskBrief: "Redesign the settings hub",
    checklist: [
      "Map current IA pain points",
      "Prototype density variants",
      "Ship token updates",
    ],
    timeLimit: "85 min",
    model: "GPT-4o",
    canConnectMcp: false,
    videoRecordedPushToMain: true,
    roleSummary: {
      pay: "$165–195k",
      equity: "0.10–0.18% equity",
      location: "Remote (US)",
      type: "Full-time",
    },
  },
] as const;

const FEATURED_STACK_ABOVE: readonly ProtoSandboxRoleCard[] = [
  {
    id: "atlas",
    startupName: "Atlas Systems",
    role: "Data Engineer",
    taskBrief: "Stand up the event pipeline",
    checklist: [
      "Define schema for product events",
      "Wire Kafka to warehouse",
      "Add replay for failed batches",
    ],
    timeLimit: "75 min",
    model: "Claude Sonnet",
    canConnectMcp: true,
    videoRecordedPushToMain: true,
    roleSummary: {
      pay: "$170–200k",
      equity: "0.12–0.18% equity",
      location: "SF / Hybrid",
      type: "Full-time",
    },
  },
  {
    id: "meridian",
    startupName: "Meridian",
    role: "Design Lead",
    taskBrief: "Refresh the onboarding system",
    checklist: [
      "Audit current signup flow",
      "Prototype mobile-first screens",
      "Ship updated component kit",
    ],
    timeLimit: "80 min",
    model: "GPT-4o",
    canConnectMcp: false,
    videoRecordedPushToMain: true,
    roleSummary: {
      pay: "$155–185k",
      equity: "0.08–0.15% equity",
      location: "Remote (US)",
      type: "Full-time",
    },
  },
  {
    id: "signal",
    startupName: "Signal Labs",
    role: "ML Engineer",
    taskBrief: "Deploy the ranking model",
    checklist: [
      "Benchmark offline metrics",
      "Add feature store hooks",
      "Set up shadow traffic test",
    ],
    timeLimit: "70 min",
    model: "Fable 5",
    canConnectMcp: true,
    videoRecordedPushToMain: true,
    roleSummary: {
      pay: "$190–230k",
      equity: "0.18–0.28% equity",
      location: "NYC / Hybrid",
      type: "Full-time",
    },
  },
] as const;

const FEATURED_STACK_BELOW: readonly ProtoSandboxRoleCard[] = [
  {
    id: "vertex",
    startupName: "Vertex AI",
    role: "Research Engineer",
    taskBrief: "Benchmark the eval harness",
    checklist: [
      "Define golden-set metrics",
      "Add regression snapshots",
      "Write comparison report",
    ],
    timeLimit: "55 min",
    model: "Fable 5",
    canConnectMcp: true,
    videoRecordedPushToMain: true,
    roleSummary: {
      pay: "$185–215k",
      equity: "0.16–0.24% equity",
      location: "SF / Hybrid",
      type: "Full-time",
    },
  },
  {
    id: "pulse",
    startupName: "Pulse Health",
    role: "Ops Lead",
    taskBrief: "Stand up vendor onboarding",
    checklist: [
      "Draft SLA checklist",
      "Build intake form flow",
      "Pilot with two vendors",
    ],
    timeLimit: "50 min",
    model: "GPT-4o",
    canConnectMcp: false,
    videoRecordedPushToMain: true,
    roleSummary: {
      pay: "$140–165k",
      equity: "0.12–0.20% equity",
      location: "Boston, MA",
      type: "Full-time",
    },
  },
] as const;

function featuredCard(id: ProtoSandboxRoleCardId) {
  const card = PROTO_SANDBOX_ROLE_CARDS.find((entry) => entry.id === id);
  if (!card) {
    throw new Error(`Missing featured card: ${id}`);
  }
  return card;
}

/** Featured first-shader column — extras above, Ledger center, peers below. */
export const PROTO_SANDBOX_FEATURED_STACK: readonly ProtoSandboxRoleCard[] = [
  ...FEATURED_STACK_EXTRA_ABOVE,
  ...FEATURED_STACK_ABOVE,
  featuredCard("ledger"),
  featuredCard("harmony"),
  featuredCard("northwind"),
  ...FEATURED_STACK_BELOW,
];

export const PROTO_SANDBOX_FEATURED_LEDGER_INDEX = PROTO_SANDBOX_FEATURED_STACK.findIndex(
  (card) => card.id === "ledger",
);

/** @deprecated Use PROTO_SANDBOX_FEATURED_STACK — kept for any stale imports. */
export const PROTO_SANDBOX_FEATURED_CYCLE: readonly ProtoSandboxRoleCard[] = [
  featuredCard("ledger"),
  featuredCard("harmony"),
  featuredCard("northwind"),
];
