import { site } from "@/data/site";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildContactMessage(data: {
  name: string;
  goal: string;
  service: string;
  message: string;
}): string {
  return [
    `Hola, soy ${data.name}.`,
    `Objetivo: ${data.goal}`,
    `Servicio de interés: ${data.service}`,
    data.message ? `Mensaje: ${data.message}` : "",
    "Vengo desde la página web de Pasodoble Run.",
  ]
    .filter(Boolean)
    .join("\n");
}
