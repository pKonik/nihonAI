"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Dictionary } from "@/lib/i18n/dictionaries";

type MainNavigationProps = {
  isMobile?: boolean;
  text: Dictionary["navigation"];
};

export function MainNavigation({
  isMobile = false,
  text,
}: MainNavigationProps) {
  const pathname = usePathname();
  const navigationItems = [
    { href: "/", label: text.home },
    { href: "/leer", label: text.read },
    { href: "/anadir", label: text.add },
    { href: "/mazos", label: text.decks },
    { href: "/repasar", label: text.review },
  ] as const;

  return (
    <nav aria-label={text.label}>
      <ul
        className={
          isMobile
            ? "flex justify-between gap-0.5 overflow-x-auto px-3 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : "space-y-1"
        }
      >
        {navigationItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

          return (
            <li className={isMobile ? "shrink-0" : undefined} key={item.href}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={
                  isMobile
                    ? `block rounded-lg px-2 py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600 ${
                        isActive
                          ? "bg-shu-50 text-shu-700"
                          : "text-sumi-600 hover:bg-washi-100 hover:text-sumi-950"
                      }`
                    : `block rounded-xl border-l-4 px-4 py-3 font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-300 ${
                        isActive
                          ? "border-shu-500 bg-white/10 text-washi-50"
                          : "border-transparent text-washi-300 hover:bg-white/5 hover:text-washi-50"
                      }`
                }
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
