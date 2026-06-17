import { site } from "@/data/site";

export type ContactCountry = "VE" | "CO";

export const countryConfig: Record<
  ContactCountry,
  { flag: string; label: string; number: string; advisor: string; city: string }
> = {
  VE: {
    flag: "🇻🇪",
    label: "Venezuela",
    number: site.whatsappNumber,
    advisor: "Jeanpiero Navarro",
    city: "Caracas",
  },
  CO: {
    flag: "🇨🇴",
    label: "Colombia",
    number: site.whatsappNumberCO,
    advisor: "Luis Alejandro Sanchez",
    city: "Bogota",
  },
};

export function buildWhatsAppLink(message: string, country: ContactCountry = "VE"): string {
  const number = countryConfig[country].number;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildContactMessage(
  data: { name: string; city: string; goal: string; service: string; message: string },
  country: ContactCountry = "VE"
): string {
  const firstName = countryConfig[country].advisor.split(" ")[0];
  const from = data.city ? data.city : countryConfig[country].city;
  const lines = [
    `Hola ${firstName}! Soy ${data.name}, te escribo desde ${from}.`,
    ``,
    `Me interesa el ${data.service} y mi objetivo es ${data.goal}.`,
    data.message ? `Ademas queria contarte que ${data.message}` : "",
    ``,
    `Te contacto desde la pagina web de Pasodoble Run.`,
  ].filter(Boolean);
  return lines.join("\n");
}
