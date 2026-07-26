import { getSupabaseConfig } from "@/lib/supabase/env";
import {
  resendConfirmation,
  signIn,
  signUp,
} from "@/app/login/actions";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
    setup?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;
  const isConfigured = Boolean(getSupabaseConfig());
  const error = params.error;
  const message = params.message;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
          日本語を学ぶ
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Accede a NihonAI
        </h1>
        <p className="mt-3 leading-7 text-slate-600">
          Tu cuenta separará y protegerá el vocabulario que guardaremos en
          Supabase durante la siguiente fase.
        </p>

        {!isConfigured ? (
          <div
            className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"
            role="status"
          >
            <p className="font-semibold">Supabase todavía no está configurado.</p>
            <p className="mt-2">
              Copia <code>.env.example</code> como <code>.env.local</code> y
              reemplaza los valores de ejemplo con la URL y la clave publicable
              de tu proyecto.
            </p>
          </div>
        ) : (
          <>
            <form className="mt-8 space-y-5" action={signIn}>
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-800"
                  htmlFor="email"
                >
                  Correo electrónico
                </label>
                <input
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-red-600 focus:ring-3 focus:ring-red-100"
                  id="email"
                  name="email"
                  placeholder=""
                  required
                  type="email"
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-800"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-red-600 focus:ring-3 focus:ring-red-100"
                  id="password"
                  minLength={6}
                  name="password"
                  required
                  type="password"
                />
              </div>

              {error ? (
                <p
                  className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              {message ? (
                <p
                  className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                  role="status"
                >
                  {message}
                </p>
              ) : null}

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  className="rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                  type="submit"
                >
                  Iniciar sesión
                </button>
                <button
                  className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-800 transition hover:border-red-300 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                  formAction={signUp}
                  type="submit"
                >
                  Crear cuenta
                </button>
              </div>
            </form>

            <details className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-800">
                ¿No recibiste la confirmación?
              </summary>
              <form className="mt-4 space-y-3" action={resendConfirmation}>
                <label
                  className="block text-sm font-medium text-slate-700"
                  htmlFor="resend-email"
                >
                  Correo de la cuenta pendiente
                </label>
                <input
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none placeholder:text-slate-400 focus:border-red-600 focus:ring-3 focus:ring-red-100"
                  id="resend-email"
                  name="email"
                  required
                  type="email"
                />
                <button
                  className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:border-red-300 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                  type="submit"
                >
                  Reenviar confirmación
                </button>
              </form>
            </details>
          </>
        )}
      </section>
    </main>
  );
}
