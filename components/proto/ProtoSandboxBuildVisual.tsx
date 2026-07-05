"use client";

import { useEffect, useState } from "react";

import { inter, suisseIntl } from "@/lib/home/fonts";
import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";

const GLASS_BG =
  "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,251,246,0.84) 45%, rgba(255,248,242,0.74) 100%)";
const INK = "#1C1610";
const MUTED = "#5E564C";
const MUTED_LIGHT = "#8A8074";
const SOFT = "rgba(28, 22, 16, 0.045)";
const LINE = "rgba(28, 22, 16, 0.1)";
const CODE_MUTED = "rgba(28, 22, 16, 0.38)";
const CODE_KEY = "#6B5344";
const CODE_FN = "#385878";
const CODE_STR = "#3F6B4A";
const RUNNING = "#3F6B4A";

const PHONE_ARTBOARD_WIDTH_PX = 360;
const PHONE_ARTBOARD_HEIGHT_PX = 360;
const BOX_SIZE_PX = Math.round(PHONE_ARTBOARD_WIDTH_PX * 0.78);

const TABS = ["page.tsx", "Chart.tsx"] as const;

const PAGE_LINES = [
  { n: 1, parts: [{ t: "import ", c: CODE_KEY }, { t: "{ Chart }", c: CODE_FN }, { t: ' from "./Chart"', c: CODE_STR }] },
  { n: 2, parts: [{ t: "", c: INK }] },
  { n: 3, parts: [{ t: "export default function Page() {", c: CODE_KEY }] },
  { n: 4, parts: [{ t: "  const rows = forecastData()", c: INK }] },
  { n: 5, parts: [{ t: "  return (", c: CODE_KEY }] },
  { n: 6, parts: [{ t: "    <main>", c: INK }] },
  { n: 7, parts: [{ t: "      <Chart data={rows} />", c: INK }] },
  { n: 8, parts: [{ t: "    </main>", c: INK }] },
  { n: 9, parts: [{ t: "  )", c: CODE_KEY }] },
  { n: 10, parts: [{ t: "}", c: CODE_KEY }] },
] as const;

const CHART_LINES = [
  { n: 1, parts: [{ t: "export function Chart({ data }) {", c: CODE_KEY }] },
  { n: 2, parts: [{ t: "  return (", c: CODE_KEY }] },
  { n: 3, parts: [{ t: '    <svg viewBox="0 0 120 48">', c: CODE_STR }] },
  { n: 4, parts: [{ t: "      {data.map((bar) => (", c: INK }] },
  { n: 5, parts: [{ t: "        <rect key={bar.id} ... />", c: INK }] },
  { n: 6, parts: [{ t: "      ))}", c: INK }] },
  { n: 7, parts: [{ t: "    </svg>", c: CODE_STR }] },
  { n: 8, parts: [{ t: "  )", c: CODE_KEY }] },
  { n: 9, parts: [{ t: "}", c: CODE_KEY }] },
] as const;

type CodeLineData = {
  n: number;
  parts: readonly { t: string; c: string }[];
};

const BUILD_BEATS = [
  { tab: 0, activeLine: 7, preview: 0.45 },
  { tab: 0, activeLine: 4, preview: 0.55 },
  { tab: 1, activeLine: 5, preview: 0.72 },
  { tab: 1, activeLine: 3, preview: 0.88 },
] as const;

const BEAT_MS = 2200;
const MOTION_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function useBuildBeat() {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setBeat(BUILD_BEATS.length - 1);
      return;
    }

    const timer = window.setInterval(() => {
      setBeat((current) => (current + 1) % BUILD_BEATS.length);
    }, BEAT_MS);

    return () => window.clearInterval(timer);
  }, []);

  return BUILD_BEATS[beat] ?? BUILD_BEATS[0]!;
}

function PreviewBars({ fill }: { fill: number }) {
  const heights = [0.42, 0.58, 0.72, 0.88].map((h) => h * fill);

  return (
    <div
      className="flex min-h-0 flex-1 items-end justify-center"
      style={{ gap: 5, padding: "6px 8px 4px" }}
    >
      {heights.map((h, index) => (
        <div
          key={index}
          style={{
            width: 14,
            height: `${Math.round(h * 100)}%`,
            minHeight: 4,
            borderRadius: 3,
            background: INK,
            opacity: 0.18 + index * 0.12,
            transition: `height 560ms ${MOTION_EASE}, opacity 420ms ${MOTION_EASE}`,
          }}
        />
      ))}
    </div>
  );
}

function CodeLine({
  line,
  active,
}: {
  line: CodeLineData;
  active: boolean;
}) {
  return (
    <div className="flex" style={{ height: 11 }}>
      <span
        className={inter.className}
        style={{
          width: 14,
          flexShrink: 0,
          color: MUTED_LIGHT,
          fontSize: 6.5,
          fontWeight: 500,
          lineHeight: "11px",
          textAlign: "right",
          paddingRight: 5,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {line.n}
      </span>
      <span
        style={{
          flex: 1,
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
          fontSize: 6.5,
          lineHeight: "11px",
          letterSpacing: "-0.02em",
          background: active ? "rgba(28, 22, 16, 0.06)" : "transparent",
          borderRadius: 2,
          paddingLeft: 2,
          transition: `background 420ms ${MOTION_EASE}`,
        }}
      >
        {line.parts.map((part) => (
          <span key={part.t} style={{ color: part.c }}>
            {part.t}
          </span>
        ))}
      </span>
    </div>
  );
}

function BuildSandboxPanel({ beat }: { beat: (typeof BUILD_BEATS)[number] }) {
  const lines = beat.tab === 0 ? PAGE_LINES : CHART_LINES;

  return (
    <div
      className={`flex flex-col ${suisseIntl.className}`}
      style={{
        width: BOX_SIZE_PX,
        height: BOX_SIZE_PX,
        borderRadius: "0.55rem",
        background: GLASS_BG,
        backdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
        WebkitBackdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
        boxSizing: "border-box",
        padding: "9px",
        overflow: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div className="flex shrink-0 items-center justify-between" style={{ gap: 6 }}>
        <span
          className={inter.className}
          style={{ color: INK, fontSize: 9, fontWeight: 600, lineHeight: 1, letterSpacing: "-0.02em" }}
        >
          Proto Sandbox
        </span>
        <span
          className={`${inter.className} flex items-center`}
          style={{
            color: RUNNING,
            fontSize: 7,
            fontWeight: 600,
            lineHeight: 1,
            gap: 4,
            background: "rgba(63, 107, 74, 0.1)",
            borderRadius: 999,
            padding: "3px 6px",
          }}
        >
          <span
            className="rounded-full"
            style={{ width: 4, height: 4, background: RUNNING }}
            aria-hidden
          />
          Running
        </span>
      </div>

      <div
        className="flex shrink-0"
        style={{
          marginTop: 8,
          borderBottom: `1px solid ${LINE}`,
          gap: 2,
        }}
      >
        {TABS.map((tab, index) => {
          const active = index === beat.tab;
          return (
            <span
              key={tab}
              className={inter.className}
              style={{
                color: active ? INK : MUTED_LIGHT,
                fontSize: 7,
                fontWeight: active ? 600 : 500,
                lineHeight: 1,
                padding: "4px 6px 5px",
                borderBottom: active ? `1.5px solid ${INK}` : "1.5px solid transparent",
                transition: `color 420ms ${MOTION_EASE}`,
              }}
            >
              {tab}
            </span>
          );
        })}
      </div>

      <div
        className="min-h-0 flex-1 overflow-hidden"
        style={{
          marginTop: 4,
          borderRadius: 5,
          background: SOFT,
          padding: "4px 2px",
        }}
      >
        {lines.map((line) => (
          <CodeLine key={`${beat.tab}-${line.n}`} line={line} active={line.n === beat.activeLine} />
        ))}
      </div>

      <div
        className="flex shrink-0 flex-col"
        style={{
          marginTop: 7,
          borderRadius: 6,
          background: SOFT,
          height: 58,
          overflow: "hidden",
        }}
      >
        <div
          className={inter.className}
          style={{
            color: MUTED,
            fontSize: 7,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "0.04em",
            padding: "5px 7px 0",
          }}
        >
          PREVIEW
        </div>
        <PreviewBars fill={beat.preview} />
      </div>
    </div>
  );
}

function BuildSandboxScene() {
  const beat = useBuildBeat();

  return (
    <div
      style={{
        position: "relative",
        width: PHONE_ARTBOARD_WIDTH_PX,
        height: PHONE_ARTBOARD_HEIGHT_PX,
      }}
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <BuildSandboxPanel beat={beat} />
      </div>
    </div>
  );
}

/** Applicant building inside the Proto sandbox — editor + live preview only. */
export function ProtoSandboxBuildVisual({
  layout = "phone",
}: {
  layout?: "phone" | "desktop";
}) {
  if (layout === "phone") {
    return (
      <div className={`mx-auto h-full w-full ${suisseIntl.className}`} aria-hidden>
        <ProtoPhoneScaledArtboard
          width={PHONE_ARTBOARD_WIDTH_PX}
          height={PHONE_ARTBOARD_HEIGHT_PX}
          fitScale={1.06}
          fixedBounds
          align="center"
        >
          <BuildSandboxScene />
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`} aria-hidden>
      <BuildSandboxScene />
    </div>
  );
}
