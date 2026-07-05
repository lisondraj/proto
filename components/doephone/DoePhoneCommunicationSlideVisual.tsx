"use client";

import { DoePhoneAmbientVisual } from "@/components/doephone/DoePhoneAmbientVisual";
import { DoePhoneBillingVisual } from "@/components/doephone/DoePhoneBillingVisual";
import { DoePhoneClinicAgentsVisual } from "@/components/doephone/DoePhoneClinicAgentsVisual";
import { DoePhoneFrontDeskInboxVisual } from "@/components/doephone/DoePhoneFrontDeskInboxVisual";
import { DoePhoneIntegrateVisual } from "@/components/doephone/DoePhoneIntegrateVisual";
import { DoePhoneProtoShortlistVisual } from "@/components/doephone/DoePhoneProtoShortlistVisual";
import { DoePhoneWorkflowVisual } from "@/components/doephone/DoePhoneWorkflowVisual";
import { ProtoSandboxBlankPanelVisual } from "@/components/proto/ProtoSandboxBlankPanelVisual";
import { ProtoSandboxCodeSnippetVisual } from "@/components/proto/ProtoSandboxCodeSnippetVisual";
import { ProtoSandboxLedgerCardVisual } from "@/components/proto/ProtoSandboxRoleCardsVisual";
import { ProtoSandboxRolePillsVisual } from "@/components/proto/ProtoSandboxRolePillsVisual";
import type { DoePhoneCommunicationSlide } from "@/lib/doephone/communication-carousel";

export function DoePhoneCommunicationSlideVisual({
  slideId,
  layout = "phone",
  protoSite = false,
}: {
  slideId: DoePhoneCommunicationSlide["id"];
  layout?: "phone" | "desktop";
  /** /proto home — sandbox role cards instead of clinic agents UI. */
  protoSite?: boolean;
}) {
  switch (slideId) {
    case "agents":
      return protoSite ? (
        <ProtoSandboxLedgerCardVisual layout={layout} />
      ) : (
        <DoePhoneClinicAgentsVisual layout={layout} />
      );
    case "inbox":
      return protoSite ? (
        <ProtoSandboxBlankPanelVisual layout={layout} />
      ) : (
        <DoePhoneWorkflowVisual layout={layout} />
      );
    case "front-desk":
      return protoSite ? (
        <ProtoSandboxCodeSnippetVisual layout={layout} />
      ) : (
        <DoePhoneFrontDeskInboxVisual layout={layout} />
      );
    case "ambient":
      return protoSite ? (
        <ProtoSandboxRolePillsVisual layout={layout} />
      ) : (
        <DoePhoneAmbientVisual />
      );
    case "integrate":
      return (
        <DoePhoneIntegrateVisual
          layout={layout}
          fitTopShader={protoSite}
        />
      );
    case "billing":
      return (
        <DoePhoneBillingVisual
          layout={layout}
          chrome={protoSite ? "proto" : "doe"}
        />
      );
    case "prototype":
      return null;
    case "validate":
      return protoSite ? (
        <ProtoSandboxBlankPanelVisual layout={layout} />
      ) : (
        <DoePhoneIntegrateVisual layout={layout} />
      );
    case "shortlist":
    case "looking-ahead":
      return <DoePhoneProtoShortlistVisual layout={layout} protoSite={protoSite} />;
    default:
      return null;
  }
}
