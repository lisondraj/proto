"use client";

import { ProtoMoreAboutCard } from "@/components/proto/ProtoMoreAboutCard";
import {
  PROTO_MORE_ABOUT_CARD_DESKTOP_TW,
  PROTO_MORE_ABOUT_CARD_PHONE_TW,
  PROTO_MORE_ABOUT_DESKTOP_INSET_X,
  PROTO_MORE_ABOUT_DESKTOP_TRACK_END_SPACER,
  PROTO_MORE_ABOUT_DESKTOP_TRACK_START_SPACER,
  PROTO_MORE_ABOUT_PHONE_INSET_X,
  PROTO_MORE_ABOUT_PHONE_TRACK_END_SPACER,
  PROTO_MORE_ABOUT_PHONE_TRACK_START_SPACER,
  PROTO_MORE_ABOUT_SECTION_PAD_Y,
  PROTO_MORE_ABOUT_SECTION_TITLE_DESKTOP_TW,
  PROTO_MORE_ABOUT_SECTION_TITLE_PHONE_TW,
  PROTO_MORE_ABOUT_TITLE_TO_TRACK_GAP,
  PROTO_MORE_ABOUT_TRACK_DESKTOP_TW,
  PROTO_MORE_ABOUT_TRACK_PHONE_TW,
} from "@/lib/proto/proto-more-about-layout-styles";
import { PROTO_MORE_ABOUT_POSTS } from "@/lib/proto/proto-more-about-posts";

/** /proto home — horizontal "More about Proto" post row above the footer. */
export function ProtoMoreAboutSection({ layout = "phone" }: { layout?: "phone" | "desktop" }) {
  const isDesktop = layout === "desktop";
  const insetX = isDesktop ? PROTO_MORE_ABOUT_DESKTOP_INSET_X : PROTO_MORE_ABOUT_PHONE_INSET_X;
  const trackStartSpacer = isDesktop
    ? PROTO_MORE_ABOUT_DESKTOP_TRACK_START_SPACER
    : PROTO_MORE_ABOUT_PHONE_TRACK_START_SPACER;
  const trackEndSpacer = isDesktop
    ? PROTO_MORE_ABOUT_DESKTOP_TRACK_END_SPACER
    : PROTO_MORE_ABOUT_PHONE_TRACK_END_SPACER;
  const cardClass = isDesktop ? PROTO_MORE_ABOUT_CARD_DESKTOP_TW : PROTO_MORE_ABOUT_CARD_PHONE_TW;
  const trackClass = isDesktop ? PROTO_MORE_ABOUT_TRACK_DESKTOP_TW : PROTO_MORE_ABOUT_TRACK_PHONE_TW;

  return (
    <section className={`proto-more-about w-full bg-[#121819] ${PROTO_MORE_ABOUT_SECTION_PAD_Y}`} aria-label="More about Proto">
      <div className={`${insetX} ${PROTO_MORE_ABOUT_TITLE_TO_TRACK_GAP}`}>
        <h2 className={isDesktop ? PROTO_MORE_ABOUT_SECTION_TITLE_DESKTOP_TW : PROTO_MORE_ABOUT_SECTION_TITLE_PHONE_TW}>
          More about Proto
        </h2>
      </div>

      <div className={trackClass}>
        <div className={trackStartSpacer} aria-hidden />
        {PROTO_MORE_ABOUT_POSTS.map((post) => (
          <div key={post.id} className={cardClass}>
            <ProtoMoreAboutCard post={post} layout={layout} />
          </div>
        ))}
        <div className={trackEndSpacer} aria-hidden />
      </div>
    </section>
  );
}
