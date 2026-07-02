"use client";

import { ProtoDesktopPanelSection } from "@/components/proto/ProtoDesktopPanelSection";
import { ProtoFeatureSectionCopy } from "@/components/proto/ProtoFeatureSectionCopy";
import type { DoePhoneCommunicationSlide } from "@/lib/doephone/communication-carousel";
import type { ProtoFeatureCopy } from "@/lib/proto/proto-feature-copy";
import {
  PROTO_DESKTOP_CONTENT_MAX_W,
  PROTO_DESKTOP_FEATURE_BAND_H,
  PROTO_DESKTOP_FEATURE_COPY_COL_TW,
  PROTO_DESKTOP_FEATURE_PANEL_BLEED_TW,
  PROTO_DESKTOP_FEATURE_PANEL_SIZE,
  PROTO_DESKTOP_FEATURE_SECTION_PAD,
  PROTO_DESKTOP_FEATURE_SPLIT_GAP,
  PROTO_DESKTOP_PAGE_INSET_X,
  PROTO_DESKTOP_SPLIT_BOX_COLUMN,
  PROTO_DESKTOP_SPLIT_BOX_COLUMN_LEFT_BLEED,
  PROTO_DESKTOP_SPLIT_BOX_COLUMN_RIGHT_BLEED,
  PROTO_DESKTOP_SPLIT_SECTION_GRID_BLEED,
  PROTO_DESKTOP_SPLIT_TEXT_COLUMN_LEFT_BLEED,
  PROTO_DESKTOP_SPLIT_TEXT_COLUMN_RIGHT_BLEED,
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
  bleedEdge,
}: {
  slide: DoePhoneCommunicationSlide;
  revealed: boolean;
  bleedEdge?: "left" | "right";
}) {
  const panelSizeClass = bleedEdge
    ? PROTO_DESKTOP_FEATURE_PANEL_BLEED_TW
    : PROTO_DESKTOP_FEATURE_PANEL_SIZE;

  return (
    <div
      className={`proto-desktop-feature__panel ${bleedEdge ? "proto-desktop-feature__panel--bleed" : ""} ${bleedEdge === "right" ? "proto-desktop-feature__panel--bleed-right" : ""} ${bleedEdge === "left" ? "proto-desktop-feature__panel--bleed-left" : ""} ${panelSizeClass} ${protoFeatureRevealClass(revealed, "title")}`}
    >
      <ProtoDesktopPanelSection
        slide={slide}
        gradientOverride={protoCommunicationGradient(slide.id)}
        gridOverride={protoCommunicationGrid(slide.id)}
        bleedEdge={bleedEdge}
      />
    </div>
  );
}

function FeatureCopy({ copy, revealed }: { copy: ProtoFeatureCopy; revealed: boolean }) {
  return (
    <div className={`proto-desktop-feature__copy w-full min-w-0 ${PROTO_DESKTOP_FEATURE_COPY_COL_TW}`}>
      <ProtoFeatureSectionCopy copy={copy} layout="desktop" revealed={revealed} />
    </div>
  );
}

/** Desktop /proto — one feature slide: square gradient panel beside title/description copy. */
export function ProtoDesktopFeatureSection({
  slide,
  copy,
  boxOnLeft,
  boxBleedToMargin = false,
}: {
  slide: DoePhoneCommunicationSlide;
  copy: ProtoFeatureCopy;
  boxOnLeft: boolean;
  boxBleedToMargin?: boolean;
}) {
  const { ref, revealed } = useProtoFeatureScrollReveal(0.18);

  if (boxBleedToMargin) {
    const textColumnClass = boxOnLeft
      ? PROTO_DESKTOP_SPLIT_TEXT_COLUMN_RIGHT_BLEED
      : PROTO_DESKTOP_SPLIT_TEXT_COLUMN_LEFT_BLEED;
    const boxColumnClass = boxOnLeft
      ? PROTO_DESKTOP_SPLIT_BOX_COLUMN_LEFT_BLEED
      : PROTO_DESKTOP_SPLIT_BOX_COLUMN_RIGHT_BLEED;
    const bleedEdge = boxOnLeft ? "left" : "right";

    const textColumn = <FeatureCopy copy={copy} revealed={revealed} />;
    const boxColumn = (
      <div className={boxColumnClass}>
        <FeaturePanel slide={slide} revealed={revealed} bleedEdge={bleedEdge} />
      </div>
    );

    return (
      <section
        ref={ref}
        className={`proto-desktop-feature proto-desktop-feature--split proto-desktop-feature--bleed flex w-full flex-col bg-[#151c1f] ${PROTO_DESKTOP_FEATURE_BAND_H}`}
        aria-label={slide.menuLabel}
      >
        <div className={PROTO_DESKTOP_SPLIT_SECTION_GRID_BLEED}>
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

  const panelColumn = (
    <div className={PROTO_DESKTOP_SPLIT_BOX_COLUMN}>
      <FeaturePanel slide={slide} revealed={revealed} />
    </div>
  );

  const copyColumn = <FeatureCopy copy={copy} revealed={revealed} />;

  return (
    <section
      ref={ref}
      className={`proto-desktop-feature proto-desktop-feature--split flex w-full flex-col bg-[#151c1f] ${PROTO_DESKTOP_FEATURE_BAND_H}`}
      aria-label={slide.menuLabel}
    >
      <div className={`flex h-full min-h-0 flex-1 ${PROTO_DESKTOP_PAGE_INSET_X} ${PROTO_DESKTOP_FEATURE_SECTION_PAD}`}>
        <div
          className={`proto-desktop-feature__inner grid h-full min-h-0 w-full grid-cols-2 items-center ${PROTO_DESKTOP_FEATURE_SPLIT_GAP} ${PROTO_DESKTOP_CONTENT_MAX_W}`}
        >
          {boxOnLeft ? (
            <>
              {panelColumn}
              {copyColumn}
            </>
          ) : (
            <>
              {copyColumn}
              {panelColumn}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
