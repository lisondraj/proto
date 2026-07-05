export type ProtoFeaturePalette = {
  back: string;
  bloom: string;
  mid: string;
  lift: string;
};

export type ProtoFeaturePaletteSlideId =
  | "agents"
  | "sandbox-build"
  | "prototype"
  | "billing"
  | "front-desk"
  | "inbox"
  | "ambient"
  | "integrate"
  | "validate"
  | "shortlist"
  | "looking-ahead";

/**
 * /proto iPhone main — unique palette per feature box.
 * Avoids hero (proto-hero-palette.ts) and default grain / desktop shader colours.
 */
export const PROTO_FEATURE_PALETTES: Record<ProtoFeaturePaletteSlideId, ProtoFeaturePalette> = {
  /** Turn hiring into a build challenge. */
  agents: {
    back: "#101820",
    bloom: "#3ec8d8",
    mid: "#2888a0",
    lift: "#90e0e8",
  },
  /** Watch them build in your sandbox. */
  "sandbox-build": {
    back: "#0c1420",
    bloom: "#5898e8",
    mid: "#385878",
    lift: "#90c8f0",
  },
  /** Inside a tracked sandbox. */
  prototype: {
    back: "#182018",
    bloom: "#48a868",
    mid: "#386848",
    lift: "#e8c848",
  },
  /** Set the rules they build under. */
  billing: {
    back: "#281810",
    bloom: "#d85838",
    mid: "#a04838",
    lift: "#f0a860",
  },
  /** See the thinking behind the work. */
  "front-desk": {
    back: "#181828",
    bloom: "#7088d0",
    mid: "#5858a0",
    lift: "#b0a8d8",
  },
  /** The builder behind the build. */
  inbox: {
    back: "#201818",
    bloom: "#c06848",
    mid: "#884838",
    lift: "#e8a878",
  },
  /** Exceptional talent in every role. */
  ambient: {
    back: "#200818",
    bloom: "#c84898",
    mid: "#883878",
    lift: "#f0a8c8",
  },
  /** Turn submissions into products. */
  integrate: {
    back: "#0a2820",
    bloom: "#38b898",
    mid: "#289070",
    lift: "#a0e8c8",
  },
  /** See how real users respond. */
  validate: {
    back: "#181020",
    bloom: "#e87898",
    mid: "#8868a8",
    lift: "#f8c8d8",
  },
  /** Public challenges for future hires. */
  shortlist: {
    back: "#0a1418",
    bloom: "#38d0c0",
    mid: "#206878",
    lift: "#f0e878",
  },
  /** We're looking ahead. */
  "looking-ahead": {
    back: "#081018",
    bloom: "#5090e8",
    mid: "#284868",
    lift: "#c8a8f0",
  },
};

export function protoFeaturePalette(slideId: string): ProtoFeaturePalette | undefined {
  if (slideId in PROTO_FEATURE_PALETTES) {
    return PROTO_FEATURE_PALETTES[slideId as ProtoFeaturePaletteSlideId];
  }
  return undefined;
}

export function protoFeatureShaderSurfaceColors(palette: ProtoFeaturePalette) {
  return [palette.bloom, palette.mid, palette.lift] as const;
}

/** Shader colours + back for a /proto main feature palette. */
export function protoFeatureShaderSurface(slideId: ProtoFeaturePaletteSlideId) {
  const palette = PROTO_FEATURE_PALETTES[slideId];
  return {
    colors: protoFeatureShaderSurfaceColors(palette),
    colorBack: palette.back,
  };
}

/** /about — AI built for recruiting main panel (meet-proto flow). */
export const PROTO_INVEST_PRODUCT_SHADER_PALETTE_SLIDE = "integrate" as const;

/** /about — three stack panels beneath (meet-proto-stack flow). */
export const PROTO_INVEST_PRODUCT_STACK_PALETTE_SLIDES = [
  "agents",
  "prototype",
  "billing",
] as const satisfies readonly ProtoFeaturePaletteSlideId[];
