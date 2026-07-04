"use client";

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

function BillingCard({ chrome }: { chrome: BillingChrome }) {
  const isProto = chrome === "proto";
  const ink = isProto ? PROTO_INK : DOE_INK;
  const mutedText = isProto ? PROTO_MUTED : DOE_MUTED_TEXT;
  const muted = isProto ? PROTO_MUTED_LIGHT : DOE_MUTED;

  return (
    <div
      className={isProto ? undefined : `w-full border bg-white ${OUTER_RADIUS}`}
      style={
        isProto
          ? {
              width: PROTO_BOX_PX,
              boxSizing: "border-box",
              borderRadius: "0.55rem",
              background: PROTO_GLASS_BG,
              backdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
              WebkitBackdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
              padding: "18px 18px 16px",
            }
          : { borderColor: "#E5E7EB", padding: CARD_PAD }
      }
    >
      <h3
        className={`${isProto ? plusJakartaSans.className : ""} font-semibold leading-tight tracking-[-0.02em]`}
        style={{
          color: ink,
          fontSize: isProto ? 18 : TITLE_SIZE,
          fontWeight: isProto ? 600 : undefined,
        }}
      >
        Humira 40mg
      </h3>

      <p
        className={`${inter.className} font-normal leading-snug`}
        style={{
          color: mutedText,
          fontSize: isProto ? 12 : BODY_SIZE,
          marginTop: isProto ? 4 : "clamp(0.28rem,0.85vmin,0.36rem)",
        }}
      >
        BCBS Ontario · M. Alvarez
      </p>

      <AuthTimeline chrome={chrome} />

      <p
        className={`${inter.className} font-normal leading-snug`}
        style={{
          color: muted,
          fontSize: isProto ? 11 : FOOTER_SIZE,
          marginTop: isProto ? 14 : "clamp(1.05rem,3.25vmin,1.32rem)",
        }}
      >
        Refreshing in 30 minutes
      </p>
    </div>
  );
}

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
          fitScale={1.06}
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
      <BillingCard chrome={chrome} />
    </div>
  );
}
