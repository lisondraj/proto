import {
  PROTO_PHONE_PRISM_PALETTE,
  PROTO_RECEPTION_PALETTE,
  PROTO_HUMIRA_COLORS,
} from "@/lib/proto/proto-communication-gradients";

const P = PROTO_PHONE_PRISM_PALETTE;

/** Proto data viz — aligned with aurora reception palette (desktop). */
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

/** iPhone /about charts — twilight prism palette. */
export const PROTO_PHONE_CHART_COLORS = {
  accent: P.glow,
  accentWarm: P.bronze,
  cool: P.periwinkle,
  coolDeep: P.orchid,
  track: "rgba(110, 72, 200, 0.22)",
  gridLine: "rgba(142, 98, 216, 0.14)",
  axis: "rgba(164, 132, 220, 0.42)",
  sliceMuted: P.periwinkle,
  sliceMid: P.orchid,
  donutCenter: P.void,
  label: "rgba(255, 255, 255, 0.72)",
  labelMuted: "rgba(255, 255, 255, 0.55)",
} as const;

export const PROTO_PHONE_CHART_SLICE_COLORS = [
  PROTO_PHONE_CHART_COLORS.accent,
  PROTO_PHONE_CHART_COLORS.cool,
  PROTO_PHONE_CHART_COLORS.coolDeep,
] as const;

export const PROTO_PHONE_CHART_GRADIENTS = {
  bar: `linear-gradient(90deg, ${P.void} 0%, ${P.violet} 20%, ${P.orchid} 40%, ${P.lilac} 58%, ${P.periwinkle} 72%, ${P.bronze} 86%, ${P.glow} 100%)`,
  track: `linear-gradient(90deg, rgba(24, 16, 46, 0.42) 0%, rgba(110, 72, 200, 0.28) 55%, rgba(164, 132, 220, 0.22) 100%)`,
  tamBar: `linear-gradient(180deg, ${P.glow} 0%, ${P.bronze} 18%, ${P.lilac} 40%, ${P.orchid} 62%, ${P.violet} 82%, ${P.void} 100%)`,
} as const;
