import { GraduationCap, Eye, Compass, HeartHandshake } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { media } from "@/data/media";
import { site } from "@/data/site";

const values = [
  {
    icon: Compass,
    title: "Misión",
    text: "Acompañar a cada persona — desde el paciente con dolor hasta el atleta competitivo — con un proceso integrado de fisioterapia, fuerza y running basado en la mejor evidencia disponible.",
  },
  {
    icon: Eye,
    title: "Visión",
    text: "Ser la referencia en Venezuela de entrenamiento y rehabilitación con criterio científico, demostrando que rendimiento y salud no son caminos separados.",
  },
  {
    icon: HeartHandshake,
    title: "Valores",
    text: "Evidencia antes que moda. Honestidad en los plazos. Educación para que entiendas tu proceso. Y constancia, porque los resultados se construyen paso a paso — a pasodoble.",
  },
] as const;

const milestones = [
  {
    year: "El origen",
    text: "Pasodoble Run nace en Caracas de una convicción: la fisioterapia y el entrenamiento no deberían vivir en mundos separados.",
  },
  {
    year: "La integración",
    text: "Unimos consulta de fisioterapia, programación de fuerza y planes de running bajo una sola metodología con criterios compartidos.",
  },
  {
    year: "La comunidad",
    text: "Cientos de atletas y pacientes después, el método se ha convertido en una comunidad que entrena, corre y se recupera con ciencia.",
  },
  {
    year: "Hoy",
    text: "Seguimos creciendo: contenido científico en Instagram, foro educativo y programas presenciales y a distancia.",
  },
] as const;

export function About() {
  return (
    <section id="nosotros" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Quiénes somos"
          title="Ciencia, sudor y propósito"
          description={`Detrás de ${site.name} hay profesionales de la fisioterapia y las ciencias del ejercicio convencidos de que entrenar bien es la mejor medicina.`}
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-2">
          <Reveal y={40}>
            <figure>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={media.about.founderOne}
                  alt="Fundador de Pasodoble Run"
                  loading="lazy"
                  className="aspect-[3/4] w-full rounded-2xl border border-line object-cover object-top"
                />
                <img
                  src={media.about.founderTwo}
                  alt="Cofundador de Pasodoble Run"
                  loading="lazy"
                  className="aspect-[3/4] w-full rounded-2xl border border-line object-cover object-top sm:mt-10"
                />
              </div>
              <figcaption className="mt-5 text-center font-display text-xs font-bold uppercase tracking-[0.3em] text-gold">
                Nuestros fundadores
              </figcaption>
            </figure>
            <div className="mt-14 rounded-2xl border border-line bg-ink-soft p-6">
              <p className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-sky">
                <GraduationCap className="size-5" aria-hidden />
                Equipo profesional
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Fisioterapeutas y entrenadores certificados, en formación continua. Las credenciales y
                bios completas del equipo se publicarán en esta sección.
              </p>
            </div>
          </Reveal>

          <div>
            <StaggerGroup className="space-y-5">
              {values.map((value) => (
                <StaggerItem key={value.title}>
                  <div className="card-glow flex gap-5 rounded-2xl border border-line bg-ink-soft p-6">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky/15 text-sky">
                      <value.icon className="size-6" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-text">{value.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">{value.text}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <StaggerGroup className="relative mt-12 space-y-8 border-l border-line pl-7">
              {milestones.map((m) => (
                <StaggerItem key={m.year} className="relative">
                  <span
                    className="absolute -left-[33px] top-1.5 size-3 rounded-full bg-sky shadow-glow-xs"
                    aria-hidden
                  />
                  <p className="font-display text-sm font-bold uppercase tracking-widest text-gold">
                    {m.year}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{m.text}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
