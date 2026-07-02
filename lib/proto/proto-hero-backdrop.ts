import type { WorkflowCarouselDesignBackdrop } from "@/lib/workflow-carousel-design-backdrops";

import { PROTO_HERO_GRADIENT, PROTO_LINE_GRID } from "@/lib/proto/proto-communication-gradients";

export { PROTO_HERO_GRADIENT };

export const PROTO_HERO_BACKDROP: WorkflowCarouselDesignBackdrop = {
  slideIndex: 4,
  label: "Proto hero",
  gradient: PROTO_HERO_GRADIENT,
  grid: PROTO_LINE_GRID,
};

/** iPhone proto backdrops — gradient must stay full-bleed; patternScale > 1 spreads line grids. */
export const PROTO_PHONE_BACKDROP_GRADIENT_SCALE = 1;
export const PROTO_PHONE_BACKDROP_PATTERN_SCALE = 1.2;
export const PROTO_PHONE_BACKDROP_GRAIN_SIZE = "280px 280px";
