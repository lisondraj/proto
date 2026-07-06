"use client";

import { useEffect, useState } from "react";

import { inter, suisseIntl } from "@/lib/home/fonts";
import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";
import { useProtoShaderBoxInView } from "@/lib/proto/use-proto-shader-box-in-view";

const GLASS =
  "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(255,251,246,0.9) 48%, rgba(255,248,242,0.82) 100%)";
const INK = "#1C1610";
const MUTED = "#5E564C";
const MUTED_LIGHT = "#8A8074";
const SOFT = "rgba(28, 22, 16, 0.045)";
const LINE = "rgba(28, 22, 16, 0.1)";
const CODE_KEY = "#6B5344";
const CODE_SURFACE = "rgba(22, 18, 14, 0.92)";
const CODE_INK = "#E8E2D8";
const CODE_MUTED = "rgba(232, 226, 216, 0.38)";
const LIVE = "#3F6B4A";
const RECORD = "#8A5048";

const PHONE_W = 360;
const PHONE_H = 360;
const CARD_W = 318;

const PAGE_LINES = [
  { n: 1, text: "import { Chart } from './Chart'" },
  { n: 2, text: "" },
  { n: 3, text: "export default function Page() {" },
  { n: 4, text: "  const rows = forecastData()" },
  { n: 5, text: "  return (" },
  { n: 6, text: "    <main>" },
  { n: 7, text: "      <Chart data={rows} />" },
  { n: 8, text: "    </main>" },
] as const;

const CHART_LINES = [
  { n: 1, text: "export function Chart({ data }) {" },
  { n: 2, text: "  return (" },
  { n: 3, text: '    <svg viewBox="0 0 120 48">' },
  { n: 4, text: "      {data.map((bar) => (" },
  { n: 5, text: "        <rect key={bar.id} />" },
  { n: 6, text: "      ))}" },
] as const;

const REPLAY_STEPS = [
  { label: "Entered sandbox", time: "0:02", tab: 0, line: -1, preview: 0.12 },
  { label: "Cloned starter repo", time: "0:08", tab: 0, line: 1, preview: 0.22 },
  { label: "Edited app/page.tsx", time: "0:19", tab: 0, line: 4, preview: 0.48 },
  { label: "Ran preview build", time: "0:34", tab: 0, line: 6, preview: 0.7 },
  { label: "Passed rubric check", time: "0:52", tab: 1, line: 3, preview: 0.86 },
  { label: "Submitted work", time: "1:04", tab: 0, line: 7, preview: 1 },
] as const;

const BEAT_MS = 2000;
const HOLD_MS = 2600;
const MOTION_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function useReplayTick(inView: boolean) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTick(REPLAY_STEPS.length);
      return;
    }

    let phase = 0;
    let timer = 0;

    const run = () => {
      phase = phase >= REPLAY_STEPS.length ? 0 : phase + 1;
      setTick(phase);
      timer = window.setTimeout(run, phase === REPLAY_STEPS.length ? HOLD_MS : BEAT_MS);
    };

    timer = window.setTimeout(run, BEAT_MS);
    return () => window.clearTimeout(timer);
  }, [inView]);

  return tick;
}

function RecordingPill() {
  return (
    <span
      className={`${inter.className} inline-flex items-center`}
      style={{
        color: RECORD,
        fontSize: 7,
        fontWeight: 600,
        lineHeight: 1,
        gap: 4,
        background: "rgba(138, 80, 72, 0.1)",
        borderRadius: 999,
        padding: "3px 6px",
      }}
    >
      <span className="relative flex" style={{ width: 4, height: 4 }} aria-hidden>
        <span className="absolute inset-0 animate-pulse rounded-full" style={{ background: RECORD, opacity: 0.45 }} />
        <span className="relative rounded-full" style={{ width: 4, height: 4, background: RECORD }} />
      </span>
      Recording
    </span>
  );
}

function ScoreBadge({ score }: { score: number }) {
  return (
    <span
      className={`${inter.className} inline-flex items-baseline tabular-nums`}
      style={{
        background: SOFT,
        borderRadius: 6,
        padding: "3px 7px",
        gap: 1,
      }}
    >
      <span style={{ color: INK, fontSize: 10, fontWeight: 700, lineHeight: 1 }}>{score}</span>
      <span style={{ color: MUTED_LIGHT, fontSize: 7, fontWeight: 500, lineHeight: 1 }}>/100</span>
    </span>
  );
}

function CodePane({
  tab,
  activeLine,
}: {
  tab: number;
  activeLine: number;
}) {
  const lines = tab === 0 ? PAGE_LINES : CHART_LINES;

  return (
    <div
      className="min-h-0 flex-1 overflow-hidden"
      style={{
        background: CODE_SURFACE,
        borderRadius: 8,
        padding: "6px 5px 7px",
      }}
    >
      {lines.map((line) => {
        const active = line.n === activeLine;
        return (
          <div
            key={`${tab}-${line.n}`}
            className="flex min-w-0"
            style={{
              height: 11,
              borderLeft: active ? `2px solid ${LIVE}` : "2px solid transparent",
              paddingLeft: active ? 4 : 6,
              transition: `border-color 420ms ${MOTION_EASE}, padding-left 420ms ${MOTION_EASE}`,
            }}
          >
            <span
              className={inter.className}
              style={{
                width: 10,
                flexShrink: 0,
                color: CODE_MUTED,
                fontSize: 6,
                lineHeight: "11px",
                textAlign: "right",
                paddingRight: 3,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {line.n}
            </span>
            <span
              style={{
                flex: 1,
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
                fontSize: 6.5,
                lineHeight: "11px",
                letterSpacing: "-0.02em",
                color: line.n <= 3 ? CODE_KEY : CODE_INK,
                opacity: active ? 1 : 0.84,
                whiteSpace: "nowrap",
                transition: `opacity 420ms ${MOTION_EASE}`,
              }}
            >
              {line.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PreviewPane({ fill }: { fill: number }) {
  const heights = [0.38, 0.52, 0.66, 0.82].map((h) => h * fill);

  return (
    <div
      style={{
        width: 108,
        flexShrink: 0,
        borderRadius: 9,
        background: "rgba(255, 252, 247, 0.96)",
        border: `1px solid ${LINE}`,
        padding: "7px 7px 6px",
        boxShadow: "0 4px 14px rgba(28, 22, 16, 0.07)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className={inter.className}
        style={{ color: MUTED_LIGHT, fontSize: 6.5, fontWeight: 600, lineHeight: 1, marginBottom: 5 }}
      >
        PREVIEW
      </div>
      <div className="flex min-h-0 flex-1 items-end justify-center" style={{ gap: 4, minHeight: 52 }}>
        {heights.map((h, index) => (
          <div
            key={index}
            style={{
              width: 12,
              height: `${Math.round(Math.max(h, 0.08) * 100)}%`,
              minHeight: 3,
              borderRadius: 3,
              background: INK,
              opacity: 0.16 + index * 0.1,
              transition: `height 520ms ${MOTION_EASE}, opacity 420ms ${MOTION_EASE}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ReplayScrubber({ tick }: { tick: number }) {
  const progress = tick === 0 ? 0 : tick / REPLAY_STEPS.length;
  const step = tick === 0 ? REPLAY_STEPS[0]! : REPLAY_STEPS[Math.min(tick, REPLAY_STEPS.length) - 1]!;

  return (
    <div className="shrink-0" style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${LINE}` }}>
      <div className="relative" style={{ height: 14, marginBottom: 6 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 9,
            height: 3,
            borderRadius: 999,
            background: SOFT,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.round(progress * 100)}%`,
              borderRadius: 999,
              background: LIVE,
              opacity: 0.72,
              transition: `width 480ms ${MOTION_EASE}`,
            }}
          />
        </div>
        {REPLAY_STEPS.map((_, index) => {
          const done = tick > index;
          const active = tick === index + 1 || (tick === 0 && index === 0);
          const left = `${((index + 0.5) / REPLAY_STEPS.length) * 100}%`;
          return (
            <span
              key={index}
              className="absolute rounded-full"
              style={{
                left,
                top: 6,
                width: done ? 6 : 5,
                height: done ? 6 : 5,
                marginLeft: done ? -3 : -2.5,
                background: done ? LIVE : active ? INK : "rgba(28, 22, 16, 0.14)",
                boxShadow: active && !done ? `0 0 0 2px rgba(28, 22, 16, 0.12)` : "none",
                transition: `background 420ms ${MOTION_EASE}, width 420ms ${MOTION_EASE}, height 420ms ${MOTION_EASE}`,
              }}
              aria-hidden
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between" style={{ gap: 8 }}>
        <span
          className={`${inter.className} min-w-0 truncate font-medium`}
          style={{ color: INK, fontSize: 7.5, lineHeight: 1.1, letterSpacing: "-0.012em" }}
        >
          {step.label}
        </span>
        <span
          className={`${inter.className} shrink-0 tabular-nums`}
          style={{ color: MUTED_LIGHT, fontSize: 7, fontWeight: 500, lineHeight: 1 }}
        >
          {step.time}
        </span>
      </div>
    </div>
  );
}

function TrackedSessionCard({ tick }: { tick: number }) {
  const stepIndex = tick === 0 ? 0 : Math.min(tick, REPLAY_STEPS.length) - 1;
  const step = REPLAY_STEPS[stepIndex]!;
  const score = tick <= 1 ? 68 : tick <= 3 ? 79 : tick <= 4 ? 88 : 92;

  return (
    <div
      className={`flex flex-col ${suisseIntl.className}`}
      style={{
        width: CARD_W,
        height: 268,
        borderRadius: "0.6rem",
        background: GLASS,
        backdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
        WebkitBackdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
        boxSizing: "border-box",
        padding: "8px 8px 9px",
        boxShadow: "0 8px 28px rgba(28, 22, 16, 0.11), inset 0 1px 0 rgba(255,255,255,0.68)",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div className="flex shrink-0 items-center justify-between" style={{ gap: 8 }}>
        <RecordingPill />
        <ScoreBadge score={score} />
      </div>

      <div className="flex shrink-0 items-baseline justify-between" style={{ marginTop: 7, gap: 8 }}>
        <span
          className={inter.className}
          style={{ color: INK, fontSize: 9, fontWeight: 600, lineHeight: 1, letterSpacing: "-0.01em" }}
        >
          Jordan Park
        </span>
        <span
          className={`${inter.className} tabular-nums`}
          style={{ color: MUTED_LIGHT, fontSize: 7, fontWeight: 500, lineHeight: 1 }}
        >
          {step.time} elapsed
        </span>
      </div>

      <div
        className="flex shrink-0"
        style={{ marginTop: 7, borderBottom: `1px solid ${LINE}`, gap: 2 }}
      >
        {(["page.tsx", "Chart.tsx"] as const).map((tab, index) => {
          const active = step.tab === index;
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

      <div className="flex min-h-0 flex-1" style={{ gap: 7, marginTop: 6 }}>
        <div className="flex min-w-0 flex-1 flex-col">
          <CodePane tab={step.tab} activeLine={step.line} />
        </div>
        <div className="flex items-start" style={{ paddingTop: 1 }}>
          <PreviewPane fill={step.preview} />
        </div>
      </div>

      <ReplayScrubber tick={tick} />
    </div>
  );
}

function TrackedScene({ tick }: { tick: number }) {
  return (
    <div style={{ position: "relative", width: PHONE_W, height: PHONE_H }}>
      <div className="absolute left-1/2 top-1/2" style={{ transform: "translate(-50%, -50%)" }}>
        <TrackedSessionCard tick={tick} />
      </div>
    </div>
  );
}

/** Inside a tracked sandbox — live code, preview, and replay scrubber. */
export function ProtoSandboxTrackedVisual({
  layout = "phone",
}: {
  layout?: "phone" | "desktop";
}) {
  const { ref, inView } = useProtoShaderBoxInView();
  const tick = useReplayTick(inView);

  if (layout === "phone") {
    return (
      <div ref={ref} className={`mx-auto h-full w-full ${suisseIntl.className}`} aria-hidden>
        <ProtoPhoneScaledArtboard width={PHONE_W} height={PHONE_H} fitScale={1.06} fixedBounds align="center">
          <TrackedScene tick={tick} />
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`}
      aria-hidden
    >
      <TrackedScene tick={tick} />
    </div>
  );
}
