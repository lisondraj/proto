"use client";

import {
  PROTO_INVEST_DESKTOP_BODY_TW,
  PROTO_INVEST_DESKTOP_BULLET_TW,
  PROTO_INVEST_DESKTOP_LIST_GAP,
} from "@/lib/proto-invest/proto-invest-layout-styles";

export function ProtoInvestDesktopParagraph({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return <p className={`${PROTO_INVEST_DESKTOP_BODY_TW} ${className}`.trim()}>{text}</p>;
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
