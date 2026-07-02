"use client";

import { useLayoutEffect } from "react";

import DoeIphoneSiteNav from "@/components/DoeIphoneSiteNav";
import { DoePhoneHeroSection } from "@/components/doephone/DoePhoneHeroSection";
import { ProtoCommunicationStack } from "@/components/proto/ProtoCommunicationStack";
import { ProtoFooter } from "@/components/proto/ProtoFooter";
import { ProtoMoreAboutSection } from "@/components/proto/ProtoMoreAboutSection";
import { useDoePhoneLayoutViewport } from "@/lib/doephone/use-doe-phone-layout-viewport";
import { useDoePhoneStableViewport } from "@/lib/doephone/use-doe-phone-stable-viewport";
import { PROTO_FONT_CLASS, PROTO_NAV_LOGO_FONT_CLASS } from "@/lib/proto/proto-font";
import { PROTO_INVEST_PATH } from "@/lib/site-domains";

/** Proto mobile home — iPhone layout for the standalone Proto site. */
export function DoePhoneMobileView() {
  useDoePhoneLayoutViewport();
  useDoePhoneStableViewport(true);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.setAttribute("data-doeforvc-always-phone", "true");
    html.removeAttribute("data-layout");
    html.setAttribute("data-doephone-pinching", "true");
    html.setAttribute("data-proto-page", "true");
    body.classList.add("doephone-route", "proto-route");

    try {
      sessionStorage.removeItem(`doephone-app-viewport-lock:${location.hostname}`);
    } catch {
      /* ignore */
    }

    return () => {
      html.removeAttribute("data-doephone-pinching");
      html.removeAttribute("data-proto-page");
      body.classList.remove("doephone-route", "proto-route");
    };
  }, []);

  return (
    <div
      className={`doephone-mobile-root relative z-0 min-h-[var(--app-vh,100lvh)] overflow-x-hidden bg-[#121819] ${PROTO_FONT_CLASS}`}
      suppressHydrationWarning
      data-doeforvc-view="iphone"
    >
      <DoeIphoneSiteNav
        pinchSafe
        showMenu={false}
        ctaLayout="main-home"
        showJoinCta={false}
        brandName="Proto"
        brandFontClass={PROTO_NAV_LOGO_FONT_CLASS}
        homeHref="/"
        navChromeTheme="dark"
        logoLink
        navActionLinksEnabled
        investorsHref={PROTO_INVEST_PATH}
      />

      <DoePhoneHeroSection variant="mobile" proto />

      <ProtoCommunicationStack />

      <ProtoMoreAboutSection layout="phone" />

      <ProtoFooter />
    </div>
  );
}
