"use client";

import Link from "next/link";

import { ProtoDesktopNavActionRow } from "@/components/proto/ProtoDesktopNavActionRow";
import {
  PROTO_DESKTOP_NAV_LOGO_TW,
  PROTO_DESKTOP_PAGE_INSET_X,
} from "@/lib/proto/proto-desktop-layout-styles";
import { PROTO_NAV_LOGO_FONT_CLASS } from "@/lib/proto/proto-font";

/** Desktop /about nav — proto dark chrome aligned with desktop home. */
export function ProtoInvestDesktopNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#2A3538] bg-[#121819]"
      aria-label="Site"
    >
      <div className={`flex items-center justify-between py-6 ${PROTO_DESKTOP_PAGE_INSET_X}`}>
        <Link href="/" className={`proto-nav-logo ${PROTO_NAV_LOGO_FONT_CLASS} ${PROTO_DESKTOP_NAV_LOGO_TW}`}>
          Proto
        </Link>

        <ProtoDesktopNavActionRow />
      </div>
    </nav>
  );
}
