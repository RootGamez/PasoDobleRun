"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/data/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, scale: 0.6, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 24 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          href={buildWhatsAppLink(`Hola, quiero empezar a entrenar con ${site.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp"
          className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-sky text-ink shadow-glow-fab transition-transform hover:scale-110 active:scale-95 sm:bottom-7 sm:right-7"
        >
          <span className="absolute inset-0 animate-pulse-glow rounded-full bg-sky/40" aria-hidden />
          <MessageCircle className="relative size-7" aria-hidden />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
