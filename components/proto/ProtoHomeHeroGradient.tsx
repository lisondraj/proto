"use client";

import { ProtoGrainGradient } from "@/components/proto/ProtoGrainGradient";
import { protoHomeHeroGrainGradientSurface } from "@/lib/proto/proto-grain-gradient";

/** /proto home hero — teal-sage sibling to integrate, animated wave, no grain overlay or line grid. */
export function ProtoHomeHeroGradient() {
  const surface = protoHomeHeroGrainGradientSurface();
  return (
    <ProtoGrainGradient
      variant={surface.variant}
      colors={surface.colors}
      colorBack={surface.colorBack}
    />
  );
}
