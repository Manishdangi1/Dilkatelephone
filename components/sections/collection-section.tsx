"use client";

import Link from "next/link";
import { FadeImage } from "@/components/fade-image";

const waysToConnect = [
  {
    id: 1,
    name: "Talk Now",
    description: "Web call. Instant. No app install. Just you and her.",
    price: "Free",
    image: "/082d46a28d214716684ac54df469ce18.jpg",
    href: "/dashboard/web-call",
  },
  {
    id: 2,
    name: "Get a Call",
    description: "She calls your phone when you want her voice close.",
    price: "Free",
    image: "/4800fa6a63e5a2037ba56558564c572a.jpg",
    href: "/dashboard/web-call",
  },
  {
    id: 3,
    name: "Design Her",
    description: "Choose personality, expressiveness, and speaking style.",
    price: "Free",
    image: "/b21f825faa16069b33167366da6bbc19.jpg",
    href: "/dashboard/web-call",
  },
];

export function CollectionSection() {
  return (
    <section id="connect" className="bg-background">
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <h2 className="romance-title text-3xl font-medium tracking-tight text-rose-50 md:text-5xl">
          Choose your moment
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-rose-100/80 md:text-base">
          Flirty but respectful. Emotion-first. Always private.
        </p>
      </div>

      <div className="pb-24">
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {waysToConnect.map((item) => (
            <div key={item.id} className="group flex-shrink-0 w-[75vw] snap-center">
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-rose-50">{item.name}</h3>
                    <p className="mt-2 text-sm text-rose-100/80">{item.description}</p>
                  </div>
                  <span className="text-lg font-semibold text-[#F4C430]">{item.price}</span>
                </div>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-rose-50"
                >
                  Open
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {waysToConnect.map((item) => (
            <div key={item.id} className="group">
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-rose-50">{item.name}</h3>
                    <p className="mt-2 text-sm text-rose-100/80">{item.description}</p>
                  </div>
                  <span className="font-semibold text-[#F4C430] text-2xl">{item.price}</span>
                </div>

                <Link
                  href={item.href}
                  className="mt-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-rose-50 transition-colors hover:bg-white/20"
                >
                  Open
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
