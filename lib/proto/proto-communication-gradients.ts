/** Reception reference palette — reused across section 2 slide shapes. */
import type { WorkflowCarouselGridKind } from "@/lib/workflow-carousel-design-backdrops";

/** Aurora palette — ink through electric sky into coral-gold (shared across hero + feature boxes). */
export const PROTO_RECEPTION_PALETTE = {
  lightYellow: "#FFE08A",
  wheat: "#FFC960",
  gold: "#FFAA35",
  copper: "#E45B52",
  blue: "#3A9FD4",
  deep: "#0B1528",
} as const;

/** Reception hex grid — same line overlay as the front-desk (The phone won't stop) slide. */
export const PROTO_LINE_GRID = "hex" as const;

/** Humira / TELUS — aurora bridge tones between ink and sky. */
export const PROTO_HUMIRA_COLORS = {
  deep: PROTO_RECEPTION_PALETTE.deep,
  bridgeDeep: "#162A48",
  blue: PROTO_RECEPTION_PALETTE.blue,
  bridgeBlue: "#5CB8E8",
  copper: PROTO_RECEPTION_PALETTE.copper,
  amber: "#F07840",
  gold: PROTO_RECEPTION_PALETTE.gold,
  wheat: PROTO_RECEPTION_PALETTE.wheat,
} as const;

/** Agents roster — teal mid-tone; linear 225° (not center radial). */
const PROTO_AGENTS_MID_BLUE = "#1F5A7A";

/** Every colour in the phone won't stop (front-desk) gradient — shared across billing + integrate. */
const PROTO_RECEPTION_FULL_STOPS = [
  `${PROTO_RECEPTION_PALETTE.lightYellow} 0%`,
  `${PROTO_RECEPTION_PALETTE.wheat} 15%`,
  `${PROTO_RECEPTION_PALETTE.gold} 30%`,
  `${PROTO_RECEPTION_PALETTE.copper} 45%`,
  `${PROTO_RECEPTION_PALETTE.blue} 60%`,
  `${PROTO_AGENTS_MID_BLUE} 75%`,
  `${PROTO_RECEPTION_PALETTE.deep} 100%`,
].join(", ");

const PROTO_AGENTS_GRADIENT = `linear-gradient(225deg, ${PROTO_RECEPTION_FULL_STOPS})`;

/** Prior auth — warm lower-right bloom; full reception sweep (all phone won't stop colours). */
const PROTO_PRIOR_AUTH_GRADIENT = `radial-gradient(ellipse 118% 112% at 72% 88%, ${PROTO_RECEPTION_PALETTE.lightYellow} 0%, ${PROTO_RECEPTION_PALETTE.wheat} 12%, ${PROTO_RECEPTION_PALETTE.gold} 26%, ${PROTO_RECEPTION_PALETTE.copper} 40%, ${PROTO_RECEPTION_PALETTE.blue} 56%, ${PROTO_AGENTS_MID_BLUE} 72%, ${PROTO_RECEPTION_PALETTE.deep} 100%)`;

/** Integrate — warm layer rising from a deep cool foundation (stacked on your existing tools). */
const PROTO_INTEGRATE_GRADIENT = `radial-gradient(ellipse 128% 108% at 48% 108%, ${PROTO_RECEPTION_PALETTE.deep} 0%, ${PROTO_HUMIRA_COLORS.bridgeDeep} 26%, ${PROTO_AGENTS_MID_BLUE} 46%, ${PROTO_RECEPTION_PALETTE.blue} 66%, ${PROTO_RECEPTION_PALETTE.copper} 84%, ${PROTO_RECEPTION_PALETTE.gold} 100%)`;

/** Home hero — diagonal aurora: ink base, electric sky crest, coral-gold surge. */
export const PROTO_HOME_HERO_GRADIENT = [
  `linear-gradient(118deg, ${PROTO_RECEPTION_PALETTE.deep} 0%, ${PROTO_HUMIRA_COLORS.bridgeDeep} 12%, ${PROTO_AGENTS_MID_BLUE} 26%, ${PROTO_RECEPTION_PALETTE.blue} 40%, ${PROTO_HUMIRA_COLORS.bridgeBlue} 48%, ${PROTO_RECEPTION_PALETTE.copper} 62%, ${PROTO_HUMIRA_COLORS.amber} 74%, ${PROTO_RECEPTION_PALETTE.gold} 88%, ${PROTO_RECEPTION_PALETTE.lightYellow} 100%)`,
  `radial-gradient(ellipse 88% 72% at 82% 96%, rgba(255, 200, 75, 0.72) 0%, rgba(240, 105, 60, 0.38) 32%, transparent 64%)`,
  `radial-gradient(ellipse 62% 54% at 6% 8%, rgba(92, 184, 232, 0.55) 0%, rgba(31, 90, 122, 0.22) 42%, transparent 70%)`,
  `radial-gradient(ellipse 40% 35% at 92% 42%, rgba(228, 91, 82, 0.28) 0%, transparent 68%)`,
].join(", ");

/** iPhone twilight prism — shared palette (home hero + feature boxes + /about). */
export const PROTO_PHONE_PRISM_PALETTE = {
  void: "#080612",
  plum: "#18102E",
  violet: "#3A2868",
  orchid: "#6E48C8",
  lilac: "#8E62D8",
  periwinkle: "#A484DC",
  bronze: "#B89068",
  glow: "#E8DCC8",
} as const;

export const PROTO_PHONE_HERO_VOID = PROTO_PHONE_PRISM_PALETTE.void;

const P = PROTO_PHONE_PRISM_PALETTE;

/** iPhone home hero — twilight prism: void base, violet surge, champagne crest (portrait flow). */
export const PROTO_HOME_HERO_PHONE_GRADIENT = [
  `linear-gradient(0deg, ${P.void} 0%, ${P.plum} 16%, ${P.violet} 36%, ${P.orchid} 52%, ${P.lilac} 64%, ${P.periwinkle} 76%, ${P.bronze} 88%, ${P.glow} 100%)`,
  `radial-gradient(ellipse 118% 92% at 16% 94%, rgba(122, 82, 208, 0.5) 0%, rgba(110, 72, 200, 0.26) 38%, transparent 66%)`,
  `radial-gradient(ellipse 68% 52% at 90% 10%, rgba(110, 72, 200, 0.44) 0%, rgba(58, 40, 104, 0.2) 42%, transparent 70%)`,
  `radial-gradient(ellipse 130% 96% at 50% 50%, transparent 40%, rgba(8, 6, 18, 0.42) 100%)`,
].join(", ");

/** iPhone /about hero — original documents flow with twilight prism tones. */
export const PROTO_ABOUT_HERO_PHONE_GRADIENT = [
  `radial-gradient(ellipse 74% 60% at 0% 0%, ${P.periwinkle} 0%, ${P.periwinkle} 24%, transparent 70%)`,
  `linear-gradient(135deg, ${P.void} 0%, ${P.orchid} 22%, ${P.orchid} 48%, ${P.lilac} 78%, ${P.bronze} 100%)`,
].join(", ");

/** Feature boxes — cinematic prism flows; palette unchanged. */
const PROTO_FEATURE_AGENTS_GRADIENT = `radial-gradient(ellipse 96% 90% at 40% 36%, ${P.glow} 0%, ${P.bronze} 11%, ${P.periwinkle} 24%, ${P.lilac} 38%, ${P.orchid} 52%, ${P.violet} 66%, ${P.plum} 80%, ${P.void} 100%)`;

const PROTO_FEATURE_FRONT_DESK_GRADIENT = `linear-gradient(96deg, ${P.void} 0%, ${P.plum} 9%, ${P.violet} 24%, ${P.orchid} 40%, ${P.lilac} 54%, ${P.periwinkle} 66%, ${P.bronze} 80%, ${P.glow} 96%)`;

const PROTO_FEATURE_INBOX_GRADIENT = `linear-gradient(168deg, ${P.glow} 0%, ${P.bronze} 12%, ${P.periwinkle} 26%, ${P.lilac} 42%, ${P.orchid} 58%, ${P.violet} 74%, ${P.plum} 88%, ${P.void} 100%)`;

const PROTO_FEATURE_AMBIENT_GRADIENT = `radial-gradient(ellipse 92% 84% at 90% 10%, ${P.glow} 0%, ${P.bronze} 14%, ${P.lilac} 32%, ${P.orchid} 52%, ${P.violet} 72%, ${P.plum} 88%, ${P.void} 100%)`;

const PROTO_FEATURE_BILLING_GRADIENT = `radial-gradient(ellipse 104% 96% at 10% 90%, ${P.glow} 0%, ${P.bronze} 13%, ${P.orchid} 34%, ${P.violet} 54%, ${P.plum} 74%, ${P.void} 100%)`;

const PROTO_FEATURE_PROTOTYPE_GRADIENT = [
  `radial-gradient(ellipse 58% 52% at 76% 24%, ${P.periwinkle} 0%, ${P.lilac} 26%, transparent 62%)`,
  `linear-gradient(138deg, ${P.void} 0%, ${P.plum} 16%, ${P.violet} 34%, ${P.orchid} 52%, ${P.lilac} 68%, ${P.bronze} 84%, ${P.glow} 100%)`,
].join(", ");

const PROTO_FEATURE_INTEGRATE_GRADIENT = `radial-gradient(ellipse 88% 124% at 50% 102%, ${P.void} 0%, ${P.plum} 14%, ${P.violet} 30%, ${P.orchid} 48%, ${P.lilac} 64%, ${P.periwinkle} 78%, ${P.bronze} 90%, ${P.glow} 100%)`;

const PROTO_FEATURE_VALIDATE_GRADIENT = `linear-gradient(258deg, ${P.glow} 0%, ${P.bronze} 10%, ${P.periwinkle} 26%, ${P.lilac} 42%, ${P.orchid} 58%, ${P.violet} 74%, ${P.plum} 88%, ${P.void} 100%)`;

const PROTO_FEATURE_SHORTLIST_GRADIENT = [
  `radial-gradient(ellipse 68% 60% at 26% 76%, ${P.lilac} 0%, ${P.orchid} 28%, transparent 66%)`,
  `linear-gradient(198deg, ${P.void} 0%, ${P.plum} 14%, ${P.violet} 30%, ${P.orchid} 48%, ${P.lilac} 64%, ${P.bronze} 82%, ${P.glow} 100%)`,
].join(", ");

export const PROTO_COMMUNICATION_PHONE_GRADIENTS = {
  agents: PROTO_FEATURE_AGENTS_GRADIENT,
  "front-desk": PROTO_FEATURE_FRONT_DESK_GRADIENT,
  inbox: PROTO_FEATURE_INBOX_GRADIENT,
  ambient: PROTO_FEATURE_AMBIENT_GRADIENT,
  billing: PROTO_FEATURE_BILLING_GRADIENT,
  prototype: PROTO_FEATURE_PROTOTYPE_GRADIENT,
  integrate: PROTO_FEATURE_INTEGRATE_GRADIENT,
  validate: PROTO_FEATURE_VALIDATE_GRADIENT,
  shortlist: PROTO_FEATURE_SHORTLIST_GRADIENT,
} as const satisfies Record<string, string>;

/** Desktop feature boxes — same prism flows as iPhone. */
export const PROTO_COMMUNICATION_GRADIENTS = PROTO_COMMUNICATION_PHONE_GRADIENTS;

export type ProtoCommunicationSlideId = keyof typeof PROTO_COMMUNICATION_GRADIENTS;

/** Prototype validation — cool upper arc into warm bronze/glow. */
const PROTO_PROTOTYPE_GRADIENT = PROTO_FEATURE_PROTOTYPE_GRADIENT;

export const PROTO_PROTOTYPE_BACKDROP = {
  slideIndex: 6,
  label: "Prototype",
  gradient: PROTO_PROTOTYPE_GRADIENT,
  grid: "dot" as const,
  lineOverlayOpacity: 0.2,
};

/** Shortlist — cool void base into warm highlight. */
const PROTO_SHORTLIST_GRADIENT = PROTO_FEATURE_SHORTLIST_GRADIENT;

export const PROTO_SHORTLIST_BACKDROP = {
  slideIndex: 8,
  label: "Shortlist",
  gradient: PROTO_SHORTLIST_GRADIENT,
  grid: "wave" as const,
  lineOverlayOpacity: 0.14,
};

/** Validate — full prism sweep. */
const PROTO_VALIDATE_GRADIENT = PROTO_FEATURE_VALIDATE_GRADIENT;

export const PROTO_VALIDATE_BACKDROP = {
  slideIndex: 7,
  label: "Validate",
  gradient: PROTO_VALIDATE_GRADIENT,
  grid: "crosshatch" as const,
  lineOverlayOpacity: 0.16,
};

/** Hero — Documents palette; light blue anchored to the top-left edge. */
export const PROTO_HERO_GRADIENT = [
  `radial-gradient(ellipse 74% 60% at 0% 0%, ${PROTO_HUMIRA_COLORS.bridgeBlue} 0%, ${PROTO_HUMIRA_COLORS.bridgeBlue} 24%, transparent 70%)`,
  `linear-gradient(135deg, ${PROTO_RECEPTION_PALETTE.deep} 0%, ${PROTO_RECEPTION_PALETTE.blue} 22%, ${PROTO_RECEPTION_PALETTE.blue} 48%, ${PROTO_RECEPTION_PALETTE.copper} 78%, ${PROTO_RECEPTION_PALETTE.gold} 100%)`,
].join(", ");

/** Grid overlays for /proto feature bands. */
export const PROTO_COMMUNICATION_GRIDS: Partial<
  Record<ProtoCommunicationSlideId, WorkflowCarouselGridKind>
> = {
  agents: "dot",
  "front-desk": "hex",
  inbox: "crosshatch",
  ambient: "polar",
  billing: "hex",
  prototype: "dot",
  integrate: "hex",
  validate: "crosshatch",
  shortlist: "wave",
};

/** Line overlay opacity tuned for prism surfaces. */
export const PROTO_COMMUNICATION_LINE_OPACITY: Partial<Record<ProtoCommunicationSlideId, number>> = {
  agents: 0.2,
  "front-desk": 0.13,
  inbox: 0.16,
  ambient: 0.18,
  billing: 0.13,
  prototype: 0.2,
  integrate: 0.14,
  validate: 0.16,
  shortlist: 0.14,
};

export function protoCommunicationLineOpacity(slideId: string): number | undefined {
  if (slideId in PROTO_COMMUNICATION_LINE_OPACITY) {
    return PROTO_COMMUNICATION_LINE_OPACITY[slideId as ProtoCommunicationSlideId];
  }
  return undefined;
}

export function protoCommunicationGradient(slideId: string): string | undefined {
  if (slideId in PROTO_COMMUNICATION_GRADIENTS) {
    return PROTO_COMMUNICATION_GRADIENTS[slideId as ProtoCommunicationSlideId];
  }
  return undefined;
}

export function protoCommunicationGrid(slideId: string) {
  if (slideId in PROTO_COMMUNICATION_GRIDS) {
    return PROTO_COMMUNICATION_GRIDS[slideId as ProtoCommunicationSlideId];
  }
  return undefined;
}
