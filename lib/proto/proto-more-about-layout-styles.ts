import { DOEPHONE_SECTION_CAROUSEL_INSET_X, DOEPHONE_SECTION_CAROUSEL_RADIUS } from "@/lib/doephone/section-styles";
import { PROTO_DESKTOP_PAGE_INSET_X } from "@/lib/proto/proto-desktop-layout-styles";
import { PROTO_FONT_CLASS } from "@/lib/proto/proto-font";

export const PROTO_MORE_ABOUT_PHONE_INSET_X = DOEPHONE_SECTION_CAROUSEL_INSET_X;

export const PROTO_MORE_ABOUT_DESKTOP_INSET_X = PROTO_DESKTOP_PAGE_INSET_X;

export const PROTO_MORE_ABOUT_SECTION_PAD_Y =
  "py-12 iphone-page:py-14 md:py-16 lg:py-20";

export const PROTO_MORE_ABOUT_SECTION_TITLE_PHONE_TW = `text-left font-light leading-[1.06] tracking-[-0.028em] text-white text-[clamp(2.05rem,7.25vw,3rem)] iphone-page:text-[clamp(1.95rem,6.85vw,2.85rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_MORE_ABOUT_SECTION_TITLE_DESKTOP_TW = `text-left font-light leading-[1.06] tracking-[-0.028em] text-white text-[clamp(1.85rem,2.15vw,2.45rem)] md:text-[clamp(1.95rem,2.25vw,2.55rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_MORE_ABOUT_TITLE_TO_TRACK_GAP = "mb-6 iphone-page:mb-7 md:mb-8";

export const PROTO_MORE_ABOUT_CARD_PANEL_TW = `relative w-full overflow-hidden border border-[#2A3538] bg-[#151c1f] ${DOEPHONE_SECTION_CAROUSEL_RADIUS} aspect-[5/6] min-h-[clamp(15.5rem,40vw,21rem)] iphone-page:min-h-[clamp(14.5rem,38vw,19.5rem)] shadow-none`;

export const PROTO_MORE_ABOUT_CARD_PANEL_DESKTOP_TW = `relative w-full overflow-hidden border border-[#2A3538] bg-[#151c1f] ${DOEPHONE_SECTION_CAROUSEL_RADIUS} aspect-[5/6] min-h-[clamp(14rem,18vw,18.5rem)] shadow-none`;

export const PROTO_MORE_ABOUT_CARD_TITLE_PHONE_TW = `mt-3 text-left font-normal leading-[1.22] tracking-[-0.015em] text-white text-[clamp(1.22rem,1.05rem+0.75vmin,1.48rem)] iphone-page:text-[clamp(1.32rem,1.12rem+0.9vmin,1.58rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_MORE_ABOUT_CARD_TITLE_DESKTOP_TW = `mt-3 text-left font-normal leading-[1.22] tracking-[-0.015em] text-white text-[clamp(1.05rem,0.95vw,1.2rem)] md:text-[clamp(1.1rem,1vw,1.24rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_MORE_ABOUT_CARD_META_PHONE_TW = `mt-1.5 text-left font-medium leading-[1.35] text-white/55 text-[clamp(1.05rem,0.92rem+0.55vmin,1.22rem)] iphone-page:text-[clamp(1.12rem,0.98rem+0.65vmin,1.32rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_MORE_ABOUT_CARD_META_DESKTOP_TW = `mt-1.5 text-left font-medium leading-[1.35] text-white/55 text-[clamp(0.92rem,0.85vw,1.05rem)] md:text-[clamp(0.98rem,0.9vw,1.1rem)] ${PROTO_FONT_CLASS}`;

export const PROTO_MORE_ABOUT_TRACK_PHONE_TW =
  "proto-more-about__track flex w-full snap-x snap-mandatory flex-row gap-4 overflow-x-auto overflow-y-visible scroll-smooth iphone-page:gap-5 [scrollbar-width:none] [-ms-overflow-style:none] [touch-action:pan-y_pinch-zoom] [&::-webkit-scrollbar]:hidden";

export const PROTO_MORE_ABOUT_TRACK_DESKTOP_TW =
  "proto-more-about__track flex w-full snap-x snap-mandatory flex-row gap-5 overflow-x-auto overflow-y-visible scroll-smooth lg:gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

export const PROTO_MORE_ABOUT_CARD_PHONE_TW =
  "proto-more-about__card w-[min(82vw,20.5rem)] shrink-0 snap-start";

export const PROTO_MORE_ABOUT_CARD_DESKTOP_TW =
  "proto-more-about__card w-[min(24vw,19rem)] shrink-0 snap-start";
