"use client";

import { useRef } from "react";

import {
  PROTO_INVEST_MOBILE_TOC_AUDIO_DIVIDER_TW,
  PROTO_INVEST_MOBILE_TOC_AUDIO_TW,
  PROTO_INVEST_MOBILE_TOC_BOX_TW,
  PROTO_INVEST_MOBILE_TOC_INDEX_TW,
  PROTO_INVEST_MOBILE_TOC_LABEL_TW,
  PROTO_INVEST_MOBILE_TOC_LINK_TW,
  PROTO_INVEST_MOBILE_TOC_LIST_TW,
  PROTO_INVEST_MOBILE_TOC_TEXT_TW,
} from "@/lib/proto-invest/proto-invest-layout-styles";
import {
  PROTO_INVEST_MOBILE_ARTICLE_AUDIO,
  PROTO_INVEST_MOBILE_TOC_ITEMS,
  PROTO_INVEST_MOBILE_TOC_LABEL,
} from "@/lib/proto-invest/proto-invest-content";

function ChevronIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className="shrink-0 !text-white/45 transition-colors duration-200 group-active:!text-white/72"
    >
      <path
        d="M4.25 2.5 7.75 6l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 11 11" fill="none" aria-hidden className="ml-px">
      <path
        d="M2.5 1.85c0-.72.82-.34 1.3-.06l5.3 3.02c.48.28.48.97 0 1.25l-5.3 3.02c-.48.28-1.3-.1-1.3-.82V1.85Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArticleAudioCopy({ variant }: { variant: "inline" | "nav" }) {
  if (variant === "nav") {
    return (
      <span className="proto-invest-floating-toc__audio-copy">
        {PROTO_INVEST_MOBILE_ARTICLE_AUDIO.navLines.map((line) => (
          <span key={line} className="proto-invest-floating-toc__audio-line">
            {line}
          </span>
        ))}
      </span>
    );
  }

  return <span>{PROTO_INVEST_MOBILE_ARTICLE_AUDIO.label}</span>;
}

function ArticleAudioRow({
  audioSrc,
  variant,
}: {
  audioSrc?: string;
  variant: "inline" | "nav";
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playIcon = (
    <span
      className={
        variant === "nav"
          ? "proto-invest-floating-toc__play-icon"
          : "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#2A3538]/70 !text-white/45"
      }
    >
      <PlayIcon size={variant === "nav" ? 13 : 11} />
    </span>
  );
  const rowClass =
    variant === "nav" ? "proto-invest-floating-toc__audio" : PROTO_INVEST_MOBILE_TOC_AUDIO_TW;

  if (audioSrc) {
    return (
      <button
        type="button"
        className={rowClass}
        onClick={() => {
          const audio = audioRef.current;
          if (!audio) return;
          if (audio.paused) {
            void audio.play();
          } else {
            audio.pause();
          }
        }}
      >
        {playIcon}
        <ArticleAudioCopy variant={variant} />
        <audio ref={audioRef} src={audioSrc} preload="metadata" className="hidden" />
      </button>
    );
  }

  return (
    <p className={rowClass}>
      {playIcon}
      <ArticleAudioCopy variant={variant} />
    </p>
  );
}

/** Shared /about mobile TOC list + listen row. */
export function ProtoInvestMobileTocPanel({
  variant = "inline",
  omitLabel = false,
  onItemClick,
}: {
  variant?: "inline" | "nav";
  omitLabel?: boolean;
  onItemClick?: () => void;
}) {
  const audioSrc = PROTO_INVEST_MOBILE_ARTICLE_AUDIO.src;
  const isNav = variant === "nav";

  const content = (
    <>
      {!omitLabel ? (
        <p className={isNav ? "proto-invest-floating-toc__label" : PROTO_INVEST_MOBILE_TOC_LABEL_TW}>
          {PROTO_INVEST_MOBILE_TOC_LABEL}
        </p>
      ) : null}

      <ol className={isNav ? "proto-invest-floating-toc__list" : PROTO_INVEST_MOBILE_TOC_LIST_TW}>
        {PROTO_INVEST_MOBILE_TOC_ITEMS.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={
                isNav ? "proto-invest-floating-toc__link group" : PROTO_INVEST_MOBILE_TOC_LINK_TW
              }
              onClick={onItemClick}
            >
              <span className={isNav ? "proto-invest-floating-toc__index" : PROTO_INVEST_MOBILE_TOC_INDEX_TW}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={isNav ? "proto-invest-floating-toc__text" : PROTO_INVEST_MOBILE_TOC_TEXT_TW}>
                {item.label}
              </span>
              <ChevronIcon />
            </a>
          </li>
        ))}
      </ol>

      <div className={isNav ? "proto-invest-floating-toc__audio-divider" : PROTO_INVEST_MOBILE_TOC_AUDIO_DIVIDER_TW}>
        <ArticleAudioRow audioSrc={audioSrc} variant={variant} />
      </div>
    </>
  );

  if (isNav) {
    return <div className="proto-invest-floating-toc__list-wrap">{content}</div>;
  }

  return <div className={PROTO_INVEST_MOBILE_TOC_BOX_TW}>{content}</div>;
}
