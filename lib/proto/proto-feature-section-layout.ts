/** Desktop /proto feature band layout — split copy+panel, optional edge bleed on the panel side. */
export type ProtoFeatureSectionLayout = {
  kind: "split";
  boxOnLeft: boolean;
  boxBleedToMargin?: boolean;
};

/** One entry per slide in PROTO_COMMUNICATION_SLIDES order. */
export const PROTO_FEATURE_SECTION_LAYOUTS: readonly ProtoFeatureSectionLayout[] = [
  { kind: "split", boxOnLeft: true },
  { kind: "split", boxOnLeft: false, boxBleedToMargin: true },
  { kind: "split", boxOnLeft: true },
  { kind: "split", boxOnLeft: false, boxBleedToMargin: true },
  { kind: "split", boxOnLeft: true },
  { kind: "split", boxOnLeft: false, boxBleedToMargin: true },
  { kind: "split", boxOnLeft: true },
  { kind: "split", boxOnLeft: false },
];
