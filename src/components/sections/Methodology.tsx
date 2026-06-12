import { SectionHeading } from "@/components/ui/SectionHeading";
import { MindMap } from "@/components/ui/MindMap";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { faq } from "@/data/faq";
import { media } from "@/data/media";
import { stats } from "@/data/site";

export function Methodology() {
  return (
    <section id="metodologia" className="gradient-section relative scroll-mt-20 py-24 sm:py-32">
      <div className="gradient-radial-sky absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Por qué este entrenamiento"
          title="Un método, no una colección de rutinas"
          description="La mayoría entrena por imitación. Aquí cada decisión — desde la primera evaluación hasta tu próxima carrera — sigue un proceso con base científica. Explóralo."
        />

        <Reveal className="mt-14" y={40}>
          <MindMap />
        </Reveal>

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <h3 className="text-balance font-display text-2xl font-bold text-text sm:text-3xl">
              El método explicado por quien lo aplica
            </h3>
            <p className="mt-4 leading-relaxed text-text-muted">
              Nada de promesas vacías: en este video te contamos cómo evaluamos, cómo planificamos y
              por qué la fuerza es el eje de todo lo que hacemos — tanto si vienes por una lesión
              como si vas por tu próxima marca personal.
            </p>
            <p className="mt-4 text-sm text-text-muted">
              Más contenido en nuestro Instagram y en el foro científico.
            </p>
          </Reveal>
          <Reveal delay={0.15} y={40}>
            <VideoEmbed
              src={media.heroVideo.src}
              poster={media.heroVideo.poster}
              title="Presentación de la metodología Pasodoble Run"
            />
          </Reveal>
        </div>

        <StaggerGroup className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="bg-ink-soft px-6 py-10 text-center">
              <p className="font-display text-4xl font-extrabold text-sky sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-text-muted sm:text-sm">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-24">
          <SectionHeading
            kicker="FAQ"
            title="Preguntas que probablemente tienes"
            description="Las dudas más comunes antes de empezar, respondidas sin rodeos."
          />
          <Reveal className="mx-auto mt-12 max-w-3xl" y={40}>
            <Accordion items={faq} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
