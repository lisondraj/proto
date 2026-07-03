"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ProtoInvestMobileTocPanel } from "@/components/proto-invest/ProtoInvestMobileTocPanel";
import { PROTO_INVEST_MOBILE_TOC_LABEL } from "@/lib/proto-invest/proto-invest-content";

const PANEL_REVEAL_MS = 780;
const PANEL_HIDE_MS = 180;
const PANEL_COLLAPSE_MS = 520;

function TocIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="proto-invest-floating-toc__icon"
    >
      <path
        d="M5.25 6.25h9.5M5.25 10h9.5M5.25 13.75H11.5"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <circle cx="3.15" cy="6.25" r="0.85" fill="currentColor" />
      <circle cx="3.15" cy="10" r="0.85" fill="currentColor" />
      <circle cx="3.15" cy="13.75" r="0.85" fill="currentColor" />
    </svg>
  );
}

function isProtoNavPunchedOut() {
  const nav = document.querySelector("nav.doephone-site-nav.proto-nav-scroll-frost");
  return nav?.classList.contains("proto-nav--scrolled") ?? false;
}

/** iPhone /about — frosted TOC circle fixed bottom-right; visible with punched-out nav only. */
export function ProtoInvestMobileFloatingToc() {
  const [mounted, setMounted] = useState(false);
  const [navPunchedOut, setNavPunchedOut] = useState(false);
  const [open, setOpen] = useState(false);
  const [panelRevealed, setPanelRevealed] = useState(false);
  const [collapsing, setCollapsing] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const revealTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const collapseTimerRef = useRef<number | null>(null);

  const clearCollapseStyles = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    root.style.width = "";
    root.style.height = "";
  }, []);

  const beginCollapse = useCallback(() => {
    const root = rootRef.current;
    if (root) {
      const { width, height } = root.getBoundingClientRect();
      root.style.width = `${width}px`;
      root.style.height = `${height}px`;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCollapsing(true);
      });
    });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let raf = 0;

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const punchedOut = isProtoNavPunchedOut();
        setNavPunchedOut(punchedOut);
        if (!punchedOut) {
          setPanelRevealed(false);
          setOpen(false);
          setCollapsing(false);
          if (rootRef.current) {
            rootRef.current.style.width = "";
            rootRef.current.style.height = "";
          }
        }
      });
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    window.addEventListener("orientationchange", sync);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", sync);
    };
  }, []);

  const close = useCallback(() => {
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
    }
    if (collapseTimerRef.current !== null) {
      window.clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
    setPanelRevealed(false);
    hideTimerRef.current = window.setTimeout(() => {
      beginCollapse();
      hideTimerRef.current = null;
      collapseTimerRef.current = window.setTimeout(() => {
        setOpen(false);
        setCollapsing(false);
        clearCollapseStyles();
        collapseTimerRef.current = null;
      }, PANEL_COLLAPSE_MS);
    }, PANEL_HIDE_MS);
  }, [beginCollapse, clearCollapseStyles]);

  const openToc = useCallback(() => {
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
    }
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (collapseTimerRef.current !== null) {
      window.clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
    setCollapsing(false);
    clearCollapseStyles();
    setOpen(true);
    setPanelRevealed(false);
    revealTimerRef.current = window.setTimeout(() => {
      setPanelRevealed(true);
      revealTimerRef.current = null;
    }, PANEL_REVEAL_MS);
  }, [clearCollapseStyles]);

  const toggleToc = useCallback(() => {
    if (open) {
      close();
    } else {
      openToc();
    }
  }, [close, open, openToc]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close, open]);

  useEffect(() => {
    return () => {
      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current);
      }
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
      }
      if (collapseTimerRef.current !== null) {
        window.clearTimeout(collapseTimerRef.current);
      }
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      ref={rootRef}
      className={`proto-invest-floating-toc${navPunchedOut ? " is-visible" : ""}${open && !collapsing ? " is-open" : ""}${panelRevealed ? " is-revealed" : ""}${collapsing ? " is-closing" : ""}`}
      aria-live="polite"
      aria-hidden={!navPunchedOut}
    >
      <div
        className="proto-invest-floating-toc__frost proto-nav-frost-shell"
        style={{ ["--proto-nav-frost-progress" as string]: 1 }}
      >
        {open ? (
          <div className="proto-invest-floating-toc__panel" aria-hidden={!panelRevealed}>
            <p className="proto-invest-floating-toc__label">{PROTO_INVEST_MOBILE_TOC_LABEL}</p>
            <ProtoInvestMobileTocPanel variant="nav" omitLabel onItemClick={close} />
          </div>
        ) : null}

        {!open && !collapsing ? (
          <button
            type="button"
            className="proto-invest-floating-toc__trigger"
            aria-expanded={open}
            aria-label="Open table of contents"
            onClick={toggleToc}
            tabIndex={navPunchedOut ? 0 : -1}
          >
            <TocIcon />
          </button>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
