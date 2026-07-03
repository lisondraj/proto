"use client";

import { useRef, useState } from "react";

import {
  PROTO_INVEST_MOBILE_TOC_AUDIO_DIVIDER_TW,
  PROTO_INVEST_MOBILE_TOC_BOX_TW,
  PROTO_INVEST_MOBILE_TOC_INDEX_TW,
  PROTO_INVEST_MOBILE_TOC_LABEL_TW,
  PROTO_INVEST_MOBILE_TOC_LINK_TW,
  PROTO_INVEST_MOBILE_TOC_LISTEN_COPY_TW,
  PROTO_INVEST_MOBILE_TOC_LISTEN_DURATION_TW,
  PROTO_INVEST_MOBILE_TOC_LISTEN_LABEL_TW,
  PROTO_INVEST_MOBILE_TOC_LISTEN_META_TW,
  PROTO_INVEST_MOBILE_TOC_LISTEN_PLAY_TW,
  PROTO_INVEST_MOBILE_TOC_LISTEN_ROW_TW,
  PROTO_INVEST_MOBILE_TOC_LISTEN_TITLE_TW,
  PROTO_INVEST_MOBILE_TOC_LIST_TW,
  PROTO_INVEST_MOBILE_TOC_TEXT_TW,
  PROTO_INVEST_MOBILE_TOC_WRAP,
} from "@/lib/proto-invest/proto-invest-layout-styles";
import {
  PROTO_INVEST_MOBILE_ARTICLE_AUDIO,
  PROTO_INVEST_MOBILE_TOC_ITEMS,
  PROTO_INVEST_MOBILE_TOC_LABEL,
} from "@/lib/proto-invest/proto-invest-content";

const PROTO_INVEST_MOBILE_TOC_LISTEN_LABEL = "Listen" as const;

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

function PauseIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path d="M2.75 2.1h1.65v6.8H2.75V2.1Zm3.85 0H8.25v6.8H6.6V2.1Z" fill="currentColor" />
    </svg>
  );
}

function ArticleListenPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioSrc = PROTO_INVEST_MOBILE_ARTICLE_AUDIO.src;
  const { title, narrators, duration } = PROTO_INVEST_MOBILE_ARTICLE_AUDIO;

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;
    if (audio.paused) {
      void audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <div className={PROTO_INVEST_MOBILE_TOC_AUDIO_DIVIDER_TW}>
      <p className={PROTO_INVEST_MOBILE_TOC_LISTEN_LABEL_TW}>{PROTO_INVEST_MOBILE_TOC_LISTEN_LABEL}</p>

      <div className={PROTO_INVEST_MOBILE_TOC_LISTEN_ROW_TW}>
        <button
          type="button"
          className={PROTO_INVEST_MOBILE_TOC_LISTEN_PLAY_TW}
          aria-label={isPlaying ? "Pause article recording" : "Play article recording"}
          onClick={togglePlayback}
          disabled={!audioSrc}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className={PROTO_INVEST_MOBILE_TOC_LISTEN_COPY_TW}>
          <span className={PROTO_INVEST_MOBILE_TOC_LISTEN_TITLE_TW}>{title}</span>
          <span className={PROTO_INVEST_MOBILE_TOC_LISTEN_META_TW}>{narrators}</span>
        </div>

        <span className={PROTO_INVEST_MOBILE_TOC_LISTEN_DURATION_TW} aria-hidden>
          {duration}
        </span>
      </div>

      {audioSrc ? (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          className="hidden"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      ) : null}
    </div>
  );
}

/** iPhone /about — compact in-page table of contents below the hero shader. */
export function ProtoInvestMobileTableOfContents() {
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

        <ArticleListenPlayer />
      </div>
    </nav>
  );
}
