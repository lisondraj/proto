"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { dmSans, suisseIntl } from "@/lib/home/fonts";
import { ProtoSandboxStartupLogo } from "@/components/proto/ProtoSandboxStartupLogos";
import {
  PROTO_SANDBOX_ROLE_CARDS,
  type ProtoSandboxRoleCard,
} from "@/lib/proto/proto-sandbox-role-cards";

const INK = "#1E343A";
const MUTED = "#6B7280";
const TAG_BG = "#F3F4F6";
const TAG_INK = "#9CA3AF";
const RAIL_LINE = "#D1D5DB";
const TASK_DOT = "#C4C9D1";

/** iPhone artboard — fixed layout that scales as one unit (like a vector). */
const PHONE_ARTBOARD_WIDTH_PX = 360;
const PHONE_CARD_HEIGHT_REM = 11.5;
const PHONE_CARD_GAP_REM = 0.9;
const PHONE_CARD_STEP_REM = PHONE_CARD_HEIGHT_REM + PHONE_CARD_GAP_REM;
const PHONE_CLUSTER_HEIGHT_REM =
  PHONE_CARD_STEP_REM * (PROTO_SANDBOX_ROLE_CARDS.length - 1) + PHONE_CARD_HEIGHT_REM;
const PHONE_ARTBOARD_HEIGHT_PX = PHONE_CLUSTER_HEIGHT_REM * 16;
/** Inset from the shader card so all three boxes stay fully visible and centered. */
const PHONE_ARTBOARD_FIT_PAD_PX = 20;
const PHONE_ARTBOARD_FIT_SCALE = 0.9;

type VisualLayout = "phone" | "desktop";

type CardPosition = {
  top: string;
  left: string;
  zIndex: number;
};

type VisualTokens = {
  clusterHeight: string;
  cardWidth: string;
  cardHeight: string;
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

/** Shared box size — matches Harmony Health’s natural footprint. */
const PHONE_TOKENS: VisualTokens = {
  clusterHeight: `${PHONE_CLUSTER_HEIGHT_REM}rem`,
  cardWidth: "18.25rem",
  cardHeight: "11.5rem",
  cardPad: "0.82rem 0.88rem",
  cardRadius: "0.72rem",
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
  cardWidth: "18.25rem",
  cardHeight: "11.5rem",
  cardPad: "clamp(0.78rem, 0.95vw, 0.92rem) clamp(0.82rem, 1vw, 0.96rem)",
  cardRadius: "clamp(0.7rem, 0.84vw, 0.84rem)",
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

function getSandboxFitHost(node: HTMLElement): HTMLElement {
  return (
    (node.closest(".proto-feature-section__card") as HTMLElement | null) ??
    (node.closest(".proto-carousel-card") as HTMLElement | null) ??
    node
  );
}

function measureClusterBounds(root: HTMLElement, fallbackWidth: number, fallbackHeight: number) {
  const cards = root.querySelectorAll<HTMLElement>("article");
  if (cards.length === 0) {
    return { width: fallbackWidth, height: fallbackHeight };
  }

  let maxRight = 0;
  let maxBottom = 0;
  cards.forEach((card) => {
    maxRight = Math.max(maxRight, card.offsetLeft + card.offsetWidth);
    maxBottom = Math.max(maxBottom, card.offsetTop + card.offsetHeight);
  });

  return {
    width: Math.max(maxRight, fallbackWidth),
    height: Math.max(maxBottom, 1),
  };
}

function PhoneScaledArtboard({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const artboardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [bounds, setBounds] = useState({ width, height });

  useLayoutEffect(() => {
    const container = containerRef.current;
    const artboard = artboardRef.current;
    if (!container || !artboard) return;

    const host = getSandboxFitHost(container);

    const updateScale = () => {
      const nextBounds = measureClusterBounds(artboard, width, height);
      setBounds(nextBounds);

      const fitWidth = Math.max(host.clientWidth - PHONE_ARTBOARD_FIT_PAD_PX * 2, 1);
      const fitHeight = Math.max(host.clientHeight - PHONE_ARTBOARD_FIT_PAD_PX * 2, 1);
      const nextScale =
        Math.min(fitWidth / nextBounds.width, fitHeight / nextBounds.height) *
        PHONE_ARTBOARD_FIT_SCALE;
      setScale(nextScale > 0 ? nextScale : 0.5);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(host);
    observer.observe(artboard);
    if (host !== container) observer.observe(container);
    return () => observer.disconnect();
  }, [width, height]);

  const scaledWidth = bounds.width * scale;
  const scaledHeight = bounds.height * scale;

  return (
    <div
      ref={containerRef}
      className="flex h-full min-h-0 w-full items-center justify-center overflow-hidden"
    >
      {/* Outer box is the true visual size of all three cards as one unit. */}
      <div
        className="relative shrink-0"
        style={{
          width: scaledWidth,
          height: scaledHeight,
        }}
      >
        <div
          ref={artboardRef}
          style={{
            width: bounds.width,
            height: bounds.height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function RoleCardTag({ label, tokens }: { label: string; tokens: VisualTokens }) {
  return (
    <span
      className={`${dmSans.className} inline-flex shrink-0 items-center whitespace-nowrap font-medium leading-none`}
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

function RoleCardTaskRail({
  taskBrief,
  items,
  tokens,
}: {
  taskBrief: string;
  items: readonly [string, string, string];
  tokens: VisualTokens;
}) {
  return (
    <div className={`${dmSans.className} min-w-0`} style={{ marginTop: tokens.bodyGap }}>
      <div className="flex min-w-0 items-start" style={{ gap: "0.52em" }}>
        <div
          className="mt-[0.34em] shrink-0 rounded-full"
          style={{
            width: "0.4em",
            height: "0.4em",
            border: `1px solid ${TASK_DOT}`,
            background: "#FFFFFF",
            boxSizing: "border-box",
          }}
          aria-hidden
        />
        <p
          className="min-w-0 whitespace-nowrap font-semibold leading-snug"
          style={{
            margin: 0,
            color: INK,
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
            background: RAIL_LINE,
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
                color: MUTED,
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

function RoleCardTags({ card, tokens }: { card: ProtoSandboxRoleCard; tokens: VisualTokens }) {
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
        <RoleCardTag key={label} label={label} tokens={tokens} />
      ))}
    </div>
  );
}

function SandboxRoleCard({
  card,
  index,
  tokens,
  layout,
}: {
  card: ProtoSandboxRoleCard;
  index: number;
  tokens: VisualTokens;
  layout: VisualLayout;
}) {
  const positions = layout === "phone" ? PHONE_CARD_LAYOUT : DESKTOP_CARD_LAYOUT;
  const position = positions[index] ?? positions[0];

  return (
    <article
      className={`absolute flex flex-col bg-white ${suisseIntl.className}`}
      style={{
        top: position.top,
        left: position.left,
        zIndex: position.zIndex,
        width: tokens.cardWidth,
        height: tokens.cardHeight,
        padding: tokens.cardPad,
        borderRadius: tokens.cardRadius,
        boxSizing: "border-box",
      }}
    >
      <ProtoSandboxStartupLogo id={card.id} height={tokens.logoHeight} />

      <h3
        className="whitespace-nowrap font-semibold leading-tight tracking-[-0.02em]"
        style={{
          color: INK,
          fontSize: tokens.role,
          marginTop: tokens.bodyGap,
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
  return (
    <div
      className="relative w-full"
      style={{
        height: layout === "phone" ? "100%" : tokens.clusterHeight,
      }}
    >
      {PROTO_SANDBOX_ROLE_CARDS.map((card, index) => (
        <SandboxRoleCard key={card.id} card={card} index={index} tokens={tokens} layout={layout} />
      ))}
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
        <PhoneScaledArtboard
          width={PHONE_ARTBOARD_WIDTH_PX}
          height={PHONE_ARTBOARD_HEIGHT_PX}
        >
          <CardCluster layout="phone" tokens={tokens} />
        </PhoneScaledArtboard>
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
