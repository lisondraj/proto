import { PROTO_FONT_CLASS } from "@/lib/proto/proto-font";
import {
  PROTO_INVEST_CHART_CAPTION_TW,
  PROTO_INVEST_CHART_CITATION_TW,
  PROTO_INVEST_CHART_TITLE_TW,
} from "@/lib/proto-invest/proto-invest-layout-styles";
import {
  PROTO_INVEST_AI_RECRUITING_FORECAST_CAPTION,
  PROTO_INVEST_AI_RECRUITING_FORECAST_CHART,
  PROTO_INVEST_AI_RECRUITING_FORECAST_CITATION,
} from "@/lib/proto-invest/proto-invest-content";
import { PROTO_PHONE_CHART_COLORS } from "@/lib/proto/proto-chart-colors";

const CHART = PROTO_INVEST_AI_RECRUITING_FORECAST_CHART;
const Y_MAX = CHART.yMax;
const Y_TICKS = [0, 25, 50, 75, 100] as const;
const PLOT_INSET_TOP_PCT = 8;

function tickPositionPct(tick: number) {
  const span = 100 - PLOT_INSET_TOP_PCT;
  return (tick / Y_MAX) * span;
}

function plotY(value: number) {
  return 100 - tickPositionPct(value);
}

function formatYAxis(value: number) {
  return value === 0 ? "0" : `${value}%`;
}

function plotX(index: number, pointCount: number) {
  return (index / Math.max(pointCount - 1, 1)) * 100;
}

const X_LABEL_INDICES = new Set([0, 4, 8, 12, 15]);

/** /proto-invest — quarterly AI recruiting software adoption forecast (line chart). */
export function ProtoInvestAiRecruitingForecastChart() {
  const quarters = CHART.quarters;
  const count = quarters.length;

  const linePoints = quarters
    .map((point, index) => {
      const x = plotX(index, count);
      const y = plotY(point.value);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="proto-invest-chart-zone mt-8 iphone-page:mt-9">
      <p
        className={`mb-3.5 block font-medium leading-snug tracking-[-0.01em] text-white ${PROTO_INVEST_CHART_TITLE_TW} iphone-page:mb-4 ${PROTO_FONT_CLASS}`}
      >
        {CHART.title}
      </p>

      <div className="aspect-[5/3] w-full">
        <div className="grid h-full grid-cols-[clamp(2.35rem,9.5vw,3rem)_minmax(0,1fr)] grid-rows-[minmax(0,1fr)_auto] gap-x-2">
          <div className="relative col-start-1 row-start-1">
            {Y_TICKS.slice()
              .reverse()
              .map((tick) => (
                <span
                  key={tick}
                  className={`absolute right-0 -translate-y-1/2 text-right tabular-nums font-normal leading-none text-[clamp(0.62rem,0.54rem+0.38vmin,0.76rem)] iphone-page:text-[clamp(0.68rem,0.58rem+0.42vmin,0.82rem)] ${PROTO_FONT_CLASS}`}
                  style={{
                    bottom: `${tickPositionPct(tick)}%`,
                    color: PROTO_PHONE_CHART_COLORS.labelMuted,
                  }}
                >
                  {formatYAxis(tick)}
                </span>
              ))}
          </div>

          <div
            className="relative col-start-2 row-start-1 min-h-0 border-b border-l"
            style={{ borderColor: PROTO_PHONE_CHART_COLORS.axis }}
          >
            {Y_TICKS.map((tick) => (
              <div
                key={`grid-${tick}`}
                className="pointer-events-none absolute left-0 right-0 border-t"
                style={{
                  bottom: `${tickPositionPct(tick)}%`,
                  borderColor: tick === 0 ? PROTO_PHONE_CHART_COLORS.axis : PROTO_PHONE_CHART_COLORS.gridLine,
                }}
                aria-hidden
              />
            ))}

            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full overflow-visible"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="proto-invest-forecast-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#beae60" />
                  <stop offset="55%" stopColor="#c6750c" />
                  <stop offset="100%" stopColor="#d7cbc6" />
                </linearGradient>
              </defs>

              <polyline
                points={linePoints}
                fill="none"
                stroke="url(#proto-invest-forecast-line)"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />

              {quarters.map((point, index) => {
                const x = plotX(index, count);
                return (
                  <circle
                    key={point.label}
                    cx={x}
                    cy={plotY(point.value)}
                    r="1.1"
                    fill="#c6750c"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>
          </div>

          <div className="col-start-2 row-start-2 grid pt-2.5 iphone-page:pt-3" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
            {quarters.map((point, index) => (
              <span
                key={`${point.label}-x`}
                className={`text-center font-normal leading-none tracking-[-0.01em] text-[clamp(0.58rem,0.5rem+0.34vmin,0.72rem)] iphone-page:text-[clamp(0.62rem,0.54rem+0.36vmin,0.76rem)] ${PROTO_FONT_CLASS} ${
                  X_LABEL_INDICES.has(index) ? "opacity-100" : "opacity-0"
                }`}
                style={{ color: PROTO_PHONE_CHART_COLORS.label }}
              >
                {point.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className={PROTO_INVEST_CHART_CAPTION_TW}>{PROTO_INVEST_AI_RECRUITING_FORECAST_CAPTION}</p>
      <p className={PROTO_INVEST_CHART_CITATION_TW}>{PROTO_INVEST_AI_RECRUITING_FORECAST_CITATION}</p>
    </div>
  );
}
