/** Desktop /proto feature band layout — split copy+panel or full-width panel band. */
export type ProtoFeatureSectionLayout =
  | { kind: "split"; boxOnLeft: boolean }
  | { kind: "full-panel" };

/** One entry per slide in PROTO_COMMUNICATION_SLIDES order. */
export const PROTO_FEATURE_SECTION_LAYOUTS: readonly ProtoFeatureSectionLayout[] = [
  { kind: "split", boxOnLeft: true },
  { kind: "full-panel" },
  { kind: "split", boxOnLeft: true },
  { kind: "full-panel" },
  { kind: "split", boxOnLeft: true },
  { kind: "full-panel" },
  { kind: "split", boxOnLeft: true },
  { kind: "split", boxOnLeft: false },
];
