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

const PHONE_W = 360;
const PHONE_H = 360;
const CARD_W = 318;

const VALIDATION_SIGNALS = [
  { label: "Completed flow", at: 2 },
  { label: "Marked helpful", at: 4 },
  { label: "Would adopt", at: 5 },
] as const;

const CODE_LINES = [
  { n: 3, text: "export function IntakeForm() {" },
  { n: 4, text: "  return (" },
  { n: 5, text: '    <form onSubmit={submit}>' },
  { n: 6, text: '      <Field label="Name" />' },
  { n: 7, text: '      <Select label="Visit" />' },
  { n: 8, text: "      <Button>Submit</Button>" },
  { n: 9, text: "    </form>" },
] as const;

const BEAT_MS = 2300;
const MOTION_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function useTestBeat(inView: boolean) {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setBeat(4);
      return;
    }

    const timer = window.setInterval(() => {
      setBeat((current) => (current + 1) % CODE_LINES.length);
    }, BEAT_MS);

    return () => window.clearInterval(timer);
  }, [inView]);

  return beat;
}

function LiveTesters({ count }: { count: number }) {
  return (
    <div className={`${inter.className} flex items-center`} style={{ gap: 5 }}>
      <div className="flex items-center" style={{ gap: 3 }}>
        {Array.from({ length: 3 }, (_, index) => (
          <span
            key={index}
            className="rounded-full"
            style={{
              width: 4,
              height: 4,
              background: index < count ? LIVE : "rgba(28, 22, 16, 0.14)",
              transition: `background 420ms ${MOTION_EASE}`,
            }}
            aria-hidden
          />
        ))}
      </div>
      <span style={{ color: MUTED, fontSize: 7, fontWeight: 600, lineHeight: 1 }}>
        {count} live
      </span>
    </div>
  );
}

function CodePane({ beat }: { beat: number }) {
  return (
    <div
      className="min-h-0 flex-1 overflow-hidden"
      style={{
        background: CODE_SURFACE,
        borderRadius: 8,
        padding: "7px 6px 8px",
      }}
    >
      {CODE_LINES.map((line, index) => {
        const active = index === beat;
        const isSubmit = line.n === 8;
        return (
          <div
            key={line.n}
            className="flex min-w-0"
            style={{
              height: 12,
              borderLeft: active ? `2px solid ${LIVE}` : "2px solid transparent",
              paddingLeft: active ? 4 : 6,
              transition: `border-color 420ms ${MOTION_EASE}, padding-left 420ms ${MOTION_EASE}`,
            }}
          >
            <span
              className={inter.className}
              style={{
                width: 11,
                flexShrink: 0,
                color: CODE_MUTED,
                fontSize: 6,
                lineHeight: "12px",
                textAlign: "right",
                paddingRight: 4,
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
                lineHeight: "12px",
                letterSpacing: "-0.02em",
                color: isSubmit && active ? "#A8D4B0" : line.n <= 4 ? CODE_KEY : CODE_INK,
                opacity: active ? 1 : 0.82,
                whiteSpace: "nowrap",
                transition: `opacity 420ms ${MOTION_EASE}, color 420ms ${MOTION_EASE}`,
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

function PreviewPane({ submitActive, showFeedback }: { submitActive: boolean; showFeedback: boolean }) {
  return (
    <div
      className="relative flex flex-col"
      style={{
        width: 118,
        flexShrink: 0,
        borderRadius: 10,
        background: "rgba(255, 252, 247, 0.96)",
        border: `1px solid ${LINE}`,
        padding: "8px 8px 9px",
        boxShadow: "0 6px 16px rgba(28, 22, 16, 0.08)",
        boxSizing: "border-box",
      }}
    >
      <div style={{ height: 5, width: "50%", borderRadius: 3, background: SOFT }} />
      <div style={{ height: 22, marginTop: 7, borderRadius: 5, background: SOFT }} />
      <div style={{ height: 22, marginTop: 5, borderRadius: 5, background: SOFT }} />
      <div
        className={inter.className}
        style={{
          height: 22,
          marginTop: 8,
          borderRadius: 5,
          background: submitActive ? INK : "rgba(28, 22, 16, 0.82)",
          color: "#FFF9F2",
          fontSize: 7,
          fontWeight: 600,
          lineHeight: "22px",
          textAlign: "center",
          boxShadow: submitActive ? `0 0 0 2px rgba(63, 107, 74, 0.35)` : "none",
          transition: `background 420ms ${MOTION_EASE}, box-shadow 420ms ${MOTION_EASE}`,
        }}
      >
        Submit
      </div>

      <div
        style={{
          marginTop: 8,
          paddingTop: 7,
          borderTop: `1px solid ${LINE}`,
        }}
      >
        <div
          className={inter.className}
          style={{
            color: MUTED_LIGHT,
            fontSize: 6.5,
            fontWeight: 600,
            lineHeight: 1,
            marginBottom: 5,
          }}
        >
          Helpful?
        </div>
        <div className="flex" style={{ gap: 4 }}>
          {(["Yes", "No"] as const).map((label) => {
            const active = showFeedback && label === "Yes";
            return (
              <span
                key={label}
                className={`${inter.className} flex-1 text-center font-semibold`}
                style={{
                  borderRadius: 4,
                  padding: "4px 0",
                  fontSize: 6.5,
                  lineHeight: 1,
                  color: active ? INK : MUTED_LIGHT,
                  background: active ? "rgba(63, 107, 74, 0.12)" : SOFT,
                  transition: `background 420ms ${MOTION_EASE}, color 420ms ${MOTION_EASE}`,
                }}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ValidationFooter({ beat }: { beat: number }) {
  const fill = Math.min(1, 0.18 + ((beat + 1) / CODE_LINES.length) * 0.82);
  const pct = Math.round(fill * 100);

  return (
    <div
      className="shrink-0"
      style={{
        marginTop: 8,
        paddingTop: 8,
        borderTop: `1px solid ${LINE}`,
      }}
    >
      <div className="flex items-center justify-between" style={{ marginBottom: 5 }}>
        <span
          className={inter.className}
          style={{ color: MUTED_LIGHT, fontSize: 7, fontWeight: 600, lineHeight: 1, letterSpacing: "0.04em" }}
        >
          USER VALIDATION
        </span>
        <span
          className={`${inter.className} tabular-nums`}
          style={{ color: fill >= 0.85 ? LIVE : MUTED, fontSize: 8, fontWeight: 700, lineHeight: 1 }}
        >
          {pct}%
        </span>
      </div>

      <div style={{ height: 4, borderRadius: 999, background: SOFT, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: 999,
            background: LIVE,
            opacity: 0.78,
            transition: `width 560ms ${MOTION_EASE}`,
          }}
        />
      </div>

      <div className="flex flex-wrap" style={{ gap: 5, marginTop: 7 }}>
        {VALIDATION_SIGNALS.map((signal) => {
          const done = beat >= signal.at;
          return (
            <span
              key={signal.label}
              className={`${inter.className} inline-flex items-center font-medium`}
              style={{
                gap: 4,
                borderRadius: 999,
                padding: "3px 7px",
                fontSize: 6.5,
                lineHeight: 1,
                color: done ? INK : MUTED_LIGHT,
                background: done ? "rgba(63, 107, 74, 0.1)" : SOFT,
                opacity: done ? 1 : 0.55,
                transition: `background 420ms ${MOTION_EASE}, color 420ms ${MOTION_EASE}, opacity 420ms ${MOTION_EASE}`,
              }}
            >
              {done ? (
                <svg width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden>
                  <path
                    d="M1.4 3.5l1.2 1.2 2.8-2.9"
                    stroke={LIVE}
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <span
                  className="rounded-full"
                  style={{ width: 4, height: 4, border: `1px solid ${LINE}` }}
                  aria-hidden
                />
              )}
              {signal.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function TestSessionCard({ beat }: { beat: number }) {
  const testers = beat >= 4 ? 3 : beat >= 2 ? 2 : 1;
  const submitActive = beat === 5;
  const showFeedback = beat >= 4;

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
      <div className="flex shrink-0 items-center justify-between" style={{ gap: 8, marginBottom: 7 }}>
        <div className="flex min-w-0 items-center" style={{ gap: 6 }}>
          <span
            className={inter.className}
            style={{
              color: INK,
              fontSize: 7.5,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "-0.01em",
              background: SOFT,
              borderRadius: 5,
              padding: "4px 7px",
            }}
          >
            IntakeForm.tsx
          </span>
          <span
            className={inter.className}
            style={{ color: MUTED_LIGHT, fontSize: 7, fontWeight: 500, lineHeight: 1 }}
          >
            + preview
          </span>
        </div>
        <LiveTesters count={testers} />
      </div>

      <div className="flex min-h-0 flex-1" style={{ gap: 8 }}>
        <div className="flex min-w-0 flex-1 flex-col">
          <CodePane beat={beat} />
        </div>
        <div className="flex items-start" style={{ paddingTop: 2 }}>
          <PreviewPane submitActive={submitActive} showFeedback={showFeedback} />
        </div>
      </div>

      <ValidationFooter beat={beat} />
    </div>
  );
}

function CroppedSessionScene({ beat }: { beat: number }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: PHONE_W, height: PHONE_H }}
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <TestSessionCard beat={beat} />
      </div>
    </div>
  );
}

export function ProtoValidateVisual({ layout = "phone" }: { layout?: "phone" | "desktop" }) {
  const { ref, inView } = useProtoShaderBoxInView();
  const beat = useTestBeat(inView);

  if (layout === "phone") {
    return (
      <div ref={ref} className={`mx-auto h-full w-full ${suisseIntl.className}`} aria-hidden>
        <ProtoPhoneScaledArtboard width={PHONE_W} height={PHONE_H} fitScale={1.06} fixedBounds align="center">
          <CroppedSessionScene beat={beat} />
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`mx-auto flex h-full w-full items-center justify-center overflow-hidden ${suisseIntl.className}`}
      aria-hidden
    >
      <CroppedSessionScene beat={beat} />
    </div>
  );
}
