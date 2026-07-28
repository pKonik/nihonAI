export type AccountProfile = {
  displayName: string | null;
  avatarPath: string | null;
  onboardingCompletedAt: string | null;
  updatedAt: string;
};

export type AccountOverview = AccountProfile & {
  email: string;
  joinedAt: string;
  vocabularyCount: number;
};

export type AccountActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};
