"use client";

import { BlogHeroVisual } from "@/components/blog/BlogHeroVisual";
import { ProtoInvestIntroLead, ProtoInvestLabeledBulletList } from "@/components/proto-invest/ProtoInvestDesktopArticleBlocks";
import { ProtoInvestGraphicPanel } from "@/components/proto-invest/ProtoInvestGraphicPanel";
import { ProtoInvestProductShaderPanel } from "@/components/proto-invest/ProtoInvestProductShaderPanel";
import { ProtoInvestProductStackBoxes } from "@/components/proto-invest/ProtoInvestProductStackBoxes";
import { ProtoInvestProductTeamGrid } from "@/components/proto-invest/ProtoInvestProductTeamGrid";
import { ProtoInvestMobileAiAdoptionChart } from "@/components/proto-invest/ProtoInvestMobileAiAdoptionChart";
import { ProtoInvestMobileFaqTabs } from "@/components/proto-invest/ProtoInvestMobileFaqTabs";
import { ProtoInvestMobileQuote } from "@/components/proto-invest/ProtoInvestMobileQuote";
import { ProtoInvestMobileStatCharts } from "@/components/proto-invest/ProtoInvestMobileStatCharts";
import { ProtoInvestMobileTableOfContents } from "@/components/proto-invest/ProtoInvestMobileTableOfContents";
import { ProtoInvestMobileTamChart } from "@/components/proto-invest/ProtoInvestMobileTamChart";
import { ABOUT_PAGE_MOBILE_BYLINE, ABOUT_PAGE_MOBILE_DATE } from "@/lib/about/about-page-article";
import { ABOUT_PAGE_SUBHEADING_LINES } from "@/lib/about/about-layout-styles";
import {
  PROTO_INVEST_BODY_TW,
  PROTO_INVEST_BYLINE_GAP,
  PROTO_INVEST_BYLINE_TW,
  PROTO_INVEST_CONTENT_GAP,
  PROTO_INVEST_ARTICLE_TOP_PT,
  PROTO_INVEST_HERO_AFTER_BYLINE,
  PROTO_INVEST_HERO_BOX_TW,
  PROTO_INVEST_SECTION_ANCHOR,
  PROTO_INVEST_HERO_HEADLINE_PT,
  PROTO_INVEST_HERO_HEADLINE_WRAP,
  PROTO_INVEST_MAIN_PB,
  PROTO_INVEST_PAGE_INSET_X,
  PROTO_INVEST_PRODUCT_SHADER_PANEL_TW,
  PROTO_INVEST_PRODUCT_PANEL_STACK_WRAP,
  PROTO_INVEST_SECTION_GAP,
  PROTO_INVEST_SECTION_HEADLINE_TW,
  PROTO_INVEST_SUBHEADING_TW,
  PROTO_INVEST_TITLE_TW,
} from "@/lib/proto-invest/proto-invest-layout-styles";
import {
  PROTO_INVEST_MOBILE_SECTION_IDS,
  PROTO_INVEST_FOUNDERS_HEADLINE_LINES,
  PROTO_INVEST_FOUNDERS_PARAGRAPHS,
  PROTO_INVEST_FOUNDERS_QUOTE,
  PROTO_INVEST_FAQ_HEADLINE_LINES,
  PROTO_INVEST_INTRO_LEAD_LINES,
  PROTO_INVEST_INTRO_PARAGRAPHS,
  PROTO_INVEST_RECRUITER_SECTION,
  PROTO_INVEST_THINKING_BEYOND_HEADLINE_LINES,
  PROTO_INVEST_THINKING_BEYOND_PARAGRAPH,
} from "@/lib/proto-invest/proto-invest-content";
/** /proto-invest — Proto hiring platform investor article in proto dark styling. */
export function ProtoInvestMobileContent() {
  const foundersParagraphs = PROTO_INVEST_FOUNDERS_PARAGRAPHS;

  return (
    <main className={`proto-invest-main w-full ${PROTO_INVEST_MAIN_PB} ${PROTO_INVEST_PAGE_INSET_X}`}>
      <div className={`${PROTO_INVEST_HERO_HEADLINE_WRAP} ${PROTO_INVEST_ARTICLE_TOP_PT} ${PROTO_INVEST_HERO_HEADLINE_PT}`}>
        <h1 className={PROTO_INVEST_TITLE_TW}>
          <span className="block">Proto is changing the</span>
          <span className="block">way we hire talent.</span>
        </h1>

        <p className={PROTO_INVEST_SUBHEADING_TW}>
          <span className="block">{ABOUT_PAGE_SUBHEADING_LINES[0]}</span>
          <span className="block">{ABOUT_PAGE_SUBHEADING_LINES[1]}</span>
        </p>
      </div>

      <p className={`${PROTO_INVEST_BYLINE_TW} ${PROTO_INVEST_BYLINE_GAP}`}>
        {ABOUT_PAGE_MOBILE_BYLINE}
        <span className="mx-2" aria-hidden>
          ·
        </span>
        {ABOUT_PAGE_MOBILE_DATE}
      </p>

      <div className={`${PROTO_INVEST_HERO_AFTER_BYLINE} ${PROTO_INVEST_PRODUCT_PANEL_STACK_WRAP}`}>
        <BlogHeroVisual
          variant="hero"
          boxClassName={PROTO_INVEST_HERO_BOX_TW}
          gapClassName=""
          protoShaderVariant="about-hero"
        />

        <ProtoInvestMobileTableOfContents />
      </div>

      <div className={PROTO_INVEST_SECTION_GAP}>
        <div
          id={PROTO_INVEST_MOBILE_SECTION_IDS.introduction}
          className={`${PROTO_INVEST_CONTENT_GAP} ${PROTO_INVEST_SECTION_ANCHOR}`}
        >
          <ProtoInvestIntroLead lines={PROTO_INVEST_INTRO_LEAD_LINES} />
          {PROTO_INVEST_INTRO_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className={PROTO_INVEST_BODY_TW}>
              {paragraph}
            </p>
          ))}
          <ProtoInvestLabeledBulletList
            lead={PROTO_INVEST_RECRUITER_SECTION.lead}
            bullets={PROTO_INVEST_RECRUITER_SECTION.bullets}
          />
        </div>

        <div className={PROTO_INVEST_PRODUCT_PANEL_STACK_WRAP}>
          <ProtoInvestProductTeamGrid />
          <div
            id={PROTO_INVEST_MOBILE_SECTION_IDS.product}
            className={PROTO_INVEST_SECTION_ANCHOR}
          >
            <ProtoInvestProductShaderPanel className={PROTO_INVEST_PRODUCT_SHADER_PANEL_TW} />
          </div>
          <ProtoInvestProductStackBoxes />
        </div>

        <h2
          id={PROTO_INVEST_MOBILE_SECTION_IDS.founders}
          className={`${PROTO_INVEST_SECTION_HEADLINE_TW} ${PROTO_INVEST_SECTION_ANCHOR}`}
        >
          <span className="block">{PROTO_INVEST_FOUNDERS_HEADLINE_LINES[0]}</span>
          <span className="block">{PROTO_INVEST_FOUNDERS_HEADLINE_LINES[1]}</span>
        </h2>

        <div className={PROTO_INVEST_CONTENT_GAP}>
          {foundersParagraphs.map((paragraph) => (
            <p key={paragraph} className={PROTO_INVEST_BODY_TW}>
              {paragraph}
            </p>
          ))}
        </div>

        <ProtoInvestMobileQuote
          text={PROTO_INVEST_FOUNDERS_QUOTE.text}
          attribution={PROTO_INVEST_FOUNDERS_QUOTE.attribution}
        />

        <ProtoInvestGraphicPanel graphic={1} />

        <h2
          id={PROTO_INVEST_MOBILE_SECTION_IDS.productMarket}
          className={`${PROTO_INVEST_SECTION_HEADLINE_TW} ${PROTO_INVEST_SECTION_ANCHOR}`}
        >
          <span className="block">{PROTO_INVEST_FAQ_HEADLINE_LINES[0]}</span>
          <span className="block">{PROTO_INVEST_FAQ_HEADLINE_LINES[1]}</span>
        </h2>

        <ProtoInvestMobileFaqTabs />

        <ProtoInvestMobileTamChart />

        <h2
          id={PROTO_INVEST_MOBILE_SECTION_IDS.beyondProto}
          className={`${PROTO_INVEST_SECTION_HEADLINE_TW} ${PROTO_INVEST_SECTION_ANCHOR}`}
        >
          <span className="block">{PROTO_INVEST_THINKING_BEYOND_HEADLINE_LINES[0]}</span>
          <span className="block">{PROTO_INVEST_THINKING_BEYOND_HEADLINE_LINES[1]}</span>
        </h2>

        <p className={PROTO_INVEST_BODY_TW}>{PROTO_INVEST_THINKING_BEYOND_PARAGRAPH}</p>

        <ProtoInvestMobileStatCharts />

        <ProtoInvestMobileAiAdoptionChart />
      </div>
    </main>
  );
}
