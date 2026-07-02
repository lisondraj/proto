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
  type ProtoGrainGradientVariant,
} from "@/lib/proto/proto-grain-gradient";

function isHeroVariant(variant: ProtoGrainGradientVariant) {
  return variant === "home-hero" || variant === "about-hero";
}

/** /proto — mounts near viewport, animates when visible, full resolution (default 2× DPR). */
export const ProtoGrainGradient = memo(function ProtoGrainGradient({
  variant,
  className = "",
}: {
  variant: ProtoGrainGradientVariant;
  className?: string;
}) {
  const preset = PROTO_GRAIN_GRADIENT_PRESETS[variant];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const hero = isHeroVariant(variant);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const sync = () => setTabVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const mountObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsMounted(true);
      },
      { rootMargin: hero ? "25% 0px" : "50% 0px", threshold: 0 },
    );

    const unmountObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setIsMounted(false);
      },
      { rootMargin: "-35% 0px", threshold: 0 },
    );

    const animateObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "15% 0px", threshold: 0 },
    );

    mountObserver.observe(node);
    unmountObserver.observe(node);
    animateObserver.observe(node);

    return () => {
      mountObserver.disconnect();
      unmountObserver.disconnect();
      animateObserver.disconnect();
    };
  }, [hero]);

  const targetSpeed = preset.speed ?? PROTO_GRAIN_GRADIENT_SPEED;
  const shouldAnimate = !reducedMotion && targetSpeed > 0 && isVisible && tabVisible && isMounted;

  return (
    <div
      ref={containerRef}
      className={`proto-shader-surface pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      style={{ backgroundColor: PROTO_GRAIN_GRADIENT_COLOR_BACK }}
      aria-hidden
    >
      {isMounted ? (
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
          maxPixelCount={hero ? PROTO_SHADER_MAX_PIXEL_COUNT_HERO : PROTO_SHADER_MAX_PIXEL_COUNT_FEATURE}
        />
      ) : null}
    </div>
  );
});
