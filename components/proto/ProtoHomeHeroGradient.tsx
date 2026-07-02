"use client";

import { GrainGradient } from "@paper-design/shaders-react";

import {
  PROTO_HOME_HERO_SHADER_COLOR_BACK,
  PROTO_HOME_HERO_SHADER_COLORS,
  PROTO_HOME_HERO_SHADER_INTENSITY,
  PROTO_HOME_HERO_SHADER_SHAPE,
  PROTO_HOME_HERO_SHADER_SOFTNESS,
  PROTO_HOME_HERO_SHADER_SPEED,
  PROTO_HOME_HERO_SHADER_WORLD_HEIGHT,
  PROTO_HOME_HERO_SHADER_WORLD_WIDTH,
} from "@/lib/proto/proto-home-hero-shader";

/** /proto home hero — animated wave gradient, no grain overlay or line grid. */
export function ProtoHomeHeroGradient() {
  return (
    <div
      className="proto-home-hero-gradient pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <GrainGradient
        width="100%"
        height="100%"
        fit="cover"
        worldWidth={PROTO_HOME_HERO_SHADER_WORLD_WIDTH}
        worldHeight={PROTO_HOME_HERO_SHADER_WORLD_HEIGHT}
        colors={[...PROTO_HOME_HERO_SHADER_COLORS]}
        colorBack={PROTO_HOME_HERO_SHADER_COLOR_BACK}
        softness={PROTO_HOME_HERO_SHADER_SOFTNESS}
        intensity={PROTO_HOME_HERO_SHADER_INTENSITY}
        noise={0}
        shape={PROTO_HOME_HERO_SHADER_SHAPE}
        speed={PROTO_HOME_HERO_SHADER_SPEED}
      />
    </div>
  );
}
