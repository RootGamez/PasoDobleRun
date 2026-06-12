export type Review = {
  name: string;
  program: "fuerza" | "running" | "fisioterapia" | "coaching";
  text: string;
  rating: number;
};

export const programLabels: Record<Review["program"], string> = {
  fuerza: "Fuerza",
  running: "Running",
  fisioterapia: "Fisioterapia",
  coaching: "Coaching",
};

export const reviews: Review[] = [
  {
    name: "María G.",
    program: "running",
    text: "Llegué con una fascitis que no me dejaba correr ni 2 km. Seis meses después terminé mi primer 21K sin dolor. La combinación de fisio y plan de carrera fue lo que marcó la diferencia.",
    rating: 5,
  },
  {
    name: "Carlos R.",
    program: "fuerza",
    text: "Nunca había entrenado con un plan de verdad. Aprendí técnica desde cero y en cuatro meses mis levantamientos básicos cambiaron por completo. Todo explicado con el porqué detrás.",
    rating: 5,
  },
  {
    name: "Andreína P.",
    program: "fisioterapia",
    text: "Después de dos años con dolor de rodilla y mil tratamientos pasivos, aquí me pusieron a trabajar con cargas progresivas. Hoy entreno sin pensar en la rodilla.",
    rating: 5,
  },
  {
    name: "Luis M.",
    program: "coaching",
    text: "Lo mío no era el plan, era la constancia. El acompañamiento semanal me cambió la relación con el entrenamiento. Llevo un año sin interrumpir más de una semana.",
    rating: 5,
  },
  {
    name: "Gabriela S.",
    program: "running",
    text: "Bajé 14 minutos mi marca de 10K en una temporada. La clave fue el trabajo de fuerza que jamás habría hecho por mi cuenta. Ciencia aplicada, sin recetas mágicas.",
    rating: 5,
  },
  {
    name: "Jesús D.",
    program: "fisioterapia",
    text: "Me operaron del ligamento cruzado y la readaptación fue impecable: criterios objetivos en cada fase hasta volver a la cancha. Me sentí acompañado en todo el proceso.",
    rating: 5,
  },
];
