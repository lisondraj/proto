"use client";

import Link from "next/link";

import { PROTO_PHONE_PAGE_INSET_X } from "@/lib/proto/proto-phone-layout-styles";
import { PROTO_DESKTOP_FOOTER_WORDMARK_TW } from "@/lib/proto/proto-desktop-layout-styles";
import { PROTO_NAV_LOGO_FONT_CLASS } from "@/lib/proto/proto-font";

const WORDMARK = "Proto";

/** Footer wordmark — full-width on phone; fixed scale on desktop. */
export function ProtoFooterWordmark({
  layout = "phone",
}: {
  layout?: "phone" | "desktop";
}) {
  if (layout === "desktop") {
    return (
      <Link href="/" className={`proto-footer-wordmark proto-footer-wordmark--desktop ${PROTO_DESKTOP_FOOTER_WORDMARK_TW}`}>
        {WORDMARK}
      </Link>
    );
  }

  return <ProtoFooterWordmarkPhone />;
}

function ProtoFooterWordmarkPhone() {
  return (
    <div className={`proto-footer-wordmark-wrap relative z-[11] w-full pb-0 ${PROTO_PHONE_PAGE_INSET_X}`}>
      <Link
        href="/"
        className={`proto-footer-wordmark pointer-events-auto inline-block font-normal no-underline transition-opacity hover:opacity-90 ${PROTO_NAV_LOGO_FONT_CLASS}`}
      >
        {WORDMARK}
      </Link>
    </div>
  );
}
