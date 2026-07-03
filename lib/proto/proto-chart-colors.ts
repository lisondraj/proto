import { PROTO_GRAIN_GRADIENT_COLORS } from "@/lib/proto/proto-grain-gradient";

const [SHADER_GOLD, SHADER_OLIVE, SHADER_CREAM] = PROTO_GRAIN_GRADIENT_COLORS;

/** Proto data viz — static fills aligned with /proto GrainGradient palette (no black). */
export const PROTO_CHART_COLORS = {
  accent: SHADER_GOLD,
  accentWarm: SHADER_OLIVE,
  cool: SHADER_CREAM,
  coolDeep: SHADER_OLIVE,
  track: "rgba(198, 117, 12, 0.2)",
  gridLine: "rgba(190, 174, 96, 0.22)",
  axis: "rgba(215, 203, 198, 0.38)",
  sliceMuted: SHADER_CREAM,
  sliceMid: SHADER_OLIVE,
  donutCenter: "#151c1f",
} as const;

export const PROTO_CHART_SLICE_COLORS = [
  PROTO_CHART_COLORS.accent,
  PROTO_CHART_COLORS.cool,
  PROTO_CHART_COLORS.coolDeep,
] as const;

/** Static chart gradients — shader hues without grain or animation. */
export const PROTO_CHART_GRADIENTS = {
  bar: `linear-gradient(90deg, ${SHADER_CREAM} 0%, ${SHADER_OLIVE} 42%, ${SHADER_GOLD} 100%)`,
  track: `linear-gradient(90deg, rgba(215, 203, 198, 0.22) 0%, rgba(190, 174, 96, 0.18) 55%, rgba(198, 117, 12, 0.16) 100%)`,
  tamBar: `linear-gradient(180deg, ${SHADER_GOLD} 0%, ${SHADER_OLIVE} 58%, ${SHADER_CREAM} 100%)`,
  pieSlices: [
    `linear-gradient(145deg, ${SHADER_GOLD} 0%, ${SHADER_OLIVE} 100%)`,
    `linear-gradient(145deg, ${SHADER_OLIVE} 0%, ${SHADER_CREAM} 100%)`,
    `linear-gradient(145deg, ${SHADER_CREAM} 0%, ${SHADER_GOLD} 100%)`,
  ],
} as const;

export const PROTO_CHART_TRACK_FILL = PROTO_CHART_GRADIENTS.track;

/** iPhone /about charts — same shader palette as desktop. */
export const PROTO_PHONE_CHART_COLORS = {
  ...PROTO_CHART_COLORS,
  label: "rgba(255, 255, 255, 0.72)",
  labelMuted: "rgba(255, 255, 255, 0.55)",
} as const;

export const PROTO_PHONE_CHART_SLICE_COLORS = PROTO_CHART_SLICE_COLORS;

export const PROTO_PHONE_CHART_GRADIENTS = PROTO_CHART_GRADIENTS;
