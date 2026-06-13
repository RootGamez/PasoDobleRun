"use client";

import { useState } from "react";
import { Play } from "lucide-react";

type VideoEmbedProps = {
  src: string;
  poster?: string;
  title: string;
  className?: string;
};

function isExternalEmbed(src: string) {
  return /youtube\.com|youtu\.be|instagram\.com/.test(src);
}

function toYouTubeEmbed(src: string) {
  const match = src.match(/(?:youtu\.be\/|v=)([\w-]{6,})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : src;
}

export function VideoEmbed({ src, poster, title, className = "" }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const external = isExternalEmbed(src);

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-2xl border border-line bg-ink-soft ${className}`}
    >
      {playing ? (
        external ? (
          <iframe
            src={`${toYouTubeEmbed(src)}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full"
          />
        ) : (
          <video src={src} poster={poster} controls autoPlay playsInline className="size-full object-cover">
            <track kind="captions" />
          </video>
        )
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Reproducir video: ${title}`}
          className="group relative size-full cursor-pointer"
        >
          {poster && (
            <img
              src={poster}
              alt=""
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <span className="absolute inset-0 bg-ink/40 transition-colors group-hover:bg-ink/25" />
          <span className="absolute left-1/2 top-1/2 flex size-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sky text-ink shadow-glow-lg transition-transform group-hover:scale-110">
            <Play className="ml-1 size-7" aria-hidden />
          </span>
        </button>
      )}
    </div>
  );
}
