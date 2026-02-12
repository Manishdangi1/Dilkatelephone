"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-all duration-300 ${
        isScrolled ? "bg-[rgba(42,14,35,0.75)] backdrop-blur-xl rounded-full" : "bg-transparent"
      }`}
      style={{
        boxShadow: isScrolled
          ? "0 0 0 1px rgba(255, 220, 238, 0.18), 0 10px 30px rgba(31, 6, 24, 0.55)"
          : "none",
      }}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-2 pl-5 py-2.5 md:py-3">
        <Link
          href="#hero"
          className="romance-title text-base font-medium tracking-tight transition-colors duration-300 text-rose-50 md:text-lg"
        >
          DilKaTelephone
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#how" className="text-sm transition-colors text-rose-100/70 hover:text-rose-50">
            How It Works
          </Link>
          <Link href="#voices" className="text-sm transition-colors text-rose-100/70 hover:text-rose-50">
            Voices
          </Link>
          <Link href="#mood" className="text-sm transition-colors text-rose-100/70 hover:text-rose-50">
            Moodboard
          </Link>
          <Link href="#connect" className="text-sm transition-colors text-rose-100/70 hover:text-rose-50">
            Connect
          </Link>
          <Link href="#about" className="text-sm transition-colors text-rose-100/70 hover:text-rose-50">
            About
          </Link>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/dashboard/web-call"
            className="romance-btn heartbeat px-4 py-2 text-sm font-semibold rounded-full bg-[#F4C430] text-[#2A0E23] hover:bg-[#FFD36A]"
          >
            Talk Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="transition-colors md:hidden text-rose-50"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[rgba(42,14,35,0.95)] px-6 py-8 md:hidden rounded-b-2xl">
          <nav className="flex flex-col gap-5">
            <Link href="#how" className="text-lg text-rose-50" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </Link>
            <Link href="#voices" className="text-lg text-rose-50" onClick={() => setIsMenuOpen(false)}>
              Voices
            </Link>
            <Link href="#mood" className="text-lg text-rose-50" onClick={() => setIsMenuOpen(false)}>
              Moodboard
            </Link>
            <Link href="#connect" className="text-lg text-rose-50" onClick={() => setIsMenuOpen(false)}>
              Connect
            </Link>
            <Link href="#about" className="text-lg text-rose-50" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link
              href="/dashboard/web-call"
              className="mt-2 bg-[#F4C430] px-5 py-3 text-center text-sm font-semibold text-[#2A0E23] rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              ❤️ Talk Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
