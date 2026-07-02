"use client";

import Link from "next/link";

import { DOEPHONE_FOOTER_CONTENT_INSET } from "@/lib/doephone/section-styles";
import {
  PROTO_DESKTOP_FOOTER_COLUMN_LINK_TW,
  PROTO_DESKTOP_FOOTER_COLUMN_TITLE_TW,
  PROTO_DESKTOP_FOOTER_CORP_BRAND_TW,
  PROTO_DESKTOP_FOOTER_CORP_LINE_TW,
  PROTO_DESKTOP_FOOTER_NAV_GAP,
  PROTO_DESKTOP_FOOTER_PAD_Y,
  PROTO_DESKTOP_FOOTER_ROW_GAP,
  PROTO_DESKTOP_PAGE_INSET_X,
} from "@/lib/proto/proto-desktop-layout-styles";
import { PROTO_FONT_CLASS } from "@/lib/proto/proto-font";
import { PROTO_INVEST_PATH } from "@/lib/site-domains";
import { ProtoFooterWordmark } from "@/components/proto/ProtoFooterWordmark";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/#recruit", label: "Recruit talent" },
      { href: "/#sandbox", label: "Sandbox hiring" },
      { href: "/#validate", label: "Validate submissions" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Proto" },
      { href: PROTO_INVEST_PATH, label: "For Investors" },
      { href: "mailto:ask@proto.jobs", label: "Contact" },
    ],
  },
] as const;

function FooterColumns({
  titleClassName,
  linkClassName,
}: {
  titleClassName?: string;
  linkClassName?: string;
}) {
  return (
    <>
      {FOOTER_COLUMNS.map((column) => (
        <div key={column.title} className="proto-footer-column min-w-0">
          <p className={`proto-footer-column__title font-semibold text-white ${titleClassName ?? ""}`.trim()}>
            {column.title}
          </p>
          <nav className="proto-footer-column__links mt-3 flex flex-col gap-2" aria-label={column.title}>
            {column.links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`proto-footer-column__link text-white/88 no-underline transition-colors hover:text-white ${linkClassName ?? ""}`.trim()}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </>
  );
}

function ProtoFooterDesktop() {
  return (
    <footer className="proto-footer relative z-10 mt-0 w-full overflow-visible pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">
      <div
        className={`proto-footer-inner proto-footer-inner--desktop flex w-full items-end justify-between ${PROTO_DESKTOP_FOOTER_ROW_GAP} ${PROTO_DESKTOP_PAGE_INSET_X} ${PROTO_DESKTOP_FOOTER_PAD_Y}`}
      >
        <div className="proto-footer-desktop-brand shrink-0">
          <ProtoFooterWordmark layout="desktop" />
        </div>

        <div className={`proto-footer-desktop-nav flex shrink-0 items-start ${PROTO_DESKTOP_FOOTER_NAV_GAP}`}>
          <div className={`proto-footer-corp min-w-0 text-left ${PROTO_FONT_CLASS}`}>
            <p className={`proto-footer-contact__brand ${PROTO_DESKTOP_FOOTER_CORP_BRAND_TW}`}>Proto</p>
            <p className={`proto-footer-contact__line mt-2.5 ${PROTO_DESKTOP_FOOTER_CORP_LINE_TW}`}>
              Delaware C-Corporation
            </p>
            <a
              href="mailto:ask@proto.jobs"
              className={`proto-footer-contact__email proto-footer-contact__line mt-2.5 inline-block ${PROTO_DESKTOP_FOOTER_CORP_LINE_TW}`}
            >
              ask@proto.jobs
            </a>
          </div>

          <FooterColumns
            titleClassName={PROTO_DESKTOP_FOOTER_COLUMN_TITLE_TW}
            linkClassName={PROTO_DESKTOP_FOOTER_COLUMN_LINK_TW}
          />
        </div>
      </div>
    </footer>
  );
}

function ProtoFooterPhone() {
  return (
    <footer className="proto-footer relative z-10 mt-0 w-full overflow-visible pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">
      <div className="proto-footer-inner relative z-10 flex w-full flex-col">
        <div className={`proto-footer-main w-full ${DOEPHONE_FOOTER_CONTENT_INSET}`}>
          <div className={`proto-footer-contact min-w-0 text-left text-white ${PROTO_FONT_CLASS}`}>
            <p className="proto-footer-contact__brand font-semibold leading-[1.16]">Proto</p>
            <p className="proto-footer-contact__line mt-3 text-white/88">Delaware C-Corporation</p>
            <a
              href="mailto:ask@proto.jobs"
              className="proto-footer-contact__email proto-footer-contact__line mt-3 inline-block text-white/88 no-underline transition-colors hover:text-white"
            >
              ask@proto.jobs
            </a>

            <div className="proto-footer-columns grid grid-cols-2 gap-x-10 gap-y-6 iphone-page:gap-x-8">
              <FooterColumns />
            </div>
          </div>
        </div>

        <ProtoFooterWordmark />
      </div>
    </footer>
  );
}

/** Footer — proto page background; horizontal rule + wordmark. */
export function ProtoFooter({ layout = "phone" }: { layout?: "phone" | "desktop" }) {
  return layout === "desktop" ? <ProtoFooterDesktop /> : <ProtoFooterPhone />;
}
