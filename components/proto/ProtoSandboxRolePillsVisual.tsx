"use client";

import { useEffect, useRef, useState } from "react";

import { inter, suisseIntl } from "@/lib/home/fonts";
import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";

/** Match set-rules dropdown pill fill. */
const PROTO_GLASS_BG =
  "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,251,246,0.84) 45%, rgba(255,248,242,0.74) 100%)";
const PROTO_INK = "#1C1610";

const PHONE_ARTBOARD_WIDTH_PX = 360;
const PHONE_ARTBOARD_HEIGHT_PX = 360;
const PROTO_BOX_PX = Math.round(PHONE_ARTBOARD_WIDTH_PX * 0.78);
/** Same footprint as set-rules menus. */
const PROTO_DROPDOWN_GRID_W = Math.round(PROTO_BOX_PX * 0.92);
const PROTO_BOX_RADIUS = "0.55rem";
/** Match set-rules UI scale. */
const PROTO_RULES_UI_SCALE = 0.86;

const PROTO_PILL_GLASS = {
  background: PROTO_GLASS_BG,
  backdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
  WebkitBackdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
} as const;

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

/** Match set-rules pill row height (11px pad × 2 + 11px type). */
const ITEM_H = 38;
const ITEM_GAP = 7;
const STRIDE = ITEM_H + ITEM_GAP;
/** Three full pills, plus fade room for partial pills at the edges. */
const VISIBLE = 3;
const FADE_PAD = Math.round(STRIDE * 0.72);
const VIEWPORT_H = STRIDE * VISIBLE + FADE_PAD * 2;
/** Steady, readable scroll — px per second. */
const SPIN_SPEED = 13.5;

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

/** Milder than before so center pills read like set-rules controls. */
const MAX_SCALE = 1.04;
const MIN_SCALE = 0.92;
/** Base width so max scale fills the column without clipping. */
const PILL_WIDTH_PCT = 100 / MAX_SCALE;
/** Distance falloff — wider than one stride so focus eases between rows. */
const FOCUS_RADIUS = STRIDE * 1.55;

/**
 * Distance from center (0 = middle) → scale / opacity.
 * Opacity falls to 0 at the fade edge so mask + tier dissolve together.
 */
function tierFromDistance(distPx: number) {
  const t = smootherstep(distPx / FOCUS_RADIUS);
  const scale = MAX_SCALE - t * (MAX_SCALE - MIN_SCALE);
  const opacity = 1 - t * 0.92;
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
  // Stronger lift on the focused center pill; softer on the edges.
  const focus = clamp((scale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE), 0, 1);
  const shadowY = 3 + focus * 5;
  const shadowBlur = 10 + focus * 12;
  const shadowAlpha = 0.1 + focus * 0.1;

  return (
    <div
      className="flex w-full items-center justify-center"
      style={{ height: ITEM_H }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: `${PILL_WIDTH_PCT}%`,
          ...PROTO_PILL_GLASS,
          borderRadius: PROTO_BOX_RADIUS,
          padding: "11px 10px",
          boxSizing: "border-box",
          opacity,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          willChange: "transform, opacity",
          boxShadow: `
            0 ${shadowY}px ${shadowBlur}px rgba(28, 22, 16, ${shadowAlpha}),
            0 1px 2px rgba(28, 22, 16, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.72),
            inset 0 -1px 0 rgba(28, 22, 16, 0.06)
          `,
        }}
      >
        <span
          className={`${inter.className} min-w-0 truncate`}
          style={{
            color: PROTO_INK,
            fontSize: 11,
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}
        >
          {role}
        </span>
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
          // Long soft ramps — pills dissolve in/out over ~¾ of a row.
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, #000 16%, #000 84%, transparent 100%)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, #000 16%, #000 84%, transparent 100%)",
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
            backfaceVisibility: "hidden",
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
  const [shift, setShift] = useState(0);
  const offsetRef = useRef(0);
  const loopH = ROLE_PILLS.length * STRIDE;
  // Right column runs the list in reverse so the two reels feel opposite.
  const rightRoles = [...ROLE_PILLS].reverse();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      // Cap dt so tab-switches don't jump a full stride.
      const dt = Math.min((now - last) / 1000, 0.032);
      last = now;
      offsetRef.current = mod(offsetRef.current + SPIN_SPEED * dt, loopH);
      setShift(offsetRef.current);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loopH]);

  return (
    <div
      className="flex"
      style={{
        width: PROTO_DROPDOWN_GRID_W,
        height: PROTO_BOX_PX,
        gap: 7,
        alignContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        overflow: "visible",
      }}
    >
      <SpinnerColumn roles={ROLE_PILLS} shift={shift} />
      <SpinnerColumn roles={rightRoles} shift={shift} />
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
          fitScale={1.06 * PROTO_RULES_UI_SCALE}
          fixedBounds
        >
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              width: PHONE_ARTBOARD_WIDTH_PX,
              height: PHONE_ARTBOARD_HEIGHT_PX,
            }}
          >
            <RolePillsGrid />
          </div>
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`}
      style={{ maxWidth: "min(100%, 28rem)" }}
      aria-hidden
    >
      <div
        style={{
          transform: `scale(${PROTO_RULES_UI_SCALE})`,
          transformOrigin: "center center",
        }}
      >
        <RolePillsGrid />
      </div>
    </div>
  );
}
