import type { Metadata } from "next";

import { ProtoInvestView } from "@/components/proto-invest/ProtoInvestView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Proto — For Investors",
  description: "Proto investor mission, market, and founding team.",
};

export default function AboutPage() {
  return <ProtoInvestView />;
}
