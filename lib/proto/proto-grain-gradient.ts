import type { GrainGradientShape } from "@paper-design/shaders";

/** Shared Paper shader palette for all /proto gradient surfaces. */
export const PROTO_GRAIN_GRADIENT_COLORS = ["#c6750c", "#beae60", "#d7cbc6"] as const;

export const PROTO_GRAIN_GRADIENT_COLOR_BACK = "#000a0f";

/** Feature boxes stay static; only hero bands animate when visible. */
export const PROTO_GRAIN_GRADIENT_SPEED = 0;

export const PROTO_SHADER_MIN_PIXEL_RATIO = 1;

export const PROTO_SHADER_MAX_PIXEL_COUNT_HERO = 1280 * 720;

export const PROTO_SHADER_MAX_PIXEL_COUNT_FEATURE = 640 * 400;

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
  | "shortlist";

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
    shape: "ripple",
    softness: 0.65,
    intensity: 0.2,
    fit: "cover",
    rotation: 180,
    offsetX: 0.12,
    offsetY: -0.18,
    scale: 1.08,
    speed: 1,
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
    shape: "sphere",
    softness: 0.68,
    intensity: 0.16,
    fit: "cover",
    rotation: 270,
    offsetX: 0.2,
    scale: 1.04,
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
    shape: "dots",
    softness: 0.5,
    intensity: 0.2,
    fit: "cover",
    rotation: 135,
    offsetX: -0.16,
    offsetY: 0.22,
    scale: 0.88,
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
    shape: "corners",
    softness: 0.58,
    intensity: 0.19,
    fit: "cover",
    rotation: 225,
    offsetX: -0.2,
    offsetY: -0.14,
    scale: 0.92,
  },
};

export function protoGrainGradientVariant(
  slideId: string,
): ProtoGrainGradientVariant | undefined {
  if (slideId in PROTO_GRAIN_GRADIENT_PRESETS) {
    return slideId as ProtoGrainGradientVariant;
  }
  return undefined;
}
