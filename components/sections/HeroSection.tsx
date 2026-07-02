"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SocialIcons } from "@/components/ui/SocialIcons";

const HERO_IMAGES = {
  default: {
    src: "/images/hero-bag.jpg",
    alt: "Handcrafted leather bag",
  },
  scrolled: {
    src: "/images/hero-bag-scroll.png",
    alt: "Handcrafted leather bag beside a wooden barrel",
  },
} as const;

const SCROLL_FADE_DISTANCE = 320;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;

    const update = () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const progress = Math.min(1, Math.max(0, window.scrollY / SCROLL_FADE_DISTANCE));
      setScrollProgress(progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrolledOpacity = scrollProgress;
  const defaultOpacity = 1 - scrollProgress;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative mb-[30px] min-h-[800px] overflow-hidden bg-white"
    >
      <div className="mx-auto grid max-w-[var(--max-width)] lg:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center px-6 pb-16 pt-40 md:px-16 lg:px-28 lg:pb-12 lg:pt-48">
          <h1 className="font-display text-[50px] font-medium leading-tight">
            Handcrafted
            <br />
            &amp; personalised
          </h1>
          <p className="mt-6 font-body text-[18px]">Your vision, our creation</p>
          <ButtonLink href="/products" className="mt-10 w-fit" aria-label="Shop now">
            Shop now
          </ButtonLink>
          <SocialIcons className="mt-16" size={50} />
        </div>

        <div className="relative min-h-[400px] lg:min-h-[800px]">
          <Image
            src={HERO_IMAGES.default.src}
            alt={HERO_IMAGES.default.alt}
            fill
            className="object-cover"
            style={{ opacity: defaultOpacity * 0.9 }}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            aria-hidden={scrollProgress > 0.5}
          />
          <Image
            src={HERO_IMAGES.scrolled.src}
            alt={HERO_IMAGES.scrolled.alt}
            fill
            className="object-cover"
            style={{ opacity: scrolledOpacity * 0.9 }}
            sizes="(max-width: 1024px) 100vw, 50vw"
            aria-hidden={scrollProgress <= 0.5}
          />
        </div>
      </div>
    </section>
  );
}
