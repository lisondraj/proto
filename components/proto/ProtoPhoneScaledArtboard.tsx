"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/** Inset from the shader card so the UI unit stays fully visible and centered. */
const FIT_PAD_PX = 20;
const FIT_SCALE = 0.9;

function getFitHost(node: HTMLElement): HTMLElement {
  return (
    (node.closest(".proto-feature-section__card") as HTMLElement | null) ??
    (node.closest(".proto-carousel-card") as HTMLElement | null) ??
    node
  );
}

function measureContentBounds(root: HTMLElement, fallbackWidth: number, fallbackHeight: number) {
  const articles = root.querySelectorAll<HTMLElement>("article");
  if (articles.length > 0) {
    let maxRight = 0;
    let maxBottom = 0;
    articles.forEach((card) => {
      maxRight = Math.max(maxRight, card.offsetLeft + card.offsetWidth);
      maxBottom = Math.max(maxBottom, card.offsetTop + card.offsetHeight);
    });
    return {
      width: Math.max(maxRight, fallbackWidth),
      height: Math.max(maxBottom, 1),
    };
  }

  const content = root.firstElementChild as HTMLElement | null;
  if (!content) {
    return { width: fallbackWidth, height: fallbackHeight };
  }

  return {
    width: Math.max(content.offsetWidth, content.scrollWidth, fallbackWidth),
    height: Math.max(content.offsetHeight, content.scrollHeight, 1),
  };
}

/**
 * /proto iPhone feature mocks — fixed artboard that scales as one unit to the
 * shader card, centered on both axes (same behavior as the first sandbox box).
 */
export function ProtoPhoneScaledArtboard({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const artboardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [bounds, setBounds] = useState({ width, height });

  useLayoutEffect(() => {
    const container = containerRef.current;
    const artboard = artboardRef.current;
    if (!container || !artboard) return;

    const host = getFitHost(container);

    const updateScale = () => {
      const nextBounds = measureContentBounds(artboard, width, height);
      setBounds(nextBounds);

      const fitWidth = Math.max(host.clientWidth - FIT_PAD_PX * 2, 1);
      const fitHeight = Math.max(host.clientHeight - FIT_PAD_PX * 2, 1);
      const nextScale =
        Math.min(fitWidth / nextBounds.width, fitHeight / nextBounds.height) * FIT_SCALE;
      setScale(nextScale > 0 ? nextScale : 0.5);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(host);
    observer.observe(artboard);
    if (host !== container) observer.observe(container);
    return () => observer.disconnect();
  }, [width, height]);

  const scaledWidth = bounds.width * scale;
  const scaledHeight = bounds.height * scale;

  return (
    <div
      ref={containerRef}
      className="flex h-full min-h-0 w-full items-center justify-center overflow-hidden"
    >
      <div
        className="relative shrink-0"
        style={{
          width: scaledWidth,
          height: scaledHeight,
        }}
      >
        <div
          ref={artboardRef}
          style={{
            width: bounds.width,
            height: bounds.height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
