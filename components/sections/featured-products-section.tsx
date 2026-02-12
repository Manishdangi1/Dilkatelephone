"use client";

import { FadeImage } from "@/components/fade-image";

const moodboard = [
  {
    image: "/082d46a28d214716684ac54df469ce18.jpg",
    span: "col-span-2 row-span-2",
  },
  {
    image: "/4800fa6a63e5a2037ba56558564c572a.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    image: "/75cd6ab00301286037ea8322d44266ce.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    image: "/98add44c72b1d2fd60b680aa47fe33ca.jpg",
    span: "col-span-1 row-span-2",
  },
  {
    image: "/b21f825faa16069b33167366da6bbc19.jpg",
    span: "col-span-1 row-span-1",
  },
  {
    image: "/b4d10cd05a459d01fb883f4e66c49c35.jpg",
    span: "col-span-2 row-span-1",
  },
  {
    image: "/e802e306e14612b03c1d645cc1dfa2de.jpg",
    span: "col-span-1 row-span-1",
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="mood" className="relative bg-background py-20 md:py-32">
      <div className="px-4 md:px-12 lg:px-20">
        <div className="mx-auto mb-8 max-w-7xl">
          <p className="soft-pill inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#F4C430]">
            late-night call energy
          </p>
          <h2 className="romance-title mt-4 text-3xl text-rose-50 md:text-5xl">Soft, dreamy, modern romance.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-rose-100/80 md:text-base">
            Not loud. Not rushed. Just a quiet world where your voice feels safe.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-7xl mx-auto auto-rows-[180px] md:auto-rows-[220px]">
          {moodboard.map((item, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg border border-white/15 ${item.span}`}
            >
              <FadeImage
                src={item.image || "/placeholder.svg"}
                alt={`DilKaTelephone mood visual ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
