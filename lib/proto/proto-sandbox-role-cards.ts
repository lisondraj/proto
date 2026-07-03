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
    taskBrief: "Ship the invoice webhook flow",
    checklist: [
      "Define idempotent handlers",
      "Write retry-safe ledger mapping",
      "Pick two webhook test cases",
    ],
    timeLimit: "90 min",
    model: "Claude Sonnet",
    canConnectMcp: true,
    videoRecordedPushToMain: true,
  },
  {
    id: "northwind",
    startupName: "Northwind Ops",
    role: "Growth Lead",
    taskBrief: "Ship the outbound CTO sequence",
    checklist: [
      "Define reply-rate metrics",
      "Write persona-specific email copy",
      "Pick two outreach experiments",
    ],
    timeLimit: "90 min",
    model: "Claude Sonnet",
    canConnectMcp: true,
    videoRecordedPushToMain: true,
  },
] as const;
