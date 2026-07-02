"use client";

import { ProtoDesktopPanelSection } from "@/components/proto/ProtoDesktopPanelSection";
import { ProtoFeatureSectionCopy } from "@/components/proto/ProtoFeatureSectionCopy";
import type { DoePhoneCommunicationSlide } from "@/lib/doephone/communication-carousel";
import type { ProtoFeatureCopy } from "@/lib/proto/proto-feature-copy";
import {
  PROTO_DESKTOP_FEATURE_BAND_H,
  PROTO_DESKTOP_FEATURE_PANEL_SIZE,
  PROTO_DESKTOP_SPLIT_BOX_COLUMN_LEFT,
  PROTO_DESKTOP_SPLIT_BOX_COLUMN_RIGHT,
  PROTO_DESKTOP_SPLIT_SECTION_GRID,
  PROTO_DESKTOP_SPLIT_TEXT_COLUMN,
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
      className={`proto-desktop-feature__panel ${PROTO_DESKTOP_FEATURE_PANEL_SIZE} ${protoFeatureRevealClass(revealed, "title")}`}
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
    <div className="proto-desktop-feature__copy w-full min-w-0">
      <ProtoFeatureSectionCopy copy={copy} layout="desktop" revealed={revealed} />
    </div>
  );
}

/** Desktop /proto — one feature slide: square gradient panel beside title/description copy. */
export function ProtoDesktopFeatureSection({
  slide,
  copy,
  boxOnLeft,
}: {
  slide: DoePhoneCommunicationSlide;
  copy: ProtoFeatureCopy;
  boxOnLeft: boolean;
}) {
  const { ref, revealed } = useProtoFeatureScrollReveal(0.18);

  const boxColumnClass = boxOnLeft
    ? PROTO_DESKTOP_SPLIT_BOX_COLUMN_LEFT
    : PROTO_DESKTOP_SPLIT_BOX_COLUMN_RIGHT;

  const textColumn = (
    <div className={PROTO_DESKTOP_SPLIT_TEXT_COLUMN}>
      <FeatureCopy copy={copy} revealed={revealed} />
    </div>
  );

  const boxColumn = (
    <div className={boxColumnClass}>
      <FeaturePanel slide={slide} revealed={revealed} />
    </div>
  );

  return (
    <section
      ref={ref}
      className={`proto-desktop-feature proto-desktop-feature--split flex w-full flex-col bg-[#151c1f] ${PROTO_DESKTOP_FEATURE_BAND_H}`}
      aria-label={slide.menuLabel}
    >
      <div className={PROTO_DESKTOP_SPLIT_SECTION_GRID}>
        {boxOnLeft ? (
          <>
            {boxColumn}
            {textColumn}
          </>
        ) : (
          <>
            {textColumn}
            {boxColumn}
          </>
        )}
      </div>
    </section>
  );
}
