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
  bar: `linear-gradient(88deg, ${PROTO_RECEPTION_PALETTE.deep} 0%, ${PROTO_HUMIRA_COLORS.bridgeDeep} 12%, ${PROTO_RECEPTION_PALETTE.blue} 30%, ${PROTO_RECEPTION_PALETTE.copper} 54%, ${PROTO_HUMIRA_COLORS.amber} 74%, ${PROTO_RECEPTION_PALETTE.gold} 90%, ${PROTO_RECEPTION_PALETTE.lightYellow} 100%)`,
  track: `linear-gradient(88deg, rgba(22, 42, 72, 0.34) 0%, rgba(58, 159, 212, 0.26) 48%, rgba(240, 120, 64, 0.18) 100%)`,
  tamBar: `radial-gradient(ellipse 78% 138% at 50% 108%, ${PROTO_RECEPTION_PALETTE.deep} 0%, ${PROTO_RECEPTION_PALETTE.blue} 34%, ${PROTO_RECEPTION_PALETTE.copper} 66%, ${PROTO_RECEPTION_PALETTE.gold} 100%)`,
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
  bar: `linear-gradient(92deg, ${P.void} 0%, ${P.plum} 10%, ${P.violet} 26%, ${P.orchid} 44%, ${P.lilac} 58%, ${P.periwinkle} 70%, ${P.bronze} 84%, ${P.glow} 100%)`,
  track: `linear-gradient(92deg, rgba(24, 16, 46, 0.38) 0%, rgba(110, 72, 200, 0.26) 52%, rgba(184, 144, 104, 0.18) 100%)`,
  tamBar: `radial-gradient(ellipse 76% 132% at 50% 110%, ${P.void} 0%, ${P.violet} 26%, ${P.orchid} 48%, ${P.lilac} 66%, ${P.bronze} 84%, ${P.glow} 100%)`,
} as const;
