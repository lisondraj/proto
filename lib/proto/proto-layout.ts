import { phoneLayoutViewportBootstrapScript } from "@/lib/doephone/phone-layout-viewport";
import { DOEPHONE_DESKTOP_MEDIA_QUERY } from "@/lib/doephone/resolve-doe-phone-variant";

/** Runs before paint on /proto — marks proto route; layout variant is chosen client-side. */
export function protoPageBootstrapScript(): string {
  const viewportBootstrap = phoneLayoutViewportBootstrapScript();
  const storagePrefix = "doephone-app-viewport-lock:";

  return `(function(){try{var html=document.documentElement;html.setAttribute("data-proto-page","true");try{sessionStorage.removeItem(${JSON.stringify(storagePrefix)}+location.hostname);}catch(e){}var desktop=window.matchMedia(${JSON.stringify(DOEPHONE_DESKTOP_MEDIA_QUERY)}).matches;if(desktop){html.removeAttribute("data-doeforvc-always-phone");html.removeAttribute("data-doephone-pinching");html.setAttribute("data-layout","desktop");return;}${viewportBootstrap}}catch(e){}})();`;
}
