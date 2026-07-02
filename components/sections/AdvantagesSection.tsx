import Image from "next/image";
import { ADVANTAGES } from "@/lib/constants";

const CIRCLE_SIZES: Record<string, number> = {
  quality: 250,
  "gift-box": 300,
  customisation: 250,
};

const IMAGE_AREA_HEIGHT = Math.max(...Object.values(CIRCLE_SIZES));

function AdvantageCard({
  advantage,
  circleSize,
}: {
  advantage: (typeof ADVANTAGES)[number];
  circleSize: number;
}) {
  return (
    <article className="flex flex-col items-center text-center">
      <div
        className="flex w-full items-end justify-center"
        style={{ height: IMAGE_AREA_HEIGHT }}
      >
        <div
          className="relative overflow-hidden rounded-full transition-transform duration-500 ease-out motion-safe:hover:scale-105"
          style={{ width: circleSize, height: circleSize }}
        >
          <Image
            src={advantage.image}
            alt={advantage.title}
            fill
            className="object-cover"
            sizes={`${circleSize}px`}
          />
        </div>
      </div>
      <h3 className="mt-6 font-display text-[24px] font-medium text-black">{advantage.title}</h3>
      <p className="mt-3 max-w-[280px] font-body text-[18px] leading-relaxed text-[var(--color-muted)]">
        {advantage.description}
      </p>
    </article>
  );
}

export function AdvantagesSection() {
  return (
    <section
      id="advantages"
      className="mx-auto max-w-[var(--max-width)] px-6 py-20 md:px-16 lg:px-28"
      data-testid="advantages-section"
    >
      <h2 className="text-center font-display text-[45px] font-medium text-black">Our advantages</h2>

      <div className="mt-16 grid gap-14 md:grid-cols-3 md:items-start md:gap-8 lg:gap-12">
        {ADVANTAGES.map((advantage) => {
          const circleSize = CIRCLE_SIZES[advantage.id] ?? 250;
          return <AdvantageCard key={advantage.id} advantage={advantage} circleSize={circleSize} />;
        })}
      </div>
    </section>
  );
}
