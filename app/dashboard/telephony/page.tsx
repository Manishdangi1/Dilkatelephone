import Image from "next/image";

export default function TelephonyPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <section className="glass-panel relative overflow-hidden rounded-[2rem] p-6 md:p-10">
        <div className="absolute inset-0">
          <Image
            src="/b4d10cd05a459d01fb883f4e66c49c35.jpg"
            alt="Two glowing figures in dark ambience"
            fill
            className="object-cover opacity-24"
            priority
          />
        </div>

        <div className="relative z-10">
          <p className="soft-pill inline-flex px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-rose-50/90">
            Telephony
          </p>
          <h1 className="romance-title mt-5 text-4xl text-rose-50 md:text-5xl">
            Get a call on your phone.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-rose-100/80 md:text-base">
            No app. No setup stress. Just one tap and she calls.
          </p>

          <div className="mt-8 rounded-3xl border border-white/15 bg-[rgba(26,8,22,0.56)] p-5 md:p-7">
            <button
              type="button"
              className="romance-btn heartbeat inline-flex rounded-full bg-[#F4C430] px-6 py-3 text-sm font-semibold text-[#2A0E23] md:text-base"
            >
              📞 Call Me Now
            </button>
            <p className="mt-4 text-sm text-rose-100/78 md:text-base">
              Free for now. Always respectful. Always private.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
