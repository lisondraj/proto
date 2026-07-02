"use client";

import { ProtoDesktopFeatureSection } from "@/components/proto/ProtoDesktopFeatureSection";
import { ProtoDesktopFullPanelFeatureSection } from "@/components/proto/ProtoDesktopFullPanelFeatureSection";
import { PROTO_COMMUNICATION_SLIDES } from "@/lib/proto/proto-communication-slides";
import { protoFeatureCopy } from "@/lib/proto/proto-feature-copy";
import { protoFeatureSectionLayout } from "@/lib/proto/proto-feature-section-layout";

/** Desktop /proto — stacked feature sections matching the iPhone slide order and copy. */
export function ProtoDesktopFeatureStack() {
  return (
    <>
      {PROTO_COMMUNICATION_SLIDES.map((slide, index) => {
        const layout = protoFeatureSectionLayout(index);
        if (!layout) return null;

        if (layout.kind === "full-panel") {
          return <ProtoDesktopFullPanelFeatureSection key={slide.id} slide={slide} />;
        }

        const copy = protoFeatureCopy(slide.id);
        if (!copy) return null;

        return (
          <ProtoDesktopFeatureSection
            key={slide.id}
            slide={slide}
            copy={copy}
            boxOnLeft={layout.boxOnLeft}
          />
        );
      })}
    </>
  );
}
