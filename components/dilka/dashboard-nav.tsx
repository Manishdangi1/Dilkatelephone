"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/design-her", label: "Design Her" },
  { href: "/dashboard/web-call", label: "Web Call" },
  { href: "/dashboard/telephony", label: "Telephony" },
  { href: "/dashboard/profile", label: "Profile" },
];

export function DashboardNav() {
  const pathname = usePathname();

  // No nav on web-call page — full-screen call experience
  if (pathname === "/dashboard/web-call") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(27,8,23,0.74)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-8">
        <Link href="/" className="romance-title text-lg text-rose-100 md:text-xl">
          DilKaTelephone ☎️❤️
        </Link>

        <nav className="flex flex-wrap items-center gap-2 md:gap-3">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "soft-pill px-3 py-1.5 text-xs font-medium text-rose-50/90 transition-colors md:text-sm",
                  isActive
                    ? "bg-[#F6C1CC] text-[#2A0E23]"
                    : "hover:bg-white/15 hover:text-rose-50"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/auth"
            className="romance-btn rounded-full border border-[#F4C430]/60 bg-[#F4C430] px-4 py-1.5 text-xs font-semibold text-[#2A0E23] md:text-sm"
          >
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
}
