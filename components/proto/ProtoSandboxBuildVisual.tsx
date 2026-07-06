"use client";

import { useEffect, useState } from "react";

import { inter, plusJakartaSans, suisseIntl } from "@/lib/home/fonts";
import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";
import { useProtoShaderBoxInView } from "@/lib/proto/use-proto-shader-box-in-view";

const GLASS =
  "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(255,251,246,0.9) 48%, rgba(255,248,242,0.82) 100%)";
const INK = "#1C1610";
const MUTED = "#5E564C";
const MUTED_LIGHT = "#8A8074";
const SOFT = "rgba(28, 22, 16, 0.045)";
const LINE = "rgba(28, 22, 16, 0.1)";
const RUNNING = "#3F6B4A";
const CODE_SURFACE = "rgba(22, 18, 14, 0.94)";
const CODE_INK = "#E8E2D8";
const CODE_KEY = "#D9A066";
const CODE_MUTED = "rgba(232, 226, 216, 0.4)";

const PHONE_W = 360;
const PHONE_H = 360;
const CARD_W = 250;

/** Each stage renders the actual UI taking shape — bars, then legend, then labels. */
const STAGES = [
  { code: "const rows = forecastData()", bars: [0.1, 0.06, 0.14, 0.08], labels: false, legend: false },
  { code: "<Chart data={rows} />", bars: [0.42, 0.28, 0.58, 0.34], labels: false, legend: false },
  { code: "<Bar key={row.id} value={row.v} />", bars: [0.68, 0.46, 0.82, 0.6], labels: true, legend: false },
  { code: "<Legend series={['Q1','Q2']} />", bars: [0.68, 0.46, 0.82, 0.6], labels: true, legend: true },
] as const;

const BEAT_MS = 2100;
const MOTION_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function useBuildStage(inView: boolean) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setStage(STAGES.length - 1);
      return;
    }

    const timer = window.setInterval(() => {
      setStage((current) => (current + 1) % STAGES.length);
    }, BEAT_MS);

    return () => window.clearInterval(timer);
  }, [inView]);

  return STAGES[stage] ?? STAGES[0]!;
}

function RunningPill() {
  return (
    <span
      className={`${inter.className} inline-flex items-center`}
      style={{
        color: RUNNING,
        fontSize: 7,
        fontWeight: 600,
        lineHeight: 1,
        gap: 4,
        background: "rgba(63, 107, 74, 0.1)",
        borderRadius: 999,
        padding: "3px 7px",
      }}
    >
      <span className="relative flex" style={{ width: 4, height: 4 }} aria-hidden>
        <span className="absolute inset-0 animate-pulse rounded-full" style={{ background: RUNNING, opacity: 0.4 }} />
        <span className="relative rounded-full" style={{ width: 4, height: 4, background: RUNNING }} />
      </span>
      Live preview
    </span>
  );
}

function ChartVisual({ stage }: { stage: (typeof STAGES)[number] }) {
  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      style={{
        borderRadius: 9,
        background: "#FFFFFF",
        border: `1px solid ${LINE}`,
        padding: "12px 12px 10px",
        boxSizing: "border-box",
      }}
    >
      <div
        className={plusJakartaSans.className}
        style={{
          color: INK,
          fontSize: 13,
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: "-0.026em",
        }}
      >
        Quarterly forecast
      </div>

      <div className="flex min-h-0 flex-1 items-end justify-center" style={{ gap: 10, marginTop: 10 }}>
        {stage.bars.map((h, index) => (
          <div key={index} className="flex flex-col items-center" style={{ gap: 5, flex: 1 }}>
            <div
              className="w-full"
              style={{
                height: `${Math.round(h * 100)}%`,
                minHeight: 4,
                borderRadius: 4,
                background: index % 2 === 0 ? INK : "rgba(28, 22, 16, 0.32)",
                transition: `height 620ms ${MOTION_EASE}`,
              }}
            />
            {stage.labels ? (
              <span
                className={inter.className}
                style={{
                  color: MUTED_LIGHT,
                  fontSize: 7,
                  fontWeight: 500,
                  lineHeight: 1,
                  opacity: stage.labels ? 1 : 0,
                  transition: `opacity 420ms ${MOTION_EASE}`,
                }}
              >
                Q{index + 1}
              </span>
            ) : (
              <span style={{ height: 9 }} />
            )}
          </div>
        ))}
      </div>

      <div
        className="flex shrink-0 items-center justify-center"
        style={{
          gap: 12,
          marginTop: 9,
          height: 14,
          opacity: stage.legend ? 1 : 0,
          transform: stage.legend ? "translateY(0)" : "translateY(4px)",
          transition: `opacity 420ms ${MOTION_EASE}, transform 420ms ${MOTION_EASE}`,
        }}
      >
        <span className={`${inter.className} flex items-center`} style={{ gap: 4, color: MUTED, fontSize: 7, fontWeight: 500 }}>
          <span className="rounded-sm" style={{ width: 6, height: 6, background: INK }} aria-hidden />
          This year
        </span>
        <span className={`${inter.className} flex items-center`} style={{ gap: 4, color: MUTED, fontSize: 7, fontWeight: 500 }}>
          <span className="rounded-sm" style={{ width: 6, height: 6, background: "rgba(28, 22, 16, 0.32)" }} aria-hidden />
          Last year
        </span>
      </div>
    </div>
  );
}

function CodeToast({ code }: { code: string }) {
  return (
    <div
      className={`inline-flex items-center ${suisseIntl.className}`}
      style={{
        gap: 6,
        background: CODE_SURFACE,
        borderRadius: 999,
        padding: "6px 10px 6px 8px",
        boxShadow: "0 4px 14px rgba(28, 22, 16, 0.2)",
      }}
    >
      <span
        className="shrink-0 rounded-full"
        style={{ width: 5, height: 5, background: RUNNING }}
        aria-hidden
      />
      <span
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
          fontSize: 7,
          lineHeight: 1,
          letterSpacing: "-0.01em",
          color: CODE_INK,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: CODE_KEY }}>Chart.tsx</span>{" "}
        <span style={{ color: CODE_MUTED }}>·</span> {code}
      </span>
    </div>
  );
}

function BuildSandboxCard({ stage }: { stage: (typeof STAGES)[number] }) {
  return (
    <div
      className={`flex flex-col ${suisseIntl.className}`}
      style={{
        width: CARD_W,
        borderRadius: "0.65rem",
        background: GLASS,
        backdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
        WebkitBackdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
        boxSizing: "border-box",
        padding: "9px 9px 11px",
        boxShadow: "0 10px 30px rgba(28, 22, 16, 0.12), inset 0 1px 0 rgba(255,255,255,0.68)",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div className="flex shrink-0 items-center justify-between" style={{ marginBottom: 8 }}>
        <span
          className={inter.className}
          style={{ color: MUTED, fontSize: 7.5, fontWeight: 600, lineHeight: 1, letterSpacing: "-0.01em" }}
        >
          app/page.tsx
        </span>
        <RunningPill />
      </div>

      <div style={{ height: 152 }}>
        <ChartVisual stage={stage} />
      </div>
    </div>
  );
}

function BuildSandboxScene({ stage }: { stage: (typeof STAGES)[number] }) {
  return (
    <div style={{ position: "relative", width: PHONE_W, height: PHONE_H }}>
      <div className="absolute left-1/2 top-1/2" style={{ transform: "translate(-50%, -46%)" }}>
        <BuildSandboxCard stage={stage} />
      </div>
      <div
        className="absolute left-1/2"
        style={{ bottom: "16%", transform: "translateX(-50%)" }}
      >
        <CodeToast code={stage.code} />
      </div>
    </div>
  );
}

/** Watch them build — the rendered UI takes center stage, code trails as a live toast. */
export function ProtoSandboxBuildVisual({
  layout = "phone",
}: {
  layout?: "phone" | "desktop";
}) {
  const { ref, inView } = useProtoShaderBoxInView();
  const stage = useBuildStage(inView);

  if (layout === "phone") {
    return (
      <div ref={ref} className={`mx-auto h-full w-full ${suisseIntl.className}`} aria-hidden>
        <ProtoPhoneScaledArtboard
          width={PHONE_W}
          height={PHONE_H}
          fitScale={1.06}
          fixedBounds
          align="center"
        >
          <BuildSandboxScene stage={stage} />
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div className={`mx-auto flex h-full w-full items-center justify-center ${suisseIntl.className}`} aria-hidden>
      <BuildSandboxScene stage={stage} />
    </div>
  );
}
