"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle, Mail, CheckCircle2, AlertCircle, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { buildWhatsAppLink, buildContactMessage, countryConfig, type ContactCountry } from "@/lib/whatsapp";

type Status = "idle" | "sending" | "success" | "error";

function readForm(form: HTMLFormElement) {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? ""),
    city: String(data.get("city") ?? ""),
    goal: String(data.get("goal") ?? ""),
    service: String(data.get("service") ?? ""),
    message: String(data.get("message") ?? ""),
  };
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [country, setCountry] = useState<ContactCountry>("VE");

  function handleWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = readForm(event.currentTarget);
    const msg = buildContactMessage(fields, country);
    window.open(buildWhatsAppLink(msg, country), "_blank", "noopener,noreferrer");
  }

  async function handleEmail(form: HTMLFormElement) {
    if (!form.reportValidity()) return;
    setStatus("sending");
    try {
      const data = new FormData(form);
      data.append("access_key", site.web3formsKey);
      data.append("subject", "Nuevo contacto - Pasodoble Run");
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      setStatus(json.success ? "success" : "error");
      if (json.success) form.reset();
    } catch {
      setStatus("error");
    }
  }

  const selected = countryConfig[country];

  return (
    <section id="contacto" className="gradient-section relative scroll-mt-20 py-24 sm:py-32">
      <div className="gradient-radial-sky absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Contacto"
          title="Tu proximo paso empieza con un mensaje"
          description="Cuentanos tu objetivo y te respondemos por WhatsApp con el camino recomendado. Sin compromiso."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="space-y-5">
              <div className="rounded-2xl border border-line bg-ink-soft p-6">
                <p className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-sky">
                  <MessageCircle className="size-5" aria-hidden />
                  WhatsApp directo
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  Completa el formulario, elige tu pais y abrimos el chat con toda tu informacion
                  ya lista. Tu mensaje va directo al especialista de tu ciudad.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-ink-soft p-6">
                <p className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-sky">
                  <MapPin className="size-5" aria-hidden />
                  Nuestros especialistas
                </p>
                <div className="mt-4 space-y-4">
                  {(Object.entries(countryConfig) as [ContactCountry, typeof countryConfig[ContactCountry]][]).map(
                    ([code, cfg]) => (
                      <div key={code} className="flex items-start gap-3">
                        <span className="mt-0.5 text-2xl leading-none">{cfg.flag}</span>
                        <div>
                          <p className="text-sm font-semibold text-text">{cfg.advisor}</p>
                          <p className="text-xs text-text-muted">{cfg.city}, {cfg.label}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-ink-soft p-6">
                <p className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-sky">
                  <Mail className="size-5" aria-hidden />
                  Correo de respaldo
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  Prefieres email? El mismo formulario puede enviarse a nuestro correo y te
                  respondemos en menos de 24 horas.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3" y={40}>
            <form
              onSubmit={handleWhatsApp}
              className="space-y-5 rounded-2xl border border-line bg-ink-soft p-7 sm:p-9"
            >
              <div>
                <p className="mb-3 text-sm font-semibold text-text">
                  Desde que pais nos escribes? <span className="text-sky">*</span>
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.entries(countryConfig) as [ContactCountry, typeof countryConfig[ContactCountry]][]).map(
                    ([code, cfg]) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setCountry(code)}
                        aria-pressed={country === code}
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all active:scale-95 ${
                          country === code
                            ? "border-sky bg-sky/10 text-text shadow-[0_0_20px_-6px_rgba(56,189,248,0.4)]"
                            : "border-line bg-ink text-text-muted hover:border-sky/40 hover:text-text"
                        }`}
                      >
                        <span className="text-2xl leading-none">{cfg.flag}</span>
                        <div>
                          <p className="font-display text-sm font-bold">{cfg.label}</p>
                          <p className="text-xs opacity-70">{cfg.city}</p>
                        </div>
                        {country === code && (
                          <span className="ml-auto size-2 rounded-full bg-sky" aria-hidden />
                        )}
                      </button>
                    )
                  )}
                </div>
                <p className="mt-2.5 text-xs text-text-muted">
                  Tu mensaje ira a{" "}
                  <span className="font-semibold text-sky">{selected.advisor.split(" ")[0]}</span>{" "}
                  en {selected.city} {selected.flag}
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-text">
                    Nombre <span className="text-sky">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-text placeholder:text-text-muted/60 focus:border-sky focus:outline-none"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="contact-city" className="mb-2 block text-sm font-semibold text-text">
                    Ciudad <span className="text-sky">*</span>
                  </label>
                  <input
                    id="contact-city"
                    name="city"
                    type="text"
                    required
                    autoComplete="address-level2"
                    className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-text placeholder:text-text-muted/60 focus:border-sky focus:outline-none"
                    placeholder="Ej: Caracas, Medellin, Miami..."
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-service" className="mb-2 block text-sm font-semibold text-text">
                    Servicio de interes <span className="text-sky">*</span>
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    required
                    className="w-full cursor-pointer rounded-xl border border-line bg-ink px-4 py-3 text-text focus:border-sky focus:outline-none"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="No estoy seguro todavia">No estoy seguro todavia</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-goal" className="mb-2 block text-sm font-semibold text-text">
                    Tu objetivo <span className="text-sky">*</span>
                  </label>
                  <input
                    id="contact-goal"
                    name="goal"
                    type="text"
                    required
                    className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-text placeholder:text-text-muted/60 focus:border-sky focus:outline-none"
                    placeholder="Ej: correr mi primer 10K, salir del dolor..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-text">
                  Mensaje adicional
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-line bg-ink px-4 py-3 text-text placeholder:text-text-muted/60 focus:border-sky focus:outline-none"
                  placeholder="Cuentanos un poco mas sobre ti, tu historial o disponibilidad..."
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex min-h-13 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-sky px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-ink transition-all hover:bg-sky-bright hover:shadow-glow active:scale-95"
                >
                  <span className="text-base leading-none">{selected.flag}</span>
                  Continuar en WhatsApp
                </button>
                <button
                  type="button"
                  disabled={status === "sending"}
                  onClick={(e) => handleEmail(e.currentTarget.form as HTMLFormElement)}
                  className="inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full border border-line px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-text transition-all hover:border-sky hover:text-sky active:scale-95 disabled:cursor-wait disabled:opacity-60"
                >
                  <Mail className="size-5" aria-hidden />
                  {status === "sending" ? "Enviando..." : "Enviar por correo"}
                </button>
              </div>

              {status === "success" && (
                <p className="flex items-center gap-2 text-sm text-sky-bright" role="status">
                  <CheckCircle2 className="size-4" aria-hidden />
                  Mensaje enviado! Te responderemos muy pronto.
                </p>
              )}
              {status === "error" && (
                <p className="flex items-center gap-2 text-sm text-red-400" role="alert">
                  <AlertCircle className="size-4" aria-hidden />
                  No pudimos enviar el correo. Usa el boton de WhatsApp o intenta mas tarde.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
