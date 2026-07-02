import type { WorkflowCarouselDesignBackdrop } from "@/lib/workflow-carousel-design-backdrops";

import {
  PROTO_COMMUNICATION_GRIDS,
  PROTO_HOME_HERO_GRADIENT,
  PROTO_HERO_GRADIENT,
} from "@/lib/proto/proto-communication-gradients";
import { PROTO_GRAIN_BG, PROTO_GRAIN_OPACITY, PROTO_GRAIN_SIZE } from "@/lib/proto/proto-phone-grain";

export { PROTO_HERO_GRADIENT };

/** Home hero — integrate flow with light blue top cap and lower warm yellow band. */
export const PROTO_HERO_BACKDROP: WorkflowCarouselDesignBackdrop = {
  slideIndex: 4,
  label: "Proto hero",
  gradient: PROTO_HOME_HERO_GRADIENT,
  grid: PROTO_COMMUNICATION_GRIDS.integrate ?? "hex",
};

/** /about hero visual — prior documents palette; overlays disabled in BlogHeroVisual. */
export const PROTO_ABOUT_HERO_BACKDROP: WorkflowCarouselDesignBackdrop = {
  slideIndex: 4,
  label: "Proto about hero",
  gradient: PROTO_HERO_GRADIENT,
  grid: PROTO_COMMUNICATION_GRIDS.integrate ?? "hex",
};

/** Hero-only grain — slightly lighter than feature cards. */
export const PROTO_HERO_GRAIN_TILE_PX = 208;
export const PROTO_HERO_GRAIN_SIZE = `${PROTO_HERO_GRAIN_TILE_PX}px ${PROTO_HERO_GRAIN_TILE_PX}px`;
export const PROTO_HERO_GRAIN_OPACITY = 0.4;

/** iPhone proto backdrops — gradient must stay full-bleed; patternScale > 1 spreads line grids. */
export const PROTO_PHONE_BACKDROP_GRADIENT_SCALE = 1;
export const PROTO_PHONE_BACKDROP_PATTERN_SCALE = 0.84;
export const PROTO_PHONE_BACKDROP_GRAIN_SIZE = PROTO_GRAIN_SIZE;
export { PROTO_GRAIN_BG, PROTO_GRAIN_SIZE, PROTO_GRAIN_OPACITY, PROTO_GRAIN_BG as PROTO_PHONE_GRAIN_BG };

/** Desktop proto backdrops — same full-bleed rule, native grain tile. */
export const PROTO_DESKTOP_BACKDROP_GRADIENT_SCALE = 1;
export const PROTO_DESKTOP_BACKDROP_PATTERN_SCALE = 1.15;
export const PROTO_DESKTOP_BACKDROP_GRAIN_SIZE = PROTO_GRAIN_SIZE;
