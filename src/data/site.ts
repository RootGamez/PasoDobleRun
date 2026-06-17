export const site = {
  name: "Pasodoble Run",
  tagline: "Fisioterapia, fuerza y running con base científica",
  description:
    "Fisioterapia, entrenamiento de fuerza, running y coaching en Caracas y Bogotá. Metodología basada en evidencia científica para que entrenes sin dolor y rindas más.",
  url: "https://pasodoblerun.com",
  city: "Caracas · Bogotá",
  country: "Venezuela · Colombia",
  whatsappNumber: "584243346713",
  whatsappNumberCO: "573223889865",
  email: "pasodoblerun@gmail.com",
  instagram: "https://www.instagram.com/pasodoblerun/",
  instagramHandle: "@pasodoblerun",
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
} as const;

export const stats = [
  { value: 100, suffix: "+", label: "Pacientes y atletas acompañados" },
  { value: 5, suffix: "+", label: "Años de experiencia clínica" },
  { value: 2, suffix: "", label: "Ciudades: Caracas y Bogotá" },
  { value: 10, suffix: "+", label: "Certificaciones internacionales" },
] as const;
