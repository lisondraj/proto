import {
  ABOUT_DESKTOP_BEIGE_PANEL_TW,
  ABOUT_DESKTOP_PAGE_INSET,
} from "@/lib/about/about-layout-styles";
import { DOEPHONE_SECTION_CLOSING_FEATURE_HEIGHT } from "@/lib/doephone/closing-section-styles";
import { DOEPHONE_SECTION_CAROUSEL_RADIUS } from "@/lib/doephone/section-styles";
import {
  PROTO_PHONE_CONTENT_PT,
  PROTO_PHONE_PAGE_INSET_X,
} from "@/lib/proto/proto-phone-layout-styles";
import { PROTO_FONT_CLASS } from "@/lib/proto/proto-font";

/** Horizontal gutters — aligned with /proto feature sections. */
export const PROTO_INVEST_PAGE_INSET_X = PROTO_PHONE_PAGE_INSET_X;

/** Clears scaled proto nav — extra breathing room above mission headline. */
export const PROTO_INVEST_CONTENT_PT = PROTO_PHONE_CONTENT_PT;

export const PROTO_INVEST_SECTION_GAP = "space-y-10 iphone-page:space-y-12";

export const PROTO_INVEST_CONTENT_GAP = "space-y-6 iphone-page:space-y-7";

export const PROTO_INVEST_LIST_GAP = "space-y-4 iphone-page:space-y-5";

export const PROTO_INVEST_TITLE_TW = `text-left font-light leading-[1.02] tracking-[-0.03em] text-white text-[clamp(3rem,11.25vw,5.15rem)] iphone-page:text-[clamp(2.65rem,1.42rem+7.15vmin,4.35rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_SUBHEADING_TW = `mt-[clamp(0.85rem,0.65rem+0.85vmin,1.25rem)] text-[clamp(1.42rem,1.22rem+0.95vmin,1.78rem)] iphone-page:text-[clamp(1.68rem,1.38rem+1.35vmin,2.12rem)] font-normal leading-[1.44] tracking-[-0.01em] text-white/72 ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_BYLINE_TW = `text-[clamp(1.28rem,1.08rem+0.75vmin,1.48rem)] iphone-page:text-[clamp(1.48rem,1.22rem+1.05vmin,1.72rem)] font-medium text-white/55 ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_BODY_TW = `text-[clamp(1.42rem,1.18rem+1.2vmin,1.82rem)] iphone-page:text-[clamp(1.62rem,1.32rem+1.55vmin,2.08rem)] font-normal leading-[1.52] tracking-[-0.012em] text-white ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_SECTION_HEADLINE_TW = PROTO_INVEST_TITLE_TW;

export const PROTO_INVEST_PANEL_BORDER_TW = "border border-[#2A3538]";

export const PROTO_INVEST_HERO_BOX_TW = `${DOEPHONE_SECTION_CLOSING_FEATURE_HEIGHT} ${DOEPHONE_SECTION_CAROUSEL_RADIUS} border border-[#2A3538] shadow-none`;

export const PROTO_INVEST_GRAPHIC_PANEL_TW = `relative w-full overflow-hidden border border-[#2A3538] bg-[#151c1f] ${DOEPHONE_SECTION_CLOSING_FEATURE_HEIGHT} ${DOEPHONE_SECTION_CAROUSEL_RADIUS} shadow-none`;

export const PROTO_INVEST_BULLET_TW = "mt-[0.38em] h-[0.5em] w-[0.5em] shrink-0 rounded-full bg-[#E7A944]";

export const PROTO_INVEST_CHART_TITLE_TW =
  "text-[clamp(1.32rem,1.12rem+0.95vmin,1.62rem)] iphone-page:text-[clamp(1.55rem,1.28rem+1.22vmin,1.92rem)]";

export const PROTO_INVEST_CHART_CAPTION_TW = `mt-4 font-normal leading-snug text-white/55 iphone-page:mt-5 text-[clamp(0.98rem,0.86rem+0.55vmin,1.12rem)] iphone-page:text-[clamp(1.05rem,0.92rem+0.65vmin,1.2rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_CHART_CITATION_TW = `mt-3 font-normal leading-snug text-white/45 text-[clamp(0.92rem,0.86rem+0.5vmin,1.05rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_QUOTE_TW = `font-normal leading-[1.22] tracking-[-0.025em] text-white text-[clamp(1.62rem,1.3rem+1.45vmin,2.1rem)] iphone-page:text-[clamp(1.85rem,1.45rem+2vmin,2.6rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_QUOTE_ATTRIBUTION_TW = `mt-4 font-medium text-white/55 iphone-page:mt-5 text-[clamp(1.08rem,0.95rem+0.55vmin,1.28rem)] iphone-page:text-[clamp(1.22rem,1.05rem+0.8vmin,1.48rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_FAQ_ITEM_TW = `text-[clamp(1.48rem,1.28rem+0.95vmin,1.82rem)] iphone-page:text-[clamp(1.68rem,1.38rem+1.22vmin,2.08rem)] leading-[1.15] tracking-[-0.015em] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_FAQ_ANSWER_TW = "pb-4 pt-2.5 iphone-page:pb-5 iphone-page:pt-3";

export const PROTO_INVEST_FAQ_ANSWER_BODY_TW = PROTO_INVEST_BODY_TW.replace("text-white", "text-white/85");

export const PROTO_INVEST_HERO_HEADLINE_WRAP = "w-fit max-w-full";

export const PROTO_INVEST_HERO_HEADLINE_PT = "mt-4 iphone-page:mt-5";

export const PROTO_INVEST_HERO_AFTER_BYLINE = "mt-8 iphone-page:mt-10";

export const PROTO_INVEST_HERO_BEFORE_ARTICLE = "mb-10 iphone-page:mb-12";

export const PROTO_INVEST_BYLINE_GAP = "mt-6 iphone-page:mt-7";

export const PROTO_INVEST_MAIN_PB =
  "pb-[max(2.5rem,calc(env(safe-area-inset-bottom,0px)+1.5rem))] iphone-page:pb-[max(3rem,calc(env(safe-area-inset-bottom,0px)+2rem))]";

/** Desktop /about — shared gutters with desktop home. */
export const PROTO_INVEST_DESKTOP_PAGE_INSET = ABOUT_DESKTOP_PAGE_INSET;

export const PROTO_INVEST_DESKTOP_TITLE_TW = `text-left font-light leading-[1.02] tracking-[-0.03em] text-white text-[clamp(2.65rem,3.75vw,3.95rem)] md:text-[clamp(2.85rem,3.45vw,4.15rem)] lg:text-[clamp(3rem,3.25vw,4.35rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_SUBHEADING_TW = `mt-5 md:mt-6 text-[clamp(1.32rem,1.2vw,1.55rem)] md:text-[clamp(1.4rem,1.28vw,1.65rem)] font-normal leading-[1.44] tracking-[-0.01em] text-white/72 ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_BODY_TW = `text-[clamp(1.12rem,1.05vw,1.32rem)] md:text-[clamp(1.22rem,1.1vw,1.42rem)] font-normal leading-[1.5] tracking-[-0.01em] text-white/85 ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_HERO_BYLINE_TW = `font-medium leading-none text-white text-[clamp(0.98rem,0.88vw,1.12rem)] md:text-[clamp(1.05rem,0.92vw,1.2rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_HERO_DATE_TW = `mt-1 font-medium leading-none text-white/90 text-[clamp(0.92rem,0.82vw,1.05rem)] md:text-[clamp(0.98rem,0.86vw,1.1rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_CONTENT_STACK_GAP = "gap-8 md:gap-9 lg:gap-10";

export const PROTO_INVEST_DESKTOP_BULLET_TW = "mt-[0.35em] h-[0.45em] w-[0.45em] shrink-0 rounded-full bg-[#E7A944]";

export const PROTO_INVEST_DESKTOP_LIST_GAP = "space-y-3 md:space-y-3.5";

export const PROTO_INVEST_DESKTOP_FAQ_ITEM_TW = `text-[clamp(1.28rem,1.18vw,1.52rem)] md:text-[clamp(1.4rem,1.28vw,1.68rem)] lg:text-[clamp(1.5rem,1.35vw,1.78rem)] leading-[1.15] tracking-[-0.015em] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_FAQ_ANSWER_TW = "pt-2.5 md:pt-3";

export const PROTO_INVEST_DESKTOP_FAQ_ANSWER_BODY_TW = `text-[clamp(0.98rem,0.9vw,1.12rem)] md:text-[clamp(1.05rem,0.95vw,1.18rem)] font-normal leading-[1.48] tracking-[-0.01em] text-white/72 ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_CHART_CITATION_TW = `mt-3 md:mt-4 font-normal leading-snug text-white/45 text-[clamp(0.92rem,0.85vw,1.05rem)] md:text-[clamp(0.98rem,0.9vw,1.1rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_GRAPHIC_PANEL_TW = `relative overflow-hidden border border-[#2A3538] bg-[#151c1f] ${ABOUT_DESKTOP_BEIGE_PANEL_TW}`;

export const PROTO_INVEST_DESKTOP_HERO_BOX_TW = `${DOEPHONE_SECTION_CAROUSEL_RADIUS} h-full min-h-0 w-full flex-1 border border-[#2A3538] shadow-none`;
