export const site = {
  name: "Pasodoble Run",
  tagline: "Fisioterapia, fuerza y running con base científica",
  description:
    "Centro de fisioterapia, entrenamiento de fuerza, running y coaching en Caracas, Venezuela. Metodología basada en evidencia científica para que entrenes sin dolor y rindas más.",
  url: "https://pasodoblerun.com",
  city: "Caracas",
  country: "Venezuela",
  whatsappNumber: "584120000000",
  email: "hola@pasodoblerun.com",
  instagram: "https://instagram.com/pasodoblerun",
  instagramHandle: "@pasodoblerun",
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
} as const;

export const stats = [
  { value: 350, suffix: "+", label: "Atletas acompañados" },
  { value: 8, suffix: "", label: "Años de experiencia" },
  { value: 92, suffix: "%", label: "Retorno al deporte sin dolor" },
  { value: 12, suffix: "K+", label: "Kilómetros planificados al mes" },
] as const;
