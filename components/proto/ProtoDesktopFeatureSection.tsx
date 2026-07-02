"use client";

import { ProtoDesktopPanelSection } from "@/components/proto/ProtoDesktopPanelSection";
import { ProtoFeatureSectionCopy } from "@/components/proto/ProtoFeatureSectionCopy";
import type { DoePhoneCommunicationSlide } from "@/lib/doephone/communication-carousel";
import type { ProtoFeatureCopy } from "@/lib/proto/proto-feature-copy";
import {
  PROTO_DESKTOP_FEATURE_BAND_H,
  PROTO_DESKTOP_FEATURE_PANEL_SIZE,
  PROTO_DESKTOP_FEATURE_SECTION_PAD,
  PROTO_DESKTOP_FEATURE_SPLIT_GAP,
  PROTO_DESKTOP_PAGE_INSET_X,
} from "@/lib/proto/proto-desktop-layout-styles";
import {
  protoCommunicationGradient,
  protoCommunicationGrid,
} from "@/lib/proto/proto-communication-gradients";
import {
  protoFeatureRevealClass,
  useProtoFeatureScrollReveal,
} from "@/lib/proto/use-proto-feature-scroll-reveal";

function FeaturePanel({
  slide,
  revealed,
}: {
  slide: DoePhoneCommunicationSlide;
  revealed: boolean;
}) {
  return (
    <div
      className={`proto-desktop-feature__panel aspect-square ${PROTO_DESKTOP_FEATURE_PANEL_SIZE} ${protoFeatureRevealClass(revealed, "title")}`}
    >
      <ProtoDesktopPanelSection
        slide={slide}
        gradientOverride={protoCommunicationGradient(slide.id)}
        gridOverride={protoCommunicationGrid(slide.id)}
      />
    </div>
  );
}

function FeatureCopy({ copy, revealed }: { copy: ProtoFeatureCopy; revealed: boolean }) {
  return (
    <div className="proto-desktop-feature__copy flex min-w-0 flex-1 flex-col justify-center">
      <ProtoFeatureSectionCopy copy={copy} layout="desktop" revealed={revealed} />
    </div>
  );
}

/** Desktop /proto — one feature slide: square gradient panel beside title/description copy. */
export function ProtoDesktopFeatureSection({
  slide,
  copy,
  index,
}: {
  slide: DoePhoneCommunicationSlide;
  copy: ProtoFeatureCopy;
  /** Feature band index — section 2 (index 0) places the panel on the left, then alternates. */
  index: number;
}) {
  const boxOnLeft = index % 2 === 0;
  const { ref, revealed } = useProtoFeatureScrollReveal(0.18);

  return (
    <section
      ref={ref}
      className={`proto-desktop-feature proto-section-band flex w-full flex-col bg-[#151c1f] ${PROTO_DESKTOP_FEATURE_BAND_H}`}
      aria-label={slide.menuLabel}
    >
      <div
        className={`flex h-full min-h-0 flex-1 items-center ${PROTO_DESKTOP_FEATURE_SPLIT_GAP} ${PROTO_DESKTOP_PAGE_INSET_X} ${PROTO_DESKTOP_FEATURE_SECTION_PAD}`}
      >
        {boxOnLeft ? (
          <>
            <FeaturePanel slide={slide} revealed={revealed} />
            <FeatureCopy copy={copy} revealed={revealed} />
          </>
        ) : (
          <>
            <FeatureCopy copy={copy} revealed={revealed} />
            <FeaturePanel slide={slide} revealed={revealed} />
          </>
        )}
      </div>
    </section>
  );
}
