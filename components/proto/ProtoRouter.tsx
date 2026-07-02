"use client";

import { useEffect, useLayoutEffect, useState } from "react";

import { DoePhoneMobileView } from "@/components/doephone/DoePhoneMobileView";
import { ProtoDesktopHome } from "@/components/proto/ProtoDesktopHome";
import {
  applyPhoneLayoutViewportMeta,
  PHONE_DEVICE_VIEWPORT,
  phoneLayoutViewportContent,
} from "@/lib/doephone/phone-layout-viewport";
import {
  DOEPHONE_DESKTOP_MEDIA_QUERY,
  resolveDoePhoneVariant,
  type DoePhoneVariant,
} from "@/lib/doephone/resolve-doe-phone-variant";
import { shouldLockDesignersTouchPhoneLayout } from "@/lib/designers/designers-page-context";

function applyPhoneDocumentAttrs() {
  const html = document.documentElement;
  const body = document.body;
  html.setAttribute("data-doeforvc-always-phone", "true");
  html.removeAttribute("data-layout");
  body.classList.remove("desktop-route");
}

function applyDesktopDocumentAttrs() {
  const html = document.documentElement;
  const body = document.body;
  const meta = document.querySelector('meta[name="viewport"]');
  html.removeAttribute("data-doeforvc-always-phone");
  html.removeAttribute("data-doephone-pinching");
  html.setAttribute("data-layout", "desktop");
  body.classList.add("desktop-route");
  body.classList.remove("doephone-route");
  html.style.removeProperty("--app-vw");
  html.style.removeProperty("--app-vh");
  html.style.removeProperty("--app-vv-offset-top");
  meta?.setAttribute("content", PHONE_DEVICE_VIEWPORT);
}

function applyPhonePinchViewport() {
  const html = document.documentElement;
  const body = document.body;
  const meta = document.querySelector('meta[name="viewport"]');
  html.setAttribute("data-doephone-pinching", "true");
  body.classList.add("doephone-route");
  meta?.setAttribute("content", phoneLayoutViewportContent());
}

/** /proto — phone or desktop layout based on viewport, matching Doe home routing. */
export function ProtoRouter() {
  const [variant, setVariant] = useState<DoePhoneVariant | null>(null);

  useLayoutEffect(() => {
    setVariant(resolveDoePhoneVariant());
  }, []);

  useEffect(() => {
    const sync = () => setVariant(resolveDoePhoneVariant());

    if (shouldLockDesignersTouchPhoneLayout()) {
      sync();
      return;
    }

    const mq = window.matchMedia(DOEPHONE_DESKTOP_MEDIA_QUERY);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    if (variant === null) return;

    const html = document.documentElement;
    const body = document.body;
    html.setAttribute("data-proto-page", "true");
    body.classList.add("proto-route");

    if (variant === "phone") {
      applyPhoneDocumentAttrs();
      applyPhoneLayoutViewportMeta();
      applyPhonePinchViewport();
      return;
    }

    applyDesktopDocumentAttrs();
  }, [variant]);

  if (variant === null) return null;

  return variant === "desktop" ? <ProtoDesktopHome /> : <DoePhoneMobileView />;
}
