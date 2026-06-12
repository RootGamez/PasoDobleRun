import type { Metadata } from "next";
import { ForumIndex } from "@/components/sections/ForumIndex";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Foro científico",
  description:
    "Artículos de fuerza, running y fisioterapia con base científica: la versión completa y referenciada de lo que publicamos en Instagram.",
};

export default function ForumPage() {
  const posts = getAllPosts().map(({ content: _content, ...meta }) => meta);

  return (
    <div className="gradient-section relative pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="gradient-radial-sky absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-sky">
            Foro científico
          </p>
          <h1 className="text-balance mt-4 font-display text-4xl font-bold leading-tight text-text sm:text-5xl">
            Entrena también tu criterio
          </h1>
          <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg">
            Cada artículo amplía un tema de nuestro Instagram con la profundidad que las redes no
            permiten: evidencia, matices y aplicación práctica.
          </p>
        </div>
        <div className="mt-14">
          <ForumIndex posts={posts} />
        </div>
      </div>
    </div>
  );
}
