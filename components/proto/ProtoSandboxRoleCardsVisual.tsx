"use client";

import { useEffect, useState } from "react";

import { dmSans, inter, plusJakartaSans, suisseIntl } from "@/lib/home/fonts";
import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";
import { ProtoSandboxStartupLogo } from "@/components/proto/ProtoSandboxStartupLogos";
import {
  PROTO_SANDBOX_FEATURED_CYCLE,
  PROTO_SANDBOX_ROLE_CARDS,
  type ProtoSandboxRoleCard,
} from "@/lib/proto/proto-sandbox-role-cards";

const FEATURED_HOLD_MS = 20000;
/** Soft dissolve — same ease as proto hero reveals. */
const FEATURED_CROSSFADE_MS = 380;
const FEATURED_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const INK = "#2C2419";
const MUTED = "#7A6F63";
const TAG_BG = "#F6F0E6";
const TAG_INK = "#A39686";
const RAIL_LINE = "#DDD2C2";
const TASK_DOT = "#C9BBA8";
const CARD_FACE = "#FFF9F2";
/** Soft cream wash — warm paper, not flat white. */
const CARD_SURFACE =
  "linear-gradient(180deg, #FFFCF7 0%, #FFF9F2 52%, #F9F1E6 100%)";

/** Frosted glass panels for featured position cards — no border; depth from light only. */
const FEATURED_GLASS_BY_ID: Record<
  ProtoSandboxRoleCard["id"],
  { background: string; shadow: string }
> = {
  ledger: {
    background:
      "linear-gradient(160deg, rgba(255,255,255,0.88) 0%, rgba(255,250,244,0.72) 42%, rgba(255,244,232,0.52) 100%)",
    shadow:
      "inset 0 1px 0 rgba(255,255,255,0.72), inset 0 -10px 18px rgba(255,255,255,0.12), 0 10px 28px rgba(0,0,0,0.12)",
  },
  harmony: {
    background:
      "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,252,248,0.74) 42%, rgba(255,248,240,0.54) 100%)",
    shadow:
      "inset 0 1px 0 rgba(255,255,255,0.78), inset 0 -10px 18px rgba(255,255,255,0.14), 0 10px 28px rgba(0,0,0,0.11)",
  },
  northwind: {
    background:
      "linear-gradient(160deg, rgba(255,252,246,0.9) 0%, rgba(255,246,236,0.7) 42%, rgba(255,240,226,0.5) 100%)",
    shadow:
      "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -10px 18px rgba(255,255,255,0.1), 0 10px 28px rgba(0,0,0,0.12)",
  },
};

/** Text on frosted glass — clear warm ink, readable secondary. */
const GLASS_INK = "#1C1610";
const GLASS_MUTED = "#5E564C";

/** iPhone artboard — fixed layout that scales as one unit (like a vector). */
const PHONE_ARTBOARD_WIDTH_PX = 360;
const PHONE_CARD_HEIGHT_REM = 11.5;
const PHONE_CARD_GAP_REM = 0.9;
const PHONE_CARD_STEP_REM = PHONE_CARD_HEIGHT_REM + PHONE_CARD_GAP_REM;
const PHONE_CLUSTER_HEIGHT_REM =
  PHONE_CARD_STEP_REM * (PROTO_SANDBOX_ROLE_CARDS.length - 1) + PHONE_CARD_HEIGHT_REM;
const PHONE_ARTBOARD_HEIGHT_PX = PHONE_CLUSTER_HEIGHT_REM * 16;
/** Featured single-card stack — sized to the role UI, not the old 3-card cluster. */
const PHONE_FEATURED_ARTBOARD_HEIGHT_PX = 340;

type VisualLayout = "phone" | "desktop";

type CardPosition = {
  top: string;
  left: string;
  zIndex: number;
};

type VisualTokens = {
  clusterHeight: string;
  cardWidth: string;
  cardPad: string;
  cardRadius: string;
  logoHeight: string;
  role: string;
  task: string;
  checklist: string;
  tag: string;
  tagPadX: string;
  tagPadY: string;
  tagGap: string;
  bodyGap: string;
  checklistGap: string;
  tagRowMarginTop: string;
};

const PHONE_TOKENS: VisualTokens = {
  clusterHeight: `${PHONE_CLUSTER_HEIGHT_REM}rem`,
  cardWidth: "78%",
  cardPad: "0.82rem 0.88rem",
  cardRadius: "0.55rem",
  logoHeight: "2.75rem",
  role: "0.84rem",
  task: "0.76rem",
  checklist: "0.68rem",
  tag: "0.64rem",
  tagPadX: "0.46rem",
  tagPadY: "0.22rem",
  tagGap: "0.2rem",
  bodyGap: "0.32rem",
  checklistGap: "0",
  tagRowMarginTop: "0.36rem",
};

const DESKTOP_TOKENS: VisualTokens = {
  clusterHeight: "clamp(28.5rem, 84%, 33rem)",
  cardWidth: "76%",
  cardPad: "clamp(0.78rem, 0.95vw, 0.92rem) clamp(0.82rem, 1vw, 0.96rem)",
  cardRadius: "clamp(0.52rem, 0.64vw, 0.64rem)",
  logoHeight: "clamp(2.45rem, 2.85vw, 2.95rem)",
  role: "clamp(0.78rem, 0.9vw, 0.9rem)",
  task: "clamp(0.7rem, 0.82vw, 0.82rem)",
  checklist: "clamp(0.62rem, 0.72vw, 0.74rem)",
  tag: "clamp(0.6rem, 0.7vw, 0.72rem)",
  tagPadX: "clamp(0.44rem, 0.52vw, 0.54rem)",
  tagPadY: "clamp(0.22rem, 0.26vw, 0.28rem)",
  tagGap: "clamp(0.18rem, 0.22vw, 0.24rem)",
  bodyGap: "clamp(0.3rem, 0.36vw, 0.38rem)",
  checklistGap: "0",
  tagRowMarginTop: "clamp(0.34rem, 0.4vw, 0.42rem)",
};

const PHONE_CARD_LAYOUT: readonly CardPosition[] = [
  { top: "0rem", left: "20%", zIndex: 1 },
  { top: `${PHONE_CARD_STEP_REM}rem`, left: "0%", zIndex: 2 },
  { top: `${PHONE_CARD_STEP_REM * 2}rem`, left: "18%", zIndex: 3 },
];

const DESKTOP_CARD_LAYOUT: readonly CardPosition[] = [
  { top: "0rem", left: "20%", zIndex: 1 },
  { top: "clamp(9.6rem, 28.5vmin, 11.4rem)", left: "0%", zIndex: 2 },
  { top: "clamp(19.2rem, 57vmin, 22.8rem)", left: "18%", zIndex: 3 },
];

function RoleCardTag({
  label,
  tokens,
  onDark = false,
}: {
  label: string;
  tokens: VisualTokens;
  onDark?: boolean;
}) {
  return (
    <span
      className={`${dmSans.className} inline-flex shrink-0 items-center whitespace-nowrap font-medium leading-none`}
      style={{
        background: onDark ? "rgba(255,249,242,0.14)" : TAG_BG,
        color: onDark ? "rgba(255,249,242,0.82)" : TAG_INK,
        fontSize: tokens.tag,
        padding: `${tokens.tagPadY} ${tokens.tagPadX}`,
        borderRadius: "999px",
      }}
    >
      {label}
    </span>
  );
}

function RoleCardTaskRail({
  taskBrief,
  items,
  tokens,
  onDark = false,
  flushTop = false,
}: {
  taskBrief: string;
  items: readonly [string, string, string];
  tokens: VisualTokens;
  onDark?: boolean;
  flushTop?: boolean;
}) {
  const ink = onDark ? "#FFF9F2" : INK;
  const muted = onDark ? "rgba(255,249,242,0.72)" : MUTED;
  const dot = onDark ? "rgba(255,249,242,0.55)" : TASK_DOT;
  const rail = onDark ? "rgba(255,249,242,0.28)" : RAIL_LINE;
  const face = onDark ? "transparent" : CARD_FACE;

  return (
    <div
      className={`${dmSans.className} min-w-0`}
      style={{ marginTop: flushTop ? 0 : tokens.bodyGap }}
    >
      <div className="flex min-w-0 items-start" style={{ gap: "0.52em" }}>
        <div
          className="mt-[0.34em] shrink-0 rounded-full"
          style={{
            width: "0.4em",
            height: "0.4em",
            border: `1px solid ${dot}`,
            background: face,
            boxSizing: "border-box",
          }}
          aria-hidden
        />
        <p
          className="min-w-0 whitespace-nowrap font-semibold leading-snug"
          style={{
            margin: 0,
            color: ink,
            fontSize: tokens.task,
          }}
        >
          {taskBrief}
        </p>
      </div>

      <div
        className="relative min-w-0"
        style={{
          marginTop: tokens.checklistGap,
          marginLeft: "0.85em",
          paddingLeft: "1.05em",
        }}
      >
        <div
          className="absolute bottom-[0.2em] top-[0.2em] w-px"
          style={{
            left: "0.28em",
            background: rail,
          }}
          aria-hidden
        />

        <ul
          className="m-0 flex list-none flex-col p-0"
          style={{ gap: tokens.checklistGap }}
        >
          {items.map((item) => (
            <li
              key={item}
              className="whitespace-nowrap leading-snug"
              style={{
                color: muted,
                fontSize: tokens.checklist,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RoleCardTags({
  card,
  tokens,
  onDark = false,
}: {
  card: ProtoSandboxRoleCard;
  tokens: VisualTokens;
  onDark?: boolean;
}) {
  const tags = [
    card.timeLimit,
    card.model,
    card.canConnectMcp ? "MCP" : "No MCP",
    card.videoRecordedPushToMain ? "Recorded" : "No recording",
  ];

  return (
    <div
      className="flex flex-nowrap items-center overflow-hidden"
      style={{ gap: tokens.tagGap, marginTop: tokens.tagRowMarginTop }}
    >
      {tags.map((label) => (
        <RoleCardTag key={label} label={label} tokens={tokens} onDark={onDark} />
      ))}
    </div>
  );
}

function SandboxRoleCard({
  card,
  tokens,
  position,
  hideLogo = false,
}: {
  card: ProtoSandboxRoleCard;
  tokens: VisualTokens;
  position?: CardPosition;
  hideLogo?: boolean;
}) {
  const positioned = Boolean(position);

  return (
    <article
      className={`${positioned ? "absolute" : "relative"} flex flex-col ${suisseIntl.className}`}
      style={{
        ...(position
          ? {
              top: position.top,
              left: position.left,
              zIndex: position.zIndex,
            }
          : undefined),
        width: positioned ? tokens.cardWidth : "100%",
        padding: tokens.cardPad,
        borderRadius: tokens.cardRadius,
        boxSizing: "border-box",
        background: CARD_SURFACE,
        boxShadow: "inset 0 1px 0 rgba(255,253,249,0.95), inset 0 -1px 0 rgba(44,36,25,0.035)",
      }}
    >
      {hideLogo ? null : <ProtoSandboxStartupLogo id={card.id} height={tokens.logoHeight} />}

      <h3
        className="whitespace-nowrap font-semibold leading-tight tracking-[-0.02em]"
        style={{
          color: INK,
          fontSize: tokens.role,
          marginTop: hideLogo ? 0 : tokens.bodyGap,
        }}
      >
        {card.role}
      </h3>

      <RoleCardTaskRail taskBrief={card.taskBrief} items={card.checklist} tokens={tokens} />

      <RoleCardTags card={card} tokens={tokens} />
    </article>
  );
}

function CardCluster({ layout, tokens }: { layout: VisualLayout; tokens: VisualTokens }) {
  const positions = layout === "phone" ? PHONE_CARD_LAYOUT : DESKTOP_CARD_LAYOUT;

  return (
    <div
      className="relative w-full"
      style={{
        height: layout === "phone" ? "100%" : tokens.clusterHeight,
      }}
    >
      {PROTO_SANDBOX_ROLE_CARDS.map((card, index) => (
        <SandboxRoleCard
          key={card.id}
          card={card}
          tokens={tokens}
          position={positions[index] ?? positions[0]}
        />
      ))}
    </div>
  );
}

/** Featured card — logo above; role facts inside; task + tags below. Same styling for every company. */
function FeaturedRoleCard({
  card,
  tokens,
  active,
}: {
  card: ProtoSandboxRoleCard;
  tokens: VisualTokens;
  active: boolean;
}) {
  const summary = card.roleSummary;
  const glass = FEATURED_GLASS_BY_ID[card.id];
  const belowTokens: VisualTokens = {
    ...tokens,
    task: "0.92rem",
    checklist: "0.82rem",
    tag: "0.76rem",
    tagPadX: "0.52rem",
    tagPadY: "0.26rem",
    tagGap: "0.26rem",
    checklistGap: "0",
    tagRowMarginTop: "0.48rem",
    bodyGap: "0.4rem",
  };

  return (
    <div className="flex w-full flex-col items-start">
      <div style={{ marginBottom: "0.2rem" }}>
        <ProtoSandboxStartupLogo id={card.id} height={tokens.logoHeight} theme="light" />
      </div>

      <article
        className={`w-full flex flex-col ${plusJakartaSans.className}`}
        style={{
          padding: "0.58rem 0.82rem",
          borderRadius: tokens.cardRadius,
          boxSizing: "border-box",
          background: glass.background,
          boxShadow: glass.shadow,
          // Blur only on the visible card — avoids 3× backdrop-filter cost during switches.
          ...(active
            ? {
                backdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
                WebkitBackdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
              }
            : null),
        }}
      >
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: "minmax(0, 1fr) auto",
            columnGap: "0.75rem",
            rowGap: "0.2rem",
            alignItems: "baseline",
          }}
        >
          <h3
            className={`${suisseIntl.className} m-0 font-semibold tracking-[-0.025em]`}
            style={{
              color: GLASS_INK,
              fontSize: "0.9rem",
              lineHeight: 1.2,
              fontWeight: 600,
            }}
          >
            {card.role}
          </h3>

          {summary ? (
            <span
              className={`${inter.className} whitespace-nowrap text-right`}
              style={{
                color: GLASS_MUTED,
                fontSize: "0.66rem",
                lineHeight: 1.2,
                fontWeight: 400,
              }}
            >
              {summary.location}
            </span>
          ) : (
            <span />
          )}

          {summary ? (
            <p
              className="m-0 tracking-[-0.015em]"
              style={{
                color: GLASS_INK,
                fontSize: "0.74rem",
                lineHeight: 1.2,
                fontWeight: 500,
              }}
            >
              {summary.pay}
            </p>
          ) : null}

          {summary ? (
            <span
              className={`${inter.className} whitespace-nowrap text-right`}
              style={{
                color: GLASS_MUTED,
                fontSize: "0.66rem",
                lineHeight: 1.2,
                fontWeight: 400,
              }}
            >
              {summary.type}
            </span>
          ) : null}

          {summary ? (
            <p
              className={`${inter.className} m-0`}
              style={{
                gridColumn: "1 / 2",
                color: GLASS_MUTED,
                fontSize: "0.66rem",
                lineHeight: 1.2,
                fontWeight: 400,
              }}
            >
              {summary.equity}
            </p>
          ) : null}
        </div>
      </article>

      <div className="w-full" style={{ marginTop: "0.65rem" }}>
        <RoleCardTaskRail
          taskBrief={card.taskBrief}
          items={card.checklist}
          tokens={belowTokens}
          onDark
          flushTop
        />
        <RoleCardTags card={card} tokens={belowTokens} onDark />
      </div>
    </div>
  );
}

function FeaturedRoleCycle({ tokens }: { tokens: VisualTokens }) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const holdTimer = window.setInterval(() => {
      setIndex((current) => (current + 1) % PROTO_SANDBOX_FEATURED_CYCLE.length);
    }, FEATURED_HOLD_MS);

    return () => {
      window.clearInterval(holdTimer);
    };
  }, []);

  return (
    // Stack every slide in one grid cell so height stays max(all) — no scale jump.
    <div className="grid" style={{ width: tokens.cardWidth }}>
      {PROTO_SANDBOX_FEATURED_CYCLE.map((card, slideIndex) => {
        const active = slideIndex === index;

        return (
          <div
            key={card.id}
            className="col-start-1 row-start-1"
            style={{
              alignSelf: "start",
              justifySelf: "stretch",
              opacity: active ? 1 : 0,
              transition: reduceMotion
                ? undefined
                : `opacity ${FEATURED_CROSSFADE_MS}ms ${FEATURED_EASE}`,
              pointerEvents: active ? "auto" : "none",
            }}
          >
            <FeaturedRoleCard card={card} tokens={tokens} active={active} />
          </div>
        );
      })}
    </div>
  );
}

/** Featured role cycle — Ledger, Harmony, Northwind, then Ledger again. */
export function ProtoSandboxLedgerCardVisual({ layout = "phone" }: { layout?: VisualLayout }) {
  const tokens = layout === "desktop" ? DESKTOP_TOKENS : PHONE_TOKENS;

  if (layout === "phone") {
    return (
      <div className={`mx-auto h-full w-full ${suisseIntl.className}`} aria-hidden>
        <ProtoPhoneScaledArtboard
          width={PHONE_ARTBOARD_WIDTH_PX}
          height={PHONE_FEATURED_ARTBOARD_HEIGHT_PX}
          fitScale={1.06}
          fixedBounds
        >
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              width: PHONE_ARTBOARD_WIDTH_PX,
              height: PHONE_FEATURED_ARTBOARD_HEIGHT_PX,
            }}
          >
            <FeaturedRoleCycle tokens={tokens} />
          </div>
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`}
      style={{ maxWidth: "min(100%, 26rem)" }}
      aria-hidden
    >
      <FeaturedRoleCycle tokens={tokens} />
    </div>
  );
}

/** /proto agents slide — three staggered sandbox role cards inside the first shader box. */
export function ProtoSandboxRoleCardsVisual({ layout = "phone" }: { layout?: VisualLayout }) {
  const tokens = layout === "desktop" ? DESKTOP_TOKENS : PHONE_TOKENS;

  if (layout === "phone") {
    return (
      <div
        className={`mx-auto h-full w-full ${suisseIntl.className}`}
        aria-hidden
      >
        <ProtoPhoneScaledArtboard
          width={PHONE_ARTBOARD_WIDTH_PX}
          height={PHONE_ARTBOARD_HEIGHT_PX}
        >
          <CardCluster layout="phone" tokens={tokens} />
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`}
      style={{ maxWidth: "min(100%, 26rem)" }}
      aria-hidden
    >
      <div className="relative h-full w-full">
        <div
          className="absolute left-0 right-0 top-1/2 w-full -translate-y-1/2"
          style={{ height: tokens.clusterHeight }}
        >
          <CardCluster layout="desktop" tokens={tokens} />
        </div>
      </div>
    </div>
  );
}
