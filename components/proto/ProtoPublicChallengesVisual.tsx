"use client";

import { memo, useEffect, useRef, useState } from "react";

import { plusJakartaSans, suisseIntl } from "@/lib/home/fonts";
import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";
import { ProtoSandboxStartupIcon } from "@/components/proto/ProtoSandboxStartupLogos";
import {
  PROTO_PUBLIC_CHALLENGE_COLUMNS,
  protoPublicChallengeLoopHeight,
  protoPublicChallengeTrack,
  type ProtoPublicChallenge,
} from "@/lib/proto/proto-public-challenges";
import { useProtoShaderBoxInView } from "@/lib/proto/use-proto-shader-box-in-view";

const GLASS =
  "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(255,251,246,0.88) 48%, rgba(255,248,242,0.8) 100%)";
const INK = "#1C1610";
const MUTED = "#5E564C";
const FADE_MASK =
  "linear-gradient(180deg, transparent 0%, #000 16%, #000 84%, transparent 100%)";

const PHONE_W = 360;
const PHONE_H = 360;
const UI_SCALE = 0.86;
const GRID_W = 340;
const COL_GAP = 7;
const ICON_SIZE = 13;
const TITLE_LINE_H = 11;
const TITLE_BLOCK_H = TITLE_LINE_H * 3;
const TILE_H = 88;
const TILE_GAP = 8;
const STRIDE = TILE_H + TILE_GAP;
const VISIBLE = 3;
const FADE_PAD = Math.round(STRIDE * 0.75);
const VIEWPORT_H = STRIDE * VISIBLE + FADE_PAD * 2;
const CENTER_COL_DROP = STRIDE * 0.52;

const SPEEDS = [6, 7.5, 5.5] as const;
const START_OFFSETS = [STRIDE * 0.18, STRIDE * 0.55, STRIDE * 0.22] as const;
const LOOP_H = Array.from({ length: PROTO_PUBLIC_CHALLENGE_COLUMNS }, (_, column) =>
  protoPublicChallengeLoopHeight(column, STRIDE),
);

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function smootherstep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function focusTier(distPx: number) {
  const t = smootherstep(distPx / (STRIDE * 1.5));
  return {
    opacity: 1 - t * 0.76,
    focused: t < 0.36,
  };
}

const ChallengeTile = memo(function ChallengeTile({
  challenge,
  opacity,
  focused,
}: {
  challenge: ProtoPublicChallenge;
  opacity: number;
  focused: boolean;
}) {
  return (
    <article
      className={`relative flex h-full min-w-0 flex-col overflow-hidden ${plusJakartaSans.className}`}
      style={{
        background: GLASS,
        borderRadius: 10,
        padding: "9px 10px 8px",
        boxSizing: "border-box",
        opacity,
        boxShadow: focused
          ? "0 3px 12px rgba(28, 22, 16, 0.1), inset 0 1px 0 rgba(255,255,255,0.68)"
          : "0 1px 4px rgba(28, 22, 16, 0.06), inset 0 1px 0 rgba(255,255,255,0.58)",
        ...(focused
          ? {
              backdropFilter: "blur(14px) saturate(1.22) brightness(1.02)",
              WebkitBackdropFilter: "blur(14px) saturate(1.22) brightness(1.02)",
            }
          : {}),
      }}
    >
      <div className="absolute right-[9px] top-[9px]">
        <ProtoSandboxStartupIcon id={challenge.id} size={ICON_SIZE} theme="glass" />
      </div>

      <div className="min-w-0" style={{ paddingRight: 16 }}>
        <p
          className="font-semibold"
          style={{
            color: INK,
            fontSize: 8.5,
            lineHeight: `${TITLE_LINE_H}px`,
            minHeight: TITLE_BLOCK_H,
            letterSpacing: "-0.014em",
            overflowWrap: "break-word",
            wordBreak: "normal",
          }}
        >
          {challenge.title}
        </p>
        <p
          className="font-medium"
          style={{
            color: MUTED,
            fontSize: 8,
            lineHeight: "10px",
            marginTop: 3,
            overflowWrap: "break-word",
          }}
        >
          {challenge.role}
        </p>
      </div>

      <div
        className="mt-auto flex items-center justify-between"
        style={{ gap: 5, paddingTop: 6 }}
      >
        <p
          className="min-w-0 font-semibold tabular-nums leading-none"
          style={{
            color: INK,
            fontSize: 8.5,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {challenge.pay}
        </p>
        <span
          className="shrink-0 font-medium leading-none"
          style={{
            background: "rgba(28, 22, 16, 0.06)",
            color: MUTED,
            fontSize: 7.5,
            padding: "3px 6px",
            borderRadius: 999,
          }}
        >
          Submit
        </span>
      </div>
    </article>
  );
});

function ChallengeColumn({
  column,
  shift,
  active,
}: {
  column: number;
  shift: number;
  active: boolean;
}) {
  const centerY = VIEWPORT_H / 2;
  const track = protoPublicChallengeTrack(column);
  const scrollY = -shift;

  return (
    <div className="relative min-w-0 flex-1" style={{ height: VIEWPORT_H }}>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ WebkitMaskImage: FADE_MASK, maskImage: FADE_MASK }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            transform: `translate3d(0, ${scrollY}px, 0)`,
            willChange: active ? "transform" : undefined,
            backfaceVisibility: "hidden",
          }}
        >
          {track.map((challenge, index) => {
            const y = index * STRIDE;
            const itemCenter = y + TILE_H / 2 + scrollY;
            const dist = Math.abs(itemCenter - centerY);
            const tier = focusTier(dist);

            return (
              <div
                key={`${challenge.id}-${index}`}
                style={{ height: TILE_H, marginBottom: TILE_GAP, boxSizing: "border-box" }}
              >
                <ChallengeTile challenge={challenge} focused={tier.focused} opacity={tier.opacity} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ChallengeGrid({ active }: { active: boolean }) {
  const [shifts, setShifts] = useState(() => [...START_OFFSETS]);
  const offsetsRef = useRef([...START_OFFSETS]);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.032);
      last = now;
      offsetsRef.current = offsetsRef.current.map((offset, column) =>
        mod(offset + (SPEEDS[column] ?? 6) * dt, LOOP_H[column] ?? STRIDE),
      );
      setShifts([...offsetsRef.current]);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div
      className="flex items-start"
      style={{ width: GRID_W, height: VIEWPORT_H, gap: COL_GAP, margin: "0 auto" }}
    >
      {Array.from({ length: PROTO_PUBLIC_CHALLENGE_COLUMNS }, (_, column) => (
        <div
          key={column}
          className="min-w-0 flex-1"
          style={{ marginTop: column === 1 ? CENTER_COL_DROP : 0 }}
        >
          <ChallengeColumn column={column} shift={shifts[column] ?? 0} active={active} />
        </div>
      ))}
    </div>
  );
}

/** /proto shortlist — three columns of public challenge tiles with role prize. */
export function ProtoPublicChallengesVisual({ layout = "phone" }: { layout?: "phone" | "desktop" }) {
  const { ref, inView } = useProtoShaderBoxInView();
  const panel = (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ width: PHONE_W, height: PHONE_H }}
    >
      <ChallengeGrid active={inView} />
    </div>
  );

  if (layout === "phone") {
    return (
      <div ref={ref} className={`mx-auto h-full w-full ${suisseIntl.className}`} aria-hidden>
        <ProtoPhoneScaledArtboard width={PHONE_W} height={PHONE_H} fitScale={1.06 * UI_SCALE} fixedBounds>
          {panel}
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`}
      style={{ maxWidth: "min(100%, 28rem)" }}
      aria-hidden
    >
      <div style={{ transform: `scale(${UI_SCALE})`, transformOrigin: "center center" }}>{panel}</div>
    </div>
  );
}
