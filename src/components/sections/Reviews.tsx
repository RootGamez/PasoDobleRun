"use client";

import { useState, type FormEvent } from "react";
import { MessageSquarePlus, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ReviewCarousel } from "@/components/ui/ReviewCarousel";
import { site } from "@/data/site";
import { programLabels } from "@/data/reviews";

type Status = "idle" | "sending" | "success" | "error";

export function Reviews() {
  const [formOpen, setFormOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const data = new FormData(form);
      data.append("access_key", site.web3formsKey);
      data.append("subject", "Nueva reseña — Pasodoble Run");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="resenas" className="gradient-section relative scroll-mt-20 py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Reseñas"
          title="Lo que dicen quienes ya entrenan aquí"
          description="Historias reales de personas que pasaron del dolor o el estancamiento a entrenar con propósito."
        />

        <Reveal className="mt-14" y={40}>
          <ReviewCarousel />
        </Reveal>

        <Reveal className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setFormOpen((v) => !v)}
            className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-sky/40 px-7 py-3 font-display text-sm font-bold uppercase tracking-wider text-sky transition-all hover:bg-sky hover:text-ink active:scale-95"
          >
            <MessageSquarePlus className="size-5" aria-hidden />
            Deja tu reseña
          </button>
          <p className="mt-3 text-xs text-text-muted">
            Las reseñas se publican tras una revisión manual.
          </p>
        </Reveal>

        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.21, 0.6, 0.35, 1] }}
              className="overflow-hidden"
            >
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-10 max-w-xl space-y-5 rounded-2xl border border-line bg-ink-soft p-7 sm:p-9"
              >
                <div>
                  <label htmlFor="review-name" className="mb-2 block text-sm font-semibold text-text">
                    Tu nombre <span className="text-sky">*</span>
                  </label>
                  <input
                    id="review-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-text placeholder:text-text-muted/60 focus:border-sky"
                    placeholder="María González"
                  />
                </div>
                <div>
                  <label htmlFor="review-program" className="mb-2 block text-sm font-semibold text-text">
                    Programa <span className="text-sky">*</span>
                  </label>
                  <select
                    id="review-program"
                    name="programa"
                    required
                    className="w-full cursor-pointer rounded-xl border border-line bg-ink px-4 py-3 text-text focus:border-sky"
                  >
                    {Object.entries(programLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="review-text" className="mb-2 block text-sm font-semibold text-text">
                    Tu experiencia <span className="text-sky">*</span>
                  </label>
                  <textarea
                    id="review-text"
                    name="resena"
                    required
                    rows={4}
                    className="w-full resize-none rounded-xl border border-line bg-ink px-4 py-3 text-text placeholder:text-text-muted/60 focus:border-sky"
                    placeholder="Cuéntanos cómo ha sido tu proceso…"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-sky px-7 py-3 font-display text-sm font-bold uppercase tracking-wider text-ink transition-all hover:bg-sky-bright active:scale-95 disabled:cursor-wait disabled:opacity-60"
                >
                  <Send className="size-4" aria-hidden />
                  {status === "sending" ? "Enviando…" : "Enviar reseña"}
                </button>
                {status === "success" && (
                  <p className="flex items-center gap-2 text-sm text-sky-bright" role="status">
                    <CheckCircle2 className="size-4" aria-hidden />
                    ¡Gracias! Tu reseña fue enviada y será revisada pronto.
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-center gap-2 text-sm text-red-400" role="alert">
                    <AlertCircle className="size-4" aria-hidden />
                    Hubo un problema al enviar. Intenta de nuevo o escríbenos por WhatsApp.
                  </p>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
