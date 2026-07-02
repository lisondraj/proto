"use client";

import { useEffect, useLayoutEffect } from "react";

import { ProtoInvestDesktopView } from "@/components/proto-invest/ProtoInvestDesktopView";
import { ProtoInvestMobileView } from "@/components/proto-invest/ProtoInvestMobileView";
import {
  applyPhoneLayoutViewportMeta,
  PHONE_DEVICE_VIEWPORT,
  phoneLayoutViewportContent,
} from "@/lib/doephone/phone-layout-viewport";
import { useJoinPageVariant, type JoinPageVariant } from "@/lib/join/use-join-page-variant";

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

/** /about — phone or desktop layout based on viewport, matching Doe /about routing. */
export function ProtoInvestRouter({ initialVariant }: { initialVariant: JoinPageVariant }) {
  const variant = useJoinPageVariant(initialVariant);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.setAttribute("data-proto-page", "true");
    body.classList.add("proto-route");

    if (variant === "desktop") {
      applyDesktopDocumentAttrs();
      return;
    }

    applyPhoneDocumentAttrs();
    applyPhoneLayoutViewportMeta();
    applyPhonePinchViewport();
  }, [variant]);

  useEffect(() => {
    if (variant !== "phone") return;

    const meta = document.querySelector('meta[name="viewport"]');
    const prevViewport = meta?.getAttribute("content") ?? "";

    return () => {
      const html = document.documentElement;
      const body = document.body;
      html.removeAttribute("data-doephone-pinching");
      body.classList.remove("doephone-route");
      if (meta) {
        if (prevViewport) meta.setAttribute("content", prevViewport);
        else meta.removeAttribute("content");
      }
    };
  }, [variant]);

  return variant === "desktop" ? <ProtoInvestDesktopView /> : <ProtoInvestMobileView />;
}
