"use client";

import { inter, suisseIntl } from "@/lib/home/fonts";
import { CAROUSEL_MENU_UI } from "@/lib/doephone/carousel-menu-visual-styles";
import { WORKFLOW_DOT_GRID_STYLE } from "@/lib/workflow-carousel-design-backdrops";

const OUTER_RADIUS = "rounded-[clamp(0.8rem,2.4vmin,0.95rem)]";
const INNER_RADIUS = "rounded-[clamp(0.45rem,1.35vmin,0.55rem)]";
const CARD_PAD = "clamp(1.2rem,3.85vmin,1.45rem) clamp(1.25rem,4vmin,1.55rem)";
const TITLE_SIZE = "clamp(1.12rem,3.45vmin,1.38rem)";
const BODY_SIZE = "clamp(0.88rem,2.65vmin,1.05rem)";
const CAPTION_SIZE = "clamp(0.72rem,2.15vmin,0.86rem)";

const PROTO_PANEL_BG = "#151c1f";
const PROTO_PANEL_BORDER = "#2A3538";
const PROTO_ACCENT = "#E7A944";
const PROTO_TEXT = "#ffffff";
const PROTO_TEXT_MUTED = "rgba(255, 255, 255, 0.72)";
const PROTO_TEXT_SOFT = "rgba(255, 255, 255, 0.55)";

const FEEDBACK = [
  { name: "User 12", note: "Clear flow, would use weekly" },
  { name: "User 08", note: "Needs faster onboarding" },
] as const;

/** Applicant prototype + feedback + in-product simulation — /proto prototype slide. */
export function DoePhoneProtoValidateVisual({ layout = "phone" }: { layout?: "phone" | "desktop" }) {
  const isDesktop = layout === "desktop";

  return (
    <div
      className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`}
      style={{ maxWidth: isDesktop ? "min(100%, 28rem)" : CAROUSEL_MENU_UI.maxWidthPhone }}
      aria-hidden
    >
      <div
        className={`w-full overflow-hidden border ${OUTER_RADIUS}`}
        style={{ borderColor: PROTO_PANEL_BORDER, backgroundColor: PROTO_PANEL_BG, padding: CARD_PAD }}
      >
        <div
          className={`relative overflow-hidden ${INNER_RADIUS}`}
          style={{
            border: `1px solid ${PROTO_PANEL_BORDER}`,
            padding: "clamp(0.85rem,2.65vmin,1.05rem) clamp(0.9rem,2.75vmin,1.1rem)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 z-0 opacity-90" style={WORKFLOW_DOT_GRID_STYLE} aria-hidden />
          <div className="relative z-10">
            <h3 className="font-semibold leading-tight tracking-[-0.02em]" style={{ color: PROTO_TEXT, fontSize: TITLE_SIZE }}>
              Onboarding redesign
            </h3>
            <p
              className={`${inter.className} font-normal leading-snug`}
              style={{
                color: PROTO_TEXT_SOFT,
                fontSize: CAPTION_SIZE,
                marginTop: "clamp(0.22rem,0.68vmin,0.3rem)",
              }}
            >
              Applicant prototype · Maya Chen
            </p>
          </div>
        </div>

        <div
          className={`${INNER_RADIUS} border`}
          style={{
            marginTop: "clamp(0.85rem,2.65vmin,1.05rem)",
            borderColor: PROTO_PANEL_BORDER,
            padding: "clamp(0.72rem,2.2vmin,0.92rem)",
            background: "linear-gradient(135deg, rgba(90,120,136,0.28) 0%, rgba(231,169,68,0.16) 100%)",
          }}
        >
          <div
            className={`${INNER_RADIUS} border`}
            style={{
              borderColor: PROTO_PANEL_BORDER,
              backgroundColor: "rgba(21, 28, 31, 0.88)",
              padding: "clamp(0.55rem,1.7vmin,0.72rem) clamp(0.62rem,1.9vmin,0.82rem)",
            }}
          >
            <p className={`${inter.className} font-medium`} style={{ color: PROTO_TEXT, fontSize: BODY_SIZE }}>
              Simulate in product
            </p>
            <p
              className={`${inter.className} font-normal leading-snug`}
              style={{
                color: PROTO_TEXT_MUTED,
                fontSize: CAPTION_SIZE,
                marginTop: "clamp(0.18rem,0.55vmin,0.24rem)",
              }}
            >
              Fit score 87% · matches checkout flow
            </p>
          </div>
        </div>

        <div style={{ marginTop: "clamp(0.82rem,2.55vmin,1.02rem)", display: "grid", gap: "clamp(0.55rem,1.7vmin,0.72rem)" }}>
          {FEEDBACK.map((item) => (
            <div
              key={item.name}
              className={`flex items-start gap-3 ${INNER_RADIUS} border`}
              style={{
                borderColor: PROTO_PANEL_BORDER,
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                padding: "clamp(0.55rem,1.7vmin,0.72rem) clamp(0.62rem,1.9vmin,0.82rem)",
              }}
            >
              <span
                className="mt-[0.12rem] shrink-0 rounded-full"
                style={{ width: "0.55rem", height: "0.55rem", background: PROTO_ACCENT }}
                aria-hidden
              />
              <div className="min-w-0">
                <p className={`${inter.className} font-medium`} style={{ color: PROTO_TEXT, fontSize: CAPTION_SIZE }}>
                  {item.name}
                </p>
                <p
                  className={`${inter.className} font-normal leading-snug`}
                  style={{ color: PROTO_TEXT_MUTED, fontSize: CAPTION_SIZE, marginTop: "0.12rem" }}
                >
                  {item.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
