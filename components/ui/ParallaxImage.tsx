"use client";

import Image, { type ImageProps } from "next/image";
import { useParallax } from "@/hooks/useParallax";

type ParallaxImageProps = Omit<ImageProps, "fill"> & {
  speed?: number;
  containerClassName?: string;
  imageClassName?: string;
};

export function ParallaxImage({
  speed = 0.2,
  containerClassName = "",
  imageClassName = "object-cover",
  alt,
  className,
  ...imageProps
}: ParallaxImageProps) {
  const { ref, style } = useParallax(speed);
  const mergedImageClassName = className ?? imageClassName;

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <div ref={ref} className="absolute inset-x-0 -top-[12%] h-[124%]" style={style}>
        <Image alt={alt} fill className={mergedImageClassName} {...imageProps} />
      </div>
    </div>
  );
}
