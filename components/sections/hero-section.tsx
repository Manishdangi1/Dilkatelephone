"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const word = "DIL";

const sideImages = [
  {
    src: "/75cd6ab00301286037ea8322d44266ce.jpg",
    alt: "Dreamy violet portrait",
    position: "left",
    span: 1,
  },
  {
    src: "/98add44c72b1d2fd60b680aa47fe33ca.jpg",
    alt: "Soft lavender midnight mood",
    position: "left",
    span: 1,
  },
  {
    src: "/b4d10cd05a459d01fb883f4e66c49c35.jpg",
    alt: "Twin neon silhouettes",
    position: "right",
    span: 1,
  },
  {
    src: "/e802e306e14612b03c1d645cc1dfa2de.jpg",
    alt: "Glowing wing silhouettes in dark",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const textOpacity = Math.max(0, 1 - scrollProgress / 0.2);
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));

  const centerWidth = 100 - imageProgress * 80;
  const centerHeight = 100;
  const sideWidth = imageProgress * 40;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + imageProgress * 100;
  const sideTranslateRight = 100 - imageProgress * 100;
  const borderRadius = 0;
  const gap = imageProgress * 8;
  const sideTranslateY = -(imageProgress * 15);

  return (
    <section id="hero" ref={sectionRef} className="relative bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative flex h-full w-full items-stretch justify-center" style={{ gap: `${gap}px` }}>
            <div
              className="flex h-full flex-row will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages
                .filter((img) => img.position === "left")
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-full overflow-hidden will-change-transform"
                    style={{
                      flex: img.span,
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    <Image src={img.src || "/placeholder.svg"} alt={img.alt} fill className="object-cover" />
                  </div>
                ))}
            </div>

            <div
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <div
                className="absolute inset-0 z-0 flex items-center justify-center"
                style={{ opacity: textOpacity, transform: "translateY(-200px)" }}
              >
                <h1 className="whitespace-nowrap text-[35vw] font-bold leading-[0.8] tracking-tighter text-rose-100/70">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: "all 1.5s",
                        transitionTimingFunction: "cubic-bezier(0.86, 0, 0.07, 1)",
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>

              <Image
                src="/082d46a28d214716684ac54df469ce18.jpg"
                alt="Late-night dreamy conversation visual"
                fill
                className="absolute inset-0 z-10 object-cover"
                priority
              />
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#2A0E23]/50 via-transparent to-[#2A0E23]/35" />
            </div>

            <div
              className="flex h-full flex-row will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages
                .filter((img) => img.position === "right")
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-full overflow-hidden will-change-transform"
                    style={{
                      flex: img.span,
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    <Image src={img.src || "/placeholder.svg"} alt={img.alt} fill className="object-cover" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 px-6 pb-12 md:px-12 md:pb-16 lg:px-20 lg:pb-20"
        style={{ opacity: textOpacity }}
      >
        <p className="mx-auto max-w-3xl text-center text-2xl leading-relaxed text-rose-50 md:text-3xl lg:text-[2.5rem] lg:leading-snug romance-title">
          Dil ka telephone uthaiye.
          <br />
          Someone is already on the line.
        </p>
      </div>

      <div className="h-[200vh]" />
    </section>
  );
}
