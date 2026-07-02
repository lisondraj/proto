import type { Metadata } from "next";
import { headers } from "next/headers";

import { ProtoInvestView } from "@/components/proto-invest/ProtoInvestView";

export const dynamic = "force-dynamic";

const MOBILE_UA =
  /iPhone|iPod|Android.*Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i;

export const metadata: Metadata = {
  title: "Proto — For Investors",
  description: "Proto investor mission, market, and founding team.",
};

export default function AboutPage() {
  const ua = headers().get("user-agent") ?? "";
  const initialVariant = MOBILE_UA.test(ua) ? "phone" : "desktop";

  return <ProtoInvestView initialVariant={initialVariant} />;
}
