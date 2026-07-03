"use client";

import {
  PROTO_INVEST_BODY_TW,
  PROTO_INVEST_DESKTOP_BODY_TW,
  PROTO_INVEST_DESKTOP_BULLET_TW,
  PROTO_INVEST_DESKTOP_FAQ_ANSWER_BODY_TW,
  PROTO_INVEST_DESKTOP_FAQ_ANSWER_TW,
  PROTO_INVEST_DESKTOP_FAQ_BULLET_LIST_GAP,
  PROTO_INVEST_DESKTOP_LIST_GAP,
  PROTO_INVEST_FAQ_ANSWER_BODY_TW,
  PROTO_INVEST_FAQ_ANSWER_TW,
  PROTO_INVEST_FAQ_BULLET_LIST_GAP,
  PROTO_INVEST_LIST_GAP,
} from "@/lib/proto-invest/proto-invest-layout-styles";
import type { ProtoInvestLabeledBullet } from "@/lib/proto-invest/proto-invest-content";

export function ProtoInvestDesktopParagraph({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return <p className={`${PROTO_INVEST_DESKTOP_BODY_TW} ${className}`.trim()}>{text}</p>;
}

export function ProtoInvestIntroLead({
  lines,
  layout = "mobile",
  className = "",
}: {
  lines: readonly string[];
  layout?: "mobile" | "desktop";
  className?: string;
}) {
  const bodyTw = layout === "desktop" ? PROTO_INVEST_DESKTOP_BODY_TW : PROTO_INVEST_BODY_TW;

  return (
    <p className={`${bodyTw} font-semibold text-white ${className}`.trim()}>
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </p>
  );
}

export function ProtoInvestFaqAnswerBody({
  answer,
  bullets,
  bulletColumns = 1,
  bulletsAfterParagraphs = 1,
  layout = "mobile",
}: {
  answer: string | readonly string[];
  bullets?: readonly string[];
  bulletColumns?: 1 | 2;
  bulletsAfterParagraphs?: number;
  layout?: "mobile" | "desktop";
}) {
  const paragraphs = Array.isArray(answer) ? answer : [answer];
  const splitAt = Math.min(Math.max(bulletsAfterParagraphs, 1), paragraphs.length);
  const beforeBullets = paragraphs.slice(0, splitAt);
  const afterBullets = paragraphs.slice(splitAt);
  const answerWrapTw = layout === "desktop" ? PROTO_INVEST_DESKTOP_FAQ_ANSWER_TW : PROTO_INVEST_FAQ_ANSWER_TW;
  const bodyTw = layout === "desktop" ? PROTO_INVEST_DESKTOP_FAQ_ANSWER_BODY_TW : PROTO_INVEST_FAQ_ANSWER_BODY_TW;
  const faqBulletListGap =
    layout === "desktop" ? PROTO_INVEST_DESKTOP_FAQ_BULLET_LIST_GAP : PROTO_INVEST_FAQ_BULLET_LIST_GAP;
  const bulletDotTw =
    layout === "desktop"
      ? "h-[0.45em] w-[0.45em] shrink-0 rounded-full bg-[#E7A944]"
      : "h-[0.5em] w-[0.5em] shrink-0 rounded-full bg-[#E7A944]";
  const paragraphMt = layout === "desktop" ? " mt-3 md:mt-3.5" : " mt-3 iphone-page:mt-3.5";
  const bulletsMt = layout === "desktop" ? "mt-3 md:mt-3.5" : "mt-3 iphone-page:mt-3.5";
  const bulletsListTw =
    bulletColumns === 2
      ? `grid grid-cols-2 gap-x-4 gap-y-1.5 md:gap-x-5 md:gap-y-2 iphone-page:gap-x-3.5 iphone-page:gap-y-1`
      : `${faqBulletListGap} pl-5 md:pl-6 iphone-page:pl-4`;

  return (
    <div className={answerWrapTw}>
      {beforeBullets.map((paragraph, i) => (
        <p key={i} className={`${bodyTw}${i > 0 ? paragraphMt : ""}`}>
          {paragraph}
        </p>
      ))}
      {bullets && bullets.length > 0 ? (
        <ul className={`${bulletsListTw} ${bulletsMt} list-none pl-0`}>
          {bullets.map((item) => (
            <li key={item} className={`grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 ${bodyTw}`}>
              <span className="flex h-[1lh] items-center" aria-hidden>
                <span className={bulletDotTw} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {afterBullets.map((paragraph, i) => (
        <p key={i} className={`${bodyTw}${paragraphMt}`}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function ProtoInvestDesktopBulletList({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={`${PROTO_INVEST_DESKTOP_LIST_GAP} list-none pl-0 ${className}`.trim()}>
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-3 ${PROTO_INVEST_DESKTOP_BODY_TW}`}>
          <span className={PROTO_INVEST_DESKTOP_BULLET_TW} aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProtoInvestLabeledBulletList({
  lead,
  bullets,
  layout = "mobile",
  className = "",
}: {
  lead: string;
  bullets: readonly ProtoInvestLabeledBullet[];
  layout?: "mobile" | "desktop";
  className?: string;
}) {
  const bodyTw = layout === "desktop" ? PROTO_INVEST_DESKTOP_BODY_TW : PROTO_INVEST_BODY_TW;
  const listGap = layout === "desktop" ? PROTO_INVEST_DESKTOP_LIST_GAP : PROTO_INVEST_LIST_GAP;
  const bulletDotTw =
    layout === "desktop"
      ? "h-[0.45em] w-[0.45em] shrink-0 rounded-full bg-[#E7A944]"
      : "h-[0.5em] w-[0.5em] shrink-0 rounded-full bg-[#E7A944]";

  return (
    <div className={className}>
      <p className={bodyTw}>
        <span className="font-semibold text-white">{lead}</span>
      </p>
      <ul className={`${listGap} mt-3 list-none pl-0 md:mt-3.5`}>
        {bullets.map((item) => (
          <li key={item.label} className={`grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 ${bodyTw}`}>
            <span className="flex h-[1lh] items-center" aria-hidden>
              <span className={bulletDotTw} />
            </span>
            <span>
              <span className="font-semibold text-white">{item.label}:</span> {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
