const pexelsPhoto = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const pexelsVideoPoster = (id: number, w = 1600) =>
  `https://images.pexels.com/videos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const media = {
  // Hero: toma aérea de un corredor en pista (Pexels). Remoto, sin WebM.
  heroVideo: {
    src: "https://videos.pexels.com/video-files/7179290/7179290-hd_1920_1080_25fps.mp4",
    poster: pexelsVideoPoster(7179290),
    credit: "Video de Pexels",
  },
  // Loop vertical (reel) de estiramientos — sección Metodología. Local en public/media.
  methodologyVideo: {
    src: "/media/estiramientos.mp4",
    webm: "/media/estiramientos.webm",
    poster: "/media/estiramientos-poster.webp",
    credit: "Pasodoble Run",
  },
  heroSteps: {
    fisioterapia: pexelsPhoto(20860622),
    fuerza: pexelsPhoto(19132573),
    running: pexelsVideoPoster(8456652),
  },
  services: {
    fuerza: pexelsPhoto(5327456),
    running: pexelsVideoPoster(5310965),
    fisioterapia: pexelsPhoto(5793918),
    coaching: pexelsPhoto(5646004),
  },
  // Fotos verticales de los dos fundadores (public/media).
  about: {
    founderOne: "/media/duenos.webp",
    founderTwo: "/media/duenos-2.webp",
  },
  posts: {
    fuerza: pexelsPhoto(2261481),
    running: pexelsVideoPoster(32240945),
    fisioterapia: pexelsPhoto(30483061),
  },
  texture: {
    track: pexelsVideoPoster(7187092),
    gym: pexelsPhoto(12954989),
  },
} as const;
