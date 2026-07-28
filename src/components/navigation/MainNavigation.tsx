"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAVIGATION_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/leer", label: "Leer manga" },
  { href: "/anadir", label: "Añadir" },
  { href: "/mazos", label: "Mazos" },
  { href: "/repasar", label: "Repasar" },
] as const;

type MainNavigationProps = {
  isMobile?: boolean;
};

export function MainNavigation({
  isMobile = false,
}: MainNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegación principal">
      <ul
        className={
          isMobile
            ? "flex justify-between gap-0.5 overflow-x-auto px-3 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : "space-y-1"
        }
      >
        {NAVIGATION_ITEMS.map((item) => {
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
                    ? `block rounded-lg px-2 py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 ${
                        isActive
                          ? "bg-red-50 text-red-700"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                      }`
                    : `block rounded-xl border-l-4 px-4 py-3 font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 ${
                        isActive
                          ? "border-red-600 bg-red-50 text-red-700"
                          : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950"
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
