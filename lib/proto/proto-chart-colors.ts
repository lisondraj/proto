/** Proto data viz — aligned with vibrant reception palette. */
export const PROTO_CHART_COLORS = {
  accent: "#F2B838",
  accentWarm: "#DD6F42",
  cool: "#9FD4F0",
  coolDeep: "#6FA8D4",
  track: "rgba(111, 168, 212, 0.24)",
  gridLine: "rgba(111, 168, 212, 0.14)",
  axis: "rgba(111, 168, 212, 0.42)",
  sliceMuted: "#9FD4F0",
  sliceMid: "#6FA8D4",
  donutCenter: "#121819",
} as const;

export const PROTO_CHART_SLICE_COLORS = [
  PROTO_CHART_COLORS.accent,
  PROTO_CHART_COLORS.cool,
  PROTO_CHART_COLORS.coolDeep,
] as const;

/** Proto gradient fills for statistics in /proto-invest. */
export const PROTO_CHART_GRADIENTS = {
  bar: "linear-gradient(90deg, #1E3D52 0%, #6FA8D4 42%, #DD6F42 74%, #F2B838 100%)",
  track: "linear-gradient(90deg, rgba(53,107,133,0.38) 0%, rgba(111,168,212,0.3) 55%, rgba(159,212,240,0.26) 100%)",
  tamBar: "linear-gradient(180deg, #F2B838 0%, #DD6F42 58%, #6FA8D4 100%)",
} as const;
