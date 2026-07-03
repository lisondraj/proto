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
  PROTO_INVEST_MOBILE_TOC_WRAP,
} from "@/lib/proto-invest/proto-invest-layout-styles";
import {
  PROTO_INVEST_MOBILE_ARTICLE_AUDIO,
  PROTO_INVEST_MOBILE_TOC_ITEMS,
  PROTO_INVEST_MOBILE_TOC_LABEL,
} from "@/lib/proto-invest/proto-invest-content";

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="shrink-0 !text-white/45 transition-colors duration-200 group-active:!text-white/72">
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

function PlayIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden className="ml-px">
      <path
        d="M2.5 1.85c0-.72.82-.34 1.3-.06l5.3 3.02c.48.28.48.97 0 1.25l-5.3 3.02c-.48.28-1.3-.1-1.3-.82V1.85Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArticleAudioRow({ audioSrc }: { audioSrc?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playIcon = (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#2A3538]/70 !text-white/45">
      <PlayIcon />
    </span>
  );

  if (audioSrc) {
    return (
      <button
        type="button"
        className={PROTO_INVEST_MOBILE_TOC_AUDIO_TW}
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
        <span>{PROTO_INVEST_MOBILE_ARTICLE_AUDIO.label}</span>
        <audio ref={audioRef} src={audioSrc} preload="metadata" className="hidden" />
      </button>
    );
  }

  return (
    <p className={PROTO_INVEST_MOBILE_TOC_AUDIO_TW}>
      {playIcon}
      <span>{PROTO_INVEST_MOBILE_ARTICLE_AUDIO.label}</span>
    </p>
  );
}

/** iPhone /about — compact in-page table of contents below the hero shader. */
export function ProtoInvestMobileTableOfContents() {
  const audioSrc = PROTO_INVEST_MOBILE_ARTICLE_AUDIO.src;

  return (
    <nav aria-label="Table of contents" className={PROTO_INVEST_MOBILE_TOC_WRAP}>
      <div className={PROTO_INVEST_MOBILE_TOC_BOX_TW}>
        <p className={PROTO_INVEST_MOBILE_TOC_LABEL_TW}>{PROTO_INVEST_MOBILE_TOC_LABEL}</p>

        <ol className={PROTO_INVEST_MOBILE_TOC_LIST_TW}>
          {PROTO_INVEST_MOBILE_TOC_ITEMS.map((item, index) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={PROTO_INVEST_MOBILE_TOC_LINK_TW}>
                <span className={PROTO_INVEST_MOBILE_TOC_INDEX_TW}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={PROTO_INVEST_MOBILE_TOC_TEXT_TW}>{item.label}</span>
                <ChevronIcon />
              </a>
            </li>
          ))}
        </ol>

        <div className={PROTO_INVEST_MOBILE_TOC_AUDIO_DIVIDER_TW}>
          <ArticleAudioRow audioSrc={audioSrc} />
        </div>
      </div>
    </nav>
  );
}
