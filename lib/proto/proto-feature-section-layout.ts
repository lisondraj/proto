/** Desktop /proto feature band layout — split copy+panel or full-width panel band. */
export type ProtoFeatureSectionLayout =
  | { kind: "split"; boxOnLeft: boolean; /** iPhone — card above copy when true (defaults to boxOnLeft). */ boxOnTop?: boolean }
  | { kind: "full-panel" };

/** One entry per slide in PROTO_COMMUNICATION_SLIDES order. */
export const PROTO_FEATURE_SECTION_LAYOUTS: readonly ProtoFeatureSectionLayout[] = [
  { kind: "split", boxOnLeft: true }, // agents
  { kind: "split", boxOnLeft: true, boxOnTop: false }, // shortlist
  { kind: "split", boxOnLeft: true }, // sandbox-build
  { kind: "split", boxOnLeft: true }, // prototype (tracked sandbox)
  { kind: "split", boxOnLeft: true }, // billing (challenge rules)
  { kind: "full-panel" }, // front-desk
  { kind: "split", boxOnLeft: false }, // inbox
  { kind: "full-panel" }, // ambient
  { kind: "split", boxOnLeft: true }, // integrate (turn submissions — match top shader bands)
  { kind: "full-panel" }, // validate
  { kind: "split", boxOnLeft: true, boxOnTop: false }, // looking-ahead
];

export function protoFeatureSectionLayout(index: number): ProtoFeatureSectionLayout | undefined {
  return PROTO_FEATURE_SECTION_LAYOUTS[index];
}
