import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

const postsDirectory = path.join(process.cwd(), "content", "posts");

export const categoryLabels: Record<PostCategory, string> = {
  fuerza: "Fuerza",
  running: "Running",
  fisioterapia: "Fisioterapia",
};

function parsePost(filename: string): Post {
  const raw = fs.readFileSync(path.join(postsDirectory, filename), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).length;
  return {
    title: data.title,
    slug: data.slug,
    date: data.date,
    category: data.category,
    instagramUrl: data.instagramUrl ?? "",
    cover: data.cover,
    excerpt: data.excerpt,
    references: data.references ?? [],
    readingMinutes: Math.max(2, Math.round(words / 200)),
    content,
  };
}

export function getAllPosts(): Post[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".mdx"))
    .map(parsePost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
