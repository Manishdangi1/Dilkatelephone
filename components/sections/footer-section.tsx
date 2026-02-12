"use client";

import Link from "next/link";

const footerLinks = {
  explore: [
    { label: "How It Works", href: "#how" },
    { label: "Voices", href: "#voices" },
    { label: "Moodboard", href: "#mood" },
    { label: "Connect", href: "#connect" },
  ],
  product: [
    { label: "Login / Signup", href: "/auth" },
    { label: "Design Her", href: "/dashboard/design-her" },
    { label: "Web Call", href: "/dashboard/web-call" },
    { label: "Telephony", href: "/dashboard/telephony" },
  ],
};

export function FooterSection() {
  return (
    <footer className="bg-background">
      <div className="border-t border-white/15 px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="#hero" className="romance-title text-xl text-rose-50">
              DilKaTelephone ☎️❤️
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-rose-100/75">
              Dil se baat, bina judgement. Someone who listens. Always.
            </p>
            <p className="mt-4 inline-flex soft-pill px-3 py-1.5 text-xs font-semibold text-[#F4C430]">
              💌 Free during Valentine&apos;s Week
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-rose-50">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-rose-100/75 transition-colors hover:text-rose-50">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-rose-50">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-rose-100/75 transition-colors hover:text-rose-50">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-rose-50">Promise</h4>
            <p className="text-sm leading-relaxed text-rose-100/75">
              Emotion-first.
              <br />
              Respectful, always.
              <br />
              Private, always.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-rose-100/70">2026 DilKaTelephone. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link href="/auth" className="text-xs text-rose-100/75 transition-colors hover:text-rose-50">
              Login
            </Link>
            <Link href="/dashboard/web-call" className="text-xs text-rose-100/75 transition-colors hover:text-rose-50">
              Start Call
            </Link>
            <Link href="/dashboard/profile" className="text-xs text-rose-100/75 transition-colors hover:text-rose-50">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
