"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.1;

      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;

      const newProgress = Math.max(0, Math.min(1, currentPosition / totalDistance));
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");

  return (
    <p ref={containerRef} className="text-3xl font-semibold leading-snug text-rose-50 md:text-4xl lg:text-5xl">
      {words.map((word, index) => {
        const appearProgress = progress * (words.length + 1);
        const wordAppearProgress = Math.max(0, Math.min(1, appearProgress - index));
        const wordOpacity = wordAppearProgress;
        const wordBlur = (1 - wordAppearProgress) * 40;

        return (
          <span
            key={index}
            className="inline-block"
            style={{
              opacity: wordOpacity,
              filter: `blur(${wordBlur}px)`,
              transition: "opacity 0.1s linear, filter 0.1s linear",
              marginRight: "0.3em",
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}

const sideImages = [
  {
    src: "/4800fa6a63e5a2037ba56558564c572a.jpg",
    alt: "Purple romantic atmosphere",
    position: "left",
  },
  {
    src: "/e802e306e14612b03c1d645cc1dfa2de.jpg",
    alt: "Neon silhouettes",
    position: "right",
  },
];

const textCycles = ["Your heart.", "Her voice.", "No judgement."];

export function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [textProgress, setTextProgress] = useState(0);

  const descriptionText =
    "Talk to a voice that feels personal. Soft when you need comfort. Playful when you need lightness. Calm when your thoughts are loud. She remembers you, and she always picks up.";

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 4;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      setScrollProgress(progress);

      if (textSectionRef.current) {
        const textRect = textSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const startOffset = windowHeight * 0.9;
        const endOffset = windowHeight * 0.1;

        const totalDistance = startOffset - endOffset;
        const currentPosition = startOffset - textRect.top;

        const newTextProgress = Math.max(0, Math.min(1, currentPosition / totalDistance));
        setTextProgress(newTextProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));

  const centerWidth = 100 - imageProgress * 58;
  const sideWidth = imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + imageProgress * 100;
  const sideTranslateRight = 100 - imageProgress * 100;
  const gap = imageProgress * 16;

  const grayscaleAmount = Math.round((1 - textProgress) * 100);

  return (
    <section id="voices" ref={sectionRef} className="relative bg-foreground">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px` }}
          >
            <div
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${sideWidth}%`,
                height: "100%",
                transform: `translateX(${sideTranslateLeft}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages
                .filter((img) => img.position === "left")
                .map((img, idx) => (
                  <Image key={idx} src={img.src || "/placeholder.svg"} alt={img.alt} fill className="object-cover" />
                ))}
            </div>

            <div
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: "100%",
                flex: "0 0 auto",
              }}
            >
              <Image
                src="/b21f825faa16069b33167366da6bbc19.jpg"
                alt="Neon portrait"
                fill
                className="object-cover"
                style={{ opacity: scrollProgress < 0.25 ? 1 : 1 }}
              />

              <Image
                src="/082d46a28d214716684ac54df469ce18.jpg"
                alt="Dreamy scene one"
                fill
                className="absolute inset-0 object-cover"
                style={{
                  opacity: Math.max(0, Math.min(1, (scrollProgress - 0.1) / 0.2)),
                  transition: "opacity 0.3s ease",
                }}
              />

              <Image
                src="/98add44c72b1d2fd60b680aa47fe33ca.jpg"
                alt="Dreamy scene two"
                fill
                className="absolute inset-0 object-cover"
                style={{
                  opacity: Math.max(0, Math.min(1, (scrollProgress - 0.4) / 0.2)),
                  transition: "opacity 0.3s ease",
                }}
              />

              <Image
                src="/75cd6ab00301286037ea8322d44266ce.jpg"
                alt="Dreamy scene three"
                fill
                className="absolute inset-0 object-cover"
                style={{
                  opacity: Math.max(0, Math.min(1, (scrollProgress - 0.7) / 0.2)),
                  transition: "opacity 0.3s ease",
                }}
              />

              <div className="absolute inset-0 bg-[#2A0E23]/45" />

              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                {textCycles.map((text, cycleIndex) => {
                  const cycleStart = cycleIndex / textCycles.length;
                  const cycleEnd = (cycleIndex + 1) / textCycles.length;

                  const words = text.split(" ");

                  return (
                    <h2
                      key={cycleIndex}
                      className="absolute max-w-3xl romance-title leading-tight tracking-tight text-rose-50 md:text-5xl lg:text-7xl text-5xl"
                    >
                      {words.map((word, wordIndex) => {
                        let wordOpacity = 0;
                        let wordBlur = 40;

                        if (scrollProgress >= cycleStart && scrollProgress < cycleEnd) {
                          const localProgress = (scrollProgress - cycleStart) / (cycleEnd - cycleStart);

                          if (localProgress < 0.5) {
                            const appearProgress = (localProgress / 0.5) * (words.length + 1);
                            const wordAppearProgress = Math.max(
                              0,
                              Math.min(1, appearProgress - wordIndex)
                            );
                            wordOpacity = wordAppearProgress;
                            wordBlur = (1 - wordAppearProgress) * 40;
                          } else {
                            const disappearProgress =
                              ((localProgress - 0.5) / 0.5) * (words.length + 1);
                            const wordDisappearProgress = Math.max(
                              0,
                              Math.min(1, disappearProgress - wordIndex)
                            );
                            wordOpacity = 1 - wordDisappearProgress;
                            wordBlur = wordDisappearProgress * 40;
                          }
                        }

                        return (
                          <span
                            key={wordIndex}
                            className="inline-block"
                            style={{
                              opacity: wordOpacity,
                              filter: `blur(${wordBlur}px)`,
                              transition: "opacity 0.1s linear, filter 0.1s linear",
                              marginRight: "0.3em",
                            }}
                          >
                            {word}
                          </span>
                        );
                      })}
                    </h2>
                  );
                })}
              </div>
            </div>

            <div
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${sideWidth}%`,
                height: "100%",
                transform: `translateX(${sideTranslateRight}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages
                .filter((img) => img.position === "right")
                .map((img, idx) => (
                  <Image key={idx} src={img.src || "/placeholder.svg"} alt={img.alt} fill className="object-cover" />
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[400vh]" />

      <div ref={textSectionRef} className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-black">
        <div
          className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
          style={{
            height: "150px",
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        />

        <div className="absolute inset-0 z-0">
          <Image
            src="/4800fa6a63e5a2037ba56558564c572a.jpg"
            alt="Purple background"
            fill
            className="object-cover"
            style={{
              filter: `grayscale(${grayscaleAmount}%)`,
              transition: "filter 0.2s ease-out",
            }}
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <ScrollRevealText text={descriptionText} />
        </div>
      </div>
    </section>
  );
}
