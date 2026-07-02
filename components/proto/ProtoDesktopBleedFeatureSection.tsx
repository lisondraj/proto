"use client";

import { ProtoDesktopPanelSection } from "@/components/proto/ProtoDesktopPanelSection";
import type { DoePhoneCommunicationSlide } from "@/lib/doephone/communication-carousel";
import { PROTO_DESKTOP_FEATURE_BAND_H } from "@/lib/proto/proto-desktop-layout-styles";
import {
  protoCommunicationGradient,
  protoCommunicationGrid,
} from "@/lib/proto/proto-communication-gradients";
import {
  protoFeatureRevealClass,
  useProtoFeatureScrollReveal,
} from "@/lib/proto/use-proto-feature-scroll-reveal";

/** Desktop /proto — full-height gradient panel flush to one viewport edge (no copy). */
export function ProtoDesktopBleedFeatureSection({
  slide,
  boxSide,
}: {
  slide: DoePhoneCommunicationSlide;
  boxSide: "left" | "right";
}) {
  const { ref, revealed } = useProtoFeatureScrollReveal(0.18);
  const bleedRight = boxSide === "right";

  return (
    <section
      ref={ref}
      className={`proto-desktop-feature proto-desktop-feature--bleed-only flex w-full flex-col bg-[#151c1f] ${PROTO_DESKTOP_FEATURE_BAND_H}`}
      aria-label={slide.menuLabel}
    >
      <div
        className={`flex h-full min-h-0 w-full flex-1 ${bleedRight ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`proto-desktop-feature__panel proto-desktop-feature__panel--bleed h-full w-auto max-w-full aspect-square ${protoFeatureRevealClass(revealed, "title")} ${
            bleedRight
              ? "proto-desktop-feature__panel--bleed-right"
              : "proto-desktop-feature__panel--bleed-left"
          }`}
        >
          <ProtoDesktopPanelSection
            slide={slide}
            gradientOverride={protoCommunicationGradient(slide.id)}
            gridOverride={protoCommunicationGrid(slide.id)}
            bleedEdge={boxSide}
          />
        </div>
      </div>
    </section>
  );
}
