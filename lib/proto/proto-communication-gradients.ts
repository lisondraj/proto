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

/** iPhone home hero — twilight prism: void base, violet surge, rose-gold crest (portrait flow). */
export const PROTO_PHONE_HERO_VOID = "#080612";

const PROTO_PHONE_HERO_PLUM = "#18102E";
const PROTO_PHONE_HERO_VIOLET = "#3A2868";
const PROTO_PHONE_HERO_ORCHID = "#6E48C8";
const PROTO_PHONE_HERO_MAGENTA = "#B84CC8";
const PROTO_PHONE_HERO_ROSE = "#E06698";
const PROTO_PHONE_HERO_PEACH = "#F09868";
const PROTO_PHONE_HERO_GLOW = "#FFD8B8";

export const PROTO_HOME_HERO_PHONE_GRADIENT = [
  `linear-gradient(0deg, ${PROTO_PHONE_HERO_VOID} 0%, ${PROTO_PHONE_HERO_PLUM} 16%, ${PROTO_PHONE_HERO_VIOLET} 34%, ${PROTO_PHONE_HERO_ORCHID} 48%, ${PROTO_PHONE_HERO_MAGENTA} 60%, ${PROTO_PHONE_HERO_ROSE} 72%, ${PROTO_PHONE_HERO_PEACH} 86%, ${PROTO_PHONE_HERO_GLOW} 100%)`,
  `radial-gradient(ellipse 118% 92% at 16% 94%, rgba(224, 102, 152, 0.58) 0%, rgba(110, 72, 200, 0.3) 36%, transparent 66%)`,
  `radial-gradient(ellipse 68% 52% at 90% 10%, rgba(110, 72, 200, 0.44) 0%, rgba(58, 40, 104, 0.2) 42%, transparent 70%)`,
  `radial-gradient(ellipse 130% 96% at 50% 50%, transparent 40%, rgba(8, 6, 18, 0.42) 100%)`,
].join(", ");

/** Prototype validation — cool upper arc into warm copper/gold. */
const PROTO_PROTOTYPE_GRADIENT = `linear-gradient(160deg, ${PROTO_HUMIRA_COLORS.bridgeBlue} 0%, ${PROTO_RECEPTION_PALETTE.blue} 26%, ${PROTO_RECEPTION_PALETTE.copper} 58%, ${PROTO_RECEPTION_PALETTE.gold} 100%)`;

export const PROTO_PROTOTYPE_BACKDROP = {
  slideIndex: 6,
  label: "Prototype",
  gradient: PROTO_PROTOTYPE_GRADIENT,
  grid: "dot" as const,
};

/** Shortlist — cool base into warm highlight. */
const PROTO_SHORTLIST_GRADIENT = `linear-gradient(205deg, ${PROTO_RECEPTION_PALETTE.deep} 0%, ${PROTO_AGENTS_MID_BLUE} 34%, ${PROTO_RECEPTION_PALETTE.blue} 58%, ${PROTO_RECEPTION_PALETTE.copper} 82%, ${PROTO_RECEPTION_PALETTE.gold} 100%)`;

export const PROTO_SHORTLIST_BACKDROP = {
  slideIndex: 8,
  label: "Shortlist",
  gradient: PROTO_SHORTLIST_GRADIENT,
  grid: "wave" as const,
};

/** Validate — warm documents sweep for the pre-shortlist full band. */
const PROTO_VALIDATE_GRADIENT = `linear-gradient(145deg, ${PROTO_RECEPTION_PALETTE.deep} 0%, ${PROTO_RECEPTION_PALETTE.blue} 30%, ${PROTO_RECEPTION_PALETTE.copper} 62%, ${PROTO_RECEPTION_PALETTE.gold} 100%)`;

export const PROTO_VALIDATE_BACKDROP = {
  slideIndex: 7,
  label: "Validate",
  gradient: PROTO_VALIDATE_GRADIENT,
  grid: "crosshatch" as const,
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

/** Reception — warm upper-left ellipse (The phone won't stop). */
const PROTO_FRONT_DESK_GRADIENT = `radial-gradient(ellipse 100% 88% at 22% 18%, ${PROTO_RECEPTION_PALETTE.gold} 0%, ${PROTO_RECEPTION_PALETTE.copper} 45%, ${PROTO_RECEPTION_PALETTE.blue} 72%, ${PROTO_RECEPTION_PALETTE.deep} 100%)`;

/** /proto section 2 — home gradient shapes; Reception colours only. */
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
} as const satisfies Record<string, string>;

export type ProtoCommunicationSlideId = keyof typeof PROTO_COMMUNICATION_GRADIENTS;

/** Grid overlays for /proto feature bands. */
export const PROTO_COMMUNICATION_GRIDS: Partial<
  Record<ProtoCommunicationSlideId, WorkflowCarouselGridKind>
> = {
  prototype: "dot",
  integrate: "hex",
  validate: "crosshatch",
  shortlist: "wave",
};

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
