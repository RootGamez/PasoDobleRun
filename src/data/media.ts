// Todos los assets viven en public/media (servidos en /media/...). Optimizados
// localmente (webp q80, h264 faststart + webm). Sin dependencias remotas.
export const media = {
  // Hero: toma aérea de un corredor en pista (origen Pexels, ya localizado).
  heroVideo: {
    src: "/media/hero.mp4",
    webm: "/media/hero.webm",
    poster: "/media/hero-poster.webp",
    credit: "Video de Pexels",
  },
  // Loop vertical (reel) de estiramientos — sección Metodología.
  methodologyVideo: {
    src: "/media/estiramientos.mp4",
    webm: "/media/estiramientos.webm",
    poster: "/media/estiramientos-poster.webp",
    credit: "Pasodoble Run",
  },
  services: {
    fuerza: "/media/service-fuerza.webp",
    running: "/media/service-running.webp",
    fisioterapia: "/media/service-fisioterapia.webp",
    coaching: "/media/service-coaching.webp",
  },
  // Fotos verticales de los dos fundadores.
  about: {
    founderOne: "/media/duenos.webp",
    founderTwo: "/media/duenos-2.webp",
  },
} as const;
