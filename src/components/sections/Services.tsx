import { Dumbbell, Footprints, HeartPulse, Target, Check, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { services, type Service } from "@/data/services";
import { WhatsAppTrigger } from "@/components/ui/WhatsAppTrigger";

const icons: Record<Service["icon"], typeof Dumbbell> = {
  dumbbell: Dumbbell,
  footprints: Footprints,
  "heart-pulse": HeartPulse,
  target: Target,
};

export function Services() {
  return (
    <section id="servicios" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Servicios"
          title="Cuatro pilares, un solo objetivo: tú"
          description="Cada programa funciona por separado, pero el verdadero poder está en cómo se integran."
        />

        <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <StaggerItem key={service.id}>
                <article
                  id={`servicio-${service.id}`}
                  className="card-glow group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft"
                >
                  <div className="relative h-52 overflow-hidden sm:h-60">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-soft via-ink-soft/30 to-transparent" />
                    <div className="absolute bottom-4 left-5 flex items-center gap-3">
                      <span className="flex size-12 items-center justify-center rounded-xl bg-sky/15 text-sky backdrop-blur-sm">
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <h3 className="font-display text-xl font-bold text-text sm:text-2xl">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
                    <p className="text-sm leading-relaxed text-text-muted sm:text-base">
                      {service.description}
                    </p>
                    <p className="rounded-xl border border-line bg-ink px-4 py-3 text-sm leading-relaxed text-text-muted">
                      <span className="font-semibold text-sky-bright">¿Para quién? </span>
                      {service.forWho}
                    </p>
                    <ul className="space-y-2.5">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-text">
                          <Check className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <WhatsAppTrigger
                      message={service.whatsappMessage}
                      className="mt-auto inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-sky/40 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-sky transition-all hover:bg-sky hover:text-ink active:scale-95"
                    >
                      <MessageCircle className="size-4" aria-hidden />
                      Consultar por WhatsApp
                    </WhatsAppTrigger>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
