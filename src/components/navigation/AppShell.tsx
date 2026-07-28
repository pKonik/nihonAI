import Link from "next/link";

import { signOut } from "@/app/login/actions";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { MainNavigation } from "@/components/navigation/MainNavigation";

type AppShellProps = {
  children: React.ReactNode;
  email: string;
};

function AccountControls({ email }: { email: string }) {
  return (
    <div className="border-t border-white/15 pt-5">
      <p className="truncate text-sm text-washi-300" title={email}>
        {email}
      </p>
      <form action={signOut} className="mt-3">
        <button
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-washi-50 transition hover:border-shu-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-300"
          type="submit"
        >
          Cerrar sesión
        </button>
      </form>
    </div>
  );
}

export function AppShell({ children, email }: AppShellProps) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)]">
      <a
        className="sr-only z-50 rounded-lg bg-washi-50 px-4 py-2 font-semibold text-sumi-950 shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#main-content"
      >
        Saltar al contenido
      </a>

      <aside className="relative hidden overflow-hidden bg-sumi-950 px-5 py-7 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <div
          aria-hidden="true"
          className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-shu-500/10 blur-3xl"
        />
        <Link
          aria-label="Ir al inicio de NihonAI"
          className="relative rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-shu-300"
          href="/"
        >
          <BrandLogo inverted />
        </Link>

        <div className="relative mt-10 flex-1">
          <MainNavigation />
        </div>

        <div className="relative">
          <AccountControls email={email} />
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-washi-200 bg-washi-50/95 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link
              aria-label="Ir al inicio de NihonAI"
              className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-shu-600"
              href="/"
            >
              <BrandLogo compact />
            </Link>
            <form action={signOut}>
              <button
                aria-label={`Cerrar sesión de ${email}`}
                className="rounded-lg border border-washi-300 px-3 py-2 text-xs font-semibold text-sumi-700 transition hover:border-shu-300 hover:bg-shu-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                type="submit"
              >
                Salir
              </button>
            </form>
          </div>
          <MainNavigation isMobile />
        </header>

        <main
          className="min-h-screen px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12"
          id="main-content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
