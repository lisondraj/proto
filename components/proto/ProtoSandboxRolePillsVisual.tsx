"use client";

import { useEffect, useState } from "react";

import { plusJakartaSans, suisseIntl } from "@/lib/home/fonts";
import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";

const GLASS_BG =
  "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,250,244,0.84) 45%, rgba(255,248,242,0.74) 100%)";
const INK = "#1C1610";

const PHONE_ARTBOARD_WIDTH_PX = 360;
const PHONE_ARTBOARD_HEIGHT_PX = 360;

/** Long list for seamless infinite spin. */
const ROLE_PILLS = [
  "Product",
  "Engineering",
  "Operations",
  "Design",
  "Data",
  "Growth",
  "Marketing",
  "Sales",
  "Finance",
  "Legal",
  "Support",
  "Research",
  "Security",
  "People",
  "Strategy",
  "Platform",
  "Success",
  "Analytics",
] as const;

const ITEM_H = 52;
const ITEM_GAP = 8;
const STRIDE = ITEM_H + ITEM_GAP;
/** Exactly three pills visible. */
const VISIBLE = 3;
const VIEWPORT_H = STRIDE * VISIBLE;
/** px per second */
const SPIN_SPEED = 4.5;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Smootherstep — gentler ease through the middle band. */
function smootherstep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

const MAX_SCALE = 1.12;
const MIN_SCALE = 0.8;
/** Base width so max scale fills the column without clipping. */
const PILL_WIDTH_PCT = 100 / MAX_SCALE;

/**
 * Distance from center (0 = middle) → scale / opacity.
 * One transform scales pill + text together; width is pre-sized for MAX_SCALE.
 */
function tierFromDistance(distPx: number) {
  const t = smootherstep(distPx / (STRIDE * 1.15));
  const scale = MAX_SCALE - t * (MAX_SCALE - MIN_SCALE);
  const opacity = 1 - t * 0.7;
  return { scale, opacity };
}

function RolePill({
  role,
  scale,
  opacity,
}: {
  role: string;
  scale: number;
  opacity: number;
}) {
  return (
    <div
      className="flex w-full items-center justify-center"
      style={{ height: ITEM_H }}
    >
      <div
        className="flex items-center justify-center text-center"
        style={{
          // Fixed fraction of column; scale() grows/shrinks pill and text as one.
          // At MAX_SCALE visual width = 100% — never clips either column.
          width: `${PILL_WIDTH_PCT}%`,
          background: GLASS_BG,
          backdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
          WebkitBackdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
          borderRadius: 999,
          minHeight: 44,
          padding: "12px 10px",
          opacity,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          willChange: "transform, opacity",
          boxSizing: "border-box",
        }}
      >
        <div
          className={plusJakartaSans.className}
          style={{
            color: INK,
            fontSize: 12,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            whiteSpace: "nowrap",
          }}
        >
          {role}
        </div>
      </div>
    </div>
  );
}

function SpinnerColumn({
  roles,
  shift,
}: {
  roles: readonly string[];
  /** Shared pixel shift — same on both columns so rows stay paired. */
  shift: number;
}) {
  const centerY = VIEWPORT_H / 2;
  // Two copies — each pill keeps its label as it travels.
  const track = [...roles, ...roles];

  return (
    <div
      className="relative min-w-0 flex-1"
      style={{ height: VIEWPORT_H }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          // Long soft ramps — top/bottom fade in and out gradually.
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, #000 28%, #000 72%, transparent 100%)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, #000 28%, #000 72%, transparent 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            transform: `translate3d(0, ${-shift}px, 0)`,
            willChange: "transform",
          }}
        >
          {track.map((role, index) => {
            const y = index * STRIDE;
            const itemCenter = y + ITEM_H / 2 - shift;
            const dist = Math.abs(itemCenter - centerY);
            const tier = tierFromDistance(dist);

            return (
              <div
                key={`${role}-${index}`}
                style={{
                  height: STRIDE,
                  paddingBottom: ITEM_GAP,
                  boxSizing: "border-box",
                }}
              >
                <RolePill role={role} {...tier} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RolePillsGrid() {
  const [offset, setOffset] = useState(0);
  const loopH = ROLE_PILLS.length * STRIDE;
  // Shared shift = pills always side-by-side; labels ride on each pill.
  // Right column runs the list in reverse so the two reels feel opposite.
  const shift = mod(offset, loopH);
  const rightRoles = [...ROLE_PILLS].reverse();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      setOffset((o) => o + SPIN_SPEED * dt);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        width: PHONE_ARTBOARD_WIDTH_PX,
        height: PHONE_ARTBOARD_HEIGHT_PX,
        padding: "28px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="flex w-full"
        style={{
          gap: 12,
          height: VIEWPORT_H,
        }}
      >
        <SpinnerColumn roles={ROLE_PILLS} shift={shift} />
        <SpinnerColumn roles={rightRoles} shift={shift} />
      </div>
    </div>
  );
}

/** /proto ambient slide — infinite dual-column role spinner. */
export function ProtoSandboxRolePillsVisual({
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
          fitScale={1}
          fixedBounds
        >
          <RolePillsGrid />
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`}
      aria-hidden
    >
      <div style={{ width: "min(100%, 22rem)" }}>
        <RolePillsGrid />
      </div>
    </div>
  );
}
