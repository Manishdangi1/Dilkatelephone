"use client";

import { useMemo, useState } from "react";
import { Waveform } from "@/components/dilka/waveform";
import { cn } from "@/lib/utils";

const personalityOptions = [
  "🌸 Gentle & Caring",
  "😊 Playful & Flirty",
  "😌 Calm Listener",
  "💬 Confident & Direct",
] as const;

const voiceOptions = [
  {
    name: "Warm Indian Accent",
    detail: "Familiar, close, and easy to trust.",
  },
  {
    name: "Soft Whisper Tone",
    detail: "Quiet warmth for late-night conversations.",
  },
  {
    name: "Confident Clear Voice",
    detail: "Grounded clarity with a gentle edge.",
  },
  {
    name: "Late-Night Radio Voice",
    detail: "Slow, smooth, and emotionally present.",
  },
] as const;

const speakingStyles = [
  "Uses your name",
  "Mixes Hindi & English",
  "Slow & comforting",
  "Curious & engaging",
] as const;

export function DesignHerForm() {
  const [personality, setPersonality] = useState<string>(personalityOptions[0]);
  const [expressiveness, setExpressiveness] = useState(60);
  const [selectedVoice, setSelectedVoice] = useState<string>(voiceOptions[0].name);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([
    "Uses your name",
    "Slow & comforting",
  ]);
  const [isSaved, setIsSaved] = useState(false);

  const expressivenessLabel = useMemo(() => {
    if (expressiveness <= 35) return "Mostly listening";
    if (expressiveness <= 70) return "Balanced rhythm";
    return "Expressive and responsive";
  }, [expressiveness]);

  const toggleStyle = (style: string) => {
    setSelectedStyles((current) =>
      current.includes(style)
        ? current.filter((value) => value !== style)
        : [...current, style]
    );
  };

  const handleSave = () => {
    setIsSaved(true);
    window.setTimeout(() => setIsSaved(false), 2200);
  };

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-3xl p-5 md:p-8">
        <h1 className="romance-title text-3xl text-rose-50 md:text-4xl">
          Who do you want to talk to today?
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-rose-100/80 md:text-base">
          Shape her tone, pace, and presence. Keep it soft. Keep it yours.
        </p>
      </section>

      <section className="glass-panel rounded-3xl p-5 md:p-7">
        <p className="text-xs uppercase tracking-[0.25em] text-rose-100/70">1. Personality</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {personalityOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setPersonality(option)}
              className={cn(
                "romance-btn rounded-2xl border px-4 py-3 text-left text-sm md:text-base",
                personality === option
                  ? "border-[#F4C430]/70 bg-[#F6C1CC] text-[#2A0E23]"
                  : "border-white/15 bg-white/5 text-rose-50 hover:bg-white/10"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-5 md:p-7">
        <p className="text-xs uppercase tracking-[0.25em] text-rose-100/70">2. Expressiveness</p>
        <div className="mt-5 rounded-2xl border border-white/15 bg-black/20 p-4">
          <div className="flex items-center justify-between text-sm text-rose-100/85">
            <span>Soft</span>
            <span>{expressivenessLabel}</span>
            <span>Expressive</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={expressiveness}
            onChange={(event) => setExpressiveness(Number(event.target.value))}
            className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-[#E8DFF5] via-[#F6C1CC] to-[#F4C430]"
            aria-label="Expressiveness"
          />
          <p className="mt-3 text-sm text-rose-100/75">
            Does she listen more, or speak more?
          </p>
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-5 md:p-7">
        <p className="text-xs uppercase tracking-[0.25em] text-rose-100/70">3. Voice Selection</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {voiceOptions.map((voice) => {
            const isSelected = selectedVoice === voice.name;
            return (
              <button
                key={voice.name}
                type="button"
                onClick={() => setSelectedVoice(voice.name)}
                className={cn(
                  "romance-btn rounded-2xl border p-4 text-left",
                  isSelected
                    ? "border-[#F4C430]/70 bg-[#ffd6c9] text-[#2A0E23]"
                    : "border-white/15 bg-white/5 text-rose-50 hover:bg-white/10"
                )}
              >
                <p className="text-sm font-semibold md:text-base">{voice.name}</p>
                <p className={cn("mt-1 text-xs md:text-sm", isSelected ? "text-[#2A0E23]/80" : "text-rose-100/75")}>
                  {voice.detail}
                </p>
                <Waveform bars={12} live={isSelected} className="mt-3 justify-start" />
              </button>
            );
          })}
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-5 md:p-7">
        <p className="text-xs uppercase tracking-[0.25em] text-rose-100/70">4. Speaking Style</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {speakingStyles.map((style) => {
            const checked = selectedStyles.includes(style);
            return (
              <button
                key={style}
                type="button"
                onClick={() => toggleStyle(style)}
                className={cn(
                  "romance-btn rounded-full border px-4 py-2 text-sm",
                  checked
                    ? "border-[#F4C430]/60 bg-[#F4C430] text-[#2A0E23]"
                    : "border-white/15 bg-white/5 text-rose-100 hover:bg-white/12"
                )}
              >
                {style}
              </button>
            );
          })}
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-5 md:p-7">
        <button
          type="button"
          onClick={handleSave}
          className="romance-btn heartbeat w-full rounded-full bg-[#F4C430] px-6 py-3 text-base font-semibold text-[#2A0E23] md:w-auto"
        >
          ❤️ Save Her Voice
        </button>
        <p className="mt-3 text-sm text-rose-100/80">She&apos;ll sound just the way you like.</p>
        {isSaved ? (
          <p className="mt-2 text-sm text-[#F4C430]">
            Saved. She&apos;ll pick up exactly like this.
          </p>
        ) : null}
      </section>
    </div>
  );
}
