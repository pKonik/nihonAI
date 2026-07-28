import Link from "next/link";

import { signOut } from "@/app/login/actions";
import { MainNavigation } from "@/components/navigation/MainNavigation";

type AppShellProps = {
  children: React.ReactNode;
  email: string;
};

function AccountControls({ email }: { email: string }) {
  return (
    <div className="border-t border-slate-200 pt-5">
      <p className="truncate text-sm text-slate-600" title={email}>
        {email}
      </p>
      <form action={signOut} className="mt-3">
        <button
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-red-300 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
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
    <div className="min-h-screen lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <a
        className="sr-only z-50 rounded-lg bg-white px-4 py-2 font-semibold text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#main-content"
      >
        Saltar al contenido
      </a>

      <aside className="hidden border-r border-slate-200 bg-white px-5 py-7 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <Link
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
          href="/"
        >
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            日本語を学ぶ
          </span>
          <span className="mt-2 block text-2xl font-bold tracking-tight text-slate-950">
            NihonAI
          </span>
        </Link>

        <div className="mt-10 flex-1">
          <MainNavigation />
        </div>

        <AccountControls email={email} />
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link
              className="rounded-md text-xl font-bold tracking-tight text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
              href="/"
            >
              NihonAI
            </Link>
            <form action={signOut}>
              <button
                aria-label={`Cerrar sesión de ${email}`}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-red-300 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
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
