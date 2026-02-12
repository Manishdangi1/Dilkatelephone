import { cn } from "@/lib/utils";

type WaveformProps = {
  bars?: number;
  live?: boolean;
  className?: string;
};

export function Waveform({ bars = 20, live = false, className }: WaveformProps) {
  return (
    <div className={cn("waveform", live && "is-live", className)} aria-hidden="true">
      {Array.from({ length: bars }).map((_, idx) => {
        const height = 18 + ((idx * 11) % 40);
        return (
          <span
            key={`bar-${idx}`}
            className="wave-bar"
            style={{
              height: `${height}px`,
              animationDelay: `${idx * 0.08}s`,
            }}
          />
        );
      })}
    </div>
  );
}
