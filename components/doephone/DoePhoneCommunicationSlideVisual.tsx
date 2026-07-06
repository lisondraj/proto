"use client";

import { DoePhoneAmbientVisual } from "@/components/doephone/DoePhoneAmbientVisual";
import { DoePhoneBillingVisual } from "@/components/doephone/DoePhoneBillingVisual";
import { DoePhoneClinicAgentsVisual } from "@/components/doephone/DoePhoneClinicAgentsVisual";
import { DoePhoneFrontDeskInboxVisual } from "@/components/doephone/DoePhoneFrontDeskInboxVisual";
import { DoePhoneIntegrateVisual } from "@/components/doephone/DoePhoneIntegrateVisual";
import { DoePhoneProtoShortlistVisual } from "@/components/doephone/DoePhoneProtoShortlistVisual";
import { DoePhoneWorkflowVisual } from "@/components/doephone/DoePhoneWorkflowVisual";
import { ProtoSandboxBlankPanelVisual } from "@/components/proto/ProtoSandboxBlankPanelVisual";
import { ProtoSandboxBuildVisual } from "@/components/proto/ProtoSandboxBuildVisual";
import { ProtoSandboxCodeSnippetVisual } from "@/components/proto/ProtoSandboxCodeSnippetVisual";
import { ProtoPublicChallengesVisual } from "@/components/proto/ProtoPublicChallengesVisual";
import { ProtoSandboxLedgerCardVisual } from "@/components/proto/ProtoSandboxRoleCardsVisual";
import { ProtoSandboxRolePillsVisual } from "@/components/proto/ProtoSandboxRolePillsVisual";
import { ProtoSandboxTrackedVisual } from "@/components/proto/ProtoSandboxTrackedVisual";
import { ProtoValidateVisual } from "@/components/proto/ProtoValidateVisual";
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
    case "sandbox-build":
      return protoSite ? (
        <ProtoSandboxBuildVisual layout={layout} />
      ) : null;
    case "prototype":
      return protoSite ? (
        <ProtoSandboxTrackedVisual layout={layout} />
      ) : null;
    case "validate":
      return protoSite ? (
        <ProtoValidateVisual layout={layout} />
      ) : (
        <DoePhoneIntegrateVisual layout={layout} />
      );
    case "shortlist":
      return protoSite ? (
        <ProtoPublicChallengesVisual layout={layout} />
      ) : (
        <DoePhoneProtoShortlistVisual layout={layout} protoSite={protoSite} />
      );
    case "looking-ahead":
      return <DoePhoneProtoShortlistVisual layout={layout} protoSite={protoSite} />;
    default:
      return null;
  }
}
