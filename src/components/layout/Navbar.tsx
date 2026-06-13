"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-line/60 bg-ink/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-text"
          onClick={() => setOpen(false)}
        >
          PASODOBLE<span className="text-sky"> RUN</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-sky-bright"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={buildWhatsAppLink(`Hola, quiero más información sobre ${site.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-sky px-5 py-2 font-display text-xs font-bold uppercase tracking-wider text-ink transition-all hover:bg-sky-bright hover:shadow-glow-sm active:scale-95"
          >
            <MessageCircle className="size-4" aria-hidden />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full text-text lg:hidden"
        >
          {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border-b border-line bg-ink/97 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto px-5 py-6">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-4 font-display text-2xl font-semibold text-text transition-colors hover:bg-ink-soft hover:text-sky-bright"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <a
                href={buildWhatsAppLink(`Hola, quiero más información sobre ${site.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-sky px-6 py-4 font-display text-sm font-bold uppercase tracking-wider text-ink"
              >
                <MessageCircle className="size-5" aria-hidden />
                Escríbenos por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
