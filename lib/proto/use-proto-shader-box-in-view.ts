"use client";

import { useEffect, useRef, useState } from "react";

function shaderBoxHost(node: HTMLElement) {
  return (
    (node.closest(".proto-feature-section__card") as HTMLElement | null) ??
    (node.closest(".proto-carousel-card") as HTMLElement | null) ??
    node
  );
}

/** True while the shader feature card intersects the viewport — pauses off-screen motion. */
export function useProtoShaderBoxInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setInView(true);
      return;
    }

    const host = shaderBoxHost(el);
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { rootMargin: "12% 0px", threshold },
    );

    obs.observe(host);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}
