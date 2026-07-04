/** Reception reference palette — reused across section 2 slide shapes. */
import type { WorkflowCarouselGridKind } from "@/lib/workflow-carousel-design-backdrops";

/** Vibrant reception hues — light blue through gold/copper (same gradient flows). */
export const PROTO_RECEPTION_PALETTE = {
  lightYellow: "#FFF0B0",
  wheat: "#F8D66A",
  gold: "#F2B838",
  copper: "#DD6F42",
  blue: "#6FA8D4",
  deep: "#1E3D52",
} as const;

/** Reception hex grid — same line overlay as the front-desk (The phone won't stop) slide. */
export const PROTO_LINE_GRID = "hex" as const;

/** Humira / TELUS — exact shared colour stops (solid hex). */
export const PROTO_HUMIRA_COLORS = {
  deep: PROTO_RECEPTION_PALETTE.deep,
  bridgeDeep: "#356B85",
  blue: PROTO_RECEPTION_PALETTE.blue,
  bridgeBlue: "#9FD4F0",
  copper: PROTO_RECEPTION_PALETTE.copper,
  amber: "#E89238",
  gold: PROTO_RECEPTION_PALETTE.gold,
  wheat: PROTO_RECEPTION_PALETTE.wheat,
} as const;

/** Agents roster — exact legacy colours; linear 225° (not center radial). */
const PROTO_AGENTS_MID_BLUE = "#4D85A8";

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

/** Prior auth colour stops — shared by billing band and home hero. */
const PROTO_PRIOR_AUTH_STOPS = [
  `${PROTO_RECEPTION_PALETTE.lightYellow} 0%`,
  `${PROTO_RECEPTION_PALETTE.wheat} 12%`,
  `${PROTO_RECEPTION_PALETTE.gold} 26%`,
  `${PROTO_RECEPTION_PALETTE.copper} 40%`,
  `${PROTO_RECEPTION_PALETTE.blue} 56%`,
  `${PROTO_AGENTS_MID_BLUE} 72%`,
  `${PROTO_RECEPTION_PALETTE.deep} 100%`,
].join(", ");

/** Prior auth — warm lower-right bloom; full reception sweep (all phone won't stop colours). */
const PROTO_PRIOR_AUTH_GRADIENT = `radial-gradient(ellipse 118% 112% at 72% 88%, ${PROTO_PRIOR_AUTH_STOPS})`;

/** Integrate — warm layer rising from a deep cool foundation (stacked on your existing tools). */
const PROTO_INTEGRATE_GRADIENT = `radial-gradient(ellipse 128% 108% at 48% 108%, ${PROTO_RECEPTION_PALETTE.deep} 0%, ${PROTO_HUMIRA_COLORS.bridgeDeep} 26%, ${PROTO_AGENTS_MID_BLUE} 46%, ${PROTO_RECEPTION_PALETTE.blue} 66%, ${PROTO_RECEPTION_PALETTE.copper} 84%, ${PROTO_RECEPTION_PALETTE.gold} 100%)`;

/** Home hero desktop — same prior-auth sweep as billing, expanded for full viewport. */
export const PROTO_HOME_HERO_GRADIENT = `radial-gradient(ellipse 136% 132% at 66% 92%, ${PROTO_PRIOR_AUTH_STOPS})`;

/** iPhone home hero — same prior-auth sweep, taller ellipse for narrow viewport. */
export const PROTO_HOME_HERO_PHONE_GRADIENT = `radial-gradient(ellipse 128% 142% at 60% 94%, ${PROTO_PRIOR_AUTH_STOPS})`;

export const PROTO_PHONE_HERO_VOID = PROTO_RECEPTION_PALETTE.deep;

/** Prototype validation — cool upper arc into warm copper/gold. */
const PROTO_PROTOTYPE_GRADIENT = `linear-gradient(160deg, ${PROTO_HUMIRA_COLORS.bridgeBlue} 0%, ${PROTO_RECEPTION_PALETTE.blue} 26%, ${PROTO_RECEPTION_PALETTE.copper} 58%, ${PROTO_RECEPTION_PALETTE.gold} 100%)`;

export const PROTO_PROTOTYPE_BACKDROP = {
  slideIndex: 6,
  label: "Prototype",
  gradient: PROTO_PROTOTYPE_GRADIENT,
  grid: "dot" as const,
  lineOverlayOpacity: 0.2,
};

/** Shortlist — cool base into warm highlight. */
const PROTO_SHORTLIST_GRADIENT = `linear-gradient(205deg, ${PROTO_RECEPTION_PALETTE.deep} 0%, ${PROTO_AGENTS_MID_BLUE} 34%, ${PROTO_RECEPTION_PALETTE.blue} 58%, ${PROTO_RECEPTION_PALETTE.copper} 82%, ${PROTO_RECEPTION_PALETTE.gold} 100%)`;

export const PROTO_SHORTLIST_BACKDROP = {
  slideIndex: 8,
  label: "Shortlist",
  gradient: PROTO_SHORTLIST_GRADIENT,
  grid: "wave" as const,
  lineOverlayOpacity: 0.14,
};

/** Validate — warm documents sweep for the pre-shortlist full band. */
const PROTO_VALIDATE_GRADIENT = `linear-gradient(145deg, ${PROTO_RECEPTION_PALETTE.deep} 0%, ${PROTO_RECEPTION_PALETTE.blue} 30%, ${PROTO_RECEPTION_PALETTE.copper} 62%, ${PROTO_RECEPTION_PALETTE.gold} 100%)`;

export const PROTO_VALIDATE_BACKDROP = {
  slideIndex: 7,
  label: "Validate",
  gradient: PROTO_VALIDATE_GRADIENT,
  grid: "crosshatch" as const,
  lineOverlayOpacity: 0.16,
};

/** Patient chart — Documents palette flipped; warm upper-left → cool edge. */
const PROTO_AMBIENT_RADIAL = `radial-gradient(ellipse 125% 110% at 14% 12%, ${PROTO_RECEPTION_PALETTE.gold} 0%, ${PROTO_RECEPTION_PALETTE.copper} 36%, ${PROTO_RECEPTION_PALETTE.blue} 70%, ${PROTO_RECEPTION_PALETTE.deep} 100%)`;

/** Documents — 135° cool → warm (Documents pile up). */
export const PROTO_DOCUMENTS_GRADIENT = `linear-gradient(135deg, ${PROTO_RECEPTION_PALETTE.deep} 0%, ${PROTO_RECEPTION_PALETTE.blue} 24%, ${PROTO_RECEPTION_PALETTE.copper} 58%, ${PROTO_RECEPTION_PALETTE.gold} 100%)`;

/** Hero — Documents palette; light blue anchored to the top-left edge. */
export const PROTO_HERO_GRADIENT = [
  `radial-gradient(ellipse 74% 60% at 0% 0%, ${PROTO_HUMIRA_COLORS.bridgeBlue} 0%, ${PROTO_HUMIRA_COLORS.bridgeBlue} 24%, transparent 70%)`,
  `linear-gradient(135deg, ${PROTO_RECEPTION_PALETTE.deep} 0%, ${PROTO_RECEPTION_PALETTE.blue} 22%, ${PROTO_RECEPTION_PALETTE.blue} 48%, ${PROTO_RECEPTION_PALETTE.copper} 78%, ${PROTO_RECEPTION_PALETTE.gold} 100%)`,
].join(", ");

/** iPhone /about hero — same documents reception colouring as desktop. */
export const PROTO_ABOUT_HERO_PHONE_GRADIENT = PROTO_HERO_GRADIENT;

/** Reception — warm upper-left ellipse (The phone won't stop). */
const PROTO_FRONT_DESK_GRADIENT = `radial-gradient(ellipse 100% 88% at 22% 18%, ${PROTO_RECEPTION_PALETTE.gold} 0%, ${PROTO_RECEPTION_PALETTE.copper} 45%, ${PROTO_RECEPTION_PALETTE.blue} 72%, ${PROTO_RECEPTION_PALETTE.deep} 100%)`;

/** /proto section 2 — home gradient shapes; reception colours only. */
export const PROTO_COMMUNICATION_GRADIENTS = {
  agents: PROTO_AMBIENT_RADIAL,
  "front-desk": PROTO_AGENTS_GRADIENT,
  inbox: PROTO_DOCUMENTS_GRADIENT,
  ambient: PROTO_FRONT_DESK_GRADIENT,
  billing: PROTO_PRIOR_AUTH_GRADIENT,
  prototype: PROTO_PROTOTYPE_GRADIENT,
  integrate: PROTO_INTEGRATE_GRADIENT,
  validate: PROTO_VALIDATE_GRADIENT,
  shortlist: PROTO_SHORTLIST_GRADIENT,
  "looking-ahead": PROTO_SHORTLIST_GRADIENT,
} as const satisfies Record<string, string>;

/** iPhone feature boxes — same reception colouring as desktop. */
export const PROTO_COMMUNICATION_PHONE_GRADIENTS = PROTO_COMMUNICATION_GRADIENTS;

export type ProtoCommunicationSlideId = keyof typeof PROTO_COMMUNICATION_GRADIENTS;

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
  "looking-ahead": "wave",
};

/** Line overlay opacity tuned for reception surfaces. */
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
  "looking-ahead": 0.14,
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
