"use client";

import { ProtoInvestGraphicPanel } from "@/components/proto-invest/ProtoInvestGraphicPanel";
import {
  ABOUT_DESKTOP_SECTION_H,
  ABOUT_DESKTOP_SPLIT_BOX_COLUMN,
  ABOUT_DESKTOP_SPLIT_BOX_COLUMN_LEFT_BLEED,
  ABOUT_DESKTOP_SPLIT_BOX_COLUMN_RIGHT_BLEED,
  ABOUT_DESKTOP_SPLIT_SECTION_GRID,
  ABOUT_DESKTOP_SPLIT_SECTION_GRID_BLEED,
  ABOUT_DESKTOP_SPLIT_TEXT_COLUMN_FAQ,
  ABOUT_DESKTOP_SPLIT_TEXT_COLUMN_FAQ_BLEED,
  ABOUT_DESKTOP_SPLIT_TEXT_COLUMN_LEFT,
  ABOUT_DESKTOP_SPLIT_TEXT_COLUMN_LEFT_BLEED,
  ABOUT_DESKTOP_SPLIT_TEXT_COLUMN_RIGHT,
  ABOUT_DESKTOP_SPLIT_TEXT_COLUMN_RIGHT_BLEED,
} from "@/lib/about/about-layout-styles";
import { PROTO_INVEST_DESKTOP_GRAPHIC_PANEL_TW, PROTO_INVEST_SECTION_ANCHOR } from "@/lib/proto-invest/proto-invest-layout-styles";
import type { ReactNode } from "react";

/** Full-height /about band — text column plus square proto graphic panel. */
export function ProtoInvestDesktopSplitSection({
  boxSide,
  graphic,
  textFill = false,
  boxBleedToMargin = false,
  sectionId,
  children,
}: {
  boxSide: "left" | "right";
  graphic: 0 | 1 | 2 | 3;
  textFill?: boolean;
  boxBleedToMargin?: boolean;
  sectionId?: string;
  children: ReactNode;
}) {
  const gridClass = boxBleedToMargin
    ? ABOUT_DESKTOP_SPLIT_SECTION_GRID_BLEED
    : ABOUT_DESKTOP_SPLIT_SECTION_GRID;

  const textColumnClass = boxBleedToMargin
    ? textFill
      ? ABOUT_DESKTOP_SPLIT_TEXT_COLUMN_FAQ_BLEED
      : boxSide === "right"
        ? ABOUT_DESKTOP_SPLIT_TEXT_COLUMN_LEFT_BLEED
        : ABOUT_DESKTOP_SPLIT_TEXT_COLUMN_RIGHT_BLEED
    : textFill
      ? ABOUT_DESKTOP_SPLIT_TEXT_COLUMN_FAQ
      : boxSide === "right"
        ? ABOUT_DESKTOP_SPLIT_TEXT_COLUMN_LEFT
        : ABOUT_DESKTOP_SPLIT_TEXT_COLUMN_RIGHT;

  const boxColumnClass = boxBleedToMargin
    ? boxSide === "right"
      ? ABOUT_DESKTOP_SPLIT_BOX_COLUMN_RIGHT_BLEED
      : ABOUT_DESKTOP_SPLIT_BOX_COLUMN_LEFT_BLEED
    : ABOUT_DESKTOP_SPLIT_BOX_COLUMN;

  const textColumn = <div className={textColumnClass}>{children}</div>;
  const boxColumn = (
    <div className={boxColumnClass}>
      <ProtoInvestGraphicPanel graphic={graphic} className={PROTO_INVEST_DESKTOP_GRAPHIC_PANEL_TW} />
    </div>
  );

  return (
    <section id={sectionId} className={`${sectionId ? PROTO_INVEST_SECTION_ANCHOR : ""} ${ABOUT_DESKTOP_SECTION_H}`}>
      <div className={gridClass}>
        {boxSide === "left" ? (
          <>
            {boxColumn}
            {textColumn}
          </>
        ) : (
          <>
            {textColumn}
            {boxColumn}
          </>
        )}
      </div>
    </section>
  );
}
