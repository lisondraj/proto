"use client";

import { useEffect, useState } from "react";

import { inter, plusJakartaSans, suisseIntl } from "@/lib/home/fonts";
import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";

const GLASS_BG =
  "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,251,246,0.84) 45%, rgba(255,248,242,0.74) 100%)";
const INK = "#1C1610";
const MUTED = "#5E564C";
const MUTED_LIGHT = "#8A8074";
const SOFT = "rgba(28, 22, 16, 0.045)";
const SOFT_ACTIVE = "rgba(28, 22, 16, 0.08)";
const LINE = "rgba(28, 22, 16, 0.1)";
const LIVE = "#3F6B4A";

const PHONE_ARTBOARD_WIDTH_PX = 360;
const PHONE_ARTBOARD_HEIGHT_PX = 360;
const BOX_SIZE_PX = Math.round(PHONE_ARTBOARD_WIDTH_PX * 0.78);

const FILES = [
  { path: "app/page.tsx", depth: 0 },
  { path: "components/Chart.tsx", depth: 0 },
  { path: "lib/db.ts", depth: 0 },
  { path: "proto.config.ts", depth: 0 },
] as const;

const REPLAY_EVENTS = [
  { time: "0:02", label: "Entered sandbox" },
  { time: "0:08", label: "Cloned starter repo" },
  { time: "0:19", label: "Edited app/page.tsx" },
  { time: "0:34", label: "Ran preview build" },
  { time: "0:52", label: "Passed rubric check" },
  { time: "1:04", label: "Submitted work" },
] as const;

const REPLAY_BEAT_MS = 1800;
const REPLAY_HOLD_MS = 2800;
const MOTION_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function useReplayTick() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTick(REPLAY_EVENTS.length);
      return;
    }

    let phase = 0;
    let timer = 0;

    const run = () => {
      phase = phase >= REPLAY_EVENTS.length ? 0 : phase + 1;
      setTick(phase);
      timer = window.setTimeout(
        run,
        phase === REPLAY_EVENTS.length ? REPLAY_HOLD_MS : REPLAY_BEAT_MS,
      );
    };

    timer = window.setTimeout(run, REPLAY_BEAT_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return tick;
}

function LiveDot() {
  return (
    <span
      className="relative inline-flex shrink-0"
      style={{ width: 6, height: 6 }}
      aria-hidden
    >
      <span
        className="absolute inset-0 animate-pulse rounded-full"
        style={{ background: LIVE, opacity: 0.35 }}
      />
      <span className="absolute inset-0 rounded-full" style={{ background: LIVE }} />
    </span>
  );
}

function TrackedSandboxPanel({ tick }: { tick: number }) {
  const activeFileIndex = tick <= 1 ? 0 : tick <= 3 ? 0 : tick <= 4 ? 1 : 2;
  const visibleEvents = REPLAY_EVENTS.slice(0, Math.max(1, tick));
  const activeEventIndex = Math.max(0, visibleEvents.length - 1);

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
        padding: "11px",
        overflow: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div className="flex shrink-0 items-center justify-between" style={{ gap: 8 }}>
        <div className="flex min-w-0 items-center" style={{ gap: 5 }}>
          <LiveDot />
          <span
            className={inter.className}
            style={{ color: MUTED, fontSize: 8, fontWeight: 600, lineHeight: 1, letterSpacing: "0.04em" }}
          >
            LIVE SANDBOX
          </span>
        </div>
        <div
          className={plusJakartaSans.className}
          style={{
            color: INK,
            fontSize: 11,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          92
          <span style={{ color: MUTED_LIGHT, fontWeight: 500, fontSize: 8 }}>/100</span>
        </div>
      </div>

      <div
        className={inter.className}
        style={{
          color: INK,
          fontSize: 9.5,
          fontWeight: 600,
          lineHeight: 1,
          letterSpacing: "-0.01em",
          marginTop: 8,
        }}
      >
        Jordan Park
      </div>
      <div
        className={inter.className}
        style={{ color: MUTED_LIGHT, fontSize: 8, fontWeight: 500, lineHeight: 1, marginTop: 3 }}
      >
        Product engineer · Session replay
      </div>

      <div className="flex min-h-0 flex-1" style={{ gap: 7, marginTop: 10 }}>
        <div
          className="flex min-w-0 flex-[0.42] flex-col"
          style={{
            borderRadius: 7,
            background: SOFT,
            padding: "7px 6px",
            boxSizing: "border-box",
          }}
        >
          <div
            className={inter.className}
            style={{
              color: MUTED_LIGHT,
              fontSize: 7,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "0.06em",
              marginBottom: 6,
              paddingLeft: 2,
            }}
          >
            WORKSPACE
          </div>
          {FILES.map((file, index) => {
            const active = index === activeFileIndex;
            return (
              <div
                key={file.path}
                className="flex min-w-0 items-center"
                style={{
                  borderRadius: 5,
                  background: active ? SOFT_ACTIVE : "transparent",
                  padding: "4px 5px",
                  gap: 4,
                  transition: `background 420ms ${MOTION_EASE}`,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: 999,
                    background: active ? INK : "rgba(28, 22, 16, 0.18)",
                    flexShrink: 0,
                  }}
                />
                <span
                  className={`${inter.className} truncate`}
                  style={{
                    color: active ? INK : MUTED,
                    fontSize: 7.5,
                    fontWeight: active ? 600 : 500,
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {file.path}
                </span>
              </div>
            );
          })}
        </div>

        <div
          className="flex min-w-0 flex-1 flex-col"
          style={{
            borderRadius: 7,
            background: SOFT,
            padding: "7px 6px",
            boxSizing: "border-box",
          }}
        >
          <div
            className={inter.className}
            style={{
              color: MUTED_LIGHT,
              fontSize: 7,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "0.06em",
              marginBottom: 6,
              paddingLeft: 2,
            }}
          >
            REPLAY
          </div>
          <div className="flex min-h-0 flex-1 flex-col" style={{ gap: 5 }}>
            {visibleEvents.map((event, index) => {
              const active = index === activeEventIndex;
              const done = index < activeEventIndex;

              return (
                <div
                  key={event.label}
                  className="flex min-w-0 items-start"
                  style={{ gap: 5, opacity: done ? 0.72 : 1 }}
                >
                  <span
                    className="relative shrink-0"
                    style={{ width: 8, height: 8, marginTop: 1 }}
                    aria-hidden
                  >
                    {done ? (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <circle cx="4" cy="4" r="3.25" fill={INK} />
                        <path
                          d="M2.3 4l1 1 2.5-2.6"
                          stroke="#FFF9F2"
                          strokeWidth="0.85"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <span
                        className="block rounded-full"
                        style={{
                          width: 8,
                          height: 8,
                          border: `1.25px solid ${active ? INK : LINE}`,
                          boxSizing: "border-box",
                          background: active ? "rgba(28, 22, 16, 0.06)" : "transparent",
                        }}
                      />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div
                      className={inter.className}
                      style={{
                        color: active ? INK : MUTED,
                        fontSize: active ? 8 : 7.5,
                        fontWeight: active ? 600 : 500,
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                        transition: `color 420ms ${MOTION_EASE}, font-size 420ms ${MOTION_EASE}`,
                      }}
                    >
                      {event.label}
                    </div>
                    <div
                      className={inter.className}
                      style={{
                        color: MUTED_LIGHT,
                        fontSize: 7,
                        fontWeight: 500,
                        lineHeight: 1,
                        marginTop: 2,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {event.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`${inter.className} flex shrink-0 items-center justify-between`}
        style={{
          marginTop: 8,
          paddingTop: 8,
          borderTop: `1px solid ${LINE}`,
          color: MUTED,
          fontSize: 7.5,
          fontWeight: 500,
          lineHeight: 1,
        }}
      >
        <span>6 tracked events</span>
        <span>Every action recorded</span>
      </div>
    </div>
  );
}

function TrackedSandboxScene() {
  const tick = useReplayTick();

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
        <TrackedSandboxPanel tick={tick} />
      </div>
    </div>
  );
}

/** Inside a tracked sandbox — live session, workspace, and replay timeline. */
export function ProtoSandboxTrackedVisual({
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
          <TrackedSandboxScene />
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`} aria-hidden>
      <TrackedSandboxScene />
    </div>
  );
}
