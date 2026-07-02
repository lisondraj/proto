"use client";

import { ProtoInvestGraphicPanel } from "@/components/proto-invest/ProtoInvestGraphicPanel";
import type { ProtoMoreAboutPost } from "@/lib/proto/proto-more-about-posts";
import {
  PROTO_MORE_ABOUT_CARD_META_DESKTOP_TW,
  PROTO_MORE_ABOUT_CARD_META_PHONE_TW,
  PROTO_MORE_ABOUT_CARD_PANEL_DESKTOP_TW,
  PROTO_MORE_ABOUT_CARD_PANEL_TW,
  PROTO_MORE_ABOUT_CARD_TITLE_DESKTOP_TW,
  PROTO_MORE_ABOUT_CARD_TITLE_PHONE_TW,
} from "@/lib/proto/proto-more-about-layout-styles";

/** One dark line-art panel card with title and author/date — not linked yet. */
export function ProtoMoreAboutCard({
  post,
  layout = "phone",
}: {
  post: ProtoMoreAboutPost;
  layout?: "phone" | "desktop";
}) {
  const isDesktop = layout === "desktop";

  return (
    <article className="proto-more-about__card-inner min-w-0">
      <ProtoInvestGraphicPanel
        graphic={post.graphic}
        className={isDesktop ? PROTO_MORE_ABOUT_CARD_PANEL_DESKTOP_TW : PROTO_MORE_ABOUT_CARD_PANEL_TW}
      />
      <h3 className={isDesktop ? PROTO_MORE_ABOUT_CARD_TITLE_DESKTOP_TW : PROTO_MORE_ABOUT_CARD_TITLE_PHONE_TW}>
        {post.title}
      </h3>
      <p className={isDesktop ? PROTO_MORE_ABOUT_CARD_META_DESKTOP_TW : PROTO_MORE_ABOUT_CARD_META_PHONE_TW}>
        {post.credit} · {post.date}
      </p>
    </article>
  );
}
