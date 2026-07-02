import { DOEPHONE_DESKTOP_PAGE_INSET_X } from "@/lib/doephone/section-styles";
import { PROTO_FONT_CLASS } from "@/lib/proto/proto-font";

/** Desktop /proto feature band — split panel + copy within one viewport-tall section. */
export const PROTO_DESKTOP_FEATURE_BAND_H = "min-h-[112vh] h-[112vh]";

export const PROTO_DESKTOP_FEATURE_SECTION_PAD =
  "py-10 md:py-14 lg:py-16 xl:py-20";

export const PROTO_DESKTOP_FEATURE_SPLIT_GAP =
  "gap-[clamp(2rem,4vw,5rem)] xl:gap-[clamp(2.5rem,5vw,6rem)]";

/** Square gradient panel — sized to fit beside copy within the feature band. */
export const PROTO_DESKTOP_FEATURE_PANEL_SIZE =
  "h-[min(72vh,44vw)] w-[min(72vh,44vw)] shrink-0";

export const PROTO_DESKTOP_FEATURE_TITLE_TW = `text-left font-light leading-[1.02] tracking-[-0.03em] text-white text-[clamp(2.65rem,4.05vw,4.05rem)] md:text-[clamp(2.78rem,3.75vw,4.28rem)] lg:text-[clamp(2.92rem,3.5vw,4.52rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_DESKTOP_FEATURE_DESC_TW = `mt-5 max-w-[42rem] text-[clamp(1.05rem,0.95rem+0.35vw,1.28rem)] md:text-[clamp(1.12rem,1rem+0.4vw,1.38rem)] font-normal leading-[1.52] tracking-[-0.012em] text-white ${PROTO_FONT_CLASS}`;

export const PROTO_DESKTOP_PAGE_INSET_X = DOEPHONE_DESKTOP_PAGE_INSET_X;

export const PROTO_DESKTOP_NAV_LOGO_TW = `text-[clamp(2rem,2.35vw,2.75rem)] font-normal leading-none tracking-[-0.04em] text-white no-underline transition-opacity hover:opacity-90`;

export const PROTO_CONTACT_EMAIL = "ask@proto.jobs";
