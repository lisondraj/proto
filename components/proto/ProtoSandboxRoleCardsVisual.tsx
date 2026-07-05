"use client";

import { memo, useEffect, useState } from "react";

import { dmSans, inter, plusJakartaSans, suisseIntl } from "@/lib/home/fonts";
import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";
import { ProtoSandboxStartupLogo } from "@/components/proto/ProtoSandboxStartupLogos";
import {
  PROTO_SANDBOX_FEATURED_LEDGER_INDEX,
  PROTO_SANDBOX_FEATURED_STACK,
  PROTO_SANDBOX_ROLE_CARDS,
  type ProtoSandboxRoleCard,
  type ProtoSandboxRoleCardId,
} from "@/lib/proto/proto-sandbox-role-cards";
import { useProtoShaderBoxInView } from "@/lib/proto/use-proto-shader-box-in-view";

const FEATURED_SCROLL_MS = 1050;
const FEATURED_START_PAUSE_MS = 500;
const FEATURED_HOLD_MS = 560;
const FEATURED_TAP_MS = 260;
const FEATURED_OPEN_HOLD_MS = 80;
const FEATURED_EXPAND_MS = 620;
const FEATURED_EXPANDED_HOLD_MS = 4000;
const FEATURED_CLOSE_MS = 620;
const FEATURED_BETWEEN_MS = 420;
const FEATURED_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Meridian — intro frame; scroll down before any card opens. */
const FEATURED_START_INDEX = PROTO_SANDBOX_FEATURED_STACK.findIndex((card) => card.id === "meridian");

/** Signal, Ledger, Harmony — tap → open; Harmony stays open as the final static frame. */
const FEATURED_OPEN_INDICES = [
  PROTO_SANDBOX_FEATURED_LEDGER_INDEX - 1,
  PROTO_SANDBOX_FEATURED_LEDGER_INDEX,
  PROTO_SANDBOX_FEATURED_LEDGER_INDEX + 1,
] as const;

const FEATURED_FINAL_INDEX = FEATURED_OPEN_INDICES[FEATURED_OPEN_INDICES.length - 1]!;

type ItemPhase =
  | "stack"
  | "scroll"
  | "hold"
  | "tap"
  | "opening"
  | "expanded"
  | "closing"
  | "between"
  | "done";

/** Shared grey-box metrics — stack rows and expand card use the same glass panel. */
function featuredGlassBoxMetrics(layout: VisualLayout) {
  if (layout === "phone") {
    const articlePadTop = 0.72;
    const articlePadBottom = 0.84;
    const articlePadX = 0.92;
    const glassLogoH = 1.2;
    const logoRoleGap = 0.22;
    const roleBodyH = 2.88;
    const gap = 0.42;
    const boxH =
      articlePadTop + glassLogoH + logoRoleGap + roleBodyH + articlePadBottom;
    const compactBoxH = articlePadTop + roleBodyH + articlePadBottom;

    return {
      articlePadTop,
      articlePadBottom,
      articlePadX,
      glassLogoH,
      logoRoleGap,
      roleBodyH,
      gap,
      boxH,
      compactBoxH,
      rowH: boxH,
    };
  }

  const articlePadTop = 0.7;
  const articlePadBottom = 0.82;
  const articlePadX = 0.9;
  const glassLogoH = 1.16;
  const logoRoleGap = 0.2;
  const roleBodyH = 2.84;
  const gap = 0.4;
  const boxH = articlePadTop + glassLogoH + logoRoleGap + roleBodyH + articlePadBottom;
  const compactBoxH = articlePadTop + roleBodyH + articlePadBottom;

  return {
    articlePadTop,
    articlePadBottom,
    articlePadX,
    glassLogoH,
    logoRoleGap,
    roleBodyH,
    gap,
    boxH,
    compactBoxH,
    rowH: boxH,
  };
}

/** Expanded card — logo above grey box, tasks below. */
function featuredExpandMetrics(layout: VisualLayout) {
  const box = featuredGlassBoxMetrics(layout);
  const logoH = layout === "phone" ? 2.65 : 2.55;
  const logoGap = 0.36;
  const tasksMt = 0.72;
  const tasksH = layout === "phone" ? 4.82 : 4.68;
  const totalH = logoH + logoGap + box.compactBoxH + tasksMt + tasksH;
  const expandedArticleTop = logoH + logoGap;
  const collapsedArticleTop = (totalH - box.boxH) / 2;
  /** Clear full light logo above compact grey box — no overlap. */
  const logoEscapeY = box.articlePadTop + logoH + logoGap;

  return {
    ...box,
    logoH,
    logoGap,
    tasksMt,
    tasksH,
    totalH,
    expandedArticleTop,
    collapsedArticleTop,
    logoEscapeY,
    tasksBlockH: tasksMt + tasksH,
  };
}

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

/** Frosted glass panels for featured position cards — no border, no shadow. */
const FEATURED_GLASS: Record<ProtoSandboxRoleCardId, { background: string }> = {
  ledger: {
    background:
      "linear-gradient(160deg, rgba(255,255,255,0.88) 0%, rgba(255,250,244,0.72) 42%, rgba(255,244,232,0.52) 100%)",
  },
  harmony: {
    background:
      "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,252,248,0.74) 42%, rgba(255,248,240,0.54) 100%)",
  },
  northwind: {
    background:
      "linear-gradient(160deg, rgba(255,252,246,0.9) 0%, rgba(255,246,236,0.7) 42%, rgba(255,240,226,0.5) 100%)",
  },
  atlas: {
    background:
      "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(251,252,255,0.74) 42%, rgba(244,247,255,0.52) 100%)",
  },
  meridian: {
    background:
      "linear-gradient(160deg, rgba(255,255,255,0.91) 0%, rgba(255,252,250,0.73) 42%, rgba(255,248,244,0.53) 100%)",
  },
  signal: {
    background:
      "linear-gradient(160deg, rgba(255,254,252,0.9) 0%, rgba(255,251,246,0.72) 42%, rgba(255,246,236,0.51) 100%)",
  },
  arc: {
    background:
      "linear-gradient(160deg, rgba(255,255,255,0.91) 0%, rgba(250,252,255,0.73) 42%, rgba(242,247,255,0.52) 100%)",
  },
  canopy: {
    background:
      "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(252,255,250,0.72) 42%, rgba(244,252,246,0.51) 100%)",
  },
  vertex: {
    background:
      "linear-gradient(160deg, rgba(255,254,255,0.9) 0%, rgba(251,250,255,0.72) 42%, rgba(246,244,255,0.51) 100%)",
  },
  pulse: {
    background:
      "linear-gradient(160deg, rgba(255,253,250,0.9) 0%, rgba(255,249,244,0.72) 42%, rgba(255,243,234,0.51) 100%)",
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
/** Featured column viewport — no edge fade; tall enough to show more of the stack. */
const PHONE_FEATURED_VIEWPORT_REM = 26.5;
const PHONE_FEATURED_ARTBOARD_HEIGHT_PX = PHONE_FEATURED_VIEWPORT_REM * 16;

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
  cardWidth: "86%",
  cardPad: "0.82rem 0.88rem",
  cardRadius: "0.58rem",
  logoHeight: "2.65rem",
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
  cardWidth: "80%",
  cardPad: "clamp(0.78rem, 0.95vw, 0.92rem) clamp(0.82rem, 1vw, 0.96rem)",
  cardRadius: "clamp(0.54rem, 0.66vw, 0.66rem)",
  logoHeight: "clamp(2.4rem, 2.75vw, 2.85rem)",
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

function FeaturedRoleSummaryGrid({ card }: { card: ProtoSandboxRoleCard }) {
  const summary = card.roleSummary;

  return (
    <div
      className="grid w-full"
      style={{
        gridTemplateColumns: "minmax(0, 1fr) auto",
        columnGap: "0.68rem",
        rowGap: "0.28rem",
        alignItems: "baseline",
      }}
    >
      <h3
        className={`${plusJakartaSans.className} m-0 font-semibold tracking-[-0.025em]`}
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
  );
}

/** Compact grey stack row — glass logo + role summary. */
const FeaturedStackRow = memo(function FeaturedStackRow({
  card,
  tokens,
  boxMetrics,
  opacity,
  tapped = false,
  highlighted = false,
  focusRow = false,
}: {
  card: ProtoSandboxRoleCard;
  tokens: VisualTokens;
  boxMetrics: ReturnType<typeof featuredGlassBoxMetrics>;
  opacity: number;
  tapped?: boolean;
  highlighted?: boolean;
  focusRow?: boolean;
}) {
  const glass = FEATURED_GLASS[card.id];
  const glassLogoHeight = `${boxMetrics.glassLogoH}rem`;
  const useGlassBlur = highlighted || tapped || focusRow;

  return (
    <article
      className={`flex w-full flex-col ${plusJakartaSans.className}`}
      style={{
        height: `${boxMetrics.rowH}rem`,
        width: "100%",
        padding: `${boxMetrics.articlePadTop}rem ${boxMetrics.articlePadX}rem ${boxMetrics.articlePadBottom}rem`,
        borderRadius: tokens.cardRadius,
        boxSizing: "border-box",
        background: glass.background,
        overflow: "visible",
        opacity,
        transition: focusRow ? `opacity 480ms ${FEATURED_EASE}` : undefined,
        boxShadow: tapped
          ? "0 0 0 1px rgba(255,255,255,0.28), 0 6px 20px rgba(0,0,0,0.14)"
          : highlighted
            ? "0 0 0 1px rgba(255,255,255,0.22), 0 8px 28px rgba(0,0,0,0.12)"
            : "none",
        ...(useGlassBlur
          ? highlighted
            ? {
                backdropFilter: "blur(20px) saturate(1.4) brightness(1.06)",
                WebkitBackdropFilter: "blur(20px) saturate(1.4) brightness(1.06)",
              }
            : {
                backdropFilter: "blur(16px) saturate(1.25) brightness(1.02)",
                WebkitBackdropFilter: "blur(16px) saturate(1.25) brightness(1.02)",
              }
          : {}),
      }}
    >
      <div
        style={{
          height: glassLogoHeight,
          marginBottom: `${boxMetrics.logoRoleGap}rem`,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ProtoSandboxStartupLogo id={card.id} height={glassLogoHeight} theme="glass" />
      </div>
      <div style={{ minHeight: `${boxMetrics.roleBodyH}rem` }}>
        <FeaturedRoleSummaryGrid card={card} />
      </div>
    </article>
  );
});

/** Expanded role card — logo pushes up, tasks push down; supports open/close cycle. */
function FeaturedRoleCard({
  card,
  tokens,
  layout,
  shouldExpand,
  overlay = false,
}: {
  card: ProtoSandboxRoleCard;
  tokens: VisualTokens;
  layout: VisualLayout;
  shouldExpand: boolean;
  overlay?: boolean;
}) {
  const metrics = featuredExpandMetrics(layout);
  const [expanded, setExpanded] = useState(shouldExpand);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setExpanded(shouldExpand);
      return;
    }

    setExpanded(shouldExpand);
  }, [shouldExpand, reduceMotion]);

  const showFull = expanded || (reduceMotion && shouldExpand);
  const motion = ` ${FEATURED_EXPAND_MS}ms ${FEATURED_EASE}`;
  const glassLogoHeight = `${metrics.glassLogoH}rem`;
  const logoEscaped = showFull;
  const articleHeight = logoEscaped ? metrics.compactBoxH : metrics.boxH;
  const glass = FEATURED_GLASS[card.id];

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
    <div
      className="relative flex w-full flex-col"
      style={{
        width: "100%",
        minHeight: overlay ? undefined : `${metrics.totalH}rem`,
      }}
    >
      <article
        className={`relative flex w-full flex-col ${plusJakartaSans.className}`}
        style={{
          width: "100%",
          height: `${articleHeight}rem`,
          marginTop: overlay
            ? 0
            : showFull
              ? `${metrics.expandedArticleTop}rem`
              : `${metrics.collapsedArticleTop}rem`,
          padding: `${metrics.articlePadTop}rem ${metrics.articlePadX}rem ${metrics.articlePadBottom}rem`,
          borderRadius: tokens.cardRadius,
          boxSizing: "border-box",
          background: glass.background,
          overflow: logoEscaped ? "visible" : "hidden",
          transition: overlay
            ? `height${motion}, padding${motion}`
            : `margin-top${motion}, height${motion}`,
          backdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
          WebkitBackdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
        }}
      >
        <div
          style={{
            position: "relative",
            height: logoEscaped ? 0 : glassLogoHeight,
            marginBottom: logoEscaped ? 0 : `${metrics.logoRoleGap}rem`,
            overflow: logoEscaped ? "visible" : "hidden",
            flexShrink: 0,
            transition: `height${motion}, margin${motion}`,
          }}
        >
          <div
            style={{
              position: logoEscaped ? "absolute" : "relative",
              top: 0,
              left: 0,
              right: 0,
              height: logoEscaped ? tokens.logoHeight : glassLogoHeight,
              zIndex: logoEscaped ? 2 : 1,
              transform: logoEscaped
                ? `translateY(calc(-1 * ${metrics.logoEscapeY}rem))`
                : "translateY(0)",
              transition: `transform${motion}, height${motion}`,
            }}
          >
            <ProtoSandboxStartupLogo
              id={card.id}
              height={logoEscaped ? tokens.logoHeight : glassLogoHeight}
              theme={logoEscaped ? "light" : "glass"}
            />
          </div>
        </div>

        <div style={{ minHeight: `${metrics.roleBodyH}rem` }}>
          <FeaturedRoleSummaryGrid card={card} />
        </div>
      </article>

      <div
        className="w-full overflow-hidden"
        style={{
          marginTop: showFull ? `${metrics.tasksMt}rem` : 0,
          maxHeight: showFull ? `${metrics.tasksH}rem` : 0,
          opacity: showFull ? 1 : 0,
          transition: `margin-top${motion}, max-height${motion}, opacity${motion}`,
        }}
      >
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

function stackRowOpacity(
  index: number,
  focusIndex: number,
  phase: ItemPhase,
  overlayActive: boolean,
  overlayExpanded: boolean,
) {
  const belowCutoff = PROTO_SANDBOX_FEATURED_LEDGER_INDEX + 2;

  if (overlayActive) {
    /** Keep focus row visible under overlay while collapsed; hide only when expanded layout differs. */
    if (index === focusIndex) {
      return overlayExpanded ? 0 : 1;
    }
    if (index > belowCutoff) return 0.12;
    return 0.22;
  }

  const distance = Math.abs(index - focusIndex);
  let opacity = 1;
  if (distance === 0) opacity = 1;
  else if (distance === 1) opacity = 0.46;
  else if (distance === 2) opacity = 0.3;
  else if (distance === 3) opacity = 0.22;
  else opacity = 0.16;

  if (index > belowCutoff) {
    opacity = Math.min(opacity, 0.14);
  }

  if (phase === "closing" || phase === "between") {
    opacity = Math.min(opacity + 0.04, 1);
  }

  return opacity;
}

function FeaturedRoleColumn({ tokens, layout }: { tokens: VisualTokens; layout: VisualLayout }) {
  const boxMetrics = featuredGlassBoxMetrics(layout);
  const { ref: inViewRef, inView } = useProtoShaderBoxInView();

  const [focusIndex, setFocusIndex] = useState(FEATURED_START_INDEX);
  const [phase, setPhase] = useState<ItemPhase>("stack");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayExpanded, setOverlayExpanded] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const viewportH = layout === "phone" ? PHONE_FEATURED_VIEWPORT_REM : 26.5;
  const rowStep = boxMetrics.rowH + boxMetrics.gap;
  const scrollOffset = viewportH / 2 - (focusIndex * rowStep + boxMetrics.rowH / 2);
  const focusCard = PROTO_SANDBOX_FEATURED_STACK[focusIndex]!;
  const overlayActive =
    overlayOpen &&
    (phase === "opening" || phase === "expanded" || phase === "closing" || phase === "done");
  /** Pin overlay to stack row center — no vertical shift on expand. */
  const overlayTop = viewportH / 2 - boxMetrics.boxH / 2;

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setFocusIndex(FEATURED_FINAL_INDEX);
      setOverlayOpen(true);
      setOverlayExpanded(true);
      setPhase("done");
      return;
    }

    if (!inView) {
      setFocusIndex(FEATURED_START_INDEX);
      setPhase("stack");
      setOverlayOpen(false);
      setOverlayExpanded(false);
      return;
    }

    setFocusIndex(FEATURED_START_INDEX);
    setPhase("stack");
    setOverlayOpen(false);
    setOverlayExpanded(false);

    const timers: number[] = [];
    let elapsed = FEATURED_START_PAUSE_MS;

    function schedule(delay: number, fn: () => void) {
      elapsed += delay;
      timers.push(window.setTimeout(fn, elapsed));
    }

    schedule(0, () => setPhase("hold"));
    schedule(FEATURED_HOLD_MS, () => setPhase("between"));

    FEATURED_OPEN_INDICES.forEach((targetIndex) => {
      const isFinal = targetIndex === FEATURED_FINAL_INDEX;

      schedule(FEATURED_BETWEEN_MS, () => {
        setPhase("scroll");
        setFocusIndex(targetIndex);
      });
      schedule(FEATURED_SCROLL_MS, () => setPhase("hold"));

      schedule(FEATURED_HOLD_MS, () => setPhase("tap"));
      schedule(FEATURED_TAP_MS, () => {
        setPhase("opening");
        setOverlayOpen(true);
        setOverlayExpanded(false);
      });
      schedule(FEATURED_TAP_MS + FEATURED_OPEN_HOLD_MS, () => setOverlayExpanded(true));
      schedule(FEATURED_TAP_MS + FEATURED_OPEN_HOLD_MS + FEATURED_EXPAND_MS, () => setPhase("expanded"));

      if (isFinal) {
        schedule(FEATURED_EXPANDED_HOLD_MS, () => setPhase("done"));
        return;
      }

      schedule(FEATURED_EXPANDED_HOLD_MS, () => {
        setPhase("closing");
        setOverlayExpanded(false);
      });
      schedule(FEATURED_CLOSE_MS + FEATURED_EXPAND_MS, () => {
        setOverlayOpen(false);
        setPhase("between");
      });
    });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [reduceMotion, inView]);

  const scrollMotion =
    phase === "scroll" ? `transform ${FEATURED_SCROLL_MS}ms ${FEATURED_EASE}` : undefined;

  return (
    <div
      ref={inViewRef}
      className="relative mx-auto"
      style={{
        width: tokens.cardWidth,
        height: layout === "phone" ? `${PHONE_FEATURED_VIEWPORT_REM}rem` : `${viewportH}rem`,
        overflow: "visible",
        contain: "layout style",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          overflow: "visible",
        }}
      >
        <div
          style={{
            transform: `translateY(${scrollOffset}rem)`,
            transition: scrollMotion,
            willChange: phase === "scroll" ? "transform" : undefined,
          }}
        >
          <div className="flex flex-col" style={{ gap: `${boxMetrics.gap}rem` }}>
            {PROTO_SANDBOX_FEATURED_STACK.map((card, index) => (
              <FeaturedStackRow
                key={card.id}
                card={card}
                tokens={tokens}
                boxMetrics={boxMetrics}
                opacity={stackRowOpacity(
                  index,
                  focusIndex,
                  phase,
                  overlayActive,
                  overlayExpanded,
                )}
                focusRow={index === focusIndex}
                tapped={phase === "tap" && index === focusIndex}
                highlighted={
                  index === focusIndex &&
                  (phase === "hold" || phase === "tap" || phase === "between" || phase === "done")
                }
              />
            ))}
          </div>
        </div>
      </div>

      {overlayOpen ? (
        <div
          className="absolute z-10"
          style={{
            top: `${overlayTop}rem`,
            left: 0,
            right: 0,
            width: "100%",
            overflow: "visible",
            pointerEvents: "none",
            willChange: "contents",
          }}
        >
          <FeaturedRoleCard
            card={focusCard}
            tokens={tokens}
            layout={layout}
            shouldExpand={overlayExpanded}
            overlay
          />
        </div>
      ) : null}
    </div>
  );
}

/** Featured role column — scrolls to Ledger, tap, fade peers, expand tasks. */
export function ProtoSandboxLedgerCardVisual({ layout = "phone" }: { layout?: VisualLayout }) {
  const tokens = layout === "desktop" ? DESKTOP_TOKENS : PHONE_TOKENS;

  if (layout === "phone") {
    return (
      <div className={`mx-auto h-full w-full ${suisseIntl.className}`} aria-hidden>
        <ProtoPhoneScaledArtboard
          width={PHONE_ARTBOARD_WIDTH_PX}
          height={PHONE_FEATURED_ARTBOARD_HEIGHT_PX}
          fitScale={0.94}
          fixedBounds
        >
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              width: PHONE_ARTBOARD_WIDTH_PX,
              height: PHONE_FEATURED_ARTBOARD_HEIGHT_PX,
              overflow: "visible",
            }}
          >
            <FeaturedRoleColumn tokens={tokens} layout={layout} />
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
      <FeaturedRoleColumn tokens={tokens} layout={layout} />
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
