import type { WorkflowCarouselDesignBackdrop } from "@/lib/workflow-carousel-design-backdrops";

import {
  PROTO_ABOUT_HERO_GRADIENT,
  PROTO_ABOUT_HERO_PHONE_GRADIENT,
  PROTO_COMMUNICATION_GRIDS,
  PROTO_COMMUNICATION_LINE_OPACITY,
  PROTO_HOME_HERO_GRADIENT,
  PROTO_HOME_HERO_PHONE_GRADIENT,
  PROTO_HERO_GRADIENT,
} from "@/lib/proto/proto-communication-gradients";
import { PROTO_GRAIN_BG, PROTO_GRAIN_OPACITY, PROTO_GRAIN_SIZE } from "@/lib/proto/proto-phone-grain";

export { PROTO_HERO_GRADIENT };

/** Home hero — sage deploy lane palette (matches turn-submissions). */
export const PROTO_HERO_BACKDROP: WorkflowCarouselDesignBackdrop = {
  slideIndex: 4,
  label: "Proto hero",
  gradient: PROTO_HOME_HERO_GRADIENT,
  grid: PROTO_COMMUNICATION_GRIDS.integrate ?? "dot",
  lineOverlayOpacity: PROTO_COMMUNICATION_LINE_OPACITY.integrate,
};

/** iPhone home hero — same sage colouring with a taller radial fit. */
export const PROTO_HERO_PHONE_BACKDROP: WorkflowCarouselDesignBackdrop = {
  slideIndex: 4,
  label: "Proto hero phone",
  gradient: PROTO_HOME_HERO_PHONE_GRADIENT,
  grid: PROTO_COMMUNICATION_GRIDS.integrate ?? "dot",
  lineOverlayOpacity: PROTO_COMMUNICATION_LINE_OPACITY.integrate,
};

/** /about hero visual — home hero palette. */
export const PROTO_ABOUT_HERO_BACKDROP: WorkflowCarouselDesignBackdrop = {
  slideIndex: 4,
  label: "Proto about hero",
  gradient: PROTO_ABOUT_HERO_GRADIENT,
  grid: PROTO_COMMUNICATION_GRIDS.integrate ?? "hex",
};

/** iPhone /about hero — same hero colouring as desktop. */
export const PROTO_ABOUT_HERO_PHONE_BACKDROP: WorkflowCarouselDesignBackdrop = {
  slideIndex: 4,
  label: "Proto about hero phone",
  gradient: PROTO_ABOUT_HERO_PHONE_GRADIENT,
  grid: PROTO_COMMUNICATION_GRIDS.integrate ?? "hex",
};

/** Hero-only grain — slightly lighter than feature cards. */
export const PROTO_HERO_GRAIN_TILE_PX = 208;
export const PROTO_HERO_GRAIN_SIZE = `${PROTO_HERO_GRAIN_TILE_PX}px ${PROTO_HERO_GRAIN_TILE_PX}px`;
export const PROTO_HERO_GRAIN_OPACITY = 0.4;

/** Proto feature backdrops — match iPhone density; patternScale > 1 spreads line grids. */
export const PROTO_FEATURE_BACKDROP_PATTERN_SCALE = 0.84;
export const PROTO_PHONE_BACKDROP_GRADIENT_SCALE = 1;
export const PROTO_PHONE_BACKDROP_PATTERN_SCALE = PROTO_FEATURE_BACKDROP_PATTERN_SCALE;
export const PROTO_PHONE_BACKDROP_GRAIN_SIZE = PROTO_GRAIN_SIZE;
export { PROTO_GRAIN_BG, PROTO_GRAIN_SIZE, PROTO_GRAIN_OPACITY, PROTO_GRAIN_BG as PROTO_PHONE_GRAIN_BG };

/** Desktop proto backdrops — same full-bleed rule, native grain tile. */
export const PROTO_DESKTOP_BACKDROP_GRADIENT_SCALE = PROTO_PHONE_BACKDROP_GRADIENT_SCALE;
export const PROTO_DESKTOP_BACKDROP_PATTERN_SCALE = PROTO_FEATURE_BACKDROP_PATTERN_SCALE;
export const PROTO_DESKTOP_BACKDROP_GRAIN_SIZE = PROTO_GRAIN_SIZE;
