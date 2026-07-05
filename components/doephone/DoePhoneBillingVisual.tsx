"use client";

import { useEffect, useState } from "react";

import { inter, plusJakartaSans, suisseIntl } from "@/lib/home/fonts";
import { CAROUSEL_MENU_UI } from "@/lib/doephone/carousel-menu-visual-styles";
import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";

const { ink: DOE_INK, accent: DOE_ORANGE, divider: DOE_DIVIDER } = CAROUSEL_MENU_UI;

const DOE_MUTED = "#9CA3AF";
const DOE_MUTED_TEXT = "#6B7280";

const OUTER_RADIUS = "rounded-[clamp(0.8rem,2.4vmin,0.95rem)]";
const CARD_PAD = "clamp(1.2rem,3.85vmin,1.45rem) clamp(1.25rem,4vmin,1.55rem)";
const TITLE_SIZE = "clamp(1.12rem,3.45vmin,1.38rem)";
const DOT_SIZE = "clamp(0.78rem,2.35vmin,0.94rem)";
const BODY_SIZE = "clamp(0.88rem,2.65vmin,1.05rem)";
const CAPTION_SIZE = "clamp(0.72rem,2.15vmin,0.86rem)";
const FOOTER_SIZE = "clamp(0.84rem,2.55vmin,1rem)";

/** Proto glass — match shaders 1–3. */
const PROTO_GLASS_BG =
  "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,251,246,0.84) 45%, rgba(255,248,242,0.74) 100%)";
const PROTO_INK = "#1C1610";
const PROTO_MUTED = "#5E564C";
const PROTO_MUTED_LIGHT = "#8A8074";
const PROTO_LINE = "rgba(28, 22, 16, 0.1)";
const PROTO_ACCENT = "rgba(28, 22, 16, 0.42)";

const PHONE_ARTBOARD_WIDTH_PX = 360;
const PHONE_ARTBOARD_HEIGHT_PX = 360;
const PROTO_BOX_PX = Math.round(PHONE_ARTBOARD_WIDTH_PX * 0.78);

const TIMELINE = [
  { label: "Clinical note pulled from chart", time: "9:02 AM", state: "done" as const },
  { label: "Prior auth form submitted to BCBS", time: "9:04 AM", state: "done" as const },
  { label: "Awaiting payer decision", time: "Pending", state: "active" as const },
] as const;

/** Match former Humira box corner radius. */
const PROTO_BOX_RADIUS = "0.55rem";
/** Slightly under the old card width — still wide enough for full labels. */
const PROTO_DROPDOWN_GRID_W = Math.round(PROTO_BOX_PX * 0.92);

const PROTO_PILL_GLASS = {
  background: PROTO_GLASS_BG,
  backdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
  WebkitBackdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
} as const;

const PROTO_OPTION_H = 31;
const PROTO_MENU_PAD = 4;
const PROTO_HIGHLIGHT_BG = "rgba(28, 22, 16, 0.1)";
const PROTO_HIGHLIGHT_SHADOW = "0 2px 10px rgba(28, 22, 16, 0.14)";

/** Slow choreography — model → duration → media, then loop. */
const PROTO_RULES_BEAT_MS = 1400;

/** Alternatives only — selected value stays on the trigger, not in the list. */
const PROTO_MODEL_OPTIONS = ["GPT-4o", "Gemini 2.5 Pro"] as const;
const PROTO_DURATION_OPTIONS = ["30 min", "4 hours"] as const;
const PROTO_MEDIA_OPTIONS = ["Audio only", "No recording"] as const;

type ProtoOpenMenu = "model" | "duration" | "media" | null;

type ProtoRulesState = {
  openMenu: ProtoOpenMenu;
  modelValue: string;
  durationValue: string;
  mediaValue: string;
  modelHighlight: number;
  durationHighlight: number;
  mediaHighlight: number;
};

const PROTO_RULES_INITIAL: ProtoRulesState = {
  openMenu: "model",
  modelValue: "Opus 4.8",
  durationValue: "1 hour",
  mediaValue: "Video & Audio",
  modelHighlight: 0,
  durationHighlight: 0,
  mediaHighlight: 0,
};

type BillingChrome = "doe" | "proto";

function TimelineDot({
  state,
  chrome,
}: {
  state: (typeof TIMELINE)[number]["state"];
  chrome: BillingChrome;
}) {
  const accent = chrome === "proto" ? PROTO_INK : DOE_ORANGE;
  const dotSize = chrome === "proto" ? 12 : undefined;

  if (state === "done") {
    return (
      <span
        className="relative z-[1] flex shrink-0 items-center justify-center rounded-full"
        style={{
          width: chrome === "proto" ? dotSize : DOT_SIZE,
          height: chrome === "proto" ? dotSize : DOT_SIZE,
          background: accent,
        }}
        aria-hidden
      >
        <svg width="55%" height="55%" viewBox="0 0 10 10" fill="none">
          <path
            d="M2.8 5.1l1.2 1.2 3.1-3.2"
            stroke="#FFFFFF"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  return (
    <span
      className="relative z-[1] shrink-0 rounded-full border-[2px] bg-white"
      style={{
        width: chrome === "proto" ? dotSize : DOT_SIZE,
        height: chrome === "proto" ? dotSize : DOT_SIZE,
        borderColor: accent,
        background: chrome === "proto" ? "rgba(255,252,247,0.9)" : "#FFFFFF",
      }}
      aria-hidden
    />
  );
}

function AuthTimeline({ chrome }: { chrome: BillingChrome }) {
  const ink = chrome === "proto" ? PROTO_INK : DOE_INK;
  const muted = chrome === "proto" ? PROTO_MUTED_LIGHT : DOE_MUTED;
  const mutedText = chrome === "proto" ? PROTO_MUTED : DOE_MUTED_TEXT;
  const accent = chrome === "proto" ? PROTO_ACCENT : DOE_ORANGE;
  const divider = chrome === "proto" ? PROTO_LINE : DOE_DIVIDER;
  const isProto = chrome === "proto";

  return (
    <div
      className="flex flex-col"
      style={{
        marginTop: isProto ? 14 : "clamp(1.05rem,3.25vmin,1.32rem)",
        gap: isProto ? 12 : "clamp(0.82rem,2.55vmin,1.02rem)",
      }}
    >
      {TIMELINE.map((event, index) => {
        const isLast = index === TIMELINE.length - 1;

        return (
          <div
            key={event.label}
            className="flex items-stretch"
            style={{ gap: isProto ? 10 : "clamp(0.68rem,2.1vmin,0.86rem)" }}
          >
            <div
              className="flex shrink-0 flex-col items-center"
              style={{ width: isProto ? 12 : DOT_SIZE }}
            >
              <TimelineDot state={event.state} chrome={chrome} />
              {!isLast ? (
                <span
                  className="mt-[0.12rem] w-px flex-1"
                  style={{
                    minHeight: isProto ? 10 : "clamp(0.55rem,1.68vmin,0.72rem)",
                    background: index === 0 ? accent : divider,
                  }}
                  aria-hidden
                />
              ) : null}
            </div>

            <div className="min-w-0 flex-1 pb-[0.02rem]">
              <p
                className={`font-medium leading-snug ${
                  event.state === "active" ? plusJakartaSans.className : inter.className
                }`}
                style={{
                  color: event.state === "active" ? ink : mutedText,
                  fontSize: isProto ? 12 : BODY_SIZE,
                }}
              >
                {event.label}
              </p>
              <p
                className={`${inter.className} font-normal leading-snug tabular-nums`}
                style={{
                  color: event.state === "active" ? ink : muted,
                  fontSize: isProto ? 10 : CAPTION_SIZE,
                  marginTop: isProto ? 2 : "clamp(0.12rem,0.38vmin,0.16rem)",
                  opacity: event.state === "active" ? 0.7 : 1,
                }}
              >
                {event.time}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DropdownChevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      className="shrink-0"
      style={{
        transform: open ? "rotate(180deg)" : undefined,
        transition: "transform 480ms cubic-bezier(0.28, 0.84, 0.24, 1)",
      }}
    >
      <path
        d="M2.2 3.6L5 6.4l2.8-2.8"
        stroke={PROTO_ACCENT}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Select-style menu — glass fill on the control only, same radius as the old box. */
function ProtoDropdownPill({ value, open = false }: { value: string; open?: boolean }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        borderRadius: PROTO_BOX_RADIUS,
        ...PROTO_PILL_GLASS,
        padding: "11px 10px",
        gap: 6,
        boxSizing: "border-box",
        transition: "box-shadow 480ms cubic-bezier(0.28, 0.84, 0.24, 1)",
        boxShadow: open ? "0 4px 16px rgba(28, 22, 16, 0.12)" : "none",
      }}
    >
      <span
        className={`${inter.className} min-w-0 flex-1`}
        style={{
          color: PROTO_INK,
          fontSize: 11,
          fontWeight: 500,
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
      <DropdownChevron open={open} />
    </div>
  );
}

function ProtoMenuPanel({
  options,
  highlightIndex,
  open,
}: {
  options: readonly string[];
  highlightIndex: number;
  open: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "100%",
        marginTop: 4,
        borderRadius: PROTO_BOX_RADIUS,
        ...PROTO_PILL_GLASS,
        padding: PROTO_MENU_PAD,
        boxSizing: "border-box",
        overflow: "hidden",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0) scale(1)" : "translateY(-4px) scale(0.98)",
        transformOrigin: "top center",
        pointerEvents: open ? "auto" : "none",
        transition:
          "opacity 520ms cubic-bezier(0.28, 0.84, 0.24, 1), transform 520ms cubic-bezier(0.28, 0.84, 0.24, 1)",
        boxShadow: open ? "0 8px 22px rgba(28, 22, 16, 0.14)" : "none",
        zIndex: 3,
      }}
    >
      <div className="relative">
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: highlightIndex * PROTO_OPTION_H,
            height: PROTO_OPTION_H,
            borderRadius: `calc(${PROTO_BOX_RADIUS} - 2px)`,
            background: PROTO_HIGHLIGHT_BG,
            boxShadow: PROTO_HIGHLIGHT_SHADOW,
            transition:
              "top 700ms cubic-bezier(0.28, 0.84, 0.24, 1), box-shadow 700ms cubic-bezier(0.28, 0.84, 0.24, 1)",
          }}
        />
        {options.map((option) => (
          <div
            key={option}
            className={inter.className}
            style={{
              position: "relative",
              zIndex: 1,
              color: PROTO_INK,
              fontSize: 11,
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              height: PROTO_OPTION_H,
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              whiteSpace: "nowrap",
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProtoMenuField({
  value,
  open,
  options,
  highlightIndex,
  zIndex,
}: {
  value: string;
  open: boolean;
  options: readonly string[];
  highlightIndex: number;
  zIndex: number;
}) {
  return (
    <div className="relative min-w-0" style={{ zIndex }}>
      <ProtoDropdownPill value={value} open={open} />
      <ProtoMenuPanel options={options} highlightIndex={highlightIndex} open={open} />
    </div>
  );
}

function ProtoDropdownGrid() {
  const [state, setState] = useState<ProtoRulesState>(PROTO_RULES_INITIAL);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let step = 0;
    let timer = 0;

    const run = () => {
      step = (step + 1) % 10;

      setState((prev) => {
        switch (step) {
          case 1:
            // Highlight slides from GPT-4o → Gemini.
            return { ...prev, openMenu: "model", modelHighlight: 1 };
          case 2:
            // Commit Gemini, close model menu.
            return {
              ...prev,
              openMenu: null,
              modelValue: PROTO_MODEL_OPTIONS[1],
              modelHighlight: 1,
            };
          case 3:
            // Open duration menu — trigger stays "1 hour"; list is alternatives only.
            return {
              ...prev,
              openMenu: "duration",
              durationHighlight: 0,
              durationValue: PROTO_RULES_INITIAL.durationValue,
            };
          case 4:
            // Highlight second duration.
            return { ...prev, openMenu: "duration", durationHighlight: 1 };
          case 5:
            // Commit 4 hours, close duration.
            return {
              ...prev,
              openMenu: null,
              durationValue: PROTO_DURATION_OPTIONS[1],
              durationHighlight: 1,
            };
          case 6:
            // Open media menu — trigger stays "Video & Audio"; list is alternatives only.
            return {
              ...prev,
              openMenu: "media",
              mediaHighlight: 0,
              mediaValue: PROTO_RULES_INITIAL.mediaValue,
            };
          case 7:
            // Highlight No recording.
            return { ...prev, openMenu: "media", mediaHighlight: 1 };
          case 8:
            // Commit No recording, close media.
            return {
              ...prev,
              openMenu: null,
              mediaValue: PROTO_MEDIA_OPTIONS[1],
              mediaHighlight: 1,
            };
          case 9:
            // Brief pause with all closed.
            return { ...prev, openMenu: null };
          case 0:
          default:
            // Reset and reopen model menu for the next loop.
            return { ...PROTO_RULES_INITIAL };
        }
      });

      timer = window.setTimeout(run, PROTO_RULES_BEAT_MS);
    };

    timer = window.setTimeout(run, PROTO_RULES_BEAT_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const pills = [
    {
      key: "duration",
      value: state.durationValue,
      open: state.openMenu === "duration",
      options: PROTO_DURATION_OPTIONS,
      highlightIndex: state.durationHighlight,
      zIndex: state.openMenu === "duration" ? 4 : 1,
    },
    {
      key: "clipboard",
      value: "Clipboard off",
      open: false,
      options: ["Clipboard off"] as const,
      highlightIndex: 0,
      zIndex: 1,
    },
    {
      key: "mcps",
      value: "Allow MCPs",
      open: false,
      options: ["Allow MCPs"] as const,
      highlightIndex: 0,
      zIndex: 1,
    },
    {
      key: "media",
      value: state.mediaValue,
      open: state.openMenu === "media",
      options: PROTO_MEDIA_OPTIONS,
      highlightIndex: state.mediaHighlight,
      zIndex: state.openMenu === "media" ? 4 : 1,
    },
    {
      key: "fs",
      value: "Read-only FS",
      open: false,
      options: ["Read-only FS"] as const,
      highlightIndex: 0,
      zIndex: 1,
    },
    {
      key: "model",
      value: state.modelValue,
      open: state.openMenu === "model",
      options: PROTO_MODEL_OPTIONS,
      highlightIndex: state.modelHighlight,
      zIndex: state.openMenu === "model" ? 4 : 1,
    },
  ] as const;

  return (
    <div
      className="grid"
      style={{
        width: PROTO_DROPDOWN_GRID_W,
        height: PROTO_BOX_PX,
        gridTemplateColumns: "1fr 1fr",
        gap: 7,
        alignContent: "center",
        boxSizing: "border-box",
        overflow: "visible",
      }}
    >
      {pills.map((pill) => (
        <ProtoMenuField
          key={pill.key}
          value={pill.value}
          open={pill.open}
          options={pill.options}
          highlightIndex={pill.highlightIndex}
          zIndex={pill.zIndex}
        />
      ))}
    </div>
  );
}

function BillingCard({ chrome }: { chrome: BillingChrome }) {
  const isProto = chrome === "proto";
  const ink = isProto ? PROTO_INK : DOE_INK;
  const mutedText = isProto ? PROTO_MUTED : DOE_MUTED_TEXT;
  const muted = isProto ? PROTO_MUTED_LIGHT : DOE_MUTED;

  if (isProto) {
    return <ProtoDropdownGrid />;
  }

  return (
    <div
      className={`w-full border bg-white ${OUTER_RADIUS}`}
      style={{ borderColor: "#E5E7EB", padding: CARD_PAD }}
    >
      <h3
        className="font-semibold leading-tight tracking-[-0.02em]"
        style={{
          color: ink,
          fontSize: TITLE_SIZE,
        }}
      >
        Humira 40mg
      </h3>

      <p
        className={`${inter.className} font-normal leading-snug`}
        style={{
          color: mutedText,
          fontSize: BODY_SIZE,
          marginTop: "clamp(0.28rem,0.85vmin,0.36rem)",
        }}
      >
        BCBS Ontario · M. Alvarez
      </p>

      <AuthTimeline chrome={chrome} />

      <p
        className={`${inter.className} font-normal leading-snug`}
        style={{
          color: muted,
          fontSize: FOOTER_SIZE,
          marginTop: "clamp(1.05rem,3.25vmin,1.32rem)",
        }}
      >
        Refreshing in 30 minutes
      </p>
    </div>
  );
}

/** Challenge-rules menus sit smaller inside the shader than the default artboard fit. */
const PROTO_RULES_UI_SCALE = 0.86;

/** AI prior auth timeline — Billing carousel slide. */
export function DoePhoneBillingVisual({
  layout = "phone",
  chrome = "doe",
}: {
  layout?: "phone" | "desktop";
  /** Proto home — frosted glass card matching shaders 1–3. */
  chrome?: BillingChrome;
}) {
  const isDesktop = layout === "desktop";
  const isProto = chrome === "proto";

  if (isProto && !isDesktop) {
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
            <BillingCard chrome="proto" />
          </div>
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`}
      style={{ maxWidth: isDesktop ? "min(100%, 28rem)" : CAROUSEL_MENU_UI.maxWidthPhone }}
      aria-hidden
    >
      {isProto ? (
        <div
          style={{
            transform: `scale(${PROTO_RULES_UI_SCALE})`,
            transformOrigin: "center center",
          }}
        >
          <BillingCard chrome="proto" />
        </div>
      ) : (
        <BillingCard chrome={chrome} />
      )}
    </div>
  );
}
