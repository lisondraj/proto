"use client";

import { inter, plusJakartaSans, suisseIntl } from "@/lib/home/fonts";
import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";

/** Match shader 2 explanation panel frost. */
const GLASS_BG =
  "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(255,250,244,0.72) 45%, rgba(255,244,232,0.54) 100%)";
const INK = "#1C1610";
const MUTED = "#5E564C";
const MUTED_LIGHT = "#8A8074";
const LINE = "rgba(28, 22, 16, 0.1)";
const SOFT = "rgba(28, 22, 16, 0.035)";
const TRACK = "rgba(28, 22, 16, 0.08)";
const ACCENT = "rgba(28, 22, 16, 0.42)";
const ACCENT_STRONG = "#1C1610";
const BASE_LINE = "rgba(28, 22, 16, 0.28)";
const GROWTH_FG = "#3F6B4A";
const CARD_FACE = "rgba(255, 252, 247, 0.72)";

const PHONE_ARTBOARD_WIDTH_PX = 360;
const PHONE_ARTBOARD_HEIGHT_PX = 360;
const BOX_SIZE_PX = Math.round(PHONE_ARTBOARD_WIDTH_PX * 0.78);

/** Chart geometry — taller plot, aspect preserved via meet */
const CHART_W = 240;
const CHART_H = 120;
const PAD_L = 26;
const PAD_R = 6;
const PAD_T = 6;
const PAD_B = 18;

const Y_MAX = 15;
const Y_TICKS = [0, 5, 10, 15] as const;
const X_LABELS = ["Q1", "Q2", "Q3", "Q4"] as const;

const BEST = [7.2, 9.4, 12.1, 15] as const;
const BASE_CASE = [4.6, 6.4, 8.5, 10.5] as const;

const SLIDERS = [
  {
    id: "revenue",
    label: "Revenue",
    value: "+15%",
    fill: 0.72,
    icon: "growth",
  },
  {
    id: "customers",
    label: "Customers",
    value: "+20%",
    fill: 0.8,
    icon: "people",
  },
  {
    id: "expenses",
    label: "Expenses",
    value: "+8%",
    fill: 0.55,
    icon: "building",
  },
  {
    id: "cogs",
    label: "COGS",
    value: "-5%",
    fill: 0.38,
    icon: "dollar",
  },
] as const;

function xAt(i: number, n: number) {
  const inner = CHART_W - PAD_L - PAD_R;
  return PAD_L + (inner * i) / (n - 1);
}

function yAt(value: number) {
  const inner = CHART_H - PAD_T - PAD_B;
  return PAD_T + inner * (1 - value / Y_MAX);
}

function linePath(values: readonly number[]) {
  return values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i, values.length).toFixed(2)} ${yAt(v).toFixed(2)}`)
    .join(" ");
}

function areaPath(values: readonly number[]) {
  const n = values.length;
  const top = linePath(values);
  const lastX = xAt(n - 1, n);
  const firstX = xAt(0, n);
  const baseY = yAt(0);
  return `${top} L ${lastX.toFixed(2)} ${baseY.toFixed(2)} L ${firstX.toFixed(2)} ${baseY.toFixed(2)} Z`;
}

function RevenueChart() {
  const bestPath = linePath(BEST);
  const basePath = linePath(BASE_CASE);
  const fillPath = areaPath(BEST);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${CHART_W} ${CHART_H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="bestFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT_STRONG} stopOpacity="0.16" />
          <stop offset="100%" stopColor={ACCENT_STRONG} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {Y_TICKS.map((tick) => {
        const y = yAt(tick);
        return (
          <g key={tick}>
            <line x1={PAD_L} y1={y} x2={CHART_W - PAD_R} y2={y} stroke={LINE} strokeWidth="0.7" />
            <text
              x={PAD_L - 4}
              y={y + 2.5}
              textAnchor="end"
              fill={MUTED_LIGHT}
              fontSize="7"
              fontFamily="inherit"
            >
              {tick === 0 ? "$0" : `$${tick}M`}
            </text>
          </g>
        );
      })}

      <path d={fillPath} fill="url(#bestFill)" />

      <path
        d={basePath}
        fill="none"
        stroke={BASE_LINE}
        strokeWidth="1"
        strokeDasharray="3 2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {BASE_CASE.map((v, i) => (
        <rect
          key={`b-${i}`}
          x={xAt(i, BASE_CASE.length) - 1.5}
          y={yAt(v) - 1.5}
          width="3"
          height="3"
          fill={CARD_FACE}
          stroke={BASE_LINE}
          strokeWidth="0.8"
          transform={`rotate(45 ${xAt(i, BASE_CASE.length)} ${yAt(v)})`}
        />
      ))}

      <path
        d={bestPath}
        fill="none"
        stroke={ACCENT_STRONG}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {BEST.map((v, i) => (
        <circle
          key={`g-${i}`}
          cx={xAt(i, BEST.length)}
          cy={yAt(v)}
          r="2"
          fill={ACCENT_STRONG}
          stroke={CARD_FACE}
          strokeWidth="0.8"
        />
      ))}

      {X_LABELS.map((label, i) => (
        <text
          key={label}
          x={xAt(i, X_LABELS.length)}
          y={CHART_H - 2}
          textAnchor="middle"
          fill={MUTED_LIGHT}
          fontSize="7.5"
          fontFamily="inherit"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

function SliderIcon({ kind }: { kind: (typeof SLIDERS)[number]["icon"] }) {
  const stroke = ACCENT;
  if (kind === "growth") {
    return (
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
        <path
          d="M1.5 7.5L4 5l1.8 1.8L9.5 3"
          stroke={stroke}
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6.8 3H9.5V5.7" stroke={stroke} strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "people") {
    return (
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
        <circle cx="4" cy="3.4" r="1.5" stroke={stroke} strokeWidth="1.2" />
        <path
          d="M1.4 9c.3-1.6 1.3-2.4 2.6-2.4S6.3 7.4 6.6 9"
          stroke={stroke}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="7.8" cy="3.6" r="1.2" stroke={stroke} strokeWidth="1.15" />
        <path d="M7.2 6.4c1 .2 1.8.9 2.1 2.2" stroke={stroke} strokeWidth="1.15" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "dollar") {
    return (
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
        <circle cx="5.5" cy="5.5" r="4" stroke={stroke} strokeWidth="1.2" />
        <path
          d="M5.5 2.8v5.4M4 4.1c.3-.5.8-.8 1.5-.8 1 0 1.6.5 1.6 1.2S6.5 5.7 5.5 5.7 3.9 6.2 3.9 7c0 .7.7 1.2 1.6 1.2.7 0 1.2-.3 1.5-.8"
          stroke={stroke}
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path
        d="M1.8 9V4.2L5.5 1.8 9.2 4.2V9H6.6V6.4H4.4V9H1.8Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScenarioSlider({
  label,
  value,
  fill,
  icon,
}: {
  label: string;
  value: string;
  fill: number;
  icon: (typeof SLIDERS)[number]["icon"];
}) {
  const pct = Math.round(fill * 100);

  return (
    <div
      className="flex min-w-0 flex-col justify-center"
      style={{
        background: SOFT,
        borderRadius: 5,
        padding: "5px 7px 6px",
      }}
    >
      <div className="flex items-center" style={{ gap: 4 }}>
        <div className="flex shrink-0 items-center justify-center">
          <SliderIcon kind={icon} />
        </div>
        <span
          className={`${inter.className} min-w-0 flex-1 truncate`}
          style={{ color: INK, fontSize: 8, fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.01em" }}
        >
          {label}
        </span>
        <span
          className={`${plusJakartaSans.className} shrink-0 tabular-nums`}
          style={{ color: INK, fontSize: 8, fontWeight: 700, lineHeight: 1 }}
        >
          {value}
        </span>
      </div>

      <div
        className="relative"
        style={{
          marginTop: 5,
          height: 2,
          borderRadius: 999,
          background: TRACK,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${pct}%`,
            borderRadius: 999,
            background: ACCENT_STRONG,
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${pct}%`,
            width: 6,
            height: 6,
            marginTop: -3,
            marginLeft: -3,
            borderRadius: 999,
            background: ACCENT_STRONG,
          }}
        />
      </div>
    </div>
  );
}

/** Revenue chart + 2×2 scenario sliders + Run scenario — square unit. */
function RevenueProduct() {
  return (
    <div
      className={`flex flex-col ${suisseIntl.className}`}
      style={{
        width: BOX_SIZE_PX,
        height: BOX_SIZE_PX,
        borderRadius: "0.55rem",
        background: GLASS_BG,
        backdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
        WebkitBackdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
        boxSizing: "border-box",
        padding: "11px",
        overflow: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Header — amount left, legend top-right */}
      <div className="flex shrink-0 items-center justify-between" style={{ gap: 8 }}>
        <div className="flex min-w-0 items-center" style={{ gap: 6 }}>
          <div
            className={plusJakartaSans.className}
            style={{
              color: INK,
              fontSize: 20,
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: "-0.035em",
            }}
          >
            $12.45M
          </div>
          <div
            className={`${inter.className} flex items-center`}
            style={{
              color: GROWTH_FG,
              fontSize: 9,
              fontWeight: 600,
              lineHeight: 1,
              gap: 2,
            }}
          >
            <span style={{ fontSize: 8 }}>↑</span>
            18.6%
          </div>
        </div>

        <div className={`${inter.className} flex shrink-0 flex-col items-end`} style={{ gap: 3 }}>
          <div className="flex items-center" style={{ gap: 3 }}>
            <svg width="10" height="3" viewBox="0 0 10 3" aria-hidden>
              <line x1="0" y1="1.5" x2="10" y2="1.5" stroke={ACCENT_STRONG} strokeWidth="1.25" strokeLinecap="round" />
            </svg>
            <span style={{ color: MUTED, fontSize: 7, fontWeight: 500, lineHeight: 1, whiteSpace: "nowrap" }}>
              Best Case Growth
            </span>
          </div>
          <div className="flex items-center" style={{ gap: 3 }}>
            <svg width="10" height="3" viewBox="0 0 10 3" aria-hidden>
              <line
                x1="0"
                y1="1.5"
                x2="10"
                y2="1.5"
                stroke={BASE_LINE}
                strokeWidth="1"
                strokeDasharray="2.5 2"
                strokeLinecap="round"
              />
            </svg>
            <span style={{ color: MUTED, fontSize: 7, fontWeight: 500, lineHeight: 1, whiteSpace: "nowrap" }}>
              Base Case
            </span>
          </div>
        </div>
      </div>

      {/* Chart — fills space above controls, aspect preserved */}
      <div
        className={`${inter.className} min-h-0 flex-1`}
        style={{
          marginTop: 8,
          marginBottom: 8,
          width: "100%",
        }}
      >
        <RevenueChart />
      </div>

      {/* 2×2 scenario sliders — full width, compact height */}
      <div
        className="grid shrink-0"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: 5,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        {SLIDERS.map((slider) => (
          <ScenarioSlider
            key={slider.id}
            label={slider.label}
            value={slider.value}
            fill={slider.fill}
            icon={slider.icon}
          />
        ))}
      </div>

      {/* Run scenario */}
      <div
        className={`${inter.className} flex shrink-0 items-center justify-center`}
        style={{
          marginTop: 7,
          background: SOFT,
          borderRadius: 6,
          padding: "9px 10px",
          gap: 6,
        }}
      >
        <span style={{ color: INK, fontSize: 10.5, fontWeight: 600, lineHeight: 1 }}>
          Run scenario
        </span>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
          <path
            d="M2.6 1.4L5.8 4 2.6 6.6"
            stroke={INK}
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

type ProcessBodyPart = { text: string; bold?: boolean };

const PROCESS_STEPS: readonly {
  index: string;
  title: string;
  body: readonly ProcessBodyPart[];
  skills: readonly string[];
}[] = [
  {
    index: "01",
    title: "Discovery",
    body: [
      { text: "Reviewed the brief in " },
      { text: "Linear", bold: true },
      { text: ", referenced research in " },
      { text: "Notion", bold: true },
      { text: ", and defined the core user problem." },
    ],
    skills: ["Research"],
  },
  {
    index: "02",
    title: "Planning",
    body: [
      { text: "Mapped user flows in " },
      { text: "FigJam", bold: true },
      { text: " and organized the information architecture before designing." },
    ],
    skills: ["Information Architecture"],
  },
  {
    index: "03",
    title: "Design",
    body: [
      { text: "Built the interface in " },
      { text: "Figma", bold: true },
      { text: ", refined interactions, and iterated using the design system." },
    ],
    skills: ["Design Systems"],
  },
];

const PROCESS_INK = "#FFF9F2";
const PROCESS_MUTED = "rgba(255, 249, 242, 0.68)";
const PROCESS_FAINT = "rgba(255, 249, 242, 0.2)";
const PROCESS_TAG_BG = "rgba(255, 249, 242, 0.14)";
const PROCESS_TAG_INK = "rgba(255, 249, 242, 0.82)";

/** Left-half process notes — timeline rail, compact steps + skill tags. */
function DesignProcessPanel() {
  const stepGap = 11;
  const railX = 3;
  const contentPad = 14;

  return (
    <div
      className="relative flex flex-col justify-center"
      style={{
        width: 138,
        paddingRight: 6,
        paddingLeft: contentPad,
      }}
    >
      {/* Continuous rail line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: railX,
          top: 5,
          bottom: 8,
          width: 1,
          background: PROCESS_FAINT,
        }}
      />

      {PROCESS_STEPS.map((item, index) => {
        const isLast = index === PROCESS_STEPS.length - 1;

        return (
          <div
            key={item.index}
            className="relative"
            style={{ paddingBottom: isLast ? 0 : stepGap }}
          >
            {/* Dot centered on rail, aligned to title row */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: railX - 2.5,
                top: 3,
                width: 5,
                height: 5,
                borderRadius: 999,
                background: PROCESS_INK,
                opacity: 0.55,
              }}
            />

            {/* Index + title, same row */}
            <div className="flex items-baseline" style={{ gap: 6 }}>
              <span
                className={inter.className}
                style={{
                  color: PROCESS_MUTED,
                  fontSize: 7.5,
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: "0.08em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {item.index}
              </span>
              <span
                className={suisseIntl.className}
                style={{
                  color: PROCESS_INK,
                  fontSize: 11,
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                {item.title}
              </span>
            </div>

            <p
              className={`${inter.className} m-0`}
              style={{
                color: PROCESS_MUTED,
                fontSize: 8.5,
                fontWeight: 400,
                lineHeight: 1.32,
                letterSpacing: "-0.01em",
                marginTop: 4,
              }}
            >
              {item.body.map((part) => (
                <span
                  key={part.text}
                  style={
                    part.bold
                      ? { color: PROCESS_INK, fontWeight: 600 }
                      : undefined
                  }
                >
                  {part.text}
                </span>
              ))}
            </p>

            <div className="flex flex-wrap" style={{ gap: 3, marginTop: 5 }}>
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className={inter.className}
                  style={{
                    background: PROCESS_TAG_BG,
                    color: PROCESS_TAG_INK,
                    fontSize: 7,
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                    borderRadius: 999,
                    padding: "3px 6px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Process notes on the left; revenue UI cropped on the right. */
function HalfCroppedRevenue({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`.trim()}
      style={{
        width: PHONE_ARTBOARD_WIDTH_PX,
        height: PHONE_ARTBOARD_HEIGHT_PX,
      }}
    >
      <div
        className="absolute top-1/2"
        style={{
          left: 12,
          transform: "translateY(-50%)",
        }}
      >
        <DesignProcessPanel />
      </div>

      <div
        className="absolute top-1/2"
        style={{
          // Shifted right so most of the right side is clipped; nudge left to show a bit more.
          left: PHONE_ARTBOARD_WIDTH_PX - BOX_SIZE_PX / 2 - 52,
          transform: "translateY(-50%)",
        }}
      >
        <RevenueProduct />
      </div>
    </div>
  );
}

/** Tracks. Compares. — revenue chart + scenario controls in a single square. */
export function ProtoSandboxBlankPanelVisual({
  layout = "phone",
}: {
  layout?: "phone" | "desktop";
}) {
  if (layout === "phone") {
    return (
      <div className={`mx-auto h-full w-full ${suisseIntl.className}`} aria-hidden>
        <ProtoPhoneScaledArtboard
          width={PHONE_ARTBOARD_WIDTH_PX}
          height={PHONE_ARTBOARD_HEIGHT_PX}
          fitScale={1.06}
          fixedBounds
        >
          <HalfCroppedRevenue />
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`}
      aria-hidden
    >
      <HalfCroppedRevenue className="max-w-full" />
    </div>
  );
}
