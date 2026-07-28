"use server";

import "server-only";

import { revalidatePath } from "next/cache";

import {
  AccountAuthenticationError,
  completeOnboarding,
} from "@/lib/account/data";
import { getI18n } from "@/lib/i18n/server";

export type CompleteOnboardingResult = {
  success: boolean;
  message?: string;
};

export async function completeOnboardingAction(): Promise<CompleteOnboardingResult> {
  const { dictionary } = await getI18n();

  try {
    await completeOnboarding();
    revalidatePath("/inicio");
    return { success: true };
  } catch (error) {
    console.error("No se pudo completar la bienvenida.", error);
    return {
      success: false,
      message:
        error instanceof AccountAuthenticationError
          ? dictionary.onboarding.authExpired
          : dictionary.onboarding.saveFailed,
    };
  }
}
