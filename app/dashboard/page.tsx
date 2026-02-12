import Image from "next/image";
import Link from "next/link";

const quickActions = [
  {
    href: "/dashboard/design-her",
    title: "Design Her",
    body: "Shape her personality, expressiveness, and voice.",
  },
  {
    href: "/dashboard/web-call",
    title: "Web Call",
    body: "Open a private call in one tap.",
  },
  {
    href: "/dashboard/telephony",
    title: "Telephony",
    body: "Get a phone call on your number.",
  },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <section className="glass-panel relative overflow-hidden rounded-[2rem] p-6 md:p-10">
        <div className="absolute inset-0">
          <Image
            src="/082d46a28d214716684ac54df469ce18.jpg"
            alt="Neon late-night call mood"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10">
          <p className="soft-pill inline-flex px-4 py-2 text-xs uppercase tracking-[0.25em] text-rose-50/90">
            Dashboard
          </p>
          <h1 className="romance-title mt-4 text-4xl text-rose-50 md:text-6xl">
            Someone is already on the line.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-rose-100/80 md:text-base">
            Choose your next moment. Design Her, call on web, or request a phone call.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {quickActions.map((action) => (
          <Link key={action.href} href={action.href} className="glass-panel romance-btn rounded-3xl p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-rose-100/70">Quick Action</p>
            <h2 className="romance-title mt-3 text-2xl text-rose-50">{action.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-rose-100/80">{action.body}</p>
          </Link>
        ))}
      </section>

      <section className="glass-panel rounded-3xl p-5 md:p-7">
        <h2 className="romance-title text-3xl text-rose-50">Tonight&apos;s tone</h2>
        <p className="mt-3 text-sm text-rose-100/82 md:text-base">
          Soft. Flirty but respectful. Emotion-first. No pressure.
        </p>
      </section>
    </div>
  );
}
