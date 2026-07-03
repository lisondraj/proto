/** /proto-invest — investor article copy for Proto (hiring platform). */

export const PROTO_INVEST_INTRO_LEAD_LINES = [
  "AI redefined who can build.",
  "Proto redefines how companies hire.",
] as const;

export const PROTO_INVEST_INTRO_PARAGRAPHS = [
  "Proto transforms job postings into hands-on build challenges completed in a monitored AI-native sandbox, so you can hire exceptional talent in engineering, product, operations, marketing and so much more.",
] as const;

/** @deprecated Desktop — use PROTO_INVEST_INTRO_LEAD_LINES on mobile. */
export const PROTO_INVEST_INTRO = PROTO_INVEST_INTRO_LEAD_LINES.join(" ");

export type ProtoInvestLabeledBullet = {
  label: string;
  text: string;
};

export const PROTO_INVEST_RECRUITER_SECTION = {
  lead: "For recruiters:",
  bullets: [
    {
      label: "Build",
      text: "Applicants complete projects tied to your existing job postings in an AI-native sandbox.",
    },
    {
      label: "Replay",
      text: "See exactly how candidates approached the problem, from first prompt to final solution.",
    },
    {
      label: "Evaluate",
      text: "Surface your strongest candidates by measuring how they actually build.",
    },
  ],
} as const satisfies { lead: string; bullets: readonly ProtoInvestLabeledBullet[] };

/** iPhone /about — in-page anchor targets for the mobile table of contents. */
export const PROTO_INVEST_MOBILE_SECTION_IDS = {
  introduction: "proto-invest-introduction",
  product: "proto-invest-product",
  founders: "proto-invest-founders",
  productMarket: "proto-invest-product-market",
  beyondProto: "proto-invest-beyond-proto",
} as const;

export const PROTO_INVEST_MOBILE_TOC_ITEMS = [
  { id: PROTO_INVEST_MOBILE_SECTION_IDS.introduction, label: "Introduction" },
  { id: PROTO_INVEST_MOBILE_SECTION_IDS.product, label: "Product" },
  { id: PROTO_INVEST_MOBILE_SECTION_IDS.founders, label: "Founders" },
  { id: PROTO_INVEST_MOBILE_SECTION_IDS.productMarket, label: "Product–Market" },
  { id: PROTO_INVEST_MOBILE_SECTION_IDS.beyondProto, label: "Beyond Proto" },
] as const;

export const PROTO_INVEST_MOBILE_TOC_LABEL = "Contents" as const;

export const PROTO_INVEST_MOBILE_ARTICLE_AUDIO = {
  label: "Listen to the voice recording of the article",
  /** Wire when the recording is hosted under /public. */
  src: undefined as string | undefined,
} as const;

export const PROTO_INVEST_THINKING_BEYOND_HEADLINE_LINES = ["The larger", "Proto vision."] as const;

export const PROTO_INVEST_THINKING_BEYOND_PARAGRAPH =
  "Recruiters still spend most of their week on screening and admin — Proto shifts that time toward reviewing how candidates actually build.";

export const PROTO_INVEST_PIE_CHART = {
  title: "Recruiter week split",
  caption:
    "Approximate share of recruiter time spent on administrative screening versus reviewing candidate work samples.",
  citation: "Sources: LinkedIn Global Talent Trends; Greenhouse Recruiting Benchmarks; Proto market model, 2026.",
  slices: [
    { label: "Work sample review", value: 1, suffix: "part" },
    { label: "Screening & admin", value: 3, suffix: "parts" },
  ],
} as const;

export const PROTO_INVEST_BAR_CHART = {
  title: "Weekly hours on hiring admin",
  caption: "Survey averages for in-house recruiters, non-evaluation hours per week.",
  citation: "Sources: SHRM Talent Acquisition Benchmarking; Greenhouse State of Hiring, 2025.",
  bars: [
    { label: "United States", value: 18, suffix: "hrs/wk" },
    { label: "Canada", value: 16, suffix: "hrs/wk" },
  ],
} as const;

export const PROTO_INVEST_CHARTS_CAPTION = `${PROTO_INVEST_PIE_CHART.caption} ${PROTO_INVEST_BAR_CHART.caption}`;

export const PROTO_INVEST_CHARTS_CITATION = PROTO_INVEST_PIE_CHART.citation;

export const PROTO_INVEST_PRODUCT_HEADLINE_LINES = ["AI built for", "recruiting"] as const;

export const PROTO_INVEST_FAQ_HEADLINE_LINES = [
  "We're meeting",
  "the moment",
] as const;

/** Meet Proto team grid — 2×3 startup disciplines above the tall shader panel. */
export const PROTO_INVEST_STARTUP_TEAMS = [
  "Product",
  "Engineering",
  "Design",
  "Marketing",
  "Operations",
  "Sales",
] as const;

/** Proto customer segments — Who is Proto for? FAQ. */
export const PROTO_INVEST_PROTO_CUSTOMERS = [
  "Early-Stage Startups",
  "Growth-Stage Startups",
  "Scaleups",
  "Recruiting Agencies",
  "Venture Studios",
  "Startup Accelerators",
] as const;

export const PROTO_INVEST_FOUNDERS_HEADLINE_LINES = ["Two brothers,", "one vision"] as const;

export type ProtoInvestFaqItem = {
  question: string;
  answer: string | readonly string[];
  bullets?: readonly string[];
  bulletColumns?: 1 | 2;
  /** Paragraphs to render before the bullet list (default: 1). */
  bulletsAfterParagraphs?: number;
};

export const PROTO_INVEST_FAQ_ITEMS: readonly ProtoInvestFaqItem[] = [
  {
    question: "Who is Proto for?",
    answer: [
      "Proto is built for organizations hiring people who create. From startups hiring their first engineer to enterprises scaling technical teams, Proto helps companies identify exceptional builders through real work, such as:",
      "Our work will focus on the US and Canada AI market with plans to expand globally.",
    ],
    bullets: PROTO_INVEST_PROTO_CUSTOMERS,
    bulletsAfterParagraphs: 1,
  },
  {
    question: "What sets us apart?",
    answer:
      "Proto learns from thousands of build sessions across companies and roles, allowing customers to benchmark candidates against a much larger talent pool than their own hiring history.",
  },
  {
    question: "What is Proto?",
    answer:
      "Proto is a hiring platform where candidates complete real tasks inside a sandbox that mirrors your product, stack, and standards. Every action is tracked, scored, and replayed so recruiters compare applicants on evidence, not interview performance.",
  },
  {
    question: "How does evaluation work?",
    answer:
      "Companies post roles or open challenges. Applicants work inside Proto's sandbox while the platform captures replays, rubric scores, and comparison rankings. Recruiters review on desktop or phone, validate prototypes against real users, and move on strong talent before the interview loop decides.",
  },
] as const;

export const PROTO_INVEST_TAM_CHART = {
  title: "Total Addressable Market",
  yMax: 90,
  caption:
    "Proto expands from technical hiring into assessment, talent acquisition, and HR software.",
  citation: "Sources: Fortune Business Insights; Grand View Research; Proto model, 2026.",
  bars: [
    { label: "Technical hiring", value: 4 },
    { label: "Skills assessment", value: 8 },
    { label: "Talent acquisition", value: 15 },
    { label: "Recruitment software", value: 24 },
    { label: "HR technology", value: 45 },
    { label: "Future of work", value: 90, plus: true },
  ],
  highlight: {
    valueDisplay: "$90B+",
    tamLabel: "Long-Term Market Opportunity",
    headline:
      "Hiring, talent acquisition, skills assessment, and AI-native workforce software.",
  },
} as const;

export const PROTO_INVEST_TAM_CAPTION = PROTO_INVEST_TAM_CHART.caption;

export const PROTO_INVEST_TAM_CITATION = PROTO_INVEST_TAM_CHART.citation;

/** Quarterly forecast — share of recruiting teams using AI software (next 16 quarters). */
export const PROTO_INVEST_AI_RECRUITING_FORECAST_CHART = {
  title: "AI recruiting software adoption",
  caption:
    "Share of North American recruiting teams using AI hiring software, forecast by quarter through 2030.",
  citation: "Sources: LinkedIn Future of Recruiting; Greenhouse; Proto model, 2026–2030.",
  yMax: 100,
  quarters: [
    { label: "Q3 '26", value: 38 },
    { label: "Q4 '26", value: 41 },
    { label: "Q1 '27", value: 44 },
    { label: "Q2 '27", value: 48 },
    { label: "Q3 '27", value: 52 },
    { label: "Q4 '27", value: 56 },
    { label: "Q1 '28", value: 60 },
    { label: "Q2 '28", value: 64 },
    { label: "Q3 '28", value: 68 },
    { label: "Q4 '28", value: 71 },
    { label: "Q1 '29", value: 74 },
    { label: "Q2 '29", value: 77 },
    { label: "Q3 '29", value: 79 },
    { label: "Q4 '29", value: 81 },
    { label: "Q1 '30", value: 83 },
    { label: "Q2 '30", value: 85 },
  ],
} as const;

export const PROTO_INVEST_AI_RECRUITING_FORECAST_CAPTION =
  PROTO_INVEST_AI_RECRUITING_FORECAST_CHART.caption;

export const PROTO_INVEST_AI_RECRUITING_FORECAST_CITATION =
  PROTO_INVEST_AI_RECRUITING_FORECAST_CHART.citation;

export const PROTO_INVEST_AI_ADOPTION_CHART = {
  title: "AI adoption in recruiting workflows",
  caption:
    "Share of in-house recruiting teams in Canada and the United States using AI for each hiring workflow, blended from talent-acquisition surveys and HR tech deployment data.",
  citation:
    "Sources: LinkedIn Future of Recruiting; Greenhouse AI in Hiring Report; SHRM Talent Acquisition Benchmarks; Proto market model, 2026.",
  bars: [
    { label: "Resume screening", value: 62, suffix: "%" },
    { label: "Candidate sourcing", value: 55, suffix: "%" },
    { label: "Interview scheduling", value: 48, suffix: "%" },
    { label: "Offer & onboarding", value: 34, suffix: "%" },
    { label: "Work sample evaluation", value: 19, suffix: "%" },
    { label: "Prototype validation", value: 11, suffix: "%" },
  ],
} as const;

export const PROTO_INVEST_AI_ADOPTION_CAPTION = PROTO_INVEST_AI_ADOPTION_CHART.caption;

export const PROTO_INVEST_AI_ADOPTION_CITATION = PROTO_INVEST_AI_ADOPTION_CHART.citation;

export const PROTO_INVEST_FOUNDERS_PARAGRAPHS = [
  "Brothers James and Matthew Lisondra co-founded Proto with the belief that AI can transform the way we recruit talent, building exceptional teams that will supercharge the era of intelligence.",
  "Together, James and Matthew bring complementary expertise to Proto. James, a medical student at the University of Ottawa, leads product, operations, marketing, and design.",
  "Matthew, a PhD candidate in Engineering at the University of Toronto, brings deep expertise in AI, machine learning, computer vision, and software engineering.",
] as const;

export const PROTO_INVEST_FOUNDERS_QUOTE = {
  text: "The hire should be obvious before anyone schedules a panel.",
  attribution: "James & Matthew Lisondra, Co-founders",
} as const;
