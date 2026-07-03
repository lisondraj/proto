"use client";

import { useEffect, useState } from "react";

import { dmSans, suisseIntl } from "@/lib/home/fonts";
import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";
import { ProtoSandboxStartupLogo } from "@/components/proto/ProtoSandboxStartupLogos";
import {
  PROTO_FEATURED_ROLE_SLIDES,
  PROTO_SANDBOX_ROLE_CARDS,
  type ProtoSandboxRoleCard,
} from "@/lib/proto/proto-sandbox-role-cards";

const FEATURED_SLIDE_MS = 3400;
const FEATURED_FADE_MS = 700;

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

/** iPhone artboard — fixed layout that scales as one unit (like a vector). */
const PHONE_ARTBOARD_WIDTH_PX = 360;
const PHONE_CARD_HEIGHT_REM = 11.5;
const PHONE_CARD_GAP_REM = 0.9;
const PHONE_CARD_STEP_REM = PHONE_CARD_HEIGHT_REM + PHONE_CARD_GAP_REM;
const PHONE_CLUSTER_HEIGHT_REM =
  PHONE_CARD_STEP_REM * (PROTO_SANDBOX_ROLE_CARDS.length - 1) + PHONE_CARD_HEIGHT_REM;
const PHONE_ARTBOARD_HEIGHT_PX = PHONE_CLUSTER_HEIGHT_REM * 16;

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
  logoHeight: "2.35rem",
  role: "0.84rem",
  task: "0.76rem",
  checklist: "0.68rem",
  tag: "0.64rem",
  tagPadX: "0.46rem",
  tagPadY: "0.22rem",
  tagGap: "0.2rem",
  bodyGap: "0.32rem",
  checklistGap: "0.18rem",
  tagRowMarginTop: "0.36rem",
};

const DESKTOP_TOKENS: VisualTokens = {
  clusterHeight: "clamp(28.5rem, 84%, 33rem)",
  cardWidth: "76%",
  cardPad: "clamp(0.78rem, 0.95vw, 0.92rem) clamp(0.82rem, 1vw, 0.96rem)",
  cardRadius: "clamp(0.52rem, 0.64vw, 0.64rem)",
  logoHeight: "clamp(2.1rem, 2.45vw, 2.55rem)",
  role: "clamp(0.78rem, 0.9vw, 0.9rem)",
  task: "clamp(0.7rem, 0.82vw, 0.82rem)",
  checklist: "clamp(0.62rem, 0.72vw, 0.74rem)",
  tag: "clamp(0.6rem, 0.7vw, 0.72rem)",
  tagPadX: "clamp(0.44rem, 0.52vw, 0.54rem)",
  tagPadY: "clamp(0.22rem, 0.26vw, 0.28rem)",
  tagGap: "clamp(0.18rem, 0.22vw, 0.24rem)",
  bodyGap: "clamp(0.3rem, 0.36vw, 0.38rem)",
  checklistGap: "clamp(0.15rem, 0.18vw, 0.2rem)",
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

function featuredBelowTokens(tokens: VisualTokens): VisualTokens {
  return {
    ...tokens,
    task: "0.92rem",
    checklist: "0.82rem",
    tag: "0.76rem",
    tagPadX: "0.52rem",
    tagPadY: "0.26rem",
    tagGap: "0.26rem",
    checklistGap: "0.24rem",
    tagRowMarginTop: "0.48rem",
    bodyGap: "0.4rem",
  };
}

/** Featured role card — logo above; role facts inside; task + tags below. */
function FeaturedRoleCard({
  card,
  tokens,
}: {
  card: ProtoSandboxRoleCard;
  tokens: VisualTokens;
}) {
  const summary = card.roleSummary;
  const belowTokens = featuredBelowTokens(tokens);

  return (
    <div className="flex flex-col items-start" style={{ width: tokens.cardWidth }}>
      <div style={{ marginBottom: "0.42rem" }}>
        <ProtoSandboxStartupLogo id={card.id} height={tokens.logoHeight} theme="light" />
      </div>

      <article
        className={`w-full flex flex-col ${suisseIntl.className}`}
        style={{
          padding: "0.55rem 0.72rem",
          borderRadius: tokens.cardRadius,
          boxSizing: "border-box",
          background: CARD_SURFACE,
          boxShadow: "inset 0 1px 0 rgba(255,253,249,0.95), inset 0 -1px 0 rgba(44,36,25,0.035)",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="font-semibold leading-tight tracking-[-0.02em]"
              style={{
                color: INK,
                fontSize: tokens.role,
              }}
            >
              {card.role}
            </h3>

            {summary ? (
              <div className={`${dmSans.className}`} style={{ marginTop: "0.14rem" }}>
                <p
                  className="m-0 font-semibold leading-snug tracking-[-0.02em]"
                  style={{ color: INK, fontSize: tokens.task }}
                >
                  {summary.pay}
                </p>
                <p
                  className="m-0 leading-snug"
                  style={{
                    color: MUTED,
                    fontSize: tokens.checklist,
                    marginTop: "0.08rem",
                  }}
                >
                  {summary.equity}
                </p>
              </div>
            ) : null}
          </div>

          {summary ? (
            <div
              className={`${dmSans.className} flex shrink-0 flex-col items-end text-right`}
              style={{ gap: "0.1rem" }}
            >
              <span
                className="whitespace-nowrap leading-snug"
                style={{ color: MUTED, fontSize: tokens.checklist }}
              >
                {summary.location}
              </span>
              <span
                className="whitespace-nowrap leading-snug"
                style={{ color: MUTED, fontSize: tokens.checklist }}
              >
                {summary.type}
              </span>
            </div>
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

function FeaturedRoleCarousel({ tokens }: { tokens: VisualTokens }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % PROTO_FEATURED_ROLE_SLIDES.length);
    }, FEATURED_SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative" style={{ width: tokens.cardWidth }}>
      {PROTO_FEATURED_ROLE_SLIDES.map((card, slideIndex) => {
        const active = slideIndex === index;

        return (
          <div
            key={card.id}
            aria-hidden={!active}
            style={{
              position: active ? "relative" : "absolute",
              left: 0,
              top: 0,
              width: "100%",
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(0.45rem)",
              transition: `opacity ${FEATURED_FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${FEATURED_FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
              pointerEvents: active ? "auto" : "none",
              zIndex: active ? 1 : 0,
            }}
          >
            <FeaturedRoleCard card={card} tokens={tokens} />
          </div>
        );
      })}
    </div>
  );
}

/** Featured role carousel — Ledger, Harmony, Northwind, then Ledger again. */
export function ProtoSandboxLedgerCardVisual({ layout = "phone" }: { layout?: VisualLayout }) {
  const tokens = layout === "desktop" ? DESKTOP_TOKENS : PHONE_TOKENS;

  if (layout === "phone") {
    return (
      <div className={`mx-auto h-full w-full ${suisseIntl.className}`} aria-hidden>
        <ProtoPhoneScaledArtboard
          width={PHONE_ARTBOARD_WIDTH_PX}
          height={PHONE_ARTBOARD_HEIGHT_PX}
          fitScale={1}
        >
          <div
            className="flex justify-center"
            style={{ width: PHONE_ARTBOARD_WIDTH_PX }}
          >
            <FeaturedRoleCarousel tokens={tokens} />
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
      <FeaturedRoleCarousel tokens={tokens} />
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
