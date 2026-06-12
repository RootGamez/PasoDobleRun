import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, BookOpen, Clock, Instagram } from "lucide-react";
import { getAllPosts, getPostBySlug, categoryLabels } from "@/lib/posts";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.cover] },
  };
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("es-VE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="relative">
      <div className="relative h-[46svh] min-h-80 overflow-hidden">
        <img src={post.cover} alt="" className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-5 pb-10 sm:px-8">
          <span className="rounded-full bg-sky px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-ink">
            {categoryLabels[post.category]}
          </span>
          <h1 className="text-balance mt-5 font-display text-3xl font-bold leading-tight text-text sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-text-muted">
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden />
              {post.readingMinutes} min de lectura
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <Link
          href="/foro/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky transition-colors hover:text-sky-bright"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Volver al foro
        </Link>

        <div className="prose-pasodoble mt-10">
          <MDXRemote source={post.content} />
        </div>

        {post.references.length > 0 && (
          <aside className="mt-14 rounded-2xl border border-line bg-ink-soft p-7">
            <h2 className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-widest text-sky">
              <BookOpen className="size-5" aria-hidden />
              Referencias
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-text-muted">
              {post.references.map((ref) => (
                <li key={ref}>{ref}</li>
              ))}
            </ol>
          </aside>
        )}

        {post.instagramUrl && (
          <a
            href={post.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-sky/40 px-7 py-3 font-display text-sm font-bold uppercase tracking-wider text-sky transition-all hover:bg-sky hover:text-ink active:scale-95"
          >
            <Instagram className="size-5" aria-hidden />
            Ver el post original en Instagram
          </a>
        )}
      </div>
    </article>
  );
}
