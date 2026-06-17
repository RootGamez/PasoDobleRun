"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { site } from "@/data/site";
import { media } from "@/data/media";
import { heroSteps } from "@/data/methodology";
import { openWhatsAppModal } from "@/lib/whatsapp-modal";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from("[data-hero-line]", { yPercent: 110, duration: 1, stagger: 0.12 })
        .from("[data-hero-sub]", { opacity: 0, y: 24, duration: 0.8 }, "-=0.5")
        .from("[data-hero-cta]", { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, "-=0.4")
        .from("[data-hero-scroll]", { opacity: 0, duration: 0.6 }, "-=0.2");

      const steps = gsap.utils.toArray<HTMLElement>("[data-hero-step]");
      const video = root.querySelector<HTMLElement>("[data-hero-video]");
      const veil = root.querySelector<HTMLElement>("[data-hero-veil]");
      const intro_content = root.querySelector<HTMLElement>("[data-hero-intro]");
      const progress = root.querySelector<HTMLElement>("[data-hero-progress]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=320%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(intro_content, { opacity: 0, y: -80, duration: 1, ease: "power2.in" })
        .to(veil, { opacity: 0.82, duration: 1 }, "<")
        .to(video, { scale: 1.12, duration: 10, ease: "none" }, 0);

      if (progress) {
        tl.to(progress, { scaleY: 1, duration: steps.length * 3, ease: "none" }, 1);
      }

      steps.forEach((step, i) => {
        const at = 1 + i * 3;
        tl.fromTo(
          step,
          { opacity: 0, y: 70, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power2.out" },
          at
        );
        if (i < steps.length - 1) {
          tl.to(step, { opacity: 0, y: -70, filter: "blur(8px)", duration: 1, ease: "power2.in" }, at + 2);
        }
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        intro.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative h-svh overflow-hidden" aria-label="Presentación de Pasodoble Run">
      <div className="absolute inset-0" data-hero-video>
        <LoopVideo
          className="size-full object-cover"
          src={media.heroVideo.src}
          poster={media.heroVideo.poster}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-2/70 via-transparent to-transparent" />
      </div>

      <div className="absolute inset-0 bg-ink opacity-0" data-hero-veil aria-hidden />

      <div className="speed-lines" aria-hidden>
        <span style={{ top: "22%", animationDelay: "0s" }} />
        <span style={{ top: "41%", animationDelay: "1.1s" }} />
        <span style={{ top: "63%", animationDelay: "2.2s" }} />
        <span style={{ top: "80%", animationDelay: "0.6s" }} />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 sm:px-8">
        <div data-hero-intro>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            Fisioterapia · Fuerza · Running · Coaching
          </p>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-text sm:text-7xl lg:text-8xl">
            <span className="block overflow-hidden">
              <span className="block" data-hero-line>
                ENTRENA CON
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block text-gradient-sky" data-hero-line>
                CIENCIA.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block" data-hero-line>
                CORRE SIN DOLOR.
              </span>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg" data-hero-sub>
            {site.name} integra fisioterapia, entrenamiento de fuerza y planificación de running en
            {" "}{site.city}. Un solo método, basado en evidencia, para que llegues más lejos.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <span data-hero-cta>
              <Button onClick={() => openWhatsAppModal("Hola, quiero empezar a entrenar con Pasodoble Run.")}>
                <MessageCircle className="size-4" aria-hidden />
                Empieza hoy
              </Button>
            </span>
            <span data-hero-cta>
              <Button href="/#metodologia" variant="ghost">
                Conoce la metodología
              </Button>
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-5 top-1/2 z-20 -translate-y-1/2 motion-reduce:hidden sm:inset-x-8">
          <div className="mx-auto flex max-w-7xl items-center gap-6">
            <div className="hidden h-56 w-px shrink-0 bg-line sm:block" aria-hidden>
              <div
                data-hero-progress
                className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-sky-bright to-sky"
              />
            </div>
            <div className="relative h-64 flex-1">
              {heroSteps.map((step) => (
                <div
                  key={step.id}
                  data-hero-step
                  className="absolute inset-0 flex max-w-2xl flex-col justify-center opacity-0"
                >
                  <p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-gold">
                    {step.kicker}
                  </p>
                  <h2 className="text-balance mt-4 font-display text-3xl font-bold leading-tight text-text sm:text-5xl">
                    {step.title}
                  </h2>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          data-hero-scroll
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-text-muted"
        >
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em]">Desliza</span>
          <ArrowDown className="size-4 animate-bounce" aria-hidden />
        </div>
      </div>
    </section>
  );
}
