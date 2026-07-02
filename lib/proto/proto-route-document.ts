import {
  applyPhoneLayoutViewportMeta,
  phoneLayoutViewportContent,
} from "@/lib/doephone/phone-layout-viewport";

export function applyProtoPhoneDocumentAttrs() {
  const html = document.documentElement;
  const body = document.body;
  html.setAttribute("data-doeforvc-always-phone", "true");
  html.removeAttribute("data-layout");
  body.classList.remove("desktop-route");
}

export function applyProtoDesktopDocumentAttrs() {
  const html = document.documentElement;
  const body = document.body;
  html.removeAttribute("data-doeforvc-always-phone");
  html.setAttribute("data-layout", "desktop");
  body.classList.add("desktop-route");
}

export function applyProtoPhonePinchViewport() {
  const html = document.documentElement;
  const body = document.body;
  const meta = document.querySelector('meta[name="viewport"]');
  html.setAttribute("data-doephone-pinching", "true");
  body.classList.add("doephone-route");
  meta?.setAttribute("content", phoneLayoutViewportContent());
}

export function clearProtoPhonePinchViewport(prevViewport: string) {
  const html = document.documentElement;
  const body = document.body;
  const meta = document.querySelector('meta[name="viewport"]');
  html.removeAttribute("data-doephone-pinching");
  body.classList.remove("doephone-route");
  if (meta) {
    if (prevViewport) meta.setAttribute("content", prevViewport);
    else meta.removeAttribute("content");
  }
}

export function markProtoRouteDocument() {
  document.documentElement.setAttribute("data-proto-page", "true");
  document.body.classList.add("proto-route");
}

export function syncProtoPhoneViewport() {
  applyPhoneLayoutViewportMeta();
  applyProtoPhonePinchViewport();
}
