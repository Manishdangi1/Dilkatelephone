"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

export function GallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const images = [
    { src: "/b21f825faa16069b33167366da6bbc19.jpg", alt: "Neon face in blue" },
    { src: "/082d46a28d214716684ac54df469ce18.jpg", alt: "Dreamy pointing figure" },
    { src: "/98add44c72b1d2fd60b680aa47fe33ca.jpg", alt: "Late-night purple portrait" },
    { src: "/75cd6ab00301286037ea8322d44266ce.jpg", alt: "Soft glow portrait" },
  ];

  const updateTransform = useCallback(() => {
    if (!galleryRef.current) return;

    const rect = galleryRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = galleryRef.current.offsetHeight;

    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));

    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateTransform);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransform]);

  const isLastImage = images.length - 1;

  const fullscreenStartProgress = 0.6;
  const fullscreenProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - fullscreenStartProgress) / (1 - fullscreenStartProgress))
  );

  const easedFullscreenProgress = 1 - Math.pow(1 - fullscreenProgress, 3);

  return (
    <section id="gallery" ref={galleryRef} className="relative bg-black" style={{ minHeight: `${(images.length + 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center px-4">
        <div className="relative w-full max-w-5xl h-[70vh] md:h-[80vh]">
          {images.map((image, index) => {
            const isLast = index === isLastImage;
            const imageProgress = scrollProgress * images.length - index;
            const stackProgress = Math.max(0, Math.min(1, imageProgress));

            const translateY = (1 - stackProgress) * 100;
            let scale = 0.8 + stackProgress * 0.2;
            const opacity = stackProgress;

            if (isLast) {
              const normalScale = 0.8 + stackProgress * 0.2;
              const expandedScale = 1 + easedFullscreenProgress * 0.8;
              scale = normalScale + Math.max(0, stackProgress - 0.8) * 5 * (expandedScale - normalScale);
            }

            const zIndex = index;
            const borderRadius =
              isLast && easedFullscreenProgress > 0.3 ? (1 - easedFullscreenProgress) * 16 : undefined;

            return (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  zIndex,
                  transform: `translate3d(0, ${translateY}%, 0) scale(${scale}) translateZ(0)`,
                  WebkitTransform: `translate3d(0, ${translateY}%, 0) scale(${scale}) translateZ(0)`,
                  opacity,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  willChange: "transform, opacity",
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                <div
                  className="relative w-full h-full overflow-hidden rounded-xl md:rounded-2xl"
                  style={{
                    borderRadius: borderRadius !== undefined ? `${borderRadius}px` : undefined,
                  }}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A0E23]/45 via-transparent to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
