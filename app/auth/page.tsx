import Image from "next/image";
import Link from "next/link";

export default function AuthPage() {
  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="glass-panel relative overflow-hidden rounded-[2rem] p-6 md:p-8">
          <div className="absolute inset-0">
            <Image
              src="/4800fa6a63e5a2037ba56558564c572a.jpg"
              alt="Romantic purple backdrop"
              fill
              className="object-cover opacity-45"
              priority
            />
          </div>
          <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-between">
            <div>
              <p className="soft-pill inline-flex px-4 py-2 text-xs uppercase tracking-[0.24em] text-rose-50/90">
                Login / Signup
              </p>
              <h1 className="romance-title mt-6 text-4xl text-rose-50 md:text-5xl">
                Stay on the line.
              </h1>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-rose-100/80 md:text-base">
                Minimal steps. Zero friction. Your moment stays yours.
              </p>
            </div>

            <p
              className="text-sm text-rose-100/75 md:text-base"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              We&apos;ll never interrupt your moment.
            </p>
          </div>
        </section>

        <section className="glass-panel rounded-[2rem] p-6 md:p-8">
          <h2 className="romance-title text-3xl text-rose-50 md:text-4xl">Welcome back</h2>
          <p className="mt-2 text-sm text-rose-100/75 md:text-base">
            Enter your details. She&apos;s ready when you are.
          </p>

          <form className="mt-7 space-y-4">
            <label className="block space-y-2">
              <span className="text-sm text-rose-100/90">Phone number / Email</span>
              <input
                type="text"
                placeholder="+91 98xxxxxx12 or you@heartmail.com"
                className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-rose-50 placeholder:text-rose-100/45 focus:outline-none focus:ring-2 focus:ring-[#F4C430]/60"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-rose-100/90">OTP</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="6-digit code"
                className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-rose-50 placeholder:text-rose-100/45 focus:outline-none focus:ring-2 focus:ring-[#F4C430]/60"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-rose-100/90">Optional name (what she calls you)</span>
              <input
                type="text"
                placeholder="A name she should use"
                className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-rose-50 placeholder:text-rose-100/45 focus:outline-none focus:ring-2 focus:ring-[#F4C430]/60"
              />
            </label>

            <div className="pt-2">
              <Link
                href="/dashboard"
                className="romance-btn heartbeat inline-flex w-full items-center justify-center rounded-full bg-[#F4C430] px-6 py-3 text-sm font-semibold text-[#2A0E23] md:text-base"
              >
                Continue to DilKaTelephone
              </Link>
              <p className="mt-3 text-center text-xs text-rose-100/70 md:text-sm">
                We&apos;ll never interrupt your moment.
              </p>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
