/** /proto home — "More about Proto" horizontal post row (not linked yet). */
export type ProtoMoreAboutCredit =
  | "James"
  | "Matthew Lisondra"
  | "Team, Product"
  | "Team, Engineering"
  | "Team, Design"
  | "Team, Research";

export type ProtoMoreAboutPost = {
  id: string;
  title: string;
  credit: ProtoMoreAboutCredit;
  date: string;
  graphic: 0 | 1 | 2 | 3;
};

export const PROTO_MORE_ABOUT_POSTS: readonly ProtoMoreAboutPost[] = [
  {
    id: "recruiters",
    title: "Proto for Recruiters",
    credit: "James",
    date: "Jul 2026",
    graphic: 0,
  },
  {
    id: "applicants",
    title: "Proto for Applicants",
    credit: "Matthew Lisondra",
    date: "Jun 2026",
    graphic: 1,
  },
  {
    id: "challenges",
    title: "Proto Challenges",
    credit: "Team, Product",
    date: "May 2026",
    graphic: 2,
  },
  {
    id: "integrations",
    title: "Integrations",
    credit: "Team, Engineering",
    date: "Apr 2026",
    graphic: 3,
  },
  {
    id: "agent-memory",
    title: "Agent memory",
    credit: "James",
    date: "Mar 2026",
    graphic: 0,
  },
  {
    id: "ambient-inbox",
    title: "The ambient inbox",
    credit: "Matthew Lisondra",
    date: "Feb 2026",
    graphic: 1,
  },
  {
    id: "research",
    title: "Research with users",
    credit: "Team, Research",
    date: "Jan 2026",
    graphic: 2,
  },
] as const;
