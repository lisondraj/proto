"use client";

import { ProtoPhoneScaledArtboard } from "@/components/proto/ProtoPhoneScaledArtboard";

const GLASS_BG =
  "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(255,250,244,0.72) 45%, rgba(255,244,232,0.54) 100%)";

const PHONE_ARTBOARD_WIDTH_PX = 360;
const PHONE_ARTBOARD_HEIGHT_PX = 360;
/** Match featured role / explanation panel width (78% of artboard). */
const BOX_SIZE_PX = Math.round(PHONE_ARTBOARD_WIDTH_PX * 0.78);

function FrostedSquare() {
  return (
    <div
      style={{
        width: BOX_SIZE_PX,
        height: BOX_SIZE_PX,
        borderRadius: "0.55rem",
        background: GLASS_BG,
        backdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
        WebkitBackdropFilter: "blur(18px) saturate(1.35) brightness(1.04)",
      }}
    />
  );
}

/** Tracks. Compares. — blank frosted square placeholder. */
export function ProtoSandboxBlankPanelVisual({
  layout = "phone",
}: {
  layout?: "phone" | "desktop";
}) {
  if (layout === "phone") {
    return (
      <div className="mx-auto h-full w-full" aria-hidden>
        <ProtoPhoneScaledArtboard
          width={PHONE_ARTBOARD_WIDTH_PX}
          height={PHONE_ARTBOARD_HEIGHT_PX}
          fitScale={1.06}
          fixedBounds
        >
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              width: PHONE_ARTBOARD_WIDTH_PX,
              height: PHONE_ARTBOARD_HEIGHT_PX,
            }}
          >
            <FrostedSquare />
          </div>
        </ProtoPhoneScaledArtboard>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full w-full items-center justify-center" aria-hidden>
      <FrostedSquare />
    </div>
  );
}
