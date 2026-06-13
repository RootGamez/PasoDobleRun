import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ kicker, title, description, align = "center" }: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-2xl ${alignCls}`}>
      <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gold">
        {kicker}
      </p>
      <h2 className="text-balance mt-4 font-display text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
