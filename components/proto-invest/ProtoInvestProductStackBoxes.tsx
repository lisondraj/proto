"use client";

import { ProtoGrainGradient } from "@/components/proto/ProtoGrainGradient";
import {
  PROTO_INVEST_PRODUCT_STACK_PALETTE_SLIDES,
  protoFeatureShaderSurface,
} from "@/lib/proto/proto-feature-palettes";
import { PROTO_INVEST_PRODUCT_STACK_SHADER_BOX_TW } from "@/lib/proto-invest/proto-invest-layout-styles";

const PRODUCT_STACK_SHADER_VARIANTS = [
  "meet-proto-stack-0",
  "meet-proto-stack-1",
  "meet-proto-stack-2",
] as const;

/** iPhone /about — static shader panels under the Meet Proto hero box. */
export function ProtoInvestProductStackBoxes() {
  return (
    <>
      {PRODUCT_STACK_SHADER_VARIANTS.map((variant, index) => {
        const surface = protoFeatureShaderSurface(PROTO_INVEST_PRODUCT_STACK_PALETTE_SLIDES[index]!);
        return (
          <div key={variant} className={PROTO_INVEST_PRODUCT_STACK_SHADER_BOX_TW} aria-hidden>
            <ProtoGrainGradient
              variant={variant}
              static
              colors={surface.colors}
              colorBack={surface.colorBack}
            />
          </div>
        );
      })}
    </>
  );
}
