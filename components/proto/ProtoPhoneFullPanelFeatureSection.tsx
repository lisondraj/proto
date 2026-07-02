"use client";

import { DoePhoneCommunicationCarouselCard } from "@/components/doephone/DoePhoneCommunicationCarouselCard";
import type { DoePhoneCommunicationSlide } from "@/lib/doephone/communication-carousel";
import { DOEPHONE_SECTION_CAROUSEL_INSET_X } from "@/lib/doephone/section-styles";
import { protoCommunicationGradient, protoCommunicationGrid } from "@/lib/proto/proto-communication-gradients";

/** iPhone /proto — full-viewport gradient card band (no title/description copy). */
export function ProtoPhoneFullPanelFeatureSection({
  slide,
}: {
  slide: DoePhoneCommunicationSlide;
}) {
  return (
    <section
      className="proto-feature-section proto-feature-section--full-panel proto-section-band"
      aria-label={slide.menuLabel}
    >
      <div className={`${DOEPHONE_SECTION_CAROUSEL_INSET_X} proto-feature-section__inner proto-feature-section__inner--full-panel`}>
        <div className="proto-feature-section__card proto-feature-section__card--full-panel w-full min-h-0">
          <DoePhoneCommunicationCarouselCard
            slide={slide}
            isActive
            layout="phone"
            showExpandControls={false}
            gradientOverride={protoCommunicationGradient(slide.id)}
            gridOverride={protoCommunicationGrid(slide.id)}
          />
        </div>
      </div>
    </section>
  );
}
