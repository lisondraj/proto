import {
  PROTO_HUMIRA_COLORS,
  PROTO_RECEPTION_PALETTE,
} from "@/lib/proto/proto-communication-gradients";

/** Proto data viz — aligned with aurora reception palette. */
export const PROTO_CHART_COLORS = {
  accent: PROTO_RECEPTION_PALETTE.gold,
  accentWarm: PROTO_RECEPTION_PALETTE.copper,
  cool: PROTO_HUMIRA_COLORS.bridgeBlue,
  coolDeep: PROTO_RECEPTION_PALETTE.blue,
  track: "rgba(58, 159, 212, 0.24)",
  gridLine: "rgba(58, 159, 212, 0.14)",
  axis: "rgba(58, 159, 212, 0.42)",
  sliceMuted: PROTO_HUMIRA_COLORS.bridgeBlue,
  sliceMid: PROTO_RECEPTION_PALETTE.blue,
  donutCenter: "#121819",
} as const;

export const PROTO_CHART_SLICE_COLORS = [
  PROTO_CHART_COLORS.accent,
  PROTO_CHART_COLORS.cool,
  PROTO_CHART_COLORS.coolDeep,
] as const;

/** Proto gradient fills for statistics in /proto-invest. */
export const PROTO_CHART_GRADIENTS = {
  bar: `linear-gradient(90deg, ${PROTO_RECEPTION_PALETTE.deep} 0%, ${PROTO_RECEPTION_PALETTE.blue} 42%, ${PROTO_RECEPTION_PALETTE.copper} 74%, ${PROTO_RECEPTION_PALETTE.gold} 100%)`,
  track: `linear-gradient(90deg, rgba(22, 42, 72, 0.38) 0%, rgba(58, 159, 212, 0.3) 55%, rgba(92, 184, 232, 0.26) 100%)`,
  tamBar: `linear-gradient(180deg, ${PROTO_RECEPTION_PALETTE.gold} 0%, ${PROTO_RECEPTION_PALETTE.copper} 58%, ${PROTO_RECEPTION_PALETTE.blue} 100%)`,
} as const;
