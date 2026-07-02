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
}: {
  slide: DoePhoneCommunicationSlide;
  gradientOverride?: string;
  gridOverride?: WorkflowCarouselGridKind;
}) {
  return (
    <div
      className={`relative isolate h-full w-full overflow-hidden border border-[#2A3538] shadow-[0_10px_32px_rgba(0,0,0,0.28)] ${DOEPHONE_SECTION_CAROUSEL_RADIUS}`}
      style={DOEPHONE_SECTION_CAROUSEL_CLIP_STYLE}
    >
      <WorkflowCarouselDesignBackdrop
        backdrop={slide.backdrop}
        embedded
        className={DOEPHONE_SECTION_CAROUSEL_RADIUS}
        gradientOverride={gradientOverride}
        gridOverride={gridOverride}
      />

      <div className="absolute inset-0 z-[15] flex items-center justify-center px-[clamp(1.25rem,2.5vw,2.5rem)]">
        <DoePhoneCommunicationSlideVisual slideId={slide.id} layout="desktop" />
      </div>
    </div>
  );
}
