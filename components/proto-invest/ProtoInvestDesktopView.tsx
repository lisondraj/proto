"use client";

import { ArticleBarChart } from "@/components/blog/ArticleBarChart";
import { ArticlePieChart } from "@/components/blog/ArticlePieChart";
import { BlogHeroVisual } from "@/components/blog/BlogHeroVisual";
import { ProtoFooter } from "@/components/proto/ProtoFooter";
import { ProtoMoreAboutSection } from "@/components/proto/ProtoMoreAboutSection";
import {
  ProtoInvestDesktopBulletList,
  ProtoInvestDesktopParagraph,
} from "@/components/proto-invest/ProtoInvestDesktopArticleBlocks";
import { ProtoInvestDesktopFaqTabs } from "@/components/proto-invest/ProtoInvestDesktopFaqTabs";
import { ProtoInvestDesktopNav } from "@/components/proto-invest/ProtoInvestDesktopNav";
import { ProtoInvestDesktopSplitSection } from "@/components/proto-invest/ProtoInvestDesktopSplitSection";
import {
  ABOUT_DESKTOP_HERO_BYLINE_WRAP_TW,
  ABOUT_DESKTOP_HERO_WRAP,
  ABOUT_DESKTOP_SECTION_1_H,
  ABOUT_DESKTOP_SECTION_1_LAYOUT,
  ABOUT_DESKTOP_SECTION_2_CONTENT_GAP,
  ABOUT_DESKTOP_SECTION_2_STACK,
  ABOUT_DESKTOP_SQUARE_PANEL_TW,
  ABOUT_HERO_HEADLINE_WRAP,
  ABOUT_DESKTOP_HERO_HEADLINE_TOP,
  ABOUT_PAGE_SUBHEADING_LINES,
} from "@/lib/about/about-layout-styles";
import { ABOUT_PAGE_MOBILE_BYLINE, ABOUT_PAGE_MOBILE_DATE } from "@/lib/about/about-page-article";
import {
  PROTO_INVEST_BAR_CHART,
  PROTO_INVEST_FOUNDERS_PARAGRAPHS,
  PROTO_INVEST_INTRO,
  PROTO_INVEST_PIE_CHART,
  PROTO_INVEST_STAT_BULLETS,
} from "@/lib/proto-invest/proto-invest-content";
import {
  PROTO_INVEST_CHART_TITLE_TW,
  PROTO_INVEST_DESKTOP_CHART_CITATION_TW,
  PROTO_INVEST_DESKTOP_CONTENT_STACK_GAP,
  PROTO_INVEST_DESKTOP_HERO_BOX_TW,
  PROTO_INVEST_DESKTOP_HERO_BYLINE_TW,
  PROTO_INVEST_DESKTOP_HERO_DATE_TW,
  PROTO_INVEST_DESKTOP_SUBHEADING_TW,
  PROTO_INVEST_DESKTOP_TITLE_TW,
} from "@/lib/proto-invest/proto-invest-layout-styles";
import { PROTO_INVEST_PAGE_BG } from "@/lib/proto-invest/proto-invest-theme";
import { PROTO_FONT_CLASS } from "@/lib/proto/proto-font";
import {
  PROTO_ABOUT_HERO_BACKDROP,
  PROTO_DESKTOP_BACKDROP_GRADIENT_SCALE,
  PROTO_DESKTOP_BACKDROP_GRAIN_SIZE,
  PROTO_GRAIN_BG,
} from "@/lib/proto/proto-hero-backdrop";

/** Desktop /about — hero plus four alternating graphic-panel bands, then footer. */
export function ProtoInvestDesktopView() {
  const [foundersOne, foundersTwo] = PROTO_INVEST_FOUNDERS_PARAGRAPHS;

  return (
    <div className="proto-invest-desktop relative min-h-[100dvh]" style={{ backgroundColor: PROTO_INVEST_PAGE_BG }} data-doeforvc-view="desktop">
      <ProtoInvestDesktopNav />

      <main className={`proto-invest-main w-full ${PROTO_FONT_CLASS}`}>
        <section className={`${ABOUT_DESKTOP_SECTION_1_H} ${ABOUT_DESKTOP_SECTION_1_LAYOUT}`}>
          <div className={`${ABOUT_HERO_HEADLINE_WRAP} min-w-0 ${ABOUT_DESKTOP_HERO_HEADLINE_TOP}`}>
            <h1 className={PROTO_INVEST_DESKTOP_TITLE_TW}>
              <span className="block">Proto is changing the</span>
              <span className="block">way we hire talent</span>
            </h1>

            <p className={PROTO_INVEST_DESKTOP_SUBHEADING_TW}>
              <span className="block">{ABOUT_PAGE_SUBHEADING_LINES[0]}</span>
              <span className="block">{ABOUT_PAGE_SUBHEADING_LINES[1]}</span>
            </p>
          </div>

          <div className={ABOUT_DESKTOP_HERO_WRAP}>
            <BlogHeroVisual
              backdrop={PROTO_ABOUT_HERO_BACKDROP}
              variant="hero"
              boxClassName={PROTO_INVEST_DESKTOP_HERO_BOX_TW}
              gapClassName=""
              gradientScale={PROTO_DESKTOP_BACKDROP_GRADIENT_SCALE}
              grainBackgroundSize={PROTO_DESKTOP_BACKDROP_GRAIN_SIZE}
              grainBackgroundImage={PROTO_GRAIN_BG}
              hideGridOverlay
            >
              <div className={ABOUT_DESKTOP_HERO_BYLINE_WRAP_TW}>
                <p className={PROTO_INVEST_DESKTOP_HERO_BYLINE_TW}>{ABOUT_PAGE_MOBILE_BYLINE}</p>
                <p className={PROTO_INVEST_DESKTOP_HERO_DATE_TW}>{ABOUT_PAGE_MOBILE_DATE}</p>
              </div>
            </BlogHeroVisual>
          </div>
        </section>

        <ProtoInvestDesktopSplitSection boxSide="right" graphic={0} textFill boxBleedToMargin>
          <div className={`${ABOUT_DESKTOP_SQUARE_PANEL_TW} min-h-0`}>
            <div className={ABOUT_DESKTOP_SECTION_2_STACK}>
              <div className={`flex min-h-0 flex-1 flex-col justify-center ${ABOUT_DESKTOP_SECTION_2_CONTENT_GAP}`}>
                <ProtoInvestDesktopParagraph text={PROTO_INVEST_INTRO} />
                <ProtoInvestDesktopBulletList items={PROTO_INVEST_STAT_BULLETS} />
              </div>
              <ArticlePieChart
                title={PROTO_INVEST_PIE_CHART.title}
                caption={PROTO_INVEST_PIE_CHART.caption}
                citation={PROTO_INVEST_PIE_CHART.citation}
                slices={PROTO_INVEST_PIE_CHART.slices}
                layout="desktop"
                embedded
                compact
                theme="proto"
                titleClassName={PROTO_INVEST_CHART_TITLE_TW}
              />
            </div>
          </div>
        </ProtoInvestDesktopSplitSection>

        <ProtoInvestDesktopSplitSection boxSide="left" graphic={1} boxBleedToMargin>
          <div className={`flex flex-col ${PROTO_INVEST_DESKTOP_CONTENT_STACK_GAP}`}>
            <ProtoInvestDesktopParagraph text={foundersOne} />
            <ProtoInvestDesktopParagraph text={foundersTwo} />
          </div>
        </ProtoInvestDesktopSplitSection>

        <ProtoInvestDesktopSplitSection boxSide="right" graphic={2} textFill boxBleedToMargin>
          <ProtoInvestDesktopFaqTabs />
        </ProtoInvestDesktopSplitSection>

        <ProtoInvestDesktopSplitSection boxSide="left" graphic={3}>
          <div className={`flex flex-col ${PROTO_INVEST_DESKTOP_CONTENT_STACK_GAP}`}>
            <ArticleBarChart
              title={PROTO_INVEST_BAR_CHART.title}
              caption={PROTO_INVEST_BAR_CHART.caption}
              citation={PROTO_INVEST_BAR_CHART.citation}
              bars={PROTO_INVEST_BAR_CHART.bars}
              layout="desktop"
              embedded
              theme="proto"
              titleClassName={PROTO_INVEST_CHART_TITLE_TW}
            />
            <p className={PROTO_INVEST_DESKTOP_CHART_CITATION_TW}>{PROTO_INVEST_BAR_CHART.citation}</p>
          </div>
        </ProtoInvestDesktopSplitSection>
      </main>

      <ProtoMoreAboutSection layout="desktop" />

      <ProtoFooter layout="desktop" />
    </div>
  );
}
