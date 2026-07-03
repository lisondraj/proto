import {
  ABOUT_DESKTOP_BEIGE_PANEL_TW,
  ABOUT_DESKTOP_PAGE_INSET,
} from "@/lib/about/about-layout-styles";
import { DOEPHONE_SECTION_CAROUSEL_RADIUS } from "@/lib/doephone/section-styles";
import {
  PROTO_PHONE_PAGE_INSET_X,
} from "@/lib/proto/proto-phone-layout-styles";
import { PROTO_FONT_CLASS } from "@/lib/proto/proto-font";

/** Horizontal gutters — aligned with /proto feature sections. */
export const PROTO_INVEST_PAGE_INSET_X = PROTO_PHONE_PAGE_INSET_X;

export const PROTO_INVEST_ARTICLE_TOP_PT = "proto-invest-article-top";

export const PROTO_INVEST_SECTION_GAP = "space-y-8 iphone-page:space-y-9";

export const PROTO_INVEST_CONTENT_GAP = "space-y-5 iphone-page:space-y-6";

export const PROTO_INVEST_LIST_GAP = "space-y-3.5 iphone-page:space-y-4";

/** FAQ answer bullets — tighter than body list gaps. */
export const PROTO_INVEST_FAQ_BULLET_LIST_GAP = "space-y-1 iphone-page:space-y-1.5";

export const PROTO_INVEST_TITLE_TW = `text-left font-light leading-[1.02] tracking-[-0.03em] text-white text-[clamp(3rem,11.25vw,5.15rem)] iphone-page:text-[clamp(2.08rem,1.12rem+5.15vmin,2.92rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_SUBHEADING_TW = `mt-[clamp(0.85rem,0.65rem+0.85vmin,1.25rem)] text-[clamp(1.52rem,1.3rem+1.05vmin,1.92rem)] iphone-page:mt-[clamp(0.6rem,0.48rem+0.48vmin,0.88rem)] iphone-page:text-[clamp(1.18rem,1.02rem+0.82vmin,1.42rem)] font-normal leading-[1.34] tracking-[-0.01em] text-white/72 ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_BYLINE_TW = `text-[clamp(1.28rem,1.08rem+0.75vmin,1.48rem)] iphone-page:text-[clamp(1.08rem,0.9rem+0.65vmin,1.28rem)] font-medium text-white/55 ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_BODY_TW = `text-[clamp(1.42rem,1.18rem+1.2vmin,1.82rem)] iphone-page:text-[clamp(1.12rem,0.92rem+0.95vmin,1.42rem)] font-normal leading-[1.48] tracking-[-0.012em] text-white ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_SECTION_HEADLINE_TW = `text-left font-light leading-[1.02] tracking-[-0.028em] text-white text-[clamp(3rem,11.25vw,5.15rem)] iphone-page:text-[clamp(1.68rem,0.9rem+4.05vmin,2.32rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_PANEL_BORDER_TW = "border border-[#2A3538]";

export const PROTO_INVEST_PHONE_PANEL_HEIGHT =
  "min-h-[clamp(18rem,46vmin,28rem)] h-[clamp(18rem,46vmin,28rem)] iphone-page:min-h-[clamp(17rem,44vmin,26.5rem)] iphone-page:h-[clamp(17rem,44vmin,26.5rem)]";

export const PROTO_INVEST_PHONE_PANEL_HEIGHT_DOUBLE =
  "min-h-[clamp(36rem,92vmin,56rem)] h-[clamp(36rem,92vmin,56rem)] iphone-page:min-h-[clamp(34rem,88vmin,53rem)] iphone-page:h-[clamp(34rem,88vmin,53rem)]";

/** Meet Proto hero panel — double height plus 1/5. */
export const PROTO_INVEST_PHONE_PANEL_HEIGHT_MEET_PROTO =
  "min-h-[clamp(43.2rem,110.4vmin,67.2rem)] h-[clamp(43.2rem,110.4vmin,67.2rem)] iphone-page:min-h-[clamp(40.8rem,105.6vmin,63.6rem)] iphone-page:h-[clamp(40.8rem,105.6vmin,63.6rem)]";

export const PROTO_INVEST_HERO_BOX_TW = `proto-invest-shader-panel ${PROTO_INVEST_PHONE_PANEL_HEIGHT} ${DOEPHONE_SECTION_CAROUSEL_RADIUS} border border-[#2A3538] shadow-none`;

export const PROTO_INVEST_GRAPHIC_PANEL_TW = `proto-invest-graphic-panel relative w-full overflow-hidden border border-[#2A3538] bg-[#151c1f] ${PROTO_INVEST_PHONE_PANEL_HEIGHT} ${DOEPHONE_SECTION_CAROUSEL_RADIUS} shadow-none`;

export const PROTO_INVEST_PRODUCT_GRAPHIC_PANEL_TW = `proto-invest-graphic-panel relative w-full overflow-hidden border border-[#2A3538] bg-[#151c1f] ${PROTO_INVEST_PHONE_PANEL_HEIGHT_DOUBLE} ${DOEPHONE_SECTION_CAROUSEL_RADIUS} shadow-none`;

export const PROTO_INVEST_PRODUCT_SHADER_PANEL_TW = `proto-invest-shader-panel relative w-full overflow-hidden border border-[#2A3538] ${PROTO_INVEST_PHONE_PANEL_HEIGHT_MEET_PROTO} ${DOEPHONE_SECTION_CAROUSEL_RADIUS} shadow-none`;

export const PROTO_INVEST_PHONE_PANEL_HEIGHT_THIRD =
  "min-h-[clamp(12rem,30.67vmin,18.67rem)] h-[clamp(12rem,30.67vmin,18.67rem)] iphone-page:min-h-[clamp(11.33rem,29.33vmin,17.67rem)] iphone-page:h-[clamp(11.33rem,29.33vmin,17.67rem)]";

/** Meet Proto stack boxes — 2× prior stack height, plus 1/3. */
export const PROTO_INVEST_PHONE_PANEL_HEIGHT_STACK =
  "min-h-[clamp(26.7rem,68.2vmin,41.5rem)] h-[clamp(26.7rem,68.2vmin,41.5rem)] iphone-page:min-h-[clamp(25.2rem,65.2vmin,39.3rem)] iphone-page:h-[clamp(25.2rem,65.2vmin,39.3rem)]";

export const PROTO_INVEST_PRODUCT_STACK_BOX_TW = `relative w-full overflow-hidden border border-[#2A3538] bg-[#151c1f] ${PROTO_INVEST_PHONE_PANEL_HEIGHT_STACK} ${DOEPHONE_SECTION_CAROUSEL_RADIUS} shadow-none`;

export const PROTO_INVEST_PRODUCT_STACK_SHADER_BOX_TW = `proto-invest-shader-panel relative w-full overflow-hidden border border-[#2A3538] ${PROTO_INVEST_PHONE_PANEL_HEIGHT_STACK} ${DOEPHONE_SECTION_CAROUSEL_RADIUS} shadow-none`;

export const PROTO_INVEST_PRODUCT_PANEL_STACK_WRAP = "flex flex-col gap-3 iphone-page:gap-3.5";

/** Team pill grid above the tall Meet Proto shader — matches one stack box height. */
export const PROTO_INVEST_PRODUCT_TEAM_GRID_WRAP_TW = `shrink-0 ${PROTO_INVEST_PHONE_PANEL_HEIGHT_STACK}`;

export const PROTO_INVEST_PRODUCT_TEAM_GRID_TW =
  "mx-auto grid h-full min-h-0 w-full max-w-[clamp(16.5rem,74vw,21.5rem)] grid-cols-2 place-content-center justify-items-center gap-x-[clamp(0.6rem,2.4vmin,0.9rem)] gap-y-[clamp(0.6rem,2.4vmin,0.9rem)] iphone-page:max-w-[clamp(15.5rem,72vw,20rem)] iphone-page:gap-x-[clamp(0.55rem,2.2vmin,0.8rem)] iphone-page:gap-y-[clamp(0.55rem,2.2vmin,0.8rem)]";

export const PROTO_INVEST_PRODUCT_TEAM_PILL_TW = `flex h-[clamp(2.15rem,8.5vmin,2.55rem)] w-[min(100%,clamp(7.75rem,36vw,10.5rem))] items-center justify-center rounded-[0.5rem] border border-[#E0E0E0] bg-white px-2.5 text-center font-medium leading-none tracking-[-0.01em] text-[#0a0a0a] text-[clamp(1.08rem,4.4vw,1.28rem)] iphone-page:text-[clamp(1.02rem,0.92rem+0.5vmin,1.18rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_PRODUCT_PANEL_TITLE_WRAP =
  "absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#141a1e]/90 via-[#141a1e]/40 to-transparent px-5 pb-6 pt-20 iphone-page:px-4 iphone-page:pb-5 iphone-page:pt-16";

export const PROTO_INVEST_PRODUCT_PANEL_TITLE_TW = `text-left font-light leading-[1.02] tracking-[-0.028em] text-white text-[clamp(2.2rem,8.5vw,3.6rem)] iphone-page:text-[clamp(1.68rem,0.9rem+4.05vmin,2.32rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_BULLET_TW = "mt-[0.38em] h-[0.5em] w-[0.5em] shrink-0 rounded-full bg-[#E7A944]";

export const PROTO_INVEST_CHART_TITLE_TW =
  "text-[clamp(1.32rem,1.12rem+0.95vmin,1.62rem)] iphone-page:text-[clamp(1.22rem,1.02rem+0.82vmin,1.48rem)]";

export const PROTO_INVEST_CHART_CAPTION_TW = `mt-3 font-normal leading-snug text-white/55 iphone-page:mt-4 text-[clamp(0.98rem,0.86rem+0.55vmin,1.12rem)] iphone-page:text-[clamp(0.95rem,0.84rem+0.52vmin,1.08rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_CHART_CITATION_TW = `mt-3 font-normal leading-snug text-white/45 text-[clamp(0.92rem,0.86rem+0.5vmin,1.05rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_QUOTE_TW = `font-normal leading-[1.22] tracking-[-0.025em] text-white text-[clamp(1.62rem,1.3rem+1.45vmin,2.1rem)] iphone-page:text-[clamp(1.42rem,1.18rem+1.15vmin,1.85rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_QUOTE_ATTRIBUTION_TW = `mt-3 font-medium text-white/55 iphone-page:mt-4 text-[clamp(1.08rem,0.95rem+0.55vmin,1.28rem)] iphone-page:text-[clamp(1.02rem,0.88rem+0.62vmin,1.18rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_FAQ_ITEM_TW = `text-[clamp(1.48rem,1.28rem+0.95vmin,1.82rem)] iphone-page:text-[clamp(1.28rem,1.08rem+0.88vmin,1.55rem)] leading-[1.15] tracking-[-0.015em] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_FAQ_ANSWER_TW = "pb-4 pt-2.5 iphone-page:pb-5 iphone-page:pt-3";

export const PROTO_INVEST_FAQ_ANSWER_BODY_TW = PROTO_INVEST_BODY_TW.replace("text-white", "text-white/85");

export const PROTO_INVEST_HERO_HEADLINE_WRAP = "w-fit max-w-full";

export const PROTO_INVEST_HERO_HEADLINE_PT = "mt-0";

export const PROTO_INVEST_HERO_AFTER_BYLINE = "mt-6 iphone-page:mt-7";

export const PROTO_INVEST_HERO_BEFORE_ARTICLE = "mb-8 iphone-page:mb-9";

export const PROTO_INVEST_SECTION_ANCHOR = "proto-invest-section-anchor";

export const PROTO_INVEST_MOBILE_TOC_WRAP = "proto-invest-mobile-toc mb-8 iphone-page:mb-9";

export const PROTO_INVEST_MOBILE_TOC_BOX_TW = `border border-[#2A3538]/75 px-4 py-4 iphone-page:px-3.5 iphone-page:py-3.5 ${DOEPHONE_SECTION_CAROUSEL_RADIUS}`;

export const PROTO_INVEST_MOBILE_TOC_LABEL_TW = `mb-3 font-medium uppercase tracking-[0.16em] !text-white/45 text-[0.68rem] iphone-page:mb-2.5 ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_MOBILE_TOC_LIST_TW = "m-0 flex list-none flex-col gap-0.5 p-0 iphone-page:gap-px";

export const PROTO_INVEST_MOBILE_TOC_LINK_TW = `group flex w-full items-center gap-3 rounded-[0.45rem] px-2 py-2 text-left !text-white/72 transition-colors duration-200 ease-out active:!text-white active:bg-white/[0.04] iphone-page:gap-2.5 iphone-page:px-1.5 iphone-page:py-1.5 ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_MOBILE_TOC_INDEX_TW = `w-[1.4rem] shrink-0 font-normal tabular-nums !text-white/45 text-[clamp(0.8rem,0.72rem+0.32vmin,0.9rem)]`;

export const PROTO_INVEST_MOBILE_TOC_TEXT_TW = `min-w-0 flex-1 font-normal leading-snug tracking-[-0.01em] text-[clamp(1rem,0.88rem+0.55vmin,1.14rem)] iphone-page:text-[clamp(0.94rem,0.84rem+0.45vmin,1.06rem)]`;

export const PROTO_INVEST_MOBILE_TOC_AUDIO_DIVIDER_TW = "mt-3 border-t border-[#2A3538]/55 pt-3 iphone-page:mt-2.5 iphone-page:pt-2.5";

export const PROTO_INVEST_MOBILE_TOC_AUDIO_TW = `flex w-full items-center gap-2.5 text-left font-normal leading-snug tracking-[-0.01em] !text-white/55 transition-colors duration-200 ease-out active:!text-white/72 iphone-page:gap-2 text-[clamp(0.94rem,0.84rem+0.45vmin,1.06rem)] iphone-page:text-[clamp(0.9rem,0.82rem+0.38vmin,1rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_BYLINE_GAP = "mt-5 iphone-page:mt-6";

export const PROTO_INVEST_MAIN_PB =
  "pb-[max(2.5rem,calc(env(safe-area-inset-bottom,0px)+1.5rem))] iphone-page:pb-[max(3rem,calc(env(safe-area-inset-bottom,0px)+2rem))]";

/** Desktop /about — shared gutters with desktop home. */
export const PROTO_INVEST_DESKTOP_PAGE_INSET = ABOUT_DESKTOP_PAGE_INSET;

export const PROTO_INVEST_DESKTOP_TITLE_TW = `text-left font-light leading-[1.02] tracking-[-0.03em] text-white text-[clamp(2.65rem,3.75vw,3.95rem)] md:text-[clamp(2.85rem,3.45vw,4.15rem)] lg:text-[clamp(3rem,3.25vw,4.35rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_SECTION_HEADLINE_TW = `text-left font-light leading-[1.02] tracking-[-0.028em] text-white text-[clamp(2.2rem,3.1vw,3.35rem)] md:text-[clamp(2.4rem,3.25vw,3.55rem)] lg:text-[clamp(2.55rem,3.35vw,3.75rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_SUBHEADING_TW = `mt-5 md:mt-6 text-[clamp(1.42rem,1.28vw,1.68rem)] md:text-[clamp(1.52rem,1.38vw,1.78rem)] font-normal leading-[1.44] tracking-[-0.01em] text-white/72 ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_BODY_TW = `text-[clamp(1.12rem,1.05vw,1.32rem)] md:text-[clamp(1.22rem,1.1vw,1.42rem)] font-normal leading-[1.5] tracking-[-0.01em] text-white/85 ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_HERO_BYLINE_TW = `font-medium leading-none text-white text-[clamp(0.98rem,0.88vw,1.12rem)] md:text-[clamp(1.05rem,0.92vw,1.2rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_HERO_DATE_TW = `mt-1 font-medium leading-none text-white/90 text-[clamp(0.92rem,0.82vw,1.05rem)] md:text-[clamp(0.98rem,0.86vw,1.1rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_CONTENT_STACK_GAP = "gap-8 md:gap-9 lg:gap-10";

export const PROTO_INVEST_DESKTOP_BULLET_TW = "mt-[0.35em] h-[0.45em] w-[0.45em] shrink-0 rounded-full bg-[#E7A944]";

export const PROTO_INVEST_DESKTOP_LIST_GAP = "space-y-3 md:space-y-3.5";

export const PROTO_INVEST_DESKTOP_FAQ_BULLET_LIST_GAP = "space-y-1 md:space-y-1.5";

export const PROTO_INVEST_DESKTOP_FAQ_ITEM_TW = `text-[clamp(1.28rem,1.18vw,1.52rem)] md:text-[clamp(1.4rem,1.28vw,1.68rem)] lg:text-[clamp(1.5rem,1.35vw,1.78rem)] leading-[1.15] tracking-[-0.015em] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_FAQ_ANSWER_TW = "pt-2.5 md:pt-3";

export const PROTO_INVEST_DESKTOP_FAQ_ANSWER_BODY_TW = `text-[clamp(0.98rem,0.9vw,1.12rem)] md:text-[clamp(1.05rem,0.95vw,1.18rem)] font-normal leading-[1.48] tracking-[-0.01em] text-white/72 ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_CHART_CITATION_TW = `mt-3 md:mt-4 font-normal leading-snug text-white/45 text-[clamp(0.92rem,0.85vw,1.05rem)] md:text-[clamp(0.98rem,0.9vw,1.1rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_INVEST_DESKTOP_GRAPHIC_PANEL_TW = `relative overflow-hidden border border-[#2A3538] bg-[#151c1f] ${ABOUT_DESKTOP_BEIGE_PANEL_TW}`;

export const PROTO_INVEST_DESKTOP_HERO_BOX_TW = `proto-invest-shader-panel ${DOEPHONE_SECTION_CAROUSEL_RADIUS} h-full min-h-0 w-full flex-1 border border-[#2A3538] shadow-none`;
