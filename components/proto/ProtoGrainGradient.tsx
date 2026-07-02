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
  type ProtoGrainGradientVariant,
} from "@/lib/proto/proto-grain-gradient";

function isHeroVariant(variant: ProtoGrainGradientVariant) {
  return variant === "home-hero" || variant === "about-hero";
}

/** /proto — Paper GrainGradient; heroes animate when visible, feature bands stay static. */
export const ProtoGrainGradient = memo(function ProtoGrainGradient({
  variant,
  className = "",
}: {
  variant: ProtoGrainGradientVariant;
  className?: string;
}) {
  const preset = PROTO_GRAIN_GRADIENT_PRESETS[variant];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isHeroVariant(variant)) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "20% 0px", threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [variant]);

  const targetSpeed = preset.speed ?? PROTO_GRAIN_GRADIENT_SPEED;
  const shouldAnimate =
    !reducedMotion &&
    targetSpeed > 0 &&
    (isHeroVariant(variant) ? isVisible : false);

  return (
    <div
      ref={containerRef}
      className={`proto-shader-surface pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      style={{ backgroundColor: PROTO_GRAIN_GRADIENT_COLOR_BACK }}
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
        speed={shouldAnimate ? targetSpeed : 0}
        rotation={preset.rotation}
        offsetX={preset.offsetX}
        offsetY={preset.offsetY}
        scale={preset.scale}
      />
    </div>
  );
});
