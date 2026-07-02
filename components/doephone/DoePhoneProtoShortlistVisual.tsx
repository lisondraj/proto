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

const CANDIDATES = [
  { rank: 1, name: "Maya Chen", score: 94, role: "Product design" },
  { rank: 2, name: "Jordan Lee", score: 91, role: "Frontend" },
  { rank: 3, name: "Sam Okonkwo", score: 88, role: "Full stack" },
] as const;

function RankBadge({ rank }: { rank: number }) {
  const isTop = rank === 1;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center font-semibold leading-none ${PILL_RADIUS} ${inter.className}`}
      style={{
        minWidth: "clamp(1.65rem,5vmin,1.95rem)",
        padding: "clamp(0.22rem,0.68vmin,0.28rem) clamp(0.38rem,1.15vmin,0.48rem)",
        fontSize: CAPTION_SIZE,
        background: isTop ? LIVE_BG : BTN_BG,
        color: isTop ? DOE_ORANGE : MUTED_TEXT,
      }}
    >
      #{rank}
    </span>
  );
}

/** Live ranked shortlist — /proto shortlist slide. */
export function DoePhoneProtoShortlistVisual({ layout = "phone" }: { layout?: "phone" | "desktop" }) {
  const isDesktop = layout === "desktop";
  const cardScale = isDesktop ? 0.88 : 1;

  return (
    <div
      className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`}
      style={{ maxWidth: isDesktop ? "min(100%, 28rem)" : CAROUSEL_MENU_UI.maxWidthPhone }}
      aria-hidden
    >
      <div className="w-full origin-center" style={{ transform: `scale(${cardScale})` }}>
        <div
          className={`w-full border bg-white ${OUTER_RADIUS}`}
          style={{ borderColor: BORDER, padding: CARD_PAD }}
        >
          <div
            className="flex items-center justify-between"
            style={{ gap: "clamp(0.55rem,1.65vmin,0.72rem)", marginBottom: "clamp(0.78rem,2.45vmin,0.95rem)" }}
          >
            <p
              className="min-w-0 truncate font-semibold leading-none tracking-[-0.015em]"
              style={{ color: INK, fontSize: TITLE_SIZE }}
            >
              Live shortlist
            </p>
            <span
              className={`inline-flex shrink-0 items-center font-medium leading-none ${PILL_RADIUS} ${inter.className}`}
              style={{
                background: LIVE_BG,
                color: DOE_ORANGE,
                fontSize: CAPTION_SIZE,
                padding: "clamp(0.22rem,0.68vmin,0.28rem) clamp(0.42rem,1.28vmin,0.52rem)",
              }}
            >
              Updated now
            </span>
          </div>

          <div className={`overflow-hidden border bg-white ${INNER_RADIUS}`} style={{ borderColor: BORDER }}>
            {CANDIDATES.map((candidate, index) => (
              <div key={candidate.name}>
                {index > 0 ? <div className="h-px w-full" style={{ background: DIVIDER }} /> : null}
                <div
                  className="flex items-center"
                  style={{ gap: "clamp(0.62rem,1.9vmin,0.78rem)", padding: ROW_PAD }}
                >
                  <RankBadge rank={candidate.rank} />
                  <div className="min-w-0 flex-1">
                    <p className={`${inter.className} truncate font-medium`} style={{ color: INK, fontSize: BODY_SIZE }}>
                      {candidate.name}
                    </p>
                    <p
                      className={`${inter.className} truncate font-normal`}
                      style={{
                        color: MUTED_TEXT,
                        fontSize: CAPTION_SIZE,
                        marginTop: "0.1rem",
                      }}
                    >
                      {candidate.role}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 font-semibold tabular-nums ${inter.className}`}
                    style={{ color: candidate.rank === 1 ? DOE_ORANGE : INK, fontSize: BODY_SIZE }}
                  >
                    {candidate.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
