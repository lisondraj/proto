"use client";

import { inter, suisseIntl } from "@/lib/home/fonts";
import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";

/** Proto glass — match challenge-rules menus. */
const PROTO_GLASS_BG =
  "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,251,246,0.84) 45%, rgba(255,248,242,0.74) 100%)";
const PROTO_INK = "#1C1610";
const PROTO_ACCENT = "rgba(28, 22, 16, 0.42)";

const PHONE_ARTBOARD_WIDTH_PX = 360;
const PHONE_ARTBOARD_HEIGHT_PX = 360;
const PROTO_BOX_PX = Math.round(PHONE_ARTBOARD_WIDTH_PX * 0.78);

/** Submission fit checks — simulate an applicant prototype in-product. */
const PROTO_DROPDOWN_PILLS = [
  "87% match",
  "50 users",
  "Live sessions",
  "Fit score on",
  "Weekly use",
  "Checkout",
] as const;

/** Other surfaces in the open menu (Checkout stays on the trigger only). */
const PROTO_SURFACE_OPTIONS = ["Onboarding", "Dashboard"] as const;
const PROTO_SURFACE_HIGHLIGHT = "Onboarding";

const PROTO_BOX_RADIUS = "0.55rem";
const PROTO_DROPDOWN_GRID_W = Math.round(PROTO_BOX_PX * 0.92);

/** Match challenge-rules menus — sit smaller inside the shader than the default artboard fit. */
const PROTO_RULES_UI_SCALE = 0.86;

const PROTO_PILL_GLASS = {
  background: PROTO_GLASS_BG,
  backdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
  WebkitBackdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
} as const;

function DropdownChevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      className="shrink-0"
      style={{ transform: open ? "rotate(180deg)" : undefined }}
    >
      <path
        d="M2.2 3.6L5 6.4l2.8-2.8"
        stroke={PROTO_ACCENT}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProtoDropdownPill({ value, open = false }: { value: string; open?: boolean }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        borderRadius: PROTO_BOX_RADIUS,
        ...PROTO_PILL_GLASS,
        padding: "11px 10px",
        gap: 6,
        boxSizing: "border-box",
      }}
    >
      <span
        className={`${inter.className} min-w-0 flex-1`}
        style={{
          color: PROTO_INK,
          fontSize: 11,
          fontWeight: 500,
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
      <DropdownChevron open={open} />
    </div>
  );
}

/** Open surface menu under the 6th pill — alternatives only. */
function ProtoSurfaceDropdown() {
  return (
    <div className="relative min-w-0" style={{ zIndex: 2 }}>
      <ProtoDropdownPill value="Checkout" open />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "100%",
          marginTop: 4,
          borderRadius: PROTO_BOX_RADIUS,
          ...PROTO_PILL_GLASS,
          padding: "4px",
          boxSizing: "border-box",
        }}
      >
        {PROTO_SURFACE_OPTIONS.map((surface) => {
          const highlighted = surface === PROTO_SURFACE_HIGHLIGHT;

          return (
            <div
              key={surface}
              className={inter.className}
              style={{
                color: PROTO_INK,
                fontSize: 11,
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                padding: "8px 8px",
                borderRadius: `calc(${PROTO_BOX_RADIUS} - 2px)`,
                background: highlighted ? "rgba(28, 22, 16, 0.1)" : undefined,
                whiteSpace: "nowrap",
              }}
            >
              {surface}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProtoDropdownGrid() {
  return (
    <div
      className="grid"
      style={{
        width: PROTO_DROPDOWN_GRID_W,
        height: PROTO_BOX_PX,
        gridTemplateColumns: "1fr 1fr",
        gap: 7,
        alignContent: "center",
        boxSizing: "border-box",
        overflow: "visible",
      }}
    >
      {PROTO_DROPDOWN_PILLS.map((value, index) =>
        index === PROTO_DROPDOWN_PILLS.length - 1 ? (
          <ProtoSurfaceDropdown key={value} />
        ) : (
          <ProtoDropdownPill key={value} value={value} />
        ),
      )}
    </div>
  );
}

/** Applicant prototype fit check — /proto prototype slide. */
export function DoePhoneProtoValidateVisual({ layout = "phone" }: { layout?: "phone" | "desktop" }) {
  const isDesktop = layout === "desktop";

  if (!isDesktop) {
    return (
      <div className={`mx-auto h-full w-full ${suisseIntl.className}`} aria-hidden>
        <ProtoPhoneScaledArtboard
          width={PHONE_ARTBOARD_WIDTH_PX}
          height={PHONE_ARTBOARD_HEIGHT_PX}
          fitScale={1.06 * PROTO_RULES_UI_SCALE}
          fixedBounds
        >
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              width: PHONE_ARTBOARD_WIDTH_PX,
              height: PHONE_ARTBOARD_HEIGHT_PX,
            }}
          >
            <ProtoDropdownGrid />
          </div>
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`}
      style={{ maxWidth: "min(100%, 28rem)" }}
      aria-hidden
    >
      <div
        style={{
          transform: `scale(${PROTO_RULES_UI_SCALE})`,
          transformOrigin: "center center",
        }}
      >
        <ProtoDropdownGrid />
      </div>
    </div>
  );
}
