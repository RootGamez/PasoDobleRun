"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { categoryLabels, type PostCategory, type PostMeta } from "@/lib/posts";

const filters: Array<{ value: PostCategory | "todos"; label: string }> = [
  { value: "todos", label: "Todos" },
  { value: "fuerza", label: "Fuerza" },
  { value: "running", label: "Running" },
  { value: "fisioterapia", label: "Fisioterapia" },
];

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("es-VE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ForumIndex({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<PostCategory | "todos">("todos");

  const visible = useMemo(
    () => (active === "todos" ? posts : posts.filter((p) => p.category === active)),
    [posts, active]
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Filtrar por categoría">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActive(filter.value)}
            aria-pressed={active === filter.value}
            className={`min-h-11 cursor-pointer rounded-full px-6 py-2.5 font-display text-sm font-semibold transition-all active:scale-95 ${
              active === filter.value
                ? "bg-sky text-ink shadow-[0_0_24px_-6px_rgba(56,189,248,0.6)]"
                : "border border-line text-text-muted hover:border-sky/50 hover:text-text"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((post) => (
            <motion.article
              key={post.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
            >
              <Link
                href={`/foro/${post.slug}/`}
                className="card-glow group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.cover}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-sky backdrop-blur-sm">
                    {categoryLabels[post.category]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs text-text-muted">{formatDate(post.date)}</p>
                  <h2 className="mt-2 font-display text-lg font-bold leading-snug text-text transition-colors group-hover:text-sky-bright">
                    {post.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-5 text-xs text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" aria-hidden />
                      {post.readingMinutes} min
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-sky transition-transform group-hover:translate-x-1">
                      Leer artículo <ArrowRight className="size-3.5" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-16 text-center text-text-muted">
          Aún no hay artículos en esta categoría. Muy pronto publicaremos más contenido.
        </p>
      )}
    </div>
  );
}
