"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { reviews, programLabels } from "@/data/reviews";

export function ReviewCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5200, stopOnInteraction: true })]
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-5">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="min-w-0 flex-[0_0_100%] rounded-2xl border border-line bg-ink-soft p-7 sm:flex-[0_0_calc(50%-0.625rem)] lg:flex-[0_0_calc(33.333%-0.834rem)]"
            >
              <div className="flex items-center gap-1" aria-label={`${review.rating} de 5 estrellas`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-sky text-sky" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-text sm:text-base">
                “{review.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-deep font-display text-sm font-bold text-sky-bright">
                  {review.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-text">{review.name}</span>
                  <span className="block text-xs uppercase tracking-wider text-sky">
                    {programLabels[review.program]}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Reseña anterior"
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-text-muted transition-all hover:border-sky hover:text-sky active:scale-90"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <div className="flex gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a la reseña ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`size-2.5 cursor-pointer rounded-full transition-all ${
                selected === i ? "w-7 bg-sky" : "bg-line hover:bg-text-muted"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Siguiente reseña"
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-text-muted transition-all hover:border-sky hover:text-sky active:scale-90"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
