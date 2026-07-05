import { ProtoAboutHeroGradient } from "@/components/proto/ProtoAboutHeroGradient";
import { ProtoGrainGradient } from "@/components/proto/ProtoGrainGradient";
import type { ProtoGrainGradientVariant } from "@/lib/proto/proto-grain-gradient";
import { BLOG_FEATURE_BOX_TW, BLOG_TITLE_VISUAL_GAP } from "@/lib/blog/blog-layout-styles";

export function BlogHeroVisual({
  variant = "hero",
  boxClassName,
  gapClassName,
  protoShaderVariant,
  children,
}: {
  variant?: "hero" | "list";
  boxClassName?: string;
  gapClassName?: string;
  /** /proto — Paper GrainGradient variant instead of CSS gradient + line grid. */
  protoShaderVariant?: ProtoGrainGradientVariant;
  children?: React.ReactNode;
}) {
  const gap = gapClassName ?? (variant === "hero" ? BLOG_TITLE_VISUAL_GAP : "");

  return (
    <div
      className={`relative w-full overflow-hidden ${boxClassName ?? BLOG_FEATURE_BOX_TW} ${gap}`.trim()}
      aria-hidden={children ? undefined : true}
    >
      {protoShaderVariant === "about-hero" ? (
        <ProtoAboutHeroGradient />
      ) : protoShaderVariant ? (
        <ProtoGrainGradient variant={protoShaderVariant} />
      ) : null}
      {children}
    </div>
  );
}
