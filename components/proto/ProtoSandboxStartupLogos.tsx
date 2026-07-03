/** Visual startup logos — large distinct icons, no mark container. */

import type { ReactNode, SVGProps } from "react";

import { lora, outfit, suisseIntl } from "@/lib/home/fonts";

const INK = "#2C2419";
const MUTED = "#8A7D6E";

function LogoFrame({ children, height }: { children: ReactNode; height: string }) {
  return (
    <div className="flex w-full min-w-0 items-center justify-start" style={{ height }} aria-hidden>
      {children}
    </div>
  );
}

function HarmonyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M3 17.5h4.5l2.5-7 3 14 2.8-8.2H20"
        stroke={INK}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="26.5" cy="17.5" r="2" fill={INK} />
    </svg>
  );
}

function LedgerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <rect x="4" y="5" width="9" height="9" rx="2.2" fill={INK} />
      <rect x="17" y="5" width="11" height="9" rx="2.2" fill={INK} opacity="0.42" />
      <rect x="4" y="18" width="11" height="9" rx="2.2" fill={INK} opacity="0.42" />
      <rect x="19" y="18" width="9" height="9" rx="2.2" fill={INK} />
      <path d="M13.5 9.5h5M13.5 22.5h5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function NorthwindIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M16 4l10 22H19.2l-1.4-4.2H10.2L8.8 26H6L16 4z"
        fill={INK}
      />
      <path
        d="M11.5 17.2h9L16 9.8 11.5 17.2z"
        fill="#FFFFFF"
      />
      <path
        d="M23.5 8.5l4.5 2.5M23.5 13l4.5 2M23.5 17.5l4.5 2.5"
        stroke={INK}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
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
}: {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  primary: string;
  secondary?: string;
  height: string;
  fontClassName: string;
  textSize?: string;
}) {
  return (
    <LogoFrame height={height}>
      <div className="flex min-w-0 items-center" style={{ gap: "0.55em" }}>
        <Icon style={{ height: "1.55em", width: "1.55em", flexShrink: 0 }} />
        {secondary ? (
          <div className={`flex min-w-0 items-baseline ${fontClassName}`} style={{ gap: "0.28em" }}>
            <span
              style={{
                color: INK,
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
                color: MUTED,
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
              color: INK,
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

export function HarmonyHealthLogo({ height = "2.35rem" }: { height?: string }) {
  return (
    <LogoFrame height={height}>
      <div className="flex min-w-0 items-center" style={{ gap: "0.55em" }}>
        <HarmonyIcon style={{ height: "1.55em", width: "1.55em", flexShrink: 0 }} />
        <div className={`flex flex-col items-start ${lora.className}`} style={{ gap: "0.1em" }}>
          <span
            style={{
              color: INK,
              fontSize: "0.92em",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1,
            }}
          >
            harmony
          </span>
          <span
            style={{
              color: MUTED,
              fontSize: "0.92em",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            health
          </span>
        </div>
      </div>
    </LogoFrame>
  );
}

export function LedgerAiLogo({ height = "2.35rem" }: { height?: string }) {
  return (
    <LogoLockup
      Icon={LedgerIcon}
      primary="Ledger"
      height={height}
      fontClassName={suisseIntl.className}
      textSize="1.08em"
    />
  );
}

export function NorthwindOpsLogo({ height = "2.35rem" }: { height?: string }) {
  return (
    <LogoLockup
      Icon={NorthwindIcon}
      primary="NORTHWIND"
      secondary="OPS"
      height={height}
      fontClassName={outfit.className}
      textSize="1.08em"
    />
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
}: {
  id: keyof typeof LOGO_BY_ID;
  height?: string;
}) {
  const Logo = LOGO_BY_ID[id];
  return <Logo height={height} />;
}
