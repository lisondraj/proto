"use client";

import { inter, suisseIntl } from "@/lib/home/fonts";
import {
  PROTO_SANDBOX_ROLE_CARDS,
  type ProtoSandboxRoleCard,
} from "@/lib/proto/proto-sandbox-role-cards";

const INK = "#1E343A";
const MUTED = "#6B7280";
const TAG_BG = "#F3F4F6";
const TAG_INK = "#9CA3AF";
const CARD_BORDER = "#E8EAED";

type VisualLayout = "phone" | "desktop";

type VisualTokens = {
  maxWidth: string;
  stageHeight: string;
  cardWidth: string;
  cardPad: string;
  cardRadius: string;
  logoSize: string;
  logoMark: string;
  startupName: string;
  role: string;
  task: string;
  tag: string;
  tagPadX: string;
  tagPadY: string;
  tagGap: string;
  headerGap: string;
  bodyGap: string;
  tagRowMarginTop: string;
};

const PHONE_TOKENS: VisualTokens = {
  maxWidth: "min(99%, 22.5rem)",
  stageHeight: "clamp(16.5rem, 49vmin, 20.5rem)",
  cardWidth: "84%",
  cardPad: "clamp(0.78rem, 2.35vmin, 0.98rem) clamp(0.82rem, 2.5vmin, 1.02rem)",
  cardRadius: "clamp(0.72rem, 2.15vmin, 0.9rem)",
  logoSize: "clamp(1.35rem, 4.05vmin, 1.62rem)",
  logoMark: "clamp(0.62rem, 1.85vmin, 0.74rem)",
  startupName: "clamp(0.68rem, 2.05vmin, 0.82rem)",
  role: "clamp(0.88rem, 2.65vmin, 1.05rem)",
  task: "clamp(0.72rem, 2.15vmin, 0.86rem)",
  tag: "clamp(0.58rem, 1.75vmin, 0.68rem)",
  tagPadX: "clamp(0.38rem, 1.15vmin, 0.48rem)",
  tagPadY: "clamp(0.18rem, 0.55vmin, 0.24rem)",
  tagGap: "clamp(0.28rem, 0.85vmin, 0.36rem)",
  headerGap: "clamp(0.42rem, 1.28vmin, 0.52rem)",
  bodyGap: "clamp(0.32rem, 0.95vmin, 0.4rem)",
  tagRowMarginTop: "clamp(0.55rem, 1.65vmin, 0.68rem)",
};

const DESKTOP_TOKENS: VisualTokens = {
  maxWidth: "min(100%, 26rem)",
  stageHeight: "clamp(17rem, 88%, 21.5rem)",
  cardWidth: "82%",
  cardPad: "clamp(0.85rem, 1.05vw, 1.05rem) clamp(0.9rem, 1.1vw, 1.1rem)",
  cardRadius: "clamp(0.78rem, 0.92vw, 0.95rem)",
  logoSize: "clamp(1.42rem, 1.65vw, 1.72rem)",
  logoMark: "clamp(0.65rem, 0.78vw, 0.78rem)",
  startupName: "clamp(0.72rem, 0.85vw, 0.86rem)",
  role: "clamp(0.92rem, 1.08vw, 1.1rem)",
  task: "clamp(0.76rem, 0.9vw, 0.9rem)",
  tag: "clamp(0.62rem, 0.72vw, 0.72rem)",
  tagPadX: "clamp(0.4rem, 0.48vw, 0.52rem)",
  tagPadY: "clamp(0.2rem, 0.24vw, 0.26rem)",
  tagGap: "clamp(0.3rem, 0.36vw, 0.38rem)",
  headerGap: "clamp(0.45rem, 0.55vw, 0.58rem)",
  bodyGap: "clamp(0.34rem, 0.42vw, 0.44rem)",
  tagRowMarginTop: "clamp(0.58rem, 0.72vw, 0.72rem)",
};

const CARD_LAYOUT = [
  { top: "0%", left: "16%", zIndex: 1 },
  { top: "27%", left: "0%", zIndex: 2 },
  { top: "54%", left: "14%", zIndex: 3 },
] as const;

function RoleCardTag({ label, tokens }: { label: string; tokens: VisualTokens }) {
  return (
    <span
      className={`${inter.className} inline-flex shrink-0 items-center font-medium leading-none`}
      style={{
        background: TAG_BG,
        color: TAG_INK,
        fontSize: tokens.tag,
        padding: `${tokens.tagPadY} ${tokens.tagPadX}`,
        borderRadius: "999px",
      }}
    >
      {label}
    </span>
  );
}

function RoleCardTags({ card, tokens }: { card: ProtoSandboxRoleCard; tokens: VisualTokens }) {
  const tags = [
    card.timeLimit,
    card.model,
    card.canConnectMcp ? "Can connect MCP" : "No MCP",
    card.videoRecordedPushToMain ? "Video · push to main" : "No recording",
  ];

  return (
    <div
      className="flex flex-wrap items-center"
      style={{ gap: tokens.tagGap, marginTop: tokens.tagRowMarginTop }}
    >
      {tags.map((label) => (
        <RoleCardTag key={label} label={label} tokens={tokens} />
      ))}
    </div>
  );
}

function SandboxRoleCard({
  card,
  index,
  tokens,
}: {
  card: ProtoSandboxRoleCard;
  index: number;
  tokens: VisualTokens;
}) {
  const position = CARD_LAYOUT[index] ?? CARD_LAYOUT[0];

  return (
    <article
      className={`absolute border bg-white shadow-[0_8px_28px_rgba(0,0,0,0.14)] ${suisseIntl.className}`}
      style={{
        top: position.top,
        left: position.left,
        zIndex: position.zIndex,
        width: tokens.cardWidth,
        padding: tokens.cardPad,
        borderRadius: tokens.cardRadius,
        borderColor: CARD_BORDER,
      }}
    >
      <div className="flex items-center" style={{ gap: tokens.headerGap }}>
        <span
          className="grid shrink-0 place-items-center rounded-[0.42rem] font-semibold"
          style={{
            width: tokens.logoSize,
            height: tokens.logoSize,
            background: card.logoBg,
            color: card.logoInk,
            fontSize: tokens.logoMark,
          }}
          aria-hidden
        >
          {card.logoMark}
        </span>
        <span
          className={`${inter.className} min-w-0 truncate font-medium leading-tight`}
          style={{ color: MUTED, fontSize: tokens.startupName }}
        >
          {card.startupName}
        </span>
      </div>

      <h3
        className="font-semibold leading-tight tracking-[-0.02em]"
        style={{
          color: INK,
          fontSize: tokens.role,
          marginTop: tokens.bodyGap,
        }}
      >
        {card.role}
      </h3>

      <p
        className={`${inter.className} line-clamp-3 font-normal leading-snug`}
        style={{
          color: MUTED,
          fontSize: tokens.task,
          marginTop: tokens.bodyGap,
        }}
      >
        {card.task}
      </p>

      <RoleCardTags card={card} tokens={tokens} />
    </article>
  );
}

/** /proto agents slide — three staggered sandbox role cards inside the first shader box. */
export function ProtoSandboxRoleCardsVisual({ layout = "phone" }: { layout?: VisualLayout }) {
  const tokens = layout === "desktop" ? DESKTOP_TOKENS : PHONE_TOKENS;

  return (
    <div
      className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`}
      style={{ maxWidth: tokens.maxWidth }}
      aria-hidden
    >
      <div className="relative w-full" style={{ height: tokens.stageHeight }}>
        {PROTO_SANDBOX_ROLE_CARDS.map((card, index) => (
          <SandboxRoleCard key={card.id} card={card} index={index} tokens={tokens} />
        ))}
      </div>
    </div>
  );
}
