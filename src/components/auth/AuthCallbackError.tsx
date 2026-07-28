"use client";

import { useEffect, useState } from "react";

type AuthNotice = {
  title: string;
  description: string;
};

function readAuthNotice(): AuthNotice | null {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const errorCode = params.get("error_code");

  if (!params.get("error") && !errorCode) {
    return null;
  }

  if (errorCode === "otp_expired") {
    return {
      title: "El enlace ya no está disponible",
      description:
        "El enlace venció o ya fue utilizado. Solicita un correo nuevo desde la pantalla de acceso.",
    };
  }

  return {
    title: "No se pudo completar la confirmación",
    description:
      "El enlace no es válido. Puedes solicitar uno nuevo desde la pantalla de acceso.",
  };
}

export function AuthCallbackError() {
  const [notice, setNotice] = useState<AuthNotice | null>(null);

  useEffect(() => {
    const authNotice = readAuthNotice();

    if (!authNotice) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setNotice(authNotice);
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!notice) {
    return null;
  }

  return (
    <aside
      className="fixed inset-x-4 top-4 z-50 mx-auto max-w-xl rounded-2xl border border-red-200 bg-washi-50 p-4 shadow-lg"
      role="alert"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-red-800">{notice.title}</p>
          <p className="mt-1 text-sm leading-6 text-sumi-600">
            {notice.description}
          </p>
        </div>
        <button
          aria-label="Cerrar aviso"
          className="rounded-lg px-2 py-1 text-sm font-semibold text-sumi-500 transition hover:bg-washi-100 hover:text-sumi-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          onClick={() => setNotice(null)}
          type="button"
        >
          Cerrar
        </button>
      </div>
    </aside>
  );
}
