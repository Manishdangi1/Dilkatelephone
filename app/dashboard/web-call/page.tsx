import { WebCallConsole } from "@/components/dilka/web-call-console";

export default function WebCallPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(246,193,204,0.18),transparent_42%),radial-gradient(circle_at_82%_8%,rgba(244,196,48,0.16),transparent_35%)]" />
      <div className="relative py-2 md:py-4">
        <WebCallConsole />
      </div>
    </div>
  );
}
