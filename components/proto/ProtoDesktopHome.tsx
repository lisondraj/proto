"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { DoePhoneHeroSection } from "@/components/doephone/DoePhoneHeroSection";
import { ProtoDesktopFeatureStack } from "@/components/proto/ProtoDesktopFeatureStack";
import { ProtoDesktopNavActionRow } from "@/components/proto/ProtoDesktopNavActionRow";
import { ProtoFooter } from "@/components/proto/ProtoFooter";
import { ProtoMoreAboutSection } from "@/components/proto/ProtoMoreAboutSection";
import { PROTO_PAGE_BG } from "@/lib/proto/proto-chrome-colors";
import {
  PROTO_DESKTOP_NAV_LOGO_TW,
  PROTO_DESKTOP_PAGE_INSET_X,
} from "@/lib/proto/proto-desktop-layout-styles";
import { PROTO_FONT_CLASS, PROTO_NAV_LOGO_FONT_CLASS } from "@/lib/proto/proto-font";
import { PROTO_HERO_TO_FEATURES_PAD_TW } from "@/lib/proto/proto-hero-layout";

/** Desktop /proto — dark home layout aligned with the iPhone proto review. */
export function ProtoDesktopHome() {
  const [navSolid, setNavSolid] = useState(0);
  const [navHeightPx, setNavHeightPx] = useState(88);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const measure = () => setNavHeightPx(nav.getBoundingClientRect().height);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--proto-desktop-nav-h", `${navHeightPx}px`);
    return () => {
      document.documentElement.style.removeProperty("--proto-desktop-nav-h");
    };
  }, [navHeightPx]);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const threshold = window.innerHeight * 0.62;
        const range = window.innerHeight * 0.14;
        const progress = (window.scrollY - threshold) / range;
        setNavSolid(Math.min(1, Math.max(0, progress)));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`proto-desktop-root relative ${PROTO_FONT_CLASS}`}
      style={{ backgroundColor: PROTO_PAGE_BG }}
    >
      <div className="relative z-[40]">
        <DoePhoneHeroSection variant="desktop" proto />

        <nav
          ref={navRef}
          className="fixed top-0 left-0 right-0 z-[50]"
          style={{
            ["--proto-desktop-nav-solid" as string]: navSolid,
            backgroundColor: `color-mix(in srgb, ${PROTO_PAGE_BG} calc(var(--proto-desktop-nav-solid, 0) * 100%), transparent)`,
            borderBottom: `1px solid color-mix(in srgb, #2A3538 calc(var(--proto-desktop-nav-solid, 0) * 100%), transparent)`,
            transition: "background-color 60ms linear, border-color 60ms linear",
          }}
          aria-label="Primary"
        >
          <div
            className={`flex items-center justify-between py-6 ${PROTO_DESKTOP_PAGE_INSET_X}`}
          >
            <Link href="/" className={`proto-nav-logo ${PROTO_NAV_LOGO_FONT_CLASS} ${PROTO_DESKTOP_NAV_LOGO_TW}`}>
              Proto
            </Link>

            <ProtoDesktopNavActionRow />
          </div>
        </nav>
      </div>

      <div className="w-full border-t border-[#2A3538]" aria-hidden />

      <div className={PROTO_HERO_TO_FEATURES_PAD_TW}>
        <ProtoDesktopFeatureStack />
      </div>

      <ProtoMoreAboutSection layout="desktop" />

      <ProtoFooter layout="desktop" />
    </div>
  );
}
