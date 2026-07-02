/** /proto home — "More about Proto" horizontal post row (not linked yet). */
export type ProtoMoreAboutPost = {
  id: string;
  title: string;
  author: string;
  date: string;
  graphic: 0 | 1 | 2 | 3;
};

export const PROTO_MORE_ABOUT_POSTS: readonly ProtoMoreAboutPost[] = [
  {
    id: "recruiters",
    title: "Proto for Recruiters",
    author: "Proto Editorial",
    date: "Jul 2026",
    graphic: 0,
  },
  {
    id: "applicants",
    title: "Proto for Applicants",
    author: "Proto Editorial",
    date: "Jun 2026",
    graphic: 1,
  },
  {
    id: "challenges",
    title: "Proto Challenges",
    author: "Proto Editorial",
    date: "May 2026",
    graphic: 2,
  },
  {
    id: "integrations",
    title: "Integrations",
    author: "Proto Editorial",
    date: "Apr 2026",
    graphic: 3,
  },
] as const;
