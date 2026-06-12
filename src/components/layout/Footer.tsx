import Link from "next/link";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { footerLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-soft">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold text-text">
            PASODOBLE<span className="text-sky"> RUN</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
            {site.tagline}. Entrena con criterio, corre sin dolor.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Pasodoble Run"
              className="flex size-11 items-center justify-center rounded-full border border-line text-text-muted transition-all hover:border-sky hover:text-sky"
            >
              <Instagram className="size-5" aria-hidden />
            </a>
            <a
              href={buildWhatsAppLink("Hola, vengo desde la web de Pasodoble Run.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Pasodoble Run"
              className="flex size-11 items-center justify-center rounded-full border border-line text-text-muted transition-all hover:border-sky hover:text-sky"
            >
              <MessageCircle className="size-5" aria-hidden />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Correo de Pasodoble Run"
              className="flex size-11 items-center justify-center rounded-full border border-line text-text-muted transition-all hover:border-sky hover:text-sky"
            >
              <Mail className="size-5" aria-hidden />
            </a>
          </div>
        </div>

        <nav aria-label="Enlaces del pie de página">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-text">
            Navegación
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block py-1.5 text-sm text-text-muted transition-colors hover:text-sky-bright"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-text">
            Encuéntranos
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-text-muted">
            <MapPin className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden />
            {site.city}, {site.country}
          </p>
          <p className="mt-3 text-sm text-text-muted">
            Instagram: {site.instagramHandle}
          </p>
        </div>
      </div>
      <div className="border-t border-line/60 py-6 text-center text-xs text-text-muted">
        © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
