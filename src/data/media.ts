const pexelsPhoto = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const pexelsVideoPoster = (id: number, w = 1600) =>
  `https://images.pexels.com/videos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const media = {
  heroVideo: {
    src: "https://videos.pexels.com/video-files/8533111/8533111-uhd_2560_1440_25fps.mp4",
    poster: pexelsVideoPoster(8533111),
    credit: "Video de KoolShooters en Pexels",
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
    coaching: pexelsVideoPoster(8459963),
  },
  about: {
    team: pexelsVideoPoster(7179290),
    training: pexelsPhoto(18502875),
    therapy: pexelsPhoto(4506166),
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
