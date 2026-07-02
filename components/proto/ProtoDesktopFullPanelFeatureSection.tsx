"use client";

import { ProtoDesktopPanelSection } from "@/components/proto/ProtoDesktopPanelSection";
import type { DoePhoneCommunicationSlide } from "@/lib/doephone/communication-carousel";
import {
  PROTO_DESKTOP_FULL_PANEL_BAND_H,
  PROTO_DESKTOP_FULL_PANEL_SHELL_TW,
  PROTO_DESKTOP_FEATURE_PANEL_FULL_TW,
} from "@/lib/proto/proto-desktop-layout-styles";
import {
  protoCommunicationGradient,
  protoCommunicationGrid,
} from "@/lib/proto/proto-communication-gradients";
import {
  protoFeatureRevealClass,
  useProtoFeatureScrollReveal,
} from "@/lib/proto/use-proto-feature-scroll-reveal";

/** Desktop /proto — full-height gradient panel spanning between page margins (no copy). */
export function ProtoDesktopFullPanelFeatureSection({
  slide,
}: {
  slide: DoePhoneCommunicationSlide;
}) {
  const { ref, revealed } = useProtoFeatureScrollReveal(0.18);

  return (
    <section
      ref={ref}
      className={`proto-desktop-feature proto-desktop-feature--full-panel flex w-full flex-col bg-[#151c1f] ${PROTO_DESKTOP_FULL_PANEL_BAND_H}`}
      aria-label={slide.menuLabel}
    >
      <div className={PROTO_DESKTOP_FULL_PANEL_SHELL_TW}>
        <div
          className={`proto-desktop-feature__panel proto-desktop-feature__panel--full ${PROTO_DESKTOP_FEATURE_PANEL_FULL_TW} ${protoFeatureRevealClass(revealed, "title")}`}
        >
          <ProtoDesktopPanelSection
            slide={slide}
            gradientOverride={protoCommunicationGradient(slide.id)}
            gridOverride={protoCommunicationGrid(slide.id)}
          />
        </div>
      </div>
    </section>
  );
}
