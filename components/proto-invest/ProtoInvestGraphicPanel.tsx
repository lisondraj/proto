"use client";

import { JoinInternLineGraphic } from "@/components/join/JoinInternLineGraphic";
import { PROTO_INVEST_GRAPHIC_PANEL_TW } from "@/lib/proto-invest/proto-invest-layout-styles";

/** Dark proto panel with orange line graphic (replaces beige /about bands). */
export function ProtoInvestGraphicPanel({
  graphic,
  className = PROTO_INVEST_GRAPHIC_PANEL_TW,
}: {
  graphic: 0 | 1 | 2 | 3;
  className?: string;
}) {
  return (
    <div className={className} aria-hidden>
      <JoinInternLineGraphic variant={graphic} onOrange />
    </div>
  );
}
