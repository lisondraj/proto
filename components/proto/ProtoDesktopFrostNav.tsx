"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { MobileNavActionRow } from "@/components/nav/MobileNavActionRow";
import {
  PROTO_DESKTOP_NAV_LOGO_TW,
} from "@/lib/proto/proto-desktop-layout-styles";
import { PROTO_NAV_LOGO_FONT_CLASS } from "@/lib/proto/proto-font";
import { PROTO_INVEST_PATH } from "@/lib/site-domains";

type ProtoDesktopFrostNavProps = {
  /** When true, frost begins after the hero scrolls past (home). */
  frostedScrollPastHero?: boolean;
  /** Measure nav height and publish `--proto-desktop-nav-h` on `documentElement`. */
  trackNavHeight?: boolean;
  ariaLabel?: string;
};

/** Desktop proto nav — frosted pill between page gutters on scroll (iPhone parity). */
export function ProtoDesktopFrostNav({
  frostedScrollPastHero = false,
  trackNavHeight = false,
  ariaLabel = "Primary",
}: ProtoDesktopFrostNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [navFrostProgress, setNavFrostProgress] = useState(0);
  const [protoNavScrolled, setProtoNavScrolled] = useState(false);
  const [navMotionReady, setNavMotionReady] = useState(false);

  useLayoutEffect(() => {
    setNavMotionReady(false);
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setNavMotionReady(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  useEffect(() => {
    if (!trackNavHeight) return;

    const nav = navRef.current;
    if (!nav) return;

    const measure = () => {
      document.documentElement.style.setProperty(
        "--proto-desktop-nav-h",
        `${nav.getBoundingClientRect().height}px`,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--proto-desktop-nav-h");
    };
  }, [trackNavHeight]);

  useEffect(() => {
    let raf = 0;

    const computeFrostProgress = () => {
      if (frostedScrollPastHero) {
        const hero = document.querySelector<HTMLElement>(".doephone-hero-section");
        if (hero) {
          const bottom = hero.getBoundingClientRect().bottom;
          const range = 96;
          return Math.min(1, Math.max(0, (range - bottom) / range));
        }
      }
      const range = 56;
      return Math.min(1, Math.max(0, window.scrollY / range));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const next = computeFrostProgress();
        setNavFrostProgress(next);
        setProtoNavScrolled((prev) => (prev ? next > 0.68 : next >= 0.88));
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
  }, [frostedScrollPastHero]);

  return (
    <nav
      ref={navRef}
      className={`doephone-site-nav proto-nav-scroll-frost fixed top-0 left-0 right-0 z-50 ${
        navMotionReady ? "proto-nav--motion-ready " : ""
      }${protoNavScrolled ? "proto-nav--scrolled " : ""}`}
      style={{
        ["--proto-nav-frost-progress" as string]: navFrostProgress,
      }}
      aria-label={ariaLabel}
    >
      <div className="proto-nav-frost-shell">
        <div className="proto-desktop-frost-nav__strip flex items-center justify-between">
          <Link
            href="/"
            className={`proto-nav-logo proto-nav-chrome-logo ${PROTO_NAV_LOGO_FONT_CLASS} ${PROTO_DESKTOP_NAV_LOGO_TW}`}
          >
            Proto
          </Link>

          <div className="proto-nav-chrome-actions flex shrink-0 items-center">
            <MobileNavActionRow linksEnabled investorsHref={PROTO_INVEST_PATH} />
          </div>
        </div>
      </div>
    </nav>
  );
}
