"use client";

import { useEffect, useLayoutEffect, useState } from "react";

import { ProtoInvestDesktopView } from "@/components/proto-invest/ProtoInvestDesktopView";
import { ProtoInvestMobileView } from "@/components/proto-invest/ProtoInvestMobileView";
import {
  DOEPHONE_DESKTOP_MEDIA_QUERY,
  resolveDoePhoneVariant,
  type DoePhoneVariant,
} from "@/lib/doephone/resolve-doe-phone-variant";
import { shouldLockDesignersTouchPhoneLayout } from "@/lib/designers/designers-page-context";
import {
  applyProtoDesktopDocumentAttrs,
  applyProtoPhoneDocumentAttrs,
  clearProtoPhonePinchViewport,
  markProtoRouteDocument,
  syncProtoPhoneViewport,
} from "@/lib/proto/proto-route-document";
import { shouldLockProtoTouchPhoneLayout } from "@/lib/proto/proto-page-context";

/** /about — phone or desktop layout based on viewport, matching main proto routing. */
export function ProtoInvestRouter() {
  const [variant, setVariant] = useState<DoePhoneVariant>("phone");

  useLayoutEffect(() => {
    setVariant(resolveDoePhoneVariant());
  }, []);

  useEffect(() => {
    const sync = () => setVariant(resolveDoePhoneVariant());
    sync();

    if (shouldLockDesignersTouchPhoneLayout() || shouldLockProtoTouchPhoneLayout()) {
      return;
    }

    const mq = window.matchMedia(DOEPHONE_DESKTOP_MEDIA_QUERY);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    markProtoRouteDocument();

    if (variant === "phone") {
      applyProtoPhoneDocumentAttrs();
      syncProtoPhoneViewport();
      return;
    }

    applyProtoDesktopDocumentAttrs();
  }, [variant]);

  useEffect(() => {
    if (variant !== "phone") return;

    const meta = document.querySelector('meta[name="viewport"]');
    const prevViewport = meta?.getAttribute("content") ?? "";

    return () => {
      clearProtoPhonePinchViewport(prevViewport);
      applyProtoPhoneDocumentAttrs();
    };
  }, [variant]);

  return variant === "desktop" ? <ProtoInvestDesktopView /> : <ProtoInvestMobileView />;
}
