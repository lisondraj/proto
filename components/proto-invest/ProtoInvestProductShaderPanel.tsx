"use client";

import { ProtoGrainGradient } from "@/components/proto/ProtoGrainGradient";
import { PROTO_INVEST_PRODUCT_HEADLINE_LINES } from "@/lib/proto-invest/proto-invest-content";
import {
  PROTO_INVEST_PRODUCT_PANEL_TITLE_TW,
  PROTO_INVEST_PRODUCT_PANEL_TITLE_WRAP,
  PROTO_INVEST_PRODUCT_SHADER_PANEL_TW,
} from "@/lib/proto-invest/proto-invest-layout-styles";

/** iPhone /about — Meet Proto panel with animated proto shader and section title. */
export function ProtoInvestProductShaderPanel({
  className = PROTO_INVEST_PRODUCT_SHADER_PANEL_TW,
}: {
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <ProtoGrainGradient variant="meet-proto" />
      <div className={PROTO_INVEST_PRODUCT_PANEL_TITLE_WRAP}>
        <h2 className={PROTO_INVEST_PRODUCT_PANEL_TITLE_TW}>
          <span className="block">{PROTO_INVEST_PRODUCT_HEADLINE_LINES[0]}</span>
          <span className="block">{PROTO_INVEST_PRODUCT_HEADLINE_LINES[1]}</span>
        </h2>
      </div>
    </div>
  );
}
