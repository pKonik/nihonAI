import { getSupabaseConfig } from "@/lib/supabase/env";
import {
  resendConfirmation,
  signIn,
  signUp,
} from "@/app/login/actions";
import { BrandLogo } from "@/components/brand/BrandLogo";

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
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-washi-200 bg-washi-50 shadow-xl shadow-sumi-950/5 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="hidden bg-sumi-950 p-10 lg:flex lg:flex-col lg:justify-between">
          <BrandLogo inverted />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-300">
              日本語を、自分のペースで。
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-washi-50">
              Aprende desde lo que lees, escuchas y descubres.
            </h2>
            <p className="mt-5 leading-7 text-washi-300">
              Una colección personal para convertir cada palabra nueva en una
              oportunidad de aprendizaje.
            </p>
          </div>
        </aside>

        <section className="p-6 sm:p-10">
          <div className="mb-8 lg:hidden">
            <BrandLogo />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shu-600">
            Bienvenido
          </p>
          <h1 className="mt-3 text-3xl font-bold text-sumi-950">
            Accede a tu espacio
          </h1>
          <p className="mt-3 leading-7 text-sumi-600">
            Tu cuenta separa y protege el vocabulario que guardas en NihonAI.
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
                  className="mb-2 block text-sm font-medium text-sumi-800"
                  htmlFor="email"
                >
                  Correo electrónico
                </label>
                <input
                  autoComplete="email"
                  className="w-full rounded-xl border border-washi-300 bg-white px-4 py-3 text-sumi-950 outline-none placeholder:text-sumi-500 focus:border-shu-600 focus:ring-3 focus:ring-shu-100"
                  id="email"
                  name="email"
                  placeholder=""
                  required
                  type="email"
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-sumi-800"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-washi-300 bg-white px-4 py-3 text-sumi-950 outline-none placeholder:text-sumi-500 focus:border-shu-600 focus:ring-3 focus:ring-shu-100"
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
                  className="rounded-xl bg-sumi-950 px-5 py-3 font-semibold text-washi-50 transition hover:bg-shu-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                  type="submit"
                >
                  Iniciar sesión
                </button>
                <button
                  className="rounded-xl border border-washi-300 px-5 py-3 font-semibold text-sumi-800 transition hover:border-shu-300 hover:bg-shu-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                  formAction={signUp}
                  type="submit"
                >
                  Crear cuenta
                </button>
              </div>
            </form>

            <details className="mt-6 rounded-2xl border border-washi-200 bg-washi-100 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-sumi-800">
                ¿No recibiste la confirmación?
              </summary>
              <form className="mt-4 space-y-3" action={resendConfirmation}>
                <label
                  className="block text-sm font-medium text-sumi-700"
                  htmlFor="resend-email"
                >
                  Correo de la cuenta pendiente
                </label>
                <input
                  autoComplete="email"
                  className="w-full rounded-xl border border-washi-300 bg-white px-4 py-3 text-sumi-950 outline-none placeholder:text-sumi-500 focus:border-shu-600 focus:ring-3 focus:ring-shu-100"
                  id="resend-email"
                  name="email"
                  required
                  type="email"
                />
                <button
                  className="w-full rounded-xl border border-washi-300 bg-white px-5 py-3 font-semibold text-sumi-800 transition hover:border-shu-300 hover:bg-shu-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                  type="submit"
                >
                  Reenviar confirmación
                </button>
              </form>
            </details>
          </>
        )}
        </section>
      </div>
    </main>
  );
}
