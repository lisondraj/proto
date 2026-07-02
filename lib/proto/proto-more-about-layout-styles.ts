import { DOEPHONE_SECTION_CAROUSEL_RADIUS } from "@/lib/doephone/section-styles";
import { PROTO_DESKTOP_PAGE_INSET_X } from "@/lib/proto/proto-desktop-layout-styles";
import {
  PROTO_MORE_ABOUT_PHONE_TRACK_END_SPACER,
  PROTO_MORE_ABOUT_PHONE_TRACK_START_SPACER,
  PROTO_PHONE_PAGE_INSET_X,
} from "@/lib/proto/proto-phone-layout-styles";
import { PROTO_FONT_CLASS } from "@/lib/proto/proto-font";

export {
  PROTO_MORE_ABOUT_PHONE_TRACK_END_SPACER,
  PROTO_MORE_ABOUT_PHONE_TRACK_START_SPACER,
};

export const PROTO_MORE_ABOUT_PHONE_INSET_X = PROTO_PHONE_PAGE_INSET_X;

export const PROTO_MORE_ABOUT_DESKTOP_INSET_X = PROTO_DESKTOP_PAGE_INSET_X;

/** Scroll track spacers — match title left/right gutters without nested padding. */
export const PROTO_MORE_ABOUT_DESKTOP_TRACK_START_SPACER =
  "proto-more-about__track-spacer shrink-0 w-10 md:w-20 lg:w-28 xl:w-36";

export const PROTO_MORE_ABOUT_DESKTOP_TRACK_END_SPACER =
  "proto-more-about__track-spacer shrink-0 w-10 md:w-20 lg:w-28 xl:w-36";

export const PROTO_MORE_ABOUT_SECTION_PAD_Y =
  "py-10 iphone-page:py-11 md:py-16 lg:py-20";

export const PROTO_MORE_ABOUT_SECTION_TITLE_PHONE_TW = `text-left font-light leading-[1.06] tracking-[-0.028em] text-white text-[clamp(2.05rem,7.25vw,3rem)] iphone-page:text-[clamp(1.72rem,1.02rem+4.65vmin,2.35rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_MORE_ABOUT_SECTION_TITLE_DESKTOP_TW = `text-left font-light leading-[1.06] tracking-[-0.028em] text-white text-[clamp(1.85rem,2.15vw,2.45rem)] md:text-[clamp(1.95rem,2.25vw,2.55rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_MORE_ABOUT_TITLE_TO_TRACK_GAP = "mb-6 iphone-page:mb-7 md:mb-8";

export const PROTO_MORE_ABOUT_CARD_PANEL_TW = `relative w-full overflow-hidden border border-[#2A3538] bg-[#151c1f] ${DOEPHONE_SECTION_CAROUSEL_RADIUS} aspect-[16/11] shadow-none`;

export const PROTO_MORE_ABOUT_CARD_PANEL_DESKTOP_TW = `relative w-full overflow-hidden border border-[#2A3538] bg-[#151c1f] ${DOEPHONE_SECTION_CAROUSEL_RADIUS} aspect-[16/10] shadow-none`;

export const PROTO_MORE_ABOUT_CARD_TITLE_PHONE_TW = `mt-3 text-left font-normal leading-[1.2] tracking-[-0.015em] text-white text-[clamp(1.42rem,1.2rem+0.95vmin,1.78rem)] iphone-page:text-[clamp(1.28rem,1.08rem+0.82vmin,1.55rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_MORE_ABOUT_CARD_TITLE_DESKTOP_TW = `mt-4 text-left font-normal leading-[1.2] tracking-[-0.015em] text-white text-[clamp(1.28rem,1.15vw,1.48rem)] md:text-[clamp(1.34rem,1.2vw,1.54rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_MORE_ABOUT_CARD_META_PHONE_TW = `mt-1.5 text-left font-medium leading-[1.35] text-white/55 text-[clamp(1.18rem,1.02rem+0.7vmin,1.42rem)] iphone-page:text-[clamp(1.08rem,0.92rem+0.62vmin,1.22rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_MORE_ABOUT_CARD_META_DESKTOP_TW = `mt-2 text-left font-medium leading-[1.35] text-white/55 text-[clamp(1.08rem,0.98vw,1.22rem)] md:text-[clamp(1.14rem,1.02vw,1.28rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_MORE_ABOUT_TRACK_PHONE_TW =
  "proto-more-about__track flex w-full snap-x snap-mandatory flex-row items-start gap-5 overflow-x-auto overflow-y-visible scroll-smooth scroll-pl-[var(--proto-phone-gutter-left)] iphone-page:gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [touch-action:pan-y_pinch-zoom] [&::-webkit-scrollbar]:hidden";

export const PROTO_MORE_ABOUT_TRACK_DESKTOP_TW =
  "proto-more-about__track flex w-full snap-x snap-mandatory flex-row items-start gap-5 overflow-x-auto overflow-y-visible scroll-smooth scroll-pl-10 md:scroll-pl-20 lg:scroll-pl-28 xl:scroll-pl-36 lg:gap-7 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

export const PROTO_MORE_ABOUT_CARD_PHONE_TW =
  "proto-more-about__card w-[min(76vw,21.5rem)] shrink-0 snap-start";

export const PROTO_MORE_ABOUT_CARD_DESKTOP_TW =
  "proto-more-about__card w-[min(32vw,26rem)] shrink-0 snap-start";
