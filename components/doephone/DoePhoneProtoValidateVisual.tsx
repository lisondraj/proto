"use client";

import { inter, suisseIntl } from "@/lib/home/fonts";
import { CAROUSEL_MENU_UI } from "@/lib/doephone/carousel-menu-visual-styles";

const { ink: INK, accent: DOE_ORANGE, divider: DIVIDER } = CAROUSEL_MENU_UI;

const BORDER = "#E5E7EB";
const MUTED_TEXT = "#6B7280";
const LIVE_BG = "rgba(210, 119, 76, 0.12)";
const BTN_BG = "#F3F4F6";

const OUTER_RADIUS = "rounded-[clamp(0.8rem,2.4vmin,0.95rem)]";
const INNER_RADIUS = "rounded-[clamp(0.45rem,1.35vmin,0.55rem)]";
const PILL_RADIUS = "rounded-[clamp(0.38rem,1.15vmin,0.48rem)]";
const CARD_PAD = "clamp(1.2rem,3.85vmin,1.45rem) clamp(1.25rem,4vmin,1.55rem)";
const ROW_PAD = "clamp(0.82rem,2.55vmin,1.02rem) clamp(0.88rem,2.75vmin,1.05rem)";
const TITLE_SIZE = "clamp(1.02rem,3.15vmin,1.22rem)";
const BODY_SIZE = "clamp(0.88rem,2.65vmin,1.05rem)";
const CAPTION_SIZE = "clamp(0.72rem,2.15vmin,0.86rem)";

/** Applicant prototype fit check — /proto prototype slide. */
export function DoePhoneProtoValidateVisual({ layout = "phone" }: { layout?: "phone" | "desktop" }) {
  const isDesktop = layout === "desktop";

  return (
    <div
      className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`}
      style={{ maxWidth: isDesktop ? "min(100%, 28rem)" : CAROUSEL_MENU_UI.maxWidthPhone }}
      aria-hidden
    >
      <div
        className={`w-full border bg-white ${OUTER_RADIUS}`}
        style={{ borderColor: BORDER, padding: CARD_PAD }}
      >
        <p
          className="font-semibold leading-none tracking-[-0.015em]"
          style={{ color: INK, fontSize: TITLE_SIZE }}
        >
          Onboarding redesign
        </p>
        <p
          className={`${inter.className} font-normal leading-snug`}
          style={{
            color: MUTED_TEXT,
            fontSize: CAPTION_SIZE,
            marginTop: "clamp(0.28rem,0.85vmin,0.36rem)",
          }}
        >
          Applicant prototype · Maya Chen
        </p>

        <div
          className={`${INNER_RADIUS} border bg-white`}
          style={{
            borderColor: BORDER,
            marginTop: "clamp(0.85rem,2.65vmin,1.05rem)",
            padding: ROW_PAD,
          }}
        >
          <div className="flex items-center justify-between" style={{ gap: "clamp(0.55rem,1.65vmin,0.72rem)" }}>
            <span className={`${inter.className} font-medium`} style={{ color: INK, fontSize: BODY_SIZE }}>
              Product fit
            </span>
            <span
              className={`inline-flex items-center font-medium leading-none ${PILL_RADIUS} ${inter.className}`}
              style={{
                background: LIVE_BG,
                color: DOE_ORANGE,
                fontSize: CAPTION_SIZE,
                padding: "clamp(0.22rem,0.68vmin,0.28rem) clamp(0.42rem,1.28vmin,0.52rem)",
              }}
            >
              87% match
            </span>
          </div>
          <div className="h-px w-full" style={{ background: DIVIDER, margin: "clamp(0.68rem,2.1vmin,0.82rem) 0" }} />
          <p className={`${inter.className} font-normal leading-snug`} style={{ color: MUTED_TEXT, fontSize: BODY_SIZE }}>
            Simulated in checkout flow — users found the path clear
          </p>
        </div>

        <div
          className={`flex items-start gap-3 ${INNER_RADIUS} border`}
          style={{
            borderColor: BORDER,
            backgroundColor: BTN_BG,
            marginTop: "clamp(0.72rem,2.2vmin,0.92rem)",
            padding: ROW_PAD,
          }}
        >
          <span
            className="mt-[0.12rem] shrink-0 rounded-full"
            style={{ width: "0.5rem", height: "0.5rem", background: DOE_ORANGE }}
            aria-hidden
          />
          <p className={`${inter.className} min-w-0 font-normal leading-snug`} style={{ color: MUTED_TEXT, fontSize: CAPTION_SIZE }}>
            <span className="font-medium" style={{ color: INK }}>
              User feedback
            </span>
            {" · "}
            Clear flow, would use weekly
          </p>
        </div>
      </div>
    </div>
  );
}
