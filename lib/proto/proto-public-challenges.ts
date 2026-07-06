import {
  PROTO_SANDBOX_FEATURED_STACK,
  type ProtoSandboxRoleCard,
  type ProtoSandboxRoleCardId,
} from "@/lib/proto/proto-sandbox-role-cards";

export type ProtoPublicChallenge = {
  id: ProtoSandboxRoleCardId;
  role: string;
  title: string;
  pay: string;
};

function cardById(id: ProtoSandboxRoleCardId): ProtoSandboxRoleCard {
  const card = PROTO_SANDBOX_FEATURED_STACK.find((entry) => entry.id === id);
  if (!card) throw new Error(`Missing public challenge card: ${id}`);
  return card;
}

/** Alternate tasks — checklist beats, not the taskBriefs shown in the featured column above. */
const PUBLIC_CHALLENGE_TASKS: readonly {
  id: ProtoSandboxRoleCardId;
  title: string;
}[] = [
  { id: "arc", title: "Wire health checks to pager" },
  { id: "canopy", title: "Ship token updates" },
  { id: "atlas", title: "Wire Kafka to warehouse" },
  { id: "meridian", title: "Prototype mobile-first screens" },
  { id: "signal", title: "Add feature store hooks" },
  { id: "ledger", title: "Map payloads to ledger schema" },
  { id: "harmony", title: "Define completion metrics" },
  { id: "northwind", title: "Draft 3-touch email sequence" },
  { id: "vertex", title: "Add regression snapshots" },
  { id: "pulse", title: "Build intake form flow" },
];

/** Open build challenges — different tasks from the featured role column on /proto. */
export const PROTO_PUBLIC_CHALLENGES: readonly ProtoPublicChallenge[] = PUBLIC_CHALLENGE_TASKS.map(
  ({ id, title }) => {
    const card = cardById(id);
    return {
      id,
      role: card.role,
      title,
      pay: card.roleSummary?.pay ?? "",
    };
  },
);

export const PROTO_PUBLIC_CHALLENGE_COLUMNS = 3;

const challengesByColumn = Array.from({ length: PROTO_PUBLIC_CHALLENGE_COLUMNS }, (_, column) =>
  PROTO_PUBLIC_CHALLENGES.filter((_, index) => index % PROTO_PUBLIC_CHALLENGE_COLUMNS === column),
);

export function protoPublicChallengesForColumn(column: number): readonly ProtoPublicChallenge[] {
  return challengesByColumn[column] ?? [];
}

/** Seamless scroll track — middle column runs reversed for visual variety. */
export function protoPublicChallengeTrack(column: number): ProtoPublicChallenge[] {
  const items = [...protoPublicChallengesForColumn(column)];
  const ordered = column === 1 ? items.reverse() : items;
  return [...ordered, ...ordered, ...ordered];
}

export function protoPublicChallengeLoopHeight(column: number, stride: number) {
  const count = protoPublicChallengesForColumn(column).length;
  return Math.max(count, 1) * stride;
}
