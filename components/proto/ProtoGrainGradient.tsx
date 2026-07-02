"use client";

import { GrainGradient } from "@paper-design/shaders-react";

import {
  PROTO_GRAIN_GRADIENT_COLOR_BACK,
  PROTO_GRAIN_GRADIENT_COLORS,
  PROTO_GRAIN_GRADIENT_PRESETS,
  PROTO_GRAIN_GRADIENT_SPEED,
  PROTO_GRAIN_GRADIENT_WORLD_HEIGHT,
  PROTO_GRAIN_GRADIENT_WORLD_WIDTH,
  type ProtoGrainGradientVariant,
} from "@/lib/proto/proto-grain-gradient";

/** /proto — Paper GrainGradient surface with shared palette and per-box flow. */
export function ProtoGrainGradient({
  variant,
  className = "",
}: {
  variant: ProtoGrainGradientVariant;
  className?: string;
}) {
  const preset = PROTO_GRAIN_GRADIENT_PRESETS[variant];

  return (
    <div
      className={`proto-grain-gradient pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      aria-hidden
    >
      <GrainGradient
        width="100%"
        height="100%"
        fit={preset.fit ?? "cover"}
        worldWidth={preset.worldWidth ?? PROTO_GRAIN_GRADIENT_WORLD_WIDTH}
        worldHeight={preset.worldHeight ?? PROTO_GRAIN_GRADIENT_WORLD_HEIGHT}
        colors={[...PROTO_GRAIN_GRADIENT_COLORS]}
        colorBack={PROTO_GRAIN_GRADIENT_COLOR_BACK}
        softness={preset.softness}
        intensity={preset.intensity}
        noise={0}
        shape={preset.shape}
        speed={preset.speed ?? PROTO_GRAIN_GRADIENT_SPEED}
        rotation={preset.rotation}
        offsetX={preset.offsetX}
        offsetY={preset.offsetY}
        scale={preset.scale}
      />
    </div>
  );
}
