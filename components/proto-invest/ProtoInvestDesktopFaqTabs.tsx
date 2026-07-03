"use client";

import { useState } from "react";

import {
  ABOUT_DESKTOP_FAQ_LIST_TW,
  ABOUT_DESKTOP_FAQ_PANEL_TW,
} from "@/lib/about/about-layout-styles";
import { PROTO_INVEST_DESKTOP_FAQ_ITEM_TW } from "@/lib/proto-invest/proto-invest-layout-styles";
import { PROTO_INVEST_FAQ_ITEMS } from "@/lib/proto-invest/proto-invest-content";
import { ProtoInvestFaqAnswerBody } from "@/components/proto-invest/ProtoInvestDesktopArticleBlocks";

/** Desktop /about — expandable FAQ tabs beside the graphic panel. */
export function ProtoInvestDesktopFaqTabs() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={`${ABOUT_DESKTOP_FAQ_PANEL_TW} min-h-0`}>
      <div className={ABOUT_DESKTOP_FAQ_LIST_TW}>
        {PROTO_INVEST_FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question}
              className={`flex min-h-0 basis-0 flex-col overflow-hidden border-t transition-[flex-grow,border-color] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "grow-[1.85]" : "grow"
              } ${
                isOpen ? "border-[#2A3538]" : index > 0 ? "border-[#2A3538]/60" : "border-transparent"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(index)}
                className={`w-full text-left transition-[color,font-weight] duration-300 ease-out ${
                  isOpen
                    ? "shrink-0 pt-4 font-medium text-white md:pt-5"
                    : "flex min-h-0 flex-1 items-center font-normal text-white/45 hover:text-white/70"
                } ${PROTO_INVEST_DESKTOP_FAQ_ITEM_TW}`}
              >
                {item.question}
              </button>

              <div
                className={`grid min-h-0 transition-[grid-template-rows,opacity,flex-grow] duration-300 ease-out motion-reduce:transition-none ${
                  isOpen ? "grid-rows-[1fr] flex-1 opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ProtoInvestFaqAnswerBody
                    answer={item.answer}
                    bullets={item.bullets}
                    bulletColumns={item.bulletColumns}
                    bulletsAfterParagraphs={item.bulletsAfterParagraphs}
                    layout="desktop"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
