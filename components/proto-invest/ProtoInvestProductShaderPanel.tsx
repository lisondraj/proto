"use client";

import { ProtoGrainGradient } from "@/components/proto/ProtoGrainGradient";
import { PROTO_INVEST_PRODUCT_SHADER_PANEL_TW } from "@/lib/proto-invest/proto-invest-layout-styles";

/** iPhone /about — Meet Proto panel with animated proto shader. */
export function ProtoInvestProductShaderPanel({
  className = PROTO_INVEST_PRODUCT_SHADER_PANEL_TW,
}: {
  className?: string;
}) {
  return (
    <div className={className} aria-hidden>
      <ProtoGrainGradient variant="meet-proto" />
    </div>
  );
}
