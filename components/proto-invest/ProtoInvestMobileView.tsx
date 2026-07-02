"use client";

import { ProtoRouteShell } from "@/components/proto/ProtoRouteShell";
import { ProtoFooter } from "@/components/proto/ProtoFooter";
import { ProtoInvestMobileContent } from "@/components/proto-invest/ProtoInvestMobileContent";

/** Mobile /about — proto dark chrome with stacked investor article. */
export function ProtoInvestMobileView() {
  return (
    <ProtoRouteShell>
      <ProtoInvestMobileContent />
      <ProtoFooter />
    </ProtoRouteShell>
  );
}
