"use client";

import { DoePhoneCommunicationSlideVisual } from "@/components/doephone/DoePhoneCommunicationSlideVisual";
import { ProtoGrainGradient } from "@/components/proto/ProtoGrainGradient";
import type { DoePhoneCommunicationSlide } from "@/lib/doephone/communication-carousel";
import {
  DOEPHONE_SECTION_CAROUSEL_CLIP_STYLE,
  DOEPHONE_SECTION_CAROUSEL_RADIUS,
} from "@/lib/doephone/section-styles";
import { protoGrainGradientVariant } from "@/lib/proto/proto-grain-gradient";

/** Desktop /proto — square gradient panel with centered slide UI. */
export function ProtoDesktopPanelSection({
  slide,
  bleedEdge,
  shaderStatic,
}: {
  slide: DoePhoneCommunicationSlide;
  /** Edge-bleed band — square flush to viewport; round only the inner corners. */
  bleedEdge?: "left" | "right";
  /** Desktop full-panel bands — static shader (no motion). */
  shaderStatic?: boolean;
}) {
  const shaderVariant = protoGrainGradientVariant(slide.id);

  const radiusClass =
    bleedEdge === "left"
      ? "rounded-none rounded-r-[0.875rem]"
      : bleedEdge === "right"
        ? "rounded-none rounded-l-[0.875rem]"
        : DOEPHONE_SECTION_CAROUSEL_RADIUS;

  const borderClass =
    bleedEdge === "left"
      ? "border border-[#2A3538] border-l-0"
      : bleedEdge === "right"
        ? "border border-[#2A3538] border-r-0"
        : "border border-[#2A3538]";

  return (
    <div
      className={`relative isolate h-full w-full min-h-0 overflow-hidden shadow-[0_10px_32px_rgba(0,0,0,0.28)] ${radiusClass} ${borderClass}`}
      style={DOEPHONE_SECTION_CAROUSEL_CLIP_STYLE}
    >
      {shaderVariant ? (
        <ProtoGrainGradient variant={shaderVariant} className={radiusClass} static={shaderStatic} />
      ) : null}

      <div className="proto-feature-box-ui absolute inset-0 z-[15] flex items-center justify-center px-[clamp(1.25rem,2.5vw,2.5rem)]">
        <DoePhoneCommunicationSlideVisual slideId={slide.id} layout="desktop" protoSite />
      </div>
    </div>
  );
}
