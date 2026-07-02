/** Desktop /proto feature band layout — split copy+panel or edge-bleed panel only. */
export type ProtoFeatureSectionLayout =
  | { kind: "split"; boxOnLeft: boolean }
  | { kind: "bleed-box-only"; boxSide: "left" | "right" };

/** One entry per slide in PROTO_COMMUNICATION_SLIDES order. */
export const PROTO_FEATURE_SECTION_LAYOUTS: readonly ProtoFeatureSectionLayout[] = [
  { kind: "split", boxOnLeft: true },
  { kind: "bleed-box-only", boxSide: "right" },
  { kind: "split", boxOnLeft: true },
  { kind: "bleed-box-only", boxSide: "right" },
  { kind: "split", boxOnLeft: true },
  { kind: "bleed-box-only", boxSide: "right" },
  { kind: "split", boxOnLeft: true },
  { kind: "split", boxOnLeft: false },
];
