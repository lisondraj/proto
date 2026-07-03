import type { GrainGradientShape } from "@paper-design/shaders";

/** Shared Paper shader palette for all /proto gradient surfaces. */
export const PROTO_GRAIN_GRADIENT_COLORS = ["#c6750c", "#beae60", "#d7cbc6"] as const;

export const PROTO_GRAIN_GRADIENT_COLOR_BACK = "#000a0f";

/** Meet Proto stack panels — warmer mid-tones, less black void and less dominant cream. */
export const PROTO_INVEST_STACK_SHADER_COLOR_BACK = "#141a1e";

export const PROTO_INVEST_STACK_SHADER_PALETTES = [
  ["#c6750c", "#beae60", "#9a8f6e"],
  ["#c6750c", "#beae60", "#9a8f6e"],
  ["#9a8f6e", "#beae60", "#c6750c"],
] as const;

/** Default animation speed when a preset omits speed. */
export const PROTO_GRAIN_GRADIENT_SPEED = 1;

/** Match library default — full hero sharpness on large bands. */
export const PROTO_SHADER_MAX_PIXEL_COUNT_HERO = 1920 * 1080 * 4;

/** Cap feature boxes only; stays above typical panel pixel counts at 2× DPR. */
export const PROTO_SHADER_MAX_PIXEL_COUNT_FEATURE = 1920 * 1080 * 2;

/** /about Meet Proto stack — smaller cap for static panels in a vertical stack. */
export const PROTO_SHADER_MAX_PIXEL_COUNT_STACK = Math.floor(1920 * 1080 * 1.25);

export const PROTO_GRAIN_GRADIENT_WORLD_WIDTH = 1280;

export const PROTO_GRAIN_GRADIENT_WORLD_HEIGHT = 720;

export type ProtoGrainGradientVariant =
  | "home-hero"
  | "about-hero"
  | "agents"
  | "front-desk"
  | "inbox"
  | "ambient"
  | "billing"
  | "prototype"
  | "integrate"
  | "validate"
  | "shortlist"
  | "meet-proto"
  | "meet-proto-stack-0"
  | "meet-proto-stack-1"
  | "meet-proto-stack-2";

export type ProtoGrainGradientPreset = {
  shape: GrainGradientShape;
  softness: number;
  intensity: number;
  fit?: "none" | "contain" | "cover";
  rotation?: number;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
  worldWidth?: number;
  worldHeight?: number;
  speed?: number;
};

/** Per-surface shader tuning — same colours, varied flow and direction. */
export const PROTO_GRAIN_GRADIENT_PRESETS: Record<ProtoGrainGradientVariant, ProtoGrainGradientPreset> = {
  "home-hero": {
    shape: "wave",
    softness: 0.7,
    intensity: 0.15,
    fit: "cover",
    speed: 1,
  },
  "about-hero": {
    shape: "corners",
    softness: 0.8,
    intensity: 0.11,
    fit: "cover",
    rotation: 38,
    offsetX: 0.18,
    offsetY: -0.16,
    scale: 1.2,
    speed: 0.55,
  },
  agents: {
    shape: "blob",
    softness: 0.6,
    intensity: 0.18,
    fit: "cover",
    rotation: 42,
    offsetX: -0.22,
    offsetY: 0.14,
    scale: 1.18,
  },
  "front-desk": {
    shape: "corners",
    softness: 0.75,
    intensity: 0.12,
    fit: "cover",
    rotation: 90,
    offsetX: 0.16,
    offsetY: 0.2,
    scale: 0.96,
  },
  inbox: {
    shape: "truchet",
    softness: 0.55,
    intensity: 0.22,
    fit: "cover",
    offsetX: -0.12,
    offsetY: -0.1,
    scale: 1.12,
  },
  ambient: {
    shape: "ripple",
    softness: 0.74,
    intensity: 0.13,
    fit: "cover",
    rotation: 48,
    offsetX: -0.14,
    offsetY: 0.18,
    scale: 1.14,
  },
  billing: {
    shape: "wave",
    softness: 0.7,
    intensity: 0.15,
    fit: "cover",
    offsetX: 0.24,
    offsetY: 0.14,
  },
  prototype: {
    shape: "wave",
    softness: 0.68,
    intensity: 0.12,
    fit: "cover",
    rotation: 160,
    offsetX: 0.1,
    offsetY: -0.12,
    scale: 1.02,
  },
  integrate: {
    shape: "ripple",
    softness: 0.72,
    intensity: 0.17,
    fit: "cover",
    rotation: 48,
    offsetY: -0.22,
    scale: 1.1,
  },
  validate: {
    shape: "blob",
    softness: 0.65,
    intensity: 0.14,
    fit: "cover",
    rotation: 315,
    offsetX: 0.1,
    offsetY: 0.12,
    scale: 1.22,
  },
  shortlist: {
    shape: "blob",
    softness: 0.7,
    intensity: 0.14,
    fit: "cover",
    rotation: 120,
    offsetX: 0.16,
    offsetY: -0.2,
    scale: 1.08,
  },
  "meet-proto": {
    shape: "wave",
    softness: 0.72,
    intensity: 0.16,
    fit: "cover",
    rotation: 92,
    offsetX: 0.05,
    offsetY: -0.06,
    scale: 1.4,
    worldWidth: 768,
    worldHeight: 1360,
    speed: 0.38,
  },
  "meet-proto-stack-0": {
    shape: "corners",
    softness: 0.74,
    intensity: 0.2,
    fit: "cover",
    rotation: 34,
    offsetX: 0.14,
    offsetY: -0.1,
    scale: 1.14,
    speed: 0,
  },
  "meet-proto-stack-1": {
    shape: "wave",
    softness: 0.76,
    intensity: 0.22,
    fit: "cover",
    rotation: 168,
    offsetX: -0.04,
    offsetY: 0.06,
    scale: 1.38,
    speed: 0,
  },
  "meet-proto-stack-2": {
    shape: "corners",
    softness: 0.82,
    intensity: 0.18,
    fit: "cover",
    rotation: 214,
    offsetX: -0.08,
    offsetY: 0.22,
    scale: 1.32,
    speed: 0,
  },
};

export function protoGrainGradientVariant(
  slideId: string,
): ProtoGrainGradientVariant | undefined {
  // First two feature boxes under the hero swap shaders only (UI unchanged).
  const resolvedId =
    slideId === "agents" ? "front-desk" : slideId === "front-desk" ? "agents" : slideId;

  if (resolvedId in PROTO_GRAIN_GRADIENT_PRESETS) {
    return resolvedId as ProtoGrainGradientVariant;
  }
  return undefined;
}

export function isProtoShaderHeroVariant(variant: ProtoGrainGradientVariant) {
  return variant === "home-hero" || variant === "about-hero";
}

export function protoShaderMaxPixelCount(variant: ProtoGrainGradientVariant) {
  if (isProtoShaderHeroVariant(variant)) {
    return PROTO_SHADER_MAX_PIXEL_COUNT_HERO;
  }

  if (variant.startsWith("meet-proto-stack")) {
    return PROTO_SHADER_MAX_PIXEL_COUNT_STACK;
  }

  return PROTO_SHADER_MAX_PIXEL_COUNT_FEATURE;
}
