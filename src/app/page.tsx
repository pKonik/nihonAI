export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
          日本語を学ぶ
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          NihonAI
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Un espacio personal para guardar y organizar lo que aprendes durante
          tu estudio del japonés.
        </p>

        <div className="mt-10 rounded-2xl bg-slate-50 p-6">
          <p className="font-semibold text-slate-900">
            Fase 1: configuración completada
          </p>
          <p className="mt-2 leading-7 text-slate-600">
            Next.js, React, TypeScript y Tailwind CSS ya están conectados. El
            formulario de vocabulario llegará en la siguiente fase.
          </p>
        </div>
      </section>
    </main>
  );
}
