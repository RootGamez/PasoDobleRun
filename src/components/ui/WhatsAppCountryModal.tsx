"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { buildWhatsAppLink, countryConfig, type ContactCountry } from "@/lib/whatsapp";
import { WA_MODAL_EVENT } from "@/lib/whatsapp-modal";

export function WhatsAppCountryModal() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleEvent = useCallback((e: Event) => {
    const detail = (e as CustomEvent<{ message: string }>).detail;
    setMessage(detail.message);
    setOpen(true);
  }, []);

  useEffect(() => {
    window.addEventListener(WA_MODAL_EVENT, handleEvent);
    return () => window.removeEventListener(WA_MODAL_EVENT, handleEvent);
  }, [handleEvent]);

  function select(country: ContactCountry) {
    setOpen(false);
    window.open(buildWhatsAppLink(message, country), "_blank", "noopener,noreferrer");
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] bg-ink/70 backdrop-blur-sm"
            aria-hidden
          />

          <motion.div
            key="modal"
            role="dialog"
            aria-modal
            aria-label="Selecciona tu país para continuar en WhatsApp"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-x-4 bottom-0 z-[101] mx-auto mb-6 max-w-sm rounded-2xl border border-line bg-ink-soft p-7 shadow-2xl sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-line hover:text-text"
            >
              <X className="size-4" />
            </button>

            <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-sky">
              WhatsApp
            </p>
            <h2 className="mt-1 font-display text-lg font-bold text-text">
              ¿Desde qué país nos escribes?
            </h2>
            <p className="mt-1.5 text-sm text-text-muted">
              Tu mensaje irá directo al especialista de tu zona.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {(
                Object.entries(countryConfig) as [
                  ContactCountry,
                  (typeof countryConfig)[ContactCountry],
                ][]
              ).map(([code, cfg]) => (
                <button
                  key={code}
                  onClick={() => select(code)}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-line bg-ink p-4 transition-all hover:border-sky hover:bg-sky/10 hover:shadow-[0_0_20px_-6px_rgba(56,189,248,0.4)] active:scale-95"
                >
                  <span className="text-4xl leading-none">{cfg.flag}</span>
                  <span className="font-display text-sm font-bold text-text group-hover:text-sky">
                    {cfg.label}
                  </span>
                  <span className="text-xs text-text-muted">{cfg.advisor.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
