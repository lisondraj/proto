/** Visual startup logos — large distinct icons, no mark container. */

import type { ReactNode, SVGProps } from "react";

import { inter, lora, plusJakartaSans } from "@/lib/home/fonts";

const INK = "#2C2419";
const MUTED = "#8A7D6E";
/** Light lockup for dark shader backgrounds. */
const LIGHT_INK = "#FFF9F2";
const LIGHT_MUTED = "rgba(255, 249, 242, 0.88)";

type LogoTheme = "default" | "light";

function LogoFrame({ children, height }: { children: ReactNode; height: string }) {
  return (
    <div className="flex w-full min-w-0 items-center justify-start" style={{ height }} aria-hidden>
      {children}
    </div>
  );
}

function HarmonyIcon({
  theme = "default",
  ...props
}: SVGProps<SVGSVGElement> & { theme?: LogoTheme }) {
  const ink = theme === "light" ? LIGHT_INK : INK;

  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M3 17.5h4.5l2.5-7 3 14 2.8-8.2H20"
        stroke={ink}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="26.5" cy="17.5" r="2" fill={ink} />
    </svg>
  );
}

function LedgerIcon({
  theme = "default",
  ...props
}: SVGProps<SVGSVGElement> & { theme?: LogoTheme }) {
  const isLight = theme === "light";
  const primary = isLight ? LIGHT_INK : INK;
  const secondary = isLight ? "rgba(255, 249, 242, 0.55)" : INK;
  const secondaryOpacity = isLight ? 1 : 0.42;
  const line = isLight ? LIGHT_INK : "#FFFFFF";

  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <rect x="4" y="5" width="9" height="9" rx="2.2" fill={primary} />
      <rect
        x="17"
        y="5"
        width="11"
        height="9"
        rx="2.2"
        fill={secondary}
        opacity={secondaryOpacity}
      />
      <rect
        x="4"
        y="18"
        width="11"
        height="9"
        rx="2.2"
        fill={secondary}
        opacity={secondaryOpacity}
      />
      <rect x="19" y="18" width="9" height="9" rx="2.2" fill={primary} />
      <path d="M13.5 9.5h5M13.5 22.5h5" stroke={line} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function NorthwindIcon({
  theme = "default",
  ...props
}: SVGProps<SVGSVGElement> & { theme?: LogoTheme }) {
  const ink = theme === "light" ? LIGHT_INK : INK;

  // Compass ring + north pointer — reads as ops/navigation.
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <circle cx="16" cy="16" r="11" stroke={ink} strokeWidth="1.8" />
      <path d="M16 7.5l3.6 8.2H12.4L16 7.5z" fill={ink} />
      <path d="M16 16.5v7" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.6" fill={ink} />
    </svg>
  );
}

function LogoLockup({
  Icon,
  primary,
  secondary,
  height,
  fontClassName,
  textSize = "0.92em",
  textGap = "0.28em",
  theme = "default",
  allWhite = false,
}: {
  Icon: (props: SVGProps<SVGSVGElement> & { theme?: LogoTheme }) => JSX.Element;
  primary: string;
  secondary?: string;
  height: string;
  fontClassName: string;
  textSize?: string;
  textGap?: string;
  theme?: LogoTheme;
  allWhite?: boolean;
}) {
  const ink = theme === "light" || allWhite ? LIGHT_INK : INK;
  const muted = theme === "light" && allWhite ? LIGHT_INK : theme === "light" ? LIGHT_MUTED : MUTED;

  return (
    <LogoFrame height={height}>
      <div className="flex min-w-0 items-center" style={{ gap: "0.55em" }}>
        <Icon theme={theme} style={{ height: "1.55em", width: "1.55em", flexShrink: 0 }} />
        {secondary ? (
          <div className={`flex min-w-0 items-baseline ${fontClassName}`} style={{ gap: textGap }}>
            <span
              style={{
                color: ink,
                fontSize: textSize,
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1,
              }}
            >
              {primary}
            </span>
            <span
              style={{
                color: muted,
                fontSize: textSize,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {secondary}
            </span>
          </div>
        ) : (
          <span
            className={fontClassName}
            style={{
              color: ink,
              fontSize: textSize,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1,
            }}
          >
            {primary}
          </span>
        )}
      </div>
    </LogoFrame>
  );
}

export function HarmonyHealthLogo({
  height = "2.35rem",
  theme = "default",
}: {
  height?: string;
  theme?: LogoTheme;
}) {
  const ink = theme === "light" ? LIGHT_INK : INK;
  const muted = theme === "light" ? LIGHT_MUTED : MUTED;

  return (
    <LogoFrame height={height}>
      <div className="flex min-w-0 items-center" style={{ gap: "0.55em" }}>
        <HarmonyIcon theme={theme} style={{ height: "1.55em", width: "1.55em", flexShrink: 0 }} />
        <div className="flex min-w-0 items-baseline" style={{ gap: "0.28em" }}>
          <span
            className={lora.className}
            style={{
              color: ink,
              fontSize: "1.08em",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Harmony
          </span>
          <span
            className={lora.className}
            style={{
              color: muted,
              fontSize: "1.08em",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Health
          </span>
        </div>
      </div>
    </LogoFrame>
  );
}

export function LedgerAiLogo({
  height = "2.35rem",
  theme = "default",
}: {
  height?: string;
  theme?: LogoTheme;
}) {
  return (
    <LogoLockup
      Icon={LedgerIcon}
      primary="Ledger"
      height={height}
      fontClassName={plusJakartaSans.className}
      textSize="1.08em"
      theme={theme}
    />
  );
}

export function NorthwindOpsLogo({
  height = "2.35rem",
  theme = "default",
}: {
  height?: string;
  theme?: LogoTheme;
}) {
  return (
    <LogoFrame height={height}>
      <div className="flex min-w-0 items-center" style={{ gap: "0.55em" }}>
        <NorthwindIcon theme={theme} style={{ height: "1.55em", width: "1.55em", flexShrink: 0 }} />
        <div className="flex min-w-0 items-baseline" style={{ gap: "0.06em" }}>
          <span
            className={plusJakartaSans.className}
            style={{
              color: theme === "light" ? LIGHT_INK : INK,
              fontSize: "1.08em",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            NORTHWIND
          </span>
          <span
            className={inter.className}
            style={{
              color: theme === "light" ? LIGHT_INK : MUTED,
              fontSize: "1.08em",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            OPS
          </span>
        </div>
      </div>
    </LogoFrame>
  );
}

const LOGO_BY_ID = {
  harmony: HarmonyHealthLogo,
  ledger: LedgerAiLogo,
  northwind: NorthwindOpsLogo,
} as const;

export function ProtoSandboxStartupLogo({
  id,
  height,
  theme = "default",
}: {
  id: keyof typeof LOGO_BY_ID;
  height?: string;
  theme?: LogoTheme;
}) {
  const Logo = LOGO_BY_ID[id];
  return <Logo height={height} theme={theme} />;
}
