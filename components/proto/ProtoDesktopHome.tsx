"use client";

import { DoePhoneHeroSection } from "@/components/doephone/DoePhoneHeroSection";
import { ProtoDesktopFeatureStack } from "@/components/proto/ProtoDesktopFeatureStack";
import { ProtoDesktopFrostNav } from "@/components/proto/ProtoDesktopFrostNav";
import { ProtoFooter } from "@/components/proto/ProtoFooter";
import { ProtoMoreAboutSection } from "@/components/proto/ProtoMoreAboutSection";
import { PROTO_PAGE_BG } from "@/lib/proto/proto-chrome-colors";
import { PROTO_FONT_CLASS } from "@/lib/proto/proto-font";

/** Desktop /proto — dark home layout aligned with the iPhone proto review. */
export function ProtoDesktopHome() {
  return (
    <div
      className={`proto-desktop-root relative ${PROTO_FONT_CLASS}`}
      style={{ backgroundColor: PROTO_PAGE_BG }}
    >
      <div className="relative z-[40]">
        <DoePhoneHeroSection variant="desktop" proto />

        <ProtoDesktopFrostNav frostedScrollPastHero trackNavHeight ariaLabel="Primary" />
      </div>

      <div className="w-full border-t border-[#2A3538]" aria-hidden />

      <ProtoDesktopFeatureStack />

      <ProtoMoreAboutSection layout="desktop" />

      <ProtoFooter layout="desktop" />
    </div>
  );
}
