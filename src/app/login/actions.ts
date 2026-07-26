"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getSupabaseConfig } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

function readCredentials(formData: FormData) {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const password =
    typeof passwordValue === "string" ? passwordValue : "";

  if (!email || !email.includes("@") || password.length < 6) {
    redirect(
      "/login?error=Escribe un correo válido y una contraseña de al menos 6 caracteres.",
    );
  }

  return { email, password };
}

function readEmail(formData: FormData) {
  const emailValue = formData.get("email");
  const email = typeof emailValue === "string" ? emailValue.trim() : "";

  if (!email || !email.includes("@")) {
    redirect("/login?error=Escribe un correo válido.");
  }

  return email;
}

function ensureConfigured() {
  if (!getSupabaseConfig()) {
    redirect("/login?setup=missing");
  }
}

export async function signIn(formData: FormData) {
  ensureConfigured();
  const credentials = readCredentials(formData);
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    redirect("/login?error=No se pudo iniciar sesión. Revisa tus datos.");
  }

  redirect("/");
}

export async function signUp(formData: FormData) {
  ensureConfigured();
  const credentials = readCredentials(formData);
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    ...credentials,
    options: origin
      ? { emailRedirectTo: `${origin}/auth/confirm` }
      : undefined,
  });

  if (error) {
    redirect("/login?error=No se pudo crear la cuenta.");
  }

  if (data.session) {
    redirect("/");
  }

  redirect(
    "/login?message=Revisa tu correo para confirmar la cuenta antes de iniciar sesión.",
  );
}

export async function resendConfirmation(formData: FormData) {
  ensureConfigured();
  const email = readEmail(formData);
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: origin
      ? { emailRedirectTo: `${origin}/auth/confirm` }
      : undefined,
  });

  if (error) {
    redirect(
      "/login?error=No se pudo reenviar la confirmación. Espera un momento e inténtalo de nuevo.",
    );
  }

  redirect(
    "/login?message=Si existe una cuenta pendiente para ese correo, recibirás un enlace de confirmación nuevo.",
  );
}

export async function signOut() {
  ensureConfigured();
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
