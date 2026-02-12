const callHistory = [
  "February 9, 2026 - 11:42 PM",
  "February 9, 2026 - 10:16 PM",
  "February 8, 2026 - 12:03 AM",
  "February 7, 2026 - 11:18 PM",
];

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <section className="glass-panel rounded-[2rem] p-6 md:p-8">
        <h1 className="romance-title text-4xl text-rose-50 md:text-5xl">Your Profile</h1>
        <p className="mt-2 text-sm text-rose-100/80 md:text-base">Some conversations are just for you.</p>
      </section>

      <section className="glass-panel rounded-3xl p-6 md:p-7">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/15 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Name / Nickname</p>
            <p className="mt-2 text-lg text-rose-50">Avi</p>
          </article>

          <article className="rounded-2xl border border-white/15 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Preferred Voice</p>
            <p className="mt-2 text-lg text-rose-50">Late-Night Radio Voice</p>
          </article>
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-6 md:p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Call History</p>
        <ul className="mt-4 space-y-2">
          {callHistory.map((entry) => (
            <li key={entry} className="rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-rose-100/90 md:text-base">
              {entry}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
