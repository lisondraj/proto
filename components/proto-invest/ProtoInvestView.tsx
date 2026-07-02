"use client";

import { ProtoInvestRouter } from "@/components/proto-invest/ProtoInvestRouter";
import type { JoinPageVariant } from "@/lib/join/use-join-page-variant";

/** /about — investor mission page with responsive proto chrome. */
export function ProtoInvestView({ initialVariant }: { initialVariant: JoinPageVariant }) {
  return <ProtoInvestRouter initialVariant={initialVariant} />;
}
