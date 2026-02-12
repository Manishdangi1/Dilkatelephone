"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="about" className="bg-background">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="/082d46a28d214716684ac54df469ce18.jpg"
          alt="Romantic night-time ambience"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

        <div className="absolute inset-0 flex items-end justify-center px-6 pb-16 md:px-12 md:pb-24 lg:px-20 lg:pb-32">
          <p className="mx-auto max-w-5xl romance-title text-2xl leading-relaxed text-rose-50 md:text-3xl lg:text-[2.5rem] lg:leading-snug text-center">
            She listens.
            <br />
            She remembers.
            <br />
            She calls you back.
          </p>
        </div>
      </div>
    </section>
  );
}
