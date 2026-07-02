"use client";

import { DoePhoneCommunicationSlideVisual } from "@/components/doephone/DoePhoneCommunicationSlideVisual";
import { WorkflowCarouselDesignBackdrop } from "@/components/workflow-carousel-design-backdrop";
import type { DoePhoneCommunicationSlide } from "@/lib/doephone/communication-carousel";
import {
  DOEPHONE_SECTION_CAROUSEL_CLIP_STYLE,
  DOEPHONE_SECTION_CAROUSEL_RADIUS,
} from "@/lib/doephone/section-styles";
import type { WorkflowCarouselGridKind } from "@/lib/workflow-carousel-design-backdrops";

/** Desktop /proto — square gradient panel with centered slide UI. */
export function ProtoDesktopPanelSection({
  slide,
  gradientOverride,
  gridOverride,
  bleedEdge,
}: {
  slide: DoePhoneCommunicationSlide;
  gradientOverride?: string;
  gridOverride?: WorkflowCarouselGridKind;
  /** Edge-bleed band — square flush to viewport; round only the inner corners. */
  bleedEdge?: "left" | "right";
}) {
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
      className={`relative isolate h-full w-full overflow-hidden shadow-[0_10px_32px_rgba(0,0,0,0.28)] ${radiusClass} ${borderClass}`}
      style={DOEPHONE_SECTION_CAROUSEL_CLIP_STYLE}
    >
      <WorkflowCarouselDesignBackdrop
        backdrop={slide.backdrop}
        embedded
        className={radiusClass}
        gradientOverride={gradientOverride}
        gridOverride={gridOverride}
      />

      <div className="proto-feature-box-ui absolute inset-0 z-[15] flex items-center justify-center px-[clamp(1.25rem,2.5vw,2.5rem)]">
        <DoePhoneCommunicationSlideVisual slideId={slide.id} layout="desktop" />
      </div>
    </div>
  );
}
