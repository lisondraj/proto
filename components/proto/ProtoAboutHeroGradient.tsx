"use client";

import { ProtoGrainGradient } from "@/components/proto/ProtoGrainGradient";
import { protoAboutHeroGrainGradientSurface } from "@/lib/proto/proto-grain-gradient";

/** /about hero — home hero palette with animated wave flow. */
export function ProtoAboutHeroGradient() {
  const surface = protoAboutHeroGrainGradientSurface();
  return (
    <ProtoGrainGradient
      variant={surface.variant}
      colors={surface.colors}
      colorBack={surface.colorBack}
    />
  );
}
