type LoopVideoProps = {
  /** MP4 (H.264) source — universal fallback. */
  src: string;
  /** Optional WebM (VP9) source, preferred when supported. */
  webm?: string;
  /** Poster shown before the video loads/plays. */
  poster?: string;
  className?: string;
};

/**
 * Decorative, silent, auto-playing background video that loops.
 * Renders WebM first (smaller) with an MP4 fallback. Always muted +
 * playsInline so mobile browsers allow autoplay.
 */
export function LoopVideo({ src, webm, poster, className = "" }: LoopVideoProps) {
  return (
    <video
      className={className}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
    >
      {webm ? <source src={webm} type="video/webm" /> : null}
      <source src={src} type="video/mp4" />
    </video>
  );
}
