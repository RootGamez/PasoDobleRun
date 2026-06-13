const phrases = [
  "Fuerza",
  "Running",
  "Fisioterapia",
  "Coaching",
  "Evidencia científica",
  "Sin dolor",
  "Caracas",
];

export function Marquee() {
  const row = [...phrases, ...phrases];
  return (
    <div
      className="relative overflow-hidden border-y border-gold/30 bg-sand py-5"
      aria-hidden
    >
      <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
        {row.map((phrase, i) => (
          <span
            key={`${phrase}-${i}`}
            className="flex items-center gap-10 font-display text-sm font-bold uppercase tracking-[0.3em] text-navy"
          >
            {phrase}
            <span className="size-1.5 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
