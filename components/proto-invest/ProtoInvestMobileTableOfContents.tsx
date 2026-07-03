"use client";

import { ProtoInvestMobileTocPanel } from "@/components/proto-invest/ProtoInvestMobileTocPanel";
import { PROTO_INVEST_MOBILE_TOC_WRAP } from "@/lib/proto-invest/proto-invest-layout-styles";

/** iPhone /about — inline table of contents below the hero shader. */
export function ProtoInvestMobileTableOfContents() {
  return (
    <nav aria-label="Table of contents" className={PROTO_INVEST_MOBILE_TOC_WRAP}>
      <ProtoInvestMobileTocPanel variant="inline" />
    </nav>
  );
}
