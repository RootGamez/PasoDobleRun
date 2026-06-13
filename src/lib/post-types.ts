export type PostCategory = "fuerza" | "running" | "fisioterapia";

export type PostMeta = {
  title: string;
  slug: string;
  date: string;
  category: PostCategory;
  instagramUrl: string;
  cover: string;
  excerpt: string;
  references: string[];
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

export const categoryLabels: Record<PostCategory, string> = {
  fuerza: "Fuerza",
  running: "Running",
  fisioterapia: "Fisioterapia",
};
