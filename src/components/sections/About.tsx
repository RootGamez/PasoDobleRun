import { GraduationCap, Eye, Compass, HeartHandshake, MapPin, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { media } from "@/data/media";

const values = [
  {
    icon: Compass,
    title: "Mision",
    text: "Acompanar a cada persona — desde el paciente con dolor hasta el atleta competitivo — con un proceso integrado de fisioterapia, fuerza y running basado en la mejor evidencia disponible.",
  },
  {
    icon: Eye,
    title: "Vision",
    text: "Ser la referencia en Venezuela y Colombia de entrenamiento y rehabilitacion con criterio cientifico, demostrando que rendimiento y salud no son caminos separados.",
  },
  {
    icon: HeartHandshake,
    title: "Valores",
    text: "Evidencia antes que moda. Honestidad en los plazos. Educacion para que entiendas tu proceso. Y constancia, porque los resultados se construyen paso a paso — a pasodoble.",
  },
] as const;

const team = [
  {
    name: "Jeanpiero Navarro Pina",
    role: "Fisioterapeuta & Coach — Cofundador",
    location: "Caracas, Venezuela",
    bio: "Fisioterapeuta egresado de la Universidad Nacional Romulo Gallegos con enfoque en evaluacion del movimiento humano y rehabilitacion basada en evidencia. Cofundador y director de Motion Centro de Rehabilitacion y Alto Rendimiento (Los Palos Grandes, Caracas). Ex docente universitario en UNERG y ex fisioterapeuta y coach en el centro multidisciplinario Neuromovimiento.",
    credentials: [
      "Lcdo. Fisioterapia — UNRG",
      "EXOS Coaching Methodology — Phoenix, AZ",
      "EXOS Model of Recovery — Phoenix, AZ",
      "Fisioterapia en Osteopatia — Univ. Catolica de Avila, Espana",
      "Masaje Terapeutico y Deportivo — Col. Fisioterapeutas, Aragua",
    ],
    photo: media.about.founderOne,
  },
  {
    name: "Luis Alejandro Sanchez Cardona",
    role: "Fisioterapeuta & Strength Coach — Cofundador",
    location: "Bogota, Colombia",
    bio: "Licenciado en Fisioterapia por la Universidad Arturo Michelena (Valencia) con mas de 4 anos de experiencia en rehabilitacion y acondicionamiento fisico de alto rendimiento. Fisioterapeuta del Carabobo Futbol Club durante 4 anos (2021-2025) y actualmente fisioterapeuta de Internacional de Bogota, equipo de primera division.",
    credentials: [
      "Lcdo. Fisioterapia — UAM, Venezuela",
      "EXOS Fitness & Performance Specialist (2022-2024)",
      "Strength & Conditioning Specialist CSCA 2024",
      "Vald Performance Specialist dynamo+ 2025",
      "Diplomado Lesiones de Futbol — Barca Innovation Hub 2022",
      "Diplomado Entrenamiento de Fuerza — Analisis Neuromotriz",
    ],
    photo: media.about.founderTwo,
  },
] as const;

const milestones = [
  {
    year: "El origen",
    text: "Pasodoble Run nace de la conviccion compartida de Jeanpiero y Luis: la fisioterapia y el entrenamiento no deberian vivir en mundos separados.",
  },
  {
    year: "Caracas y Bogota",
    text: "Con base en ambas ciudades, el metodo llega a atletas venezolanos y colombianos: presencial, online y con el mismo criterio cientifico.",
  },
  {
    year: "La comunidad",
    text: "Mas de 100 pacientes y atletas acompanados — desde recuperacion post-lesion hasta preparacion para competencia profesional.",
  },
  {
    year: "Hoy",
    text: "Seguimos creciendo: contenido cientifico en Instagram, foro educativo y programas presenciales y a distancia desde Caracas y Bogota.",
  },
] as const;

export function About() {
  return (
    <section id="nosotros" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Quienes somos"
          title="Ciencia, sudor y proposito"
          description="Dos fisioterapeutas con trayectoria en clubes profesionales y centros de alto rendimiento. Un solo metodo: evidencia, planificacion y resultados reales."
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {team.map((member, i) => (
            <Reveal key={member.name} y={40} delay={i * 0.12}>
              <div className="card-glow flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                    className="size-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-soft via-ink-soft/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <p className="font-display text-xl font-bold leading-tight text-text">
                      {member.name}
                    </p>
                    <p className="mt-1 font-display text-xs font-semibold uppercase tracking-widest text-sky">
                      {member.role}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-text-muted">
                      <MapPin className="size-3.5" aria-hidden />
                      {member.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-relaxed text-text-muted">{member.bio}</p>

                  <div className="mt-6">
                    <p className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-sky">
                      <Award className="size-4" aria-hidden />
                      Credenciales
                    </p>
                    <ul className="mt-3 space-y-2">
                      {member.credentials.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-xs text-text-muted">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sky" aria-hidden />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-2">
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

          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-sky">
              <GraduationCap className="mr-2 inline size-4" aria-hidden />
              Historia
            </p>
            <StaggerGroup className="relative mt-6 space-y-8 border-l border-line pl-7">
              {milestones.map((m) => (
                <StaggerItem key={m.year} className="relative">
                  <span
                    className="absolute -left-[33px] top-1.5 size-3 rounded-full bg-sky shadow-glow-xs"
                    aria-hidden
                  />
                  <p className="font-display text-sm font-bold uppercase tracking-widest text-sky">
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
