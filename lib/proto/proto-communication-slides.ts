import {
  DOEPHONE_COMMUNICATION_SLIDES,
  type DoePhoneCommunicationSlide,
} from "@/lib/doephone/communication-carousel";

import { PROTO_PROTOTYPE_BACKDROP, PROTO_SHORTLIST_BACKDROP, PROTO_VALIDATE_BACKDROP } from "@/lib/proto/proto-communication-gradients";

/** /proto-only slide — not shown in the 3×2 Doe home carousel menu. */
export const PROTO_PROTOTYPE_SLIDE: DoePhoneCommunicationSlide = {
  id: "prototype",
  menuLabel: "Prototype",
  description:
    "Applicants submit prototypes that Proto routes through user feedback and in-product simulation before you commit to a build.",
  backdrop: PROTO_PROTOTYPE_BACKDROP,
};

/** /proto-only slide — validation band before the live shortlist. */
export const PROTO_VALIDATE_SLIDE: DoePhoneCommunicationSlide = {
  id: "validate",
  menuLabel: "Validate",
  description:
    "Proto stress-tests every submission against your rubric, replays how candidates worked, and flags what clears the bar before anyone lands on the shortlist.",
  backdrop: PROTO_VALIDATE_BACKDROP,
};

/** /proto-only slide — live ranked shortlist for hiring managers. */
export const PROTO_SHORTLIST_SLIDE: DoePhoneCommunicationSlide = {
  id: "shortlist",
  menuLabel: "Shortlist",
  description:
    "Proto keeps a live ranked list of every candidate who cleared your sandbox bar, refreshed as new work lands.",
  backdrop: PROTO_SHORTLIST_BACKDROP,
};

const DOEPHONE_SLIDE_BY_ID = Object.fromEntries(
  DOEPHONE_COMMUNICATION_SLIDES.map((slide) => [slide.id, slide]),
) as Record<(typeof DOEPHONE_COMMUNICATION_SLIDES)[number]["id"], DoePhoneCommunicationSlide>;

/** /proto feature stack order — submissions fit sits under the first hiring section. */
export const PROTO_COMMUNICATION_SLIDES: readonly DoePhoneCommunicationSlide[] = [
  DOEPHONE_SLIDE_BY_ID.agents,
  PROTO_PROTOTYPE_SLIDE,
  DOEPHONE_SLIDE_BY_ID.billing,
  DOEPHONE_SLIDE_BY_ID["front-desk"],
  DOEPHONE_SLIDE_BY_ID.inbox,
  DOEPHONE_SLIDE_BY_ID.ambient,
  DOEPHONE_SLIDE_BY_ID.integrate,
  PROTO_VALIDATE_SLIDE,
  PROTO_SHORTLIST_SLIDE,
];
