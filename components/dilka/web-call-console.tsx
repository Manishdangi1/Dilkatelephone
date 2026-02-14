"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Room, RoomEvent, createLocalAudioTrack } from "livekit-client";
import { Waveform } from "@/components/dilka/waveform";

const HER_NAME = "Aarohi";
const LIVEKIT_AGENT_ID = "AGT_B7A2D783";
const LIVEKIT_API_URL = "https://developer.induslabs.io/api/livekit";
const WEB_CALL_IMAGES = [
  { src: "/082d46a28d214716684ac54df469ce18.jpg", alt: "Soft neon portrait" },
  { src: "/98add44c72b1d2fd60b680aa47fe33ca.jpg", alt: "Purple late-night mood" },
  { src: "/75cd6ab00301286037ea8322d44266ce.jpg", alt: "Warm romantic style portrait" },
  { src: "/b21f825faa16069b33167366da6bbc19.jpg", alt: "Blue cinematic portrait" },
] as const;

function formatTime(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (totalSeconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

/** Per https://docs.induslabs.io/voice-agents - response has token and livekit_host_url (possibly under data). */
export type LiveKitSession = {
  token: string;
  livekit_host_url: string;
};

async function fetchLiveKitSession(apiKey: string): Promise<LiveKitSession> {
  const res = await fetch(LIVEKIT_API_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: apiKey,
      agent_id: LIVEKIT_AGENT_ID,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `LiveKit API error: ${res.status}`);
  }

  const raw = (await res.json()) as { data?: LiveKitSession } & LiveKitSession;
  const data = raw.data ?? raw;
  const token = data.token ?? (data as unknown as { participant_token?: string }).participant_token;
  const url =
    data.livekit_host_url ??
    (data as unknown as { server_url?: string; url?: string }).server_url ??
    (data as unknown as { server_url?: string; url?: string }).url;

  if (!token || !url) {
    throw new Error("API did not return token or livekit_host_url");
  }

  return { token, livekit_host_url: url };
}

/** Normalize host URL to WebSocket (wss://) for LiveKit. */
function toLiveKitWsUrl(host: string): string {
  if (host.startsWith("https://")) return host.replace("https://", "wss://");
  if (host.startsWith("http://")) return host.replace("http://", "ws://");
  if (!host.startsWith("ws")) return `wss://${host}`;
  return host;
}

export function WebCallConsole() {
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [liveKitError, setLiveKitError] = useState<string | null>(null);
  const [liveKitLoading, setLiveKitLoading] = useState(false);

  const roomRef = useRef<Room | null>(null);
  const localAudioRef = useRef<{ track: Awaited<ReturnType<typeof createLocalAudioTrack>> } | null>(null);
  const remoteAudioContainerRef = useRef<HTMLDivElement | null>(null);

  const startCall = useCallback(async () => {
    const apiKey = process.env.NEXT_PUBLIC_INDUS_LIVEKIT_API_KEY;
    if (!apiKey) {
      setLiveKitError("Missing API key. Set NEXT_PUBLIC_INDUS_LIVEKIT_API_KEY in .env.local");
      return;
    }

    setLiveKitError(null);
    setLiveKitLoading(true);

    try {
      const { token, livekit_host_url } = await fetchLiveKitSession(apiKey);
      const connectUrl = toLiveKitWsUrl(livekit_host_url);

      const room = new Room();
      roomRef.current = room;

      room.on(RoomEvent.Connected, async () => {
        setLiveKitLoading(false);
        setIsRunning(true);
        try {
          const audioTrack = await createLocalAudioTrack();
          localAudioRef.current = { track: audioTrack };
          await room.localParticipant.publishTrack(audioTrack);
        } catch (err) {
          console.error("Failed to enable microphone:", err);
          setLiveKitError("Microphone access denied or failed.");
        }
      });

      room.on(RoomEvent.Disconnected, () => {
        setIsRunning(false);
        setSeconds(0);
        roomRef.current = null;
        localAudioRef.current = null;
      });

      room.on(RoomEvent.TrackSubscribed, (track) => {
        if (track.kind === "audio") {
          const el = track.attach();
          el.setAttribute("autoplay", "true");
          el.setAttribute("playsinline", "true");
          if (remoteAudioContainerRef.current) {
            remoteAudioContainerRef.current.appendChild(el);
          } else {
            document.body.appendChild(el);
          }
          el.play().catch((err) => console.warn("Autoplay blocked:", err));
        }
      });

      room.on(RoomEvent.TrackUnsubscribed, (track) => {
        track.detach().forEach((node) => node.remove());
      });

      await room.connect(connectUrl, token);
    } catch (err) {
      setLiveKitLoading(false);
      setLiveKitError(err instanceof Error ? err.message : "Failed to connect to LiveKit");
    }
  }, []);

  const disconnectRoom = useCallback(() => {
    const room = roomRef.current;
    if (room) {
      room.disconnect(true);
      roomRef.current = null;
    }
    localAudioRef.current = null;
    if (remoteAudioContainerRef.current) {
      remoteAudioContainerRef.current.innerHTML = "";
    }
  }, []);

  const toggleCall = useCallback(() => {
    if (isRunning) {
      disconnectRoom();
      setIsRunning(false);
      setIsMuted(false);
      setSeconds(0);
      setLiveKitError(null);
    } else {
      startCall();
    }
  }, [isRunning, startCall, disconnectRoom]);

  useEffect(() => {
    return () => disconnectRoom();
  }, [disconnectRoom]);

  useEffect(() => {
    if (!isRunning) return;
    const timer = window.setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => window.clearInterval(timer);
  }, [isRunning]);

  // Mute: mute/unmute local audio track so agent doesn't hear when muted
  useEffect(() => {
    const local = localAudioRef.current;
    if (!local) return;
    if (isMuted) {
      void local.track.mute();
    } else {
      void local.track.unmute();
    }
  }, [isMuted]);

  const statusLine = useMemo(() => {
    if (liveKitLoading) return "Connecting…";
    if (liveKitError) return liveKitError;
    if (isRunning) {
      return isMuted ? "Muted, but still connected." : "Take a breath. She's listening.";
    }
    return "Take a breath. She's listening.";
  }, [isMuted, isRunning, liveKitLoading, liveKitError]);

  const endCall = useCallback(() => {
    disconnectRoom();
    setIsRunning(false);
    setIsMuted(false);
    setSeconds(0);
    setLiveKitError(null);
  }, [disconnectRoom]);

  return (
    <section className="mx-auto max-w-6xl">
      {/* Hidden container for agent audio playback */}
      <div ref={remoteAudioContainerRef} className="sr-only" aria-hidden />
      <div className="mb-6 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="romance-btn inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-rose-50 transition-colors hover:bg-white/15"
        >
          <span aria-hidden>←</span>
          Back
        </Link>
        <p className="soft-pill inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2em] text-rose-50/90">
          <span
            className={`h-2 w-2 rounded-full ${isRunning ? "bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]" : "bg-rose-200/70"}`}
          />
          {isRunning ? "Live Session" : "Ready"}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="glass-panel relative overflow-hidden rounded-[2rem] px-5 py-8 text-center md:px-10 md:py-12">
          <div className="absolute inset-0">
            <Image
              src={WEB_CALL_IMAGES[0].src}
              alt={WEB_CALL_IMAGES[0].alt}
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#2A0E23]/40 via-[#2A0E23]/68 to-[#2A0E23]/85" />
          </div>

          <div className="relative z-10">
            <p className="text-sm uppercase tracking-[0.3em] text-rose-100/70">Web Call</p>
            <h1 className="romance-title mt-3 text-4xl text-rose-50 md:text-5xl">{HER_NAME}</h1>
            <p className="mt-2 text-lg text-rose-100/80">{formatTime(seconds)}</p>

            <div className="mx-auto mt-8 w-full max-w-lg rounded-3xl border border-white/15 bg-black/20 p-6">
              <Waveform bars={26} live={isRunning} className="min-h-28" />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={toggleCall}
                disabled={liveKitLoading}
                className="romance-btn heartbeat rounded-full bg-[#F4C430] px-6 py-3 text-sm font-semibold text-[#2A0E23] disabled:opacity-60 md:text-base"
              >
                {liveKitLoading ? "Connecting…" : isRunning ? "Pause Call" : "Start Call"}
              </button>

              <button
                type="button"
                onClick={() => setIsMuted((value) => !value)}
                disabled={!isRunning}
                className="romance-btn rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-rose-50 disabled:opacity-50 md:text-base"
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>

              <button
                type="button"
                onClick={endCall}
                className="romance-btn rounded-full border border-[#F6C1CC]/50 bg-[#F6C1CC]/20 px-6 py-3 text-sm font-medium text-rose-50 md:text-base"
              >
                End Call
              </button>
            </div>

            <p className="mt-6 text-sm text-rose-100/78 md:text-base">{statusLine}</p>
          </div>
        </div>

        <aside className="glass-panel rounded-[2rem] p-4 md:p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-rose-100/70">Session Moodboard</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {WEB_CALL_IMAGES.slice(1).map((image, index) => (
              <div
                key={image.src}
                className={`relative overflow-hidden rounded-2xl border border-white/15 ${index === 0 ? "col-span-2 h-40" : "h-32"}`}
              >
                <Image src={image.src} alt={image.alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-left">
            <p className="text-sm text-rose-100/82">Private connection. Soft tone. Zero pressure.</p>
            <p className="text-xs text-rose-100/65">All images on this page are unique and theme-matched.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
