"use client";

import { useEffect, useMemo, useState } from "react";

import { inter, plusJakartaSans, suisseIntl } from "@/lib/home/fonts";
import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";

const CODE_INK = "#FFF9F2";
const CODE_MUTED = "rgba(255, 249, 242, 0.28)";

const GLASS_INK = "#1C1610";
const GLASS_MUTED = "#5E564C";
const GLASS_BG =
  "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(255,250,244,0.72) 45%, rgba(255,244,232,0.54) 100%)";

/** Match featured role card width in shader box 1. */
const PANEL_WIDTH = "78%";

const PHONE_ARTBOARD_WIDTH_PX = 360;
const PHONE_ARTBOARD_HEIGHT_PX = 360;
const PANEL_HEIGHT_PX = 92;
const CODE_VIEWPORT_HEIGHT_PX = PHONE_ARTBOARD_HEIGHT_PX - PANEL_HEIGHT_PX;

const FONT_SIZE_PX = 9;
const LINE_HEIGHT_PX = 14;

const SECTION_HOLD_MS = 10000;
const SCROLL_MS = 700;
const PANEL_CROSSFADE_MS = 380;
const MOTION_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type CodeLine = { text: string; section: number };

type SectionNote = {
  section: number;
  /** Why this block was written — plain intent, not marketing copy. */
  intent: string;
};

/**
 * 0 setup        — context above (never highlighted)
 * 1 invoice      — ≤6 lines
 * 2 subscription — ≤6 lines
 * 3 dispatch     — ≤6 lines
 * 4 trailing     — context below (never highlighted)
 */
const CODE_LINES: readonly CodeLine[] = [
  { text: "import { NextRequest } from \"next/server\"", section: 0 },
  { text: "import Stripe from \"stripe\"", section: 0 },
  { text: "import { db } from \"@/lib/db\"", section: 0 },
  { text: "import { ledger } from \"@/lib/ledger\"", section: 0 },
  { text: "", section: 0 },
  { text: "const stripe = new Stripe(process.env.STRIPE_KEY!)", section: 0 },
  { text: "", section: 0 },

  // 1 — invoice (5 lines)
  { text: "async function onInvoicePaid(event: Stripe.Event) {", section: 1 },
  { text: "  const invoice = event.data.object as Stripe.Invoice", section: 1 },
  { text: "  await ledger.recordPayment(", section: 1 },
  { text: "    invoice.id, invoice.amount_paid)", section: 1 },
  { text: "}", section: 1 },

  { text: "", section: 4 },

  // 2 — subscription (5 lines)
  { text: "async function onSubscriptionUpdated(event: Stripe.Event) {", section: 2 },
  { text: "  const sub = event.data.object as Stripe.Subscription", section: 2 },
  { text: "  await ledger.syncSubscription(", section: 2 },
  { text: "    sub.id, sub.status, sub.current_period_end)", section: 2 },
  { text: "}", section: 2 },

  { text: "", section: 4 },

  // 3 — dispatch (5 lines)
  { text: "const handlers = {", section: 3 },
  { text: '  "invoice.paid": onInvoicePaid,', section: 3 },
  { text: '  "customer.subscription.updated": onSubscriptionUpdated,', section: 3 },
  { text: "}", section: 3 },
  { text: "await handlers[event.type]?.(event)", section: 3 },

  { text: "", section: 4 },

  // trailing context (never highlighted)
  { text: "export async function POST(req: NextRequest) {", section: 4 },
  { text: "  const payload = await req.text()", section: 4 },
  { text: "  const sig = req.headers.get(\"stripe-signature\")", section: 4 },
  { text: "  const event = stripe.webhooks.constructEvent(", section: 4 },
  { text: "    payload,", section: 4 },
  { text: "    sig!,", section: 4 },
  { text: "    process.env.STRIPE_WEBHOOK_SECRET!,", section: 4 },
  { text: "  )", section: 4 },
  { text: "  if (await db.events.has(event.id)) return ok()", section: 4 },
  { text: "  await db.events.insert(event.id)", section: 4 },
  { text: "  await handlers[event.type]?.(event)", section: 4 },
  { text: "  return ok()", section: 4 },
  { text: "}", section: 4 },
];

/** Highlight trail: invoice → subscription → dispatch. Setup stays above as context. */
const HIGHLIGHT_SECTIONS = [1, 2, 3] as const;

const APPLICANT = {
  name: "Jordan Park",
  score: "91",
  time: "9m",
  location: "NYC",
  initials: "JP",
} as const;

const SECTION_NOTES: readonly SectionNote[] = [
  {
    section: 1,
    intent: "Paid invoices write the credit.",
  },
  {
    section: 2,
    intent: "Subscription changes update status and period.",
  },
  {
    section: 3,
    intent: "Event type picks the handler.",
  },
];

function sectionRange(section: number) {
  let start = CODE_LINES.length;
  let end = -1;
  CODE_LINES.forEach((line, index) => {
    if (line.section === section) {
      start = Math.min(start, index);
      end = Math.max(end, index);
    }
  });
  return { start, end };
}

function ExplanationPanel({ activeSection }: { activeSection: number }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: PANEL_HEIGHT_PX,
        borderRadius: "0.55rem",
        background: GLASS_BG,
        backdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
        WebkitBackdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
      }}
    >
      {SECTION_NOTES.map((note) => {
        const active = note.section === activeSection;

        return (
          <div
            key={note.section}
            className="absolute inset-0 flex flex-col justify-center"
            style={{
              padding: "0.4rem 0.58rem",
              opacity: active ? 1 : 0,
              transition: reduceMotion
                ? undefined
                : `opacity ${PANEL_CROSSFADE_MS}ms ${MOTION_EASE}`,
              pointerEvents: active ? "auto" : "none",
            }}
          >
            <p
              className={`${suisseIntl.className} m-0`}
              style={{
                color: GLASS_INK,
                fontSize: "0.8rem",
                fontWeight: 500,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              {note.intent}
            </p>

            <div
              className="flex items-center"
              style={{ gap: "0.38rem", marginTop: "0.32rem" }}
            >
              <div
                className={`${inter.className} flex shrink-0 items-center justify-center rounded-full`}
                style={{
                  width: "1.15rem",
                  height: "1.15rem",
                  background: "rgba(28, 22, 16, 0.1)",
                  color: GLASS_INK,
                  fontSize: "0.48rem",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
                aria-hidden
              >
                {APPLICANT.initials}
              </div>
              <span
                className={`${inter.className} truncate`}
                style={{
                  color: GLASS_MUTED,
                  fontSize: "0.62rem",
                  fontWeight: 500,
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                {APPLICANT.name}
              </span>
              <span
                aria-hidden
                style={{
                  width: "0.2rem",
                  height: "0.2rem",
                  borderRadius: "999px",
                  background: "rgba(28, 22, 16, 0.18)",
                  flexShrink: 0,
                }}
              />
              <span
                className={`${inter.className} shrink-0 tabular-nums`}
                style={{
                  color: GLASS_MUTED,
                  fontSize: "0.62rem",
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                {APPLICANT.score}
                <span style={{ margin: "0 0.22em", opacity: 0.35 }}>·</span>
                {APPLICANT.time}
                <span style={{ margin: "0 0.22em", opacity: 0.35 }}>·</span>
                {APPLICANT.location}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CodeSnippet({
  activeSection,
  viewportHeight,
}: {
  activeSection: number;
  viewportHeight: number;
}) {
  const ranges = useMemo(() => {
    const map = new Map<number, { start: number; end: number }>();
    for (let section = 0; section <= 3; section += 1) {
      map.set(section, sectionRange(section));
    }
    return map;
  }, []);

  const { start, end } = ranges.get(activeSection) ?? sectionRange(1);
  const midLine = (start + end) / 2;
  const translateY = viewportHeight / 2 - (midLine + 0.5) * LINE_HEIGHT_PX;

  return (
    <pre
      className="m-0 p-0"
      style={{
        fontFamily:
          'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        fontSize: FONT_SIZE_PX,
        lineHeight: `${LINE_HEIGHT_PX}px`,
        letterSpacing: "-0.01em",
        background: "transparent",
        whiteSpace: "pre",
        width: "max-content",
        maxWidth: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        transform: `translate3d(0, ${translateY}px, 0)`,
        transition: `transform ${SCROLL_MS}ms ${MOTION_EASE}`,
        willChange: "transform",
      }}
    >
      {CODE_LINES.map((line, index) => {
        const highlighted = line.section === activeSection;

        return (
          <div
            key={`${index}-${line.text}`}
            style={{
              color: highlighted ? CODE_INK : CODE_MUTED,
              fontWeight: highlighted ? 500 : 400,
              height: LINE_HEIGHT_PX,
              transition: `color ${SCROLL_MS}ms ${MOTION_EASE}`,
            }}
          >
            {line.text.length > 0 ? line.text : "\u00a0"}
          </div>
        );
      })}
    </pre>
  );
}

function useSectionCycle() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % HIGHLIGHT_SECTIONS.length);
    }, SECTION_HOLD_MS);

    return () => window.clearInterval(timer);
  }, []);

  return HIGHLIGHT_SECTIONS[step] ?? 1;
}

function CodeScene({
  activeSection,
  width,
  height,
}: {
  activeSection: number;
  width: number;
  height: number;
}) {
  const codeViewportHeight = height - PANEL_HEIGHT_PX;

  return (
    <div
      className="relative overflow-hidden"
      style={{ width, height, background: "transparent" }}
    >
      <div
        className="overflow-hidden"
        style={{
          width,
          height: codeViewportHeight,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <CodeSnippet
          activeSection={activeSection}
          viewportHeight={codeViewportHeight}
        />
      </div>

      <div
        className="absolute bottom-0 left-1/2"
        style={{
          width: PANEL_WIDTH,
          transform: "translateX(-50%)",
          paddingBottom: "0",
        }}
      >
        <ExplanationPanel activeSection={activeSection} />
      </div>
    </div>
  );
}

/** Second shader — code trail with frosted summary panel. */
export function ProtoSandboxCodeSnippetVisual({
  layout = "phone",
}: {
  layout?: "phone" | "desktop";
}) {
  const activeSection = useSectionCycle();

  if (layout === "phone") {
    return (
      <div className={`mx-auto h-full w-full ${suisseIntl.className}`} aria-hidden>
        <ProtoPhoneScaledArtboard
          width={PHONE_ARTBOARD_WIDTH_PX}
          height={PHONE_ARTBOARD_HEIGHT_PX}
          fitScale={1.06}
          fixedBounds
        >
          <CodeScene
            activeSection={activeSection}
            width={PHONE_ARTBOARD_WIDTH_PX}
            height={PHONE_ARTBOARD_HEIGHT_PX}
          />
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto h-full w-full ${suisseIntl.className}`}
      aria-hidden
    >
      <div className="flex h-full w-full items-center justify-center px-4">
        <div className="w-full max-w-[22rem]">
          <CodeScene
            activeSection={activeSection}
            width={PHONE_ARTBOARD_WIDTH_PX}
            height={PHONE_ARTBOARD_HEIGHT_PX}
          />
        </div>
      </div>
    </div>
  );
}
