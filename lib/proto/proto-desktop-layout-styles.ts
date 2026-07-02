import {
  DOEPHONE_DESKTOP_PAGE_INSET_LEFT,
  DOEPHONE_DESKTOP_PAGE_INSET_RIGHT,
  DOEPHONE_DESKTOP_PAGE_INSET_X,
} from "@/lib/doephone/section-styles";
import { PROTO_FONT_CLASS, PROTO_NAV_LOGO_FONT_CLASS } from "@/lib/proto/proto-font";

/** Desktop /proto feature band — split panel + copy within one viewport-tall section. */
export const PROTO_DESKTOP_FEATURE_BAND_H = "min-h-[112vh] h-[112vh]";

export const PROTO_DESKTOP_FEATURE_SECTION_PAD =
  "py-10 md:py-14 lg:py-16 xl:py-20";

/** Centered content shell — aligns nav, feature bands, and footer. */
export const PROTO_DESKTOP_CONTENT_MAX_W =
  "mx-auto w-full max-w-[min(100%,90rem)]";

export const PROTO_DESKTOP_FEATURE_SPLIT_GAP =
  "gap-x-[clamp(2.5rem,5vw,5.5rem)] gap-y-8";

/** Square gradient panel — largest square that fits the split column. */
export const PROTO_DESKTOP_FEATURE_PANEL_SIZE =
  "aspect-square h-auto w-full max-h-[min(72vh,100%)] max-w-full";

/** Edge-bleed split — square panel fills its half-column and flushes to the page margin. */
export const PROTO_DESKTOP_FEATURE_PANEL_BLEED_TW =
  "aspect-square h-full w-full max-h-full max-w-full";

export const PROTO_DESKTOP_SPLIT_SECTION_GRID_BLEED =
  "grid h-full min-h-0 w-full grid-cols-2";

export const PROTO_DESKTOP_SPLIT_BLEED_INNER_X_LEFT =
  "pl-10 md:pl-14 lg:pl-16 xl:pl-20";

export const PROTO_DESKTOP_SPLIT_BLEED_INNER_X_RIGHT =
  "pr-10 md:pr-14 lg:pr-16 xl:pr-20";

export const PROTO_DESKTOP_SPLIT_TEXT_COLUMN_LEFT_BLEED = `flex min-h-0 min-w-0 flex-col justify-center ${DOEPHONE_DESKTOP_PAGE_INSET_LEFT} ${PROTO_DESKTOP_SPLIT_BLEED_INNER_X_RIGHT} ${PROTO_DESKTOP_FEATURE_SECTION_PAD}`;

export const PROTO_DESKTOP_SPLIT_TEXT_COLUMN_RIGHT_BLEED = `flex min-h-0 min-w-0 flex-col justify-center ${DOEPHONE_DESKTOP_PAGE_INSET_RIGHT} ${PROTO_DESKTOP_SPLIT_BLEED_INNER_X_LEFT} ${PROTO_DESKTOP_FEATURE_SECTION_PAD}`;

export const PROTO_DESKTOP_SPLIT_BOX_COLUMN_RIGHT_BLEED = `grid min-h-0 min-w-0 h-full items-center justify-items-end ${DOEPHONE_DESKTOP_PAGE_INSET_RIGHT} ${PROTO_DESKTOP_SPLIT_BLEED_INNER_X_LEFT} ${PROTO_DESKTOP_FEATURE_SECTION_PAD}`;

export const PROTO_DESKTOP_SPLIT_BOX_COLUMN_LEFT_BLEED = `grid min-h-0 min-w-0 h-full items-center justify-items-start ${DOEPHONE_DESKTOP_PAGE_INSET_LEFT} ${PROTO_DESKTOP_SPLIT_BLEED_INNER_X_RIGHT} ${PROTO_DESKTOP_FEATURE_SECTION_PAD}`;

export const PROTO_DESKTOP_SPLIT_BOX_COLUMN = `flex min-h-0 min-w-0 h-full items-center justify-center`;

export const PROTO_DESKTOP_FEATURE_TITLE_TW = `text-left font-light leading-[1.02] tracking-[-0.03em] text-white text-[clamp(2.65rem,4.05vw,4.05rem)] md:text-[clamp(2.78rem,3.75vw,4.28rem)] lg:text-[clamp(2.92rem,3.5vw,4.52rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_DESKTOP_FEATURE_DESC_TW = `mt-0 max-w-[36rem] text-[clamp(0.98rem,0.9rem+0.28vw,1.18rem)] md:text-[clamp(1.02rem,0.94rem+0.32vw,1.26rem)] font-normal leading-[1.5] tracking-[-0.012em] text-white ${PROTO_FONT_CLASS}`;

export const PROTO_DESKTOP_FEATURE_COPY_COL_TW =
  "flex min-h-0 min-w-0 flex-col justify-center px-[clamp(0.5rem,1.5vw,1.5rem)]";

export const PROTO_DESKTOP_PAGE_INSET_X = DOEPHONE_DESKTOP_PAGE_INSET_X;

export const PROTO_DESKTOP_NAV_LOGO_TW = `text-[clamp(2rem,2.35vw,2.75rem)] font-normal leading-none tracking-[-0.04em] text-white no-underline transition-opacity hover:opacity-90`;

export const PROTO_DESKTOP_FOOTER_PAD_Y = "py-14 md:py-16 lg:py-20 xl:py-24";

export const PROTO_DESKTOP_FOOTER_ROW_GAP =
  "gap-[clamp(2rem,4vw,4.5rem)] xl:gap-[clamp(2.5rem,5vw,5.5rem)]";

export const PROTO_DESKTOP_FOOTER_NAV_GAP =
  "gap-[clamp(2.5rem,4.5vw,5.5rem)] xl:gap-[clamp(3rem,5vw,6.5rem)]";

export const PROTO_DESKTOP_FOOTER_WORDMARK_TW = `text-[clamp(3.25rem,5.25vw,5.75rem)] font-normal leading-none tracking-[-0.045em] text-[#f7f6f3] no-underline transition-opacity hover:opacity-90 ${PROTO_NAV_LOGO_FONT_CLASS}`;

export const PROTO_DESKTOP_FOOTER_CORP_BRAND_TW = `text-[clamp(1.08rem,0.98rem+0.35vw,1.28rem)] font-semibold leading-[1.2] tracking-[-0.015em] text-white ${PROTO_FONT_CLASS}`;

export const PROTO_DESKTOP_FOOTER_CORP_LINE_TW = `text-[clamp(0.98rem,0.9rem+0.3vw,1.14rem)] font-normal leading-[1.45] tracking-[-0.01em] text-white/78 ${PROTO_FONT_CLASS}`;

export const PROTO_DESKTOP_FOOTER_COLUMN_TITLE_TW = `text-[clamp(1.05rem,0.95rem+0.35vw,1.22rem)] font-semibold leading-[1.2] tracking-[-0.015em] text-white ${PROTO_FONT_CLASS}`;

export const PROTO_DESKTOP_FOOTER_COLUMN_LINK_TW = `text-[clamp(0.98rem,0.9rem+0.28vw,1.1rem)] font-normal leading-[1.4] tracking-[-0.01em] text-white/78 no-underline transition-colors hover:text-white ${PROTO_FONT_CLASS}`;

export const PROTO_CONTACT_EMAIL = "ask@proto.jobs";
