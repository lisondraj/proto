"use client";

import { useEffect, useState, type ReactNode } from "react";

import { inter, plusJakartaSans, suisseIntl } from "@/lib/home/fonts";
import { CAROUSEL_MENU_UI } from "@/lib/doephone/carousel-menu-visual-styles";
import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";

const { ink: INK, accent: DOE_ORANGE, divider: DIVIDER } = CAROUSEL_MENU_UI;

const TILE_RADIUS = "rounded-[clamp(0.62rem,1.88vmin,0.78rem)]";
const TILE_PAD_X = "clamp(0.68rem,2.1vmin,0.86rem)";
const TILE_PAD_Y = "clamp(0.48rem,1.45vmin,0.58rem)";
const TILE_GAP = "clamp(0.48rem,1.45vmin,0.58rem)";
const LABEL_SIZE = "clamp(0.82rem,2.5vmin,0.98rem)";
const ICON_SIZE = "clamp(1.12rem,3.45vmin,1.35rem)";

type TileIconKind =
  | "telus"
  | "oscar"
  | "accuro"
  | "chr"
  | "epic"
  | "cerner"
  | "evidence"
  | "uptodate"
  | "dax"
  | "fathom"
  | "nuance"
  | "abridge"
  | "ambience"
  | "fhir"
  | "slack"
  | "zoom"
  | "jane"
  | "meditech"
  | "athena"
  | "redox"
  | "teams"
  | "outlook"
  | "doximity"
  | "surescripts"
  | "avaros"
  | "pssuite"
  | "availity"
  | "stripe"
  | "modmed"
  | "canvas";

type IntegrationTile = {
  name: string;
  icon: TileIconKind;
};

/** Ten rows × three tiles — first and last rows preserved from earlier layout. */
const INTEGRATION_ROWS: readonly IntegrationTile[][] = [
  [
    { name: "TELUS EMR", icon: "telus" },
    { name: "OSCAR", icon: "oscar" },
    { name: "Accuro", icon: "accuro" },
  ],
  [
    { name: "CHR", icon: "chr" },
    { name: "Epic", icon: "epic" },
    { name: "Cerner", icon: "cerner" },
  ],
  [
    { name: "OpenEvidence", icon: "evidence" },
    { name: "UpToDate", icon: "uptodate" },
    { name: "DAX Copilot", icon: "dax" },
  ],
  [
    { name: "Abridge", icon: "abridge" },
    { name: "Ambience", icon: "ambience" },
    { name: "Fathom", icon: "fathom" },
  ],
  [
    { name: "Nuance", icon: "nuance" },
    { name: "FHIR", icon: "fhir" },
    { name: "Slack", icon: "slack" },
  ],
  [
    { name: "Zoom", icon: "zoom" },
    { name: "Jane App", icon: "jane" },
    { name: "Meditech", icon: "meditech" },
  ],
  [
    { name: "Athena", icon: "athena" },
    { name: "Redox", icon: "redox" },
    { name: "Teams", icon: "teams" },
  ],
  [
    { name: "Outlook", icon: "outlook" },
    { name: "Avaros", icon: "avaros" },
    { name: "Doximity", icon: "doximity" },
  ],
  [
    { name: "Surescripts", icon: "surescripts" },
    { name: "ModMed", icon: "modmed" },
    { name: "Canvas", icon: "canvas" },
  ],
  [
    { name: "PS Suite", icon: "pssuite" },
    { name: "Availity", icon: "availity" },
    { name: "Stripe", icon: "stripe" },
  ],
];

/** Desktop integrations — one flank tile per side; center three rows stay unchanged. */
const DESKTOP_INTEGRATION_FLANKS: readonly { left: IntegrationTile; right: IntegrationTile }[] = [
  { left: { name: "Meditech", icon: "meditech" }, right: { name: "Canvas", icon: "canvas" } },
  { left: { name: "Jane App", icon: "jane" }, right: { name: "Redox", icon: "redox" } },
  { left: { name: "Slack", icon: "slack" }, right: { name: "Zoom", icon: "zoom" } },
  { left: { name: "Athena", icon: "athena" }, right: { name: "Teams", icon: "teams" } },
  { left: { name: "Outlook", icon: "outlook" }, right: { name: "Doximity", icon: "doximity" } },
  { left: { name: "Surescripts", icon: "surescripts" }, right: { name: "Avaros", icon: "avaros" } },
  { left: { name: "PS Suite", icon: "pssuite" }, right: { name: "Availity", icon: "availity" } },
  { left: { name: "Stripe", icon: "stripe" }, right: { name: "ModMed", icon: "modmed" } },
  { left: { name: "Nuance", icon: "nuance" }, right: { name: "FHIR", icon: "fhir" } },
  { left: { name: "Fathom", icon: "fathom" }, right: { name: "Ambience", icon: "ambience" } },
];

function TileIcon({ kind, size = ICON_SIZE }: { kind: TileIconKind; size?: string }) {
  const sw = 1.25;
  const cap = "round" as const;
  const join = "round" as const;
  const stroke = DOE_ORANGE;

  const icons: Record<TileIconKind, ReactNode> = {
    telus: (
      <>
        <path d="M6.5 5.5h7v9h-7z" stroke={stroke} strokeWidth={sw} strokeLinejoin={join} />
        <path d="M8.5 5.5V4M11.5 5.5V4" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
        <path d="M8.5 9h3M8.5 11.5h2" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
      </>
    ),
    oscar: (
      <>
        <circle cx="10" cy="10" r="6.25" stroke={stroke} strokeWidth={sw} />
        <path
          d="M10 6.8c-1.8 0-3.2 1.5-3.2 3.2S8.2 13.2 10 13.2s3.2-1.5 3.2-3.2S11.8 6.8 10 6.8z"
          stroke={stroke}
          strokeWidth={sw * 0.95}
        />
      </>
    ),
    accuro: (
      <>
        <rect x="4.5" y="4" width="11" height="12" rx="1.4" stroke={stroke} strokeWidth={sw} />
        <path d="M7 8h6M7 10.5h4.5M7 13h5.5" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
      </>
    ),
    chr: (
      <>
        <path d="M4.5 11.5c1.5-3.5 4-5 5.5-5s4 1.5 5.5 5" stroke={stroke} strokeWidth={sw} strokeLinecap={cap} />
        <path d="M7 14.5h6" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
        <circle cx="10" cy="7.5" r="1.5" stroke={stroke} strokeWidth={sw * 0.9} />
      </>
    ),
    epic: (
      <>
        <rect x="3.5" y="4" width="13" height="12" rx="1.4" stroke={stroke} strokeWidth={sw} />
        <path d="M6.5 8h7M6.5 10.5h7M6.5 13h4.5" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
      </>
    ),
    cerner: (
      <>
        <circle cx="10" cy="10" r="6.25" stroke={stroke} strokeWidth={sw} />
        <path d="M6.5 10h7M10 6.5v7" stroke={stroke} strokeWidth={sw * 0.95} strokeLinecap={cap} />
      </>
    ),
    uptodate: (
      <>
        <path d="M5 5.5h10v9H5z" stroke={stroke} strokeWidth={sw} strokeLinejoin={join} />
        <path d="M7.5 8.5h5M7.5 11h3.5" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
      </>
    ),
    dax: (
      <>
        <path d="M4.5 14V6.5l5.5-2.5 5.5 2.5V14" stroke={stroke} strokeWidth={sw} strokeLinejoin={join} />
        <circle cx="10" cy="10.5" r="2.1" stroke={stroke} strokeWidth={sw * 0.95} />
      </>
    ),
    fathom: (
      <>
        <path d="M5 14V6l5-2.5 5 2.5v8" stroke={stroke} strokeWidth={sw} strokeLinejoin={join} />
        <path d="M8 10h4" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
      </>
    ),
    nuance: (
      <>
        <rect x="4.5" y="5" width="11" height="10" rx="1.4" stroke={stroke} strokeWidth={sw} />
        <path d="M7.5 9.5c1.2-1.2 3.8-1.2 5 0M7.5 12c1.2 1.2 3.8 1.2 5 0" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
      </>
    ),
    abridge: (
      <>
        <path d="M4 10h2.5l1.5-3 1.5 6 1.5-4 1.5 4 1.5-6 1.5 3H16" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} strokeLinejoin={join} />
      </>
    ),
    ambience: (
      <>
        <rect x="7.5" y="4.5" width="5" height="8.5" rx="2.5" stroke={stroke} strokeWidth={sw} />
        <path d="M5 9.5v1.5a5 5 0 0010 0V9.5" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
        <path d="M10 15.5v1.5" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
      </>
    ),
    fhir: (
      <>
        <path d="M5 6.5h10v7H5z" stroke={stroke} strokeWidth={sw} strokeLinejoin={join} />
        <path d="M8 9.5h4M8 12h2.5" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
        <circle cx="14.5" cy="8.5" r="1.4" fill={stroke} />
      </>
    ),
    evidence: (
      <>
        <circle cx="9.5" cy="9.5" r="5.25" stroke={stroke} strokeWidth={sw} />
        <path d="M14.5 14.5l3 3" stroke={stroke} strokeWidth={sw * 0.95} strokeLinecap={cap} />
      </>
    ),
    slack: (
      <>
        <rect x="4.5" y="9" width="3.5" height="3.5" rx="1" stroke={stroke} strokeWidth={sw * 0.95} />
        <rect x="9" y="4.5" width="3.5" height="3.5" rx="1" stroke={stroke} strokeWidth={sw * 0.95} />
        <rect x="12.5" y="9" width="3.5" height="3.5" rx="1" stroke={stroke} strokeWidth={sw * 0.95} />
        <rect x="9" y="12.5" width="3.5" height="3.5" rx="1" stroke={stroke} strokeWidth={sw * 0.95} />
      </>
    ),
    zoom: (
      <>
        <rect x="3.5" y="6" width="9.5" height="8" rx="1.5" stroke={stroke} strokeWidth={sw} />
        <path d="M13 9.5l3.5-2v7l-3.5-2" stroke={stroke} strokeWidth={sw * 0.95} strokeLinejoin={join} />
      </>
    ),
    jane: (
      <>
        <rect x="4" y="5" width="12" height="10" rx="1.5" stroke={stroke} strokeWidth={sw} />
        <path d="M7 8.5h6M7 11h4" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
      </>
    ),
    meditech: (
      <>
        <path d="M5 15V5h10v10H5z" stroke={stroke} strokeWidth={sw} strokeLinejoin={join} />
        <path d="M8 8h4v4H8z" stroke={stroke} strokeWidth={sw * 0.9} strokeLinejoin={join} />
      </>
    ),
    athena: (
      <>
        <path d="M10 3.5l5.5 11h-11L10 3.5z" stroke={stroke} strokeWidth={sw} strokeLinejoin={join} />
        <path d="M7.5 12.5h5" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
      </>
    ),
    redox: (
      <>
        <path d="M4 10h8M8 6l4 4-4 4" stroke={stroke} strokeWidth={sw} strokeLinecap={cap} strokeLinejoin={join} />
        <circle cx="15" cy="10" r="2" stroke={stroke} strokeWidth={sw * 0.95} />
      </>
    ),
    teams: (
      <>
        <rect x="4" y="5" width="8" height="10" rx="1.2" stroke={stroke} strokeWidth={sw} />
        <path d="M12 8.5h3v6.5h-3z" stroke={stroke} strokeWidth={sw * 0.95} strokeLinejoin={join} />
        <circle cx="8" cy="9" r="1.5" stroke={stroke} strokeWidth={sw * 0.85} />
      </>
    ),
    outlook: (
      <>
        <rect x="4" y="6" width="12" height="9" rx="1.2" stroke={stroke} strokeWidth={sw} />
        <path d="M4 7.5l6 3.5 6-3.5" stroke={stroke} strokeWidth={sw * 0.9} strokeLinejoin={join} />
      </>
    ),
    doximity: (
      <>
        <circle cx="10" cy="8" r="3" stroke={stroke} strokeWidth={sw} />
        <path d="M5.5 15c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke={stroke} strokeWidth={sw * 0.95} strokeLinecap={cap} />
      </>
    ),
    surescripts: (
      <>
        <path d="M6 14l4-8 4 8" stroke={stroke} strokeWidth={sw} strokeLinecap={cap} strokeLinejoin={join} />
        <path d="M7.5 11.5h5" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
      </>
    ),
    avaros: (
      <>
        <rect x="5" y="4.5" width="10" height="11" rx="1.4" stroke={stroke} strokeWidth={sw} />
        <path d="M8 8h4M8 10.5h2.5" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
      </>
    ),
    pssuite: (
      <>
        <rect x="3.5" y="5" width="13" height="10" rx="1.2" stroke={stroke} strokeWidth={sw} />
        <path d="M6.5 8.5h7M6.5 11.5h5" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
      </>
    ),
    availity: (
      <>
        <circle cx="10" cy="10" r="5.5" stroke={stroke} strokeWidth={sw} />
        <path d="M10 7v6M7 10h6" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
      </>
    ),
    stripe: (
      <>
        <rect x="3.5" y="7" width="13" height="6" rx="1.5" stroke={stroke} strokeWidth={sw} />
        <path d="M3.5 9.5h13" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} />
      </>
    ),
    modmed: (
      <>
        <rect x="4.5" y="4" width="11" height="12" rx="1.4" stroke={stroke} strokeWidth={sw} />
        <path d="M7 14V6l3 4 3-4v8" stroke={stroke} strokeWidth={sw * 0.9} strokeLinecap={cap} strokeLinejoin={join} />
      </>
    ),
    canvas: (
      <>
        <rect x="4" y="5" width="12" height="10" rx="1.2" stroke={stroke} strokeWidth={sw} />
        <path d="M4 8h12M8 5v10" stroke={stroke} strokeWidth={sw * 0.85} strokeLinecap={cap} />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="shrink-0"
      style={{ width: size, height: size }}
    >
      {icons[kind]}
    </svg>
  );
}

function IntegrationTileCard({
  name,
  icon,
  sizes,
}: IntegrationTile & {
  sizes: {
    tileRadius: string;
    tilePadX: string;
    tilePadY: string;
    labelSize: string;
    iconSize: string;
  };
}) {
  return (
    <div
      className={`inline-flex w-fit max-w-full shrink-0 items-center border bg-white shadow-[0_8px_24px_rgba(30,52,58,0.12)] ${sizes.tileRadius}`}
      style={{
        padding: `${sizes.tilePadY} ${sizes.tilePadX}`,
        gap: "clamp(0.32rem,0.98vmin,0.42rem)",
        borderColor: DIVIDER,
      }}
    >
      <TileIcon kind={icon} size={sizes.iconSize} />
      <span className="whitespace-nowrap font-medium leading-none" style={{ color: INK, fontSize: sizes.labelSize }}>
        {name}
      </span>
    </div>
  );
}

function IntegrationRow({
  tiles,
  sizes,
  gap,
}: {
  tiles: IntegrationTile[];
  sizes: {
    tileRadius: string;
    tilePadX: string;
    tilePadY: string;
    labelSize: string;
    iconSize: string;
  };
  gap: string;
}) {
  return (
    <div className="flex w-full flex-nowrap items-center justify-center" style={{ gap }}>
      {tiles.map((tile) => (
        <IntegrationTileCard key={tile.name} {...tile} sizes={sizes} />
      ))}
    </div>
  );
}

function IntegrationRowWithFlanks({
  centerTiles,
  left,
  right,
  sizes,
  gap,
  rowIndex,
}: {
  centerTiles: IntegrationTile[];
  left: IntegrationTile;
  right: IntegrationTile;
  sizes: {
    tileRadius: string;
    tilePadX: string;
    tilePadY: string;
    labelSize: string;
    iconSize: string;
  };
  gap: string;
  rowIndex: number;
}) {
  return (
    <div className="flex w-full justify-center">
      <div className="relative flex flex-nowrap items-center justify-center" style={{ gap }}>
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ right: `calc(100% + ${gap})` }}
        >
          <IntegrationTileCard key={`${rowIndex}-left`} {...left} sizes={sizes} />
        </div>
        {centerTiles.map((tile) => (
          <IntegrationTileCard key={tile.name} {...tile} sizes={sizes} />
        ))}
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `calc(100% + ${gap})` }}
        >
          <IntegrationTileCard key={`${rowIndex}-right`} {...right} sizes={sizes} />
        </div>
      </div>
    </div>
  );
}

const PHONE_INTEGRATION_SIZES = {
  tileRadius: TILE_RADIUS,
  tilePadX: TILE_PAD_X,
  tilePadY: TILE_PAD_Y,
  tileGap: TILE_GAP,
  labelSize: LABEL_SIZE,
  iconSize: ICON_SIZE,
  maxWidth: "min(99%,24rem)",
} as const;

const DESKTOP_INTEGRATION_SIZES = {
  tileRadius: "rounded-[clamp(0.62rem,0.74vw,0.8rem)]",
  tilePadX: "clamp(0.78rem,0.95vw,1.02rem)",
  tilePadY: "clamp(0.55rem,0.7vw,0.76rem)",
  tileGap: "clamp(0.58rem,0.72vw,0.78rem)",
  labelSize: "clamp(0.88rem,1.05vw,1.12rem)",
  iconSize: "clamp(1.18rem,1.42vw,1.52rem)",
  maxWidth: "min(100%, 40rem)",
  outerMaxWidth: "min(100%, 58rem)",
} as const;

const PHONE_ARTBOARD_WIDTH_PX = 360;
const PROTO_PRODUCT_BOX_PX = Math.round(PHONE_ARTBOARD_WIDTH_PX * 0.78);
/** Match top shader boxes (set-rules / talent) UI scale. */
const PROTO_TOP_SHADER_UI_SCALE = 0.86;
const PROTO_GLASS_BG =
  "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,251,246,0.84) 45%, rgba(255,248,242,0.74) 100%)";
const PROTO_MUTED = "#5E564C";
const PROTO_MUTED_LIGHT = "#8A8074";
const PROTO_SOFT = "rgba(28, 22, 16, 0.045)";
const PROTO_STRONG = "#1C1610";

function IntegrationMosaic({
  layout,
}: {
  layout: "phone" | "desktop";
}) {
  const isDesktop = layout === "desktop";
  const sizes = isDesktop ? DESKTOP_INTEGRATION_SIZES : PHONE_INTEGRATION_SIZES;
  const tileSizes = {
    tileRadius: sizes.tileRadius,
    tilePadX: sizes.tilePadX,
    tilePadY: sizes.tilePadY,
    labelSize: sizes.labelSize,
    iconSize: sizes.iconSize,
  };
  const outerMaxWidth = isDesktop ? DESKTOP_INTEGRATION_SIZES.outerMaxWidth : sizes.maxWidth;

  return (
    <div className="flex w-full flex-col" style={{ gap: sizes.tileGap, maxWidth: outerMaxWidth }}>
      {INTEGRATION_ROWS.map((row, index) =>
        isDesktop ? (
          <IntegrationRowWithFlanks
            key={`row-${index}`}
            rowIndex={index}
            centerTiles={row}
            left={DESKTOP_INTEGRATION_FLANKS[index]!.left}
            right={DESKTOP_INTEGRATION_FLANKS[index]!.right}
            sizes={tileSizes}
            gap={sizes.tileGap}
          />
        ) : (
          <IntegrationRow key={`row-${index}`} tiles={row} sizes={tileSizes} gap={sizes.tileGap} />
        ),
      )}
    </div>
  );
}

const CLAIM_QUEUE = [
  { id: "CLM-1062", type: "Theft", score: 58, active: false },
  { id: "CLM-1051", type: "Water leak", score: 74, active: false },
  { id: "CLM-1057", type: "Roof hail", score: 61, active: false },
  { id: "CLM-1048", type: "Auto glass", score: 92, active: true },
] as const;

function QueueClaim({
  id,
  type,
  score,
  active,
}: {
  id: string;
  type: string;
  score: number;
  active: boolean;
}) {
  return (
    <div
      className="flex min-h-0 flex-1 items-center"
      style={{
        borderRadius: 7,
        background: active ? "rgba(28, 22, 16, 0.08)" : "rgba(28, 22, 16, 0.035)",
        padding: "7px 8px",
        gap: 6,
        boxSizing: "border-box",
      }}
    >
      <div
        className="shrink-0"
        style={{
          width: 4,
          alignSelf: "stretch",
          borderRadius: 999,
          background: active ? PROTO_STRONG : "rgba(28, 22, 16, 0.12)",
        }}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <div
          className={plusJakartaSans.className}
          style={{
            color: PROTO_STRONG,
            fontSize: 10,
            fontWeight: 650,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {id}
        </div>
        <div
          className={inter.className}
          style={{
            color: PROTO_MUTED,
            fontSize: 8,
            fontWeight: 500,
            lineHeight: 1,
            marginTop: 3,
          }}
        >
          {type}
        </div>
      </div>
      <div
        className={inter.className}
        style={{
          color: active ? "#FFF9F2" : PROTO_MUTED,
          background: active ? PROTO_STRONG : "rgba(28, 22, 16, 0.06)",
          borderRadius: 999,
          padding: "4px 6px",
          fontSize: 8,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {score}
      </div>
    </div>
  );
}

const SUBMISSION_PIPELINE_STEPS = [
  {
    loading: "Retrieving build submission...",
    done: "Sandbox submission secured",
  },
  {
    loading: "Refactoring into your codebase...",
    done: "Integrated with your codebase",
  },
  {
    loading: "Shipping to your environment...",
    done: "Live in your environment",
  },
] as const;

const SUBMISSION_STEP_ICON = 20;
const SUBMISSION_STEP_ROW_H = 34;
const SUBMISSION_STEP_GAP = 16;
const SUBMISSION_PIPELINE_BEAT_MS = 1900;
const SUBMISSION_PIPELINE_HOLD_MS = 2600;

function SubmissionStepLoader() {
  return (
    <svg width={SUBMISSION_STEP_ICON} height={SUBMISSION_STEP_ICON} viewBox="0 0 16 16" aria-hidden>
      <circle cx={8} cy={8} r={8} fill={PROTO_STRONG} />
      <circle
        cx={8}
        cy={8}
        r={5.5}
        fill="none"
        stroke="#FFF9F2"
        strokeWidth={1.65}
        strokeLinecap="round"
        strokeDasharray="12 22"
        className="animate-spin origin-center"
        style={{ animationDuration: "0.95s", transformOrigin: "center" }}
      />
    </svg>
  );
}

function SubmissionStepCheck() {
  return (
    <svg width={SUBMISSION_STEP_ICON} height={SUBMISSION_STEP_ICON} viewBox="0 0 16 16" aria-hidden>
      <circle cx={8} cy={8} r={8} fill="#FFF9F2" />
      <path
        d="M4.5 8.2l2 2 5.3-5.4"
        stroke={PROTO_STRONG}
        strokeWidth={1.55}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SubmissionPipelineSteps() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTick(5);
      return;
    }

    let phase = 0;
    let timer = 0;

    const run = () => {
      phase = phase >= 6 ? 0 : phase + 1;
      setTick(phase);
      timer = window.setTimeout(run, phase === 6 ? SUBMISSION_PIPELINE_HOLD_MS : SUBMISSION_PIPELINE_BEAT_MS);
    };

    timer = window.setTimeout(run, SUBMISSION_PIPELINE_BEAT_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const visibleCount = tick <= 1 ? 1 : tick <= 3 ? 2 : 3;
  const completedCount = tick === 0 ? 0 : tick <= 2 ? 1 : tick <= 4 ? 2 : 3;
  const stackHeight = visibleCount * SUBMISSION_STEP_ROW_H + Math.max(0, visibleCount - 1) * SUBMISSION_STEP_GAP;
  const viewportHeight = 3 * SUBMISSION_STEP_ROW_H + 2 * SUBMISSION_STEP_GAP;
  const floatOffset = viewportHeight - stackHeight;

  return (
    <div style={{ width: "100%" }} aria-hidden>
      <div style={{ height: viewportHeight, overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: SUBMISSION_STEP_GAP,
            transform: `translateY(${floatOffset}px)`,
            transition: "transform 620ms cubic-bezier(0.28, 0.84, 0.24, 1)",
          }}
        >
          {SUBMISSION_PIPELINE_STEPS.slice(0, visibleCount).map((step, index) => {
            const done = index < completedCount;
            const isLast = index === visibleCount - 1;

            return (
              <div
                key={step.loading}
                className="relative flex items-center"
                style={{
                  height: SUBMISSION_STEP_ROW_H,
                  gap: 12,
                }}
              >
                {!isLast ? (
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: SUBMISSION_STEP_ICON / 2 - 0.5,
                      top: SUBMISSION_STEP_ICON + 2,
                      bottom: -(SUBMISSION_STEP_GAP + 2),
                      width: 1,
                      backgroundImage: `repeating-linear-gradient(to bottom, ${PROTO_STRONG} 0, ${PROTO_STRONG} 2px, transparent 2px, transparent 5px)`,
                      opacity: 0.32,
                    }}
                  />
                ) : null}
                <div className="relative z-[1] shrink-0">
                  {done ? <SubmissionStepCheck /> : <SubmissionStepLoader />}
                </div>
                <div
                  className={plusJakartaSans.className}
                  style={{
                    color: PROTO_STRONG,
                    fontSize: 12.5,
                    fontWeight: 600,
                    lineHeight: 1.15,
                    letterSpacing: "-0.025em",
                    transition: "opacity 320ms ease",
                    opacity: done ? 1 : 0.94,
                  }}
                >
                  {done ? step.done : step.loading}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const TURN_SUBMISSIONS_ARTBOARD_HEIGHT_PX = 430;

function TurnSubmissionsVisual() {
  return (
    <div
      className="flex flex-col items-center"
      style={{
        width: PHONE_ARTBOARD_WIDTH_PX,
        height: TURN_SUBMISSIONS_ARTBOARD_HEIGHT_PX,
      }}
    >
      <ProductBuildPanel />
      <div style={{ width: PROTO_PRODUCT_BOX_PX, marginTop: 14 }}>
        <SubmissionPipelineSteps />
      </div>
    </div>
  );
}

function ProductBuildPanel() {
  return (
    <div
      className={`flex flex-col ${suisseIntl.className}`}
      style={{
        width: PROTO_PRODUCT_BOX_PX,
        height: PROTO_PRODUCT_BOX_PX,
        borderRadius: "0.55rem",
        background: PROTO_GLASS_BG,
        backdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
        WebkitBackdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
        boxSizing: "border-box",
        padding: "13px",
        overflow: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div
        className={`${plusJakartaSans.className} shrink-0`}
        style={{
          color: PROTO_STRONG,
          fontSize: 16,
          fontWeight: 600,
          lineHeight: 1,
          letterSpacing: "-0.035em",
        }}
      >
        ClaimPilot
      </div>

      <div className="flex min-h-0 flex-1" style={{ gap: 8, marginTop: 12 }}>
        <div className="flex min-w-0 flex-[0.86] flex-col" style={{ gap: 6 }}>
          {CLAIM_QUEUE.map((claim) => (
            <QueueClaim key={claim.id} {...claim} />
          ))}
        </div>

        <div
          className="flex min-w-0 flex-1 flex-col"
          style={{
            borderRadius: 9,
            background: PROTO_SOFT,
            padding: "11px",
            boxSizing: "border-box",
          }}
        >
          <div
            className={plusJakartaSans.className}
            style={{
              color: PROTO_STRONG,
              fontSize: 16,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "-0.035em",
            }}
          >
            Auto glass
          </div>
          <div
            className={`${inter.className} flex items-center`}
            style={{
              color: PROTO_MUTED,
              fontSize: 9,
              fontWeight: 500,
              lineHeight: 1,
              gap: 4,
              marginTop: 6,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <circle cx="5" cy="5" r="5" fill={PROTO_STRONG} />
              <path
                d="M2.8 5.1l1.2 1.2 3.1-3.2"
                stroke="#FFF9F2"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Policy verified
          </div>

          <div
            className="mt-auto flex flex-col justify-end"
            style={{
              marginTop: 12,
              borderRadius: 8,
              background: "rgba(255, 252, 247, 0.55)",
              padding: "12px",
              boxSizing: "border-box",
              flex: 1,
              minHeight: 0,
            }}
          >
            <div className="min-w-0">
              <div
                className={inter.className}
                style={{ color: PROTO_MUTED_LIGHT, fontSize: 8, fontWeight: 500, lineHeight: 1 }}
              >
                Repair estimate
              </div>
              <div
                className={plusJakartaSans.className}
                style={{
                  color: PROTO_STRONG,
                  fontSize: 22,
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  marginTop: 6,
                }}
              >
                $428
              </div>
              <div
                className={inter.className}
                style={{
                  color: PROTO_MUTED,
                  fontSize: 8,
                  fontWeight: 600,
                  lineHeight: 1,
                  marginTop: 5,
                }}
              >
                Windshield
              </div>
            </div>

            <div className="flex" style={{ gap: 4, marginTop: 14 }}>
              {[
                { label: "Glass", share: 0.58 },
                { label: "Labor", share: 0.28 },
                { label: "Tax", share: 0.14 },
              ].map((part) => (
                <div
                  key={part.label}
                  style={{
                    flex: part.share,
                    height: 6,
                    borderRadius: 999,
                    background: PROTO_STRONG,
                    opacity: part.label === "Glass" ? 0.72 : part.label === "Labor" ? 0.42 : 0.22,
                  }}
                  aria-hidden
                />
              ))}
            </div>

            <div className="flex justify-between" style={{ marginTop: 10, gap: 6 }}>
              {[
                { label: "Glass", value: "$248" },
                { label: "Labor", value: "$120" },
                { label: "Tax", value: "$60" },
              ].map((part) => (
                <div key={part.label} className="min-w-0 flex-1">
                  <div
                    className={inter.className}
                    style={{ color: PROTO_MUTED_LIGHT, fontSize: 7.5, fontWeight: 500, lineHeight: 1 }}
                  >
                    {part.label}
                  </div>
                  <div
                    className={inter.className}
                    style={{
                      color: PROTO_STRONG,
                      fontSize: 8.5,
                      fontWeight: 700,
                      lineHeight: 1,
                      marginTop: 3,
                    }}
                  >
                    {part.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Integration mosaic — Integrate carousel slide. */
export function DoePhoneIntegrateVisual({
  layout = "phone",
  fitTopShader = false,
}: {
  layout?: "phone" | "desktop";
  /** /proto — match top feature-box scale and artboard fit. */
  fitTopShader?: boolean;
}) {
  const isDesktop = layout === "desktop";

  if (fitTopShader && !isDesktop) {
    return (
      <div className={`mx-auto h-full w-full ${suisseIntl.className}`} aria-hidden>
        <ProtoPhoneScaledArtboard
          width={PHONE_ARTBOARD_WIDTH_PX}
          height={TURN_SUBMISSIONS_ARTBOARD_HEIGHT_PX}
          fitScale={1.06 * PROTO_TOP_SHADER_UI_SCALE}
          fixedBounds
        >
          <div
            className="flex h-full w-full items-start justify-center"
            style={{
              width: PHONE_ARTBOARD_WIDTH_PX,
              height: TURN_SUBMISSIONS_ARTBOARD_HEIGHT_PX,
            }}
          >
            <TurnSubmissionsVisual />
          </div>
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`}
      style={{
        maxWidth: isDesktop
          ? DESKTOP_INTEGRATION_SIZES.outerMaxWidth
          : CAROUSEL_MENU_UI.maxWidthPhone,
      }}
      aria-hidden
    >
      {fitTopShader ? (
        <div
          style={{
            transform: `scale(${PROTO_TOP_SHADER_UI_SCALE})`,
            transformOrigin: "center center",
          }}
        >
          <TurnSubmissionsVisual />
        </div>
      ) : (
        <IntegrationMosaic layout={layout} />
      )}
    </div>
  );
}
