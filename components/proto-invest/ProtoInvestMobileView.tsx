"use client";

import { ProtoRouteShell } from "@/components/proto/ProtoRouteShell";
import { ProtoFooter } from "@/components/proto/ProtoFooter";
import { ProtoMoreAboutSection } from "@/components/proto/ProtoMoreAboutSection";
import { ProtoInvestMobileContent } from "@/components/proto-invest/ProtoInvestMobileContent";
import { ProtoInvestMobileFloatingToc } from "@/components/proto-invest/ProtoInvestMobileFloatingToc";

/** Mobile /about — proto dark chrome with stacked investor article. */
export function ProtoInvestMobileView() {
  return (
    <ProtoRouteShell>
      <ProtoInvestMobileContent />
      <ProtoMoreAboutSection layout="phone" />
      <ProtoFooter />
      <ProtoInvestMobileFloatingToc />
    </ProtoRouteShell>
  );
}
