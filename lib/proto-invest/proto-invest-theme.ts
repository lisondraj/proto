import { PROTO_CHART_COLORS } from "@/lib/proto/proto-chart-colors";
import {
  PROTO_BORDER,
  PROTO_PAGE_BG,
  PROTO_PAGE_BG_LIGHT,
} from "@/lib/proto/proto-chrome-colors";

/** Shared /proto-invest chrome tokens — aligned with proto nav + section bands. */
export const PROTO_INVEST_PANEL_BG = PROTO_PAGE_BG_LIGHT;
export const PROTO_INVEST_PAGE_BG = PROTO_PAGE_BG;
export const PROTO_INVEST_BORDER = PROTO_BORDER;

/** Chart palette — proto reception gold + bridge blue on dark. */
export const PROTO_INVEST_CHART_COLORS = {
  accent: PROTO_CHART_COLORS.accent,
  accentAlt: PROTO_CHART_COLORS.accentWarm,
  track: PROTO_CHART_COLORS.track,
  gridLine: PROTO_CHART_COLORS.gridLine,
  axis: PROTO_CHART_COLORS.axis,
  sliceMuted: PROTO_CHART_COLORS.sliceMuted,
  sliceMid: PROTO_CHART_COLORS.sliceMid,
  donutCenter: PROTO_CHART_COLORS.donutCenter,
  label: "rgba(255, 255, 255, 0.72)",
  labelStrong: "#ffffff",
  labelMuted: "rgba(255, 255, 255, 0.55)",
} as const;
