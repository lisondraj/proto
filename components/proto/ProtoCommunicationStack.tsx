"use client";

import { DoePhoneCommunicationCarouselCard } from "@/components/doephone/DoePhoneCommunicationCarouselCard";
import { ProtoFeatureSectionCopy } from "@/components/proto/ProtoFeatureSectionCopy";
import { PROTO_COMMUNICATION_SLIDES } from "@/lib/proto/proto-communication-slides";
import { protoFeatureCopy } from "@/lib/proto/proto-feature-copy";
import { protoCommunicationGradient, protoCommunicationGrid, protoCommunicationLineOpacity } from "@/lib/proto/proto-communication-gradients";
import {
  PROTO_HERO_BACKDROP,
  PROTO_PHONE_BACKDROP_GRADIENT_SCALE,
  PROTO_PHONE_BACKDROP_GRAIN_SIZE,
  PROTO_PHONE_BACKDROP_PATTERN_SCALE,
  PROTO_PHONE_GRAIN_BG,
} from "@/lib/proto/proto-hero-backdrop";

/** /proto iPhone — feature slides stacked vertically: box, title, description per section. */
export function ProtoCommunicationStack() {
  return (
    <>
      {PROTO_COMMUNICATION_SLIDES.map((slide) => {
        const copy = protoFeatureCopy(slide.id);
        if (!copy) return null;

        return (
          <section
            key={slide.id}
            className="proto-feature-section proto-section-band"
            aria-label={slide.menuLabel}
          >
            <div className="proto-feature-section__inner">
              <div className="proto-feature-section__stack w-full min-h-0">
                <div className="proto-feature-section__card w-full min-h-0">
                  <DoePhoneCommunicationCarouselCard
                    slide={slide}
                    isActive
                    layout="phone"
                    className="proto-carousel-card"
                    showExpandControls={false}
                    uiInteractive={false}
                    gradientOverride={protoCommunicationGradient(slide.id)}
                    gridOverride={protoCommunicationGrid(slide.id)}
                    backdropLineOverlayOpacity={protoCommunicationLineOpacity(slide.id)}
                    backdropPatternScale={PROTO_PHONE_BACKDROP_PATTERN_SCALE}
                    backdropGradientScale={PROTO_PHONE_BACKDROP_GRADIENT_SCALE}
                    backdropGrainSize={PROTO_PHONE_BACKDROP_GRAIN_SIZE}
                    backdropGrainImage={PROTO_PHONE_GRAIN_BG}
                    uiScaleClass="proto-carousel-ui-scale"
                  />
                </div>
                <ProtoFeatureSectionCopy copy={copy} />
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
