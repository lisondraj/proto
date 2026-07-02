"use client";

import { GrainGradient } from "@paper-design/shaders-react";
import { memo, useEffect, useRef, useState } from "react";

import {
  PROTO_GRAIN_GRADIENT_COLOR_BACK,
  PROTO_GRAIN_GRADIENT_COLORS,
  PROTO_GRAIN_GRADIENT_PRESETS,
  PROTO_GRAIN_GRADIENT_SPEED,
  PROTO_GRAIN_GRADIENT_WORLD_HEIGHT,
  PROTO_GRAIN_GRADIENT_WORLD_WIDTH,
  PROTO_SHADER_MAX_PIXEL_COUNT_FEATURE,
  PROTO_SHADER_MAX_PIXEL_COUNT_HERO,
  PROTO_SHADER_MIN_PIXEL_RATIO,
  type ProtoGrainGradientVariant,
} from "@/lib/proto/proto-grain-gradient";

function isHeroVariant(variant: ProtoGrainGradientVariant) {
  return variant === "home-hero" || variant === "about-hero";
}

/** /proto — Paper GrainGradient; mounts near viewport, static unless hero + visible. */
export const ProtoGrainGradient = memo(function ProtoGrainGradient({
  variant,
  className = "",
}: {
  variant: ProtoGrainGradientVariant;
  className?: string;
}) {
  const preset = PROTO_GRAIN_GRADIENT_PRESETS[variant];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: "80% 0px", threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const targetSpeed = preset.speed ?? PROTO_GRAIN_GRADIENT_SPEED;
  const shouldAnimate =
    isNearViewport && !reducedMotion && isHeroVariant(variant) && targetSpeed > 0;

  return (
    <div
      ref={containerRef}
      className={`proto-shader-surface pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      style={{ backgroundColor: PROTO_GRAIN_GRADIENT_COLOR_BACK }}
      aria-hidden
    >
      {isNearViewport ? (
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
          speed={shouldAnimate ? targetSpeed : 0}
          rotation={preset.rotation}
          offsetX={preset.offsetX}
          offsetY={preset.offsetY}
          scale={preset.scale}
          minPixelRatio={PROTO_SHADER_MIN_PIXEL_RATIO}
          maxPixelCount={
            isHeroVariant(variant)
              ? PROTO_SHADER_MAX_PIXEL_COUNT_HERO
              : PROTO_SHADER_MAX_PIXEL_COUNT_FEATURE
          }
        />
      ) : null}
    </div>
  );
});
