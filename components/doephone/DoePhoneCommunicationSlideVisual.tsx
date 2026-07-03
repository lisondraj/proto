"use client";

import { DoePhoneAmbientVisual } from "@/components/doephone/DoePhoneAmbientVisual";
import { DoePhoneBillingVisual } from "@/components/doephone/DoePhoneBillingVisual";
import { DoePhoneClinicAgentsVisual } from "@/components/doephone/DoePhoneClinicAgentsVisual";
import { DoePhoneFrontDeskInboxVisual } from "@/components/doephone/DoePhoneFrontDeskInboxVisual";
import { DoePhoneIntegrateVisual } from "@/components/doephone/DoePhoneIntegrateVisual";
import { DoePhoneProtoShortlistVisual } from "@/components/doephone/DoePhoneProtoShortlistVisual";
import { DoePhoneProtoValidateVisual } from "@/components/doephone/DoePhoneProtoValidateVisual";
import { DoePhoneWorkflowVisual } from "@/components/doephone/DoePhoneWorkflowVisual";
import { ProtoSandboxRoleCardsVisual } from "@/components/proto/ProtoSandboxRoleCardsVisual";
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
        <ProtoSandboxRoleCardsVisual layout={layout} />
      ) : (
        <DoePhoneClinicAgentsVisual layout={layout} />
      );
    case "inbox":
      return <DoePhoneWorkflowVisual layout={layout} />;
    case "front-desk":
      return <DoePhoneFrontDeskInboxVisual />;
    case "ambient":
      return <DoePhoneAmbientVisual />;
    case "integrate":
      return <DoePhoneIntegrateVisual />;
    case "billing":
      return <DoePhoneBillingVisual />;
    case "prototype":
      return <DoePhoneProtoValidateVisual layout={layout} />;
    case "validate":
      return <DoePhoneIntegrateVisual />;
    case "shortlist":
      return <DoePhoneProtoShortlistVisual layout={layout} />;
    default:
      return null;
  }
}
