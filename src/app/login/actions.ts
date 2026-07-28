"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getSupabaseConfig } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

function redirectToLogin(
  kind: "error" | "message",
  code: string,
): never {
  redirect(`/login?${kind}=${encodeURIComponent(code)}`);
}

function readCredentials(formData: FormData) {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const password =
    typeof passwordValue === "string" ? passwordValue : "";

  if (!email || !email.includes("@") || password.length < 6) {
    redirectToLogin("error", "invalidCredentials");
  }

  return { email, password };
}

function readEmail(formData: FormData) {
  const emailValue = formData.get("email");
  const email = typeof emailValue === "string" ? emailValue.trim() : "";

  if (!email || !email.includes("@")) {
    redirectToLogin("error", "invalidEmail");
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
    redirectToLogin("error", "signInFailed");
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
    redirectToLogin("error", "signUpFailed");
  }

  if (data.session) {
    redirect("/");
  }

  redirectToLogin("message", "checkEmail");
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
    redirectToLogin("error", "resendFailed");
  }

  redirectToLogin("message", "resendSuccess");
}

export async function signOut() {
  ensureConfigured();
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
