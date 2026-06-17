import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { getAllPosts, categoryLabels } from "@/lib/posts";
import { site } from "@/data/site";

export function ForumPreview() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="foro" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Foro científico"
          title="Lo que publicamos en Instagram, con la ciencia completa"
          description="Cada post amplía un tema de nuestras redes: sin recortes, con referencias y aplicación práctica."
        />

        <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <article className="card-glow group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft">
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
                  <h3 className="font-display text-lg font-bold leading-snug text-text">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-5 text-xs text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" aria-hidden />
                      {post.readingMinutes} min de lectura
                    </span>
                    <Button
                      href={post.instagramUrl || site.instagram}
                      external
                      variant="ghost"
                      className="min-h-0 gap-1 border-0 px-0 py-0 text-xs font-semibold text-sky hover:border-0 hover:text-sky-bright"
                    >
                      Saber más <ArrowRight className="size-3.5" aria-hidden />
                    </Button>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-12 text-center">
          <Link
            href="/foro/"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-sky/40 px-7 py-3 font-display text-sm font-bold uppercase tracking-wider text-sky transition-all hover:bg-sky hover:text-ink active:scale-95"
          >
            Ver todos los artículos
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
