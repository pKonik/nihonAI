"use client";

import { useActionState } from "react";

import {
  removeAvatarAction,
  updateDisplayNameAction,
  uploadAvatarAction,
} from "@/app/account/actions";
import { UserAvatar } from "@/components/account/UserAvatar";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { AccountActionState } from "@/types/account";

const initialState: AccountActionState = { status: "idle" };

function Feedback({ state }: { state: AccountActionState }) {
  if (!state.message) return null;

  return (
    <p
      aria-live="polite"
      className={
        state.status === "success"
          ? "mt-3 text-sm font-medium text-sumi-700"
          : "mt-3 text-sm font-medium text-red-700"
      }
      role={state.status === "error" ? "alert" : "status"}
    >
      {state.message}
    </p>
  );
}

export function AccountForms({
  avatarVersion,
  displayName,
  hasAvatar,
  text,
}: {
  avatarVersion: string;
  displayName: string;
  hasAvatar: boolean;
  text: Dictionary["account"];
}) {
  const [nameState, nameAction, namePending] = useActionState(
    updateDisplayNameAction,
    initialState,
  );
  const [avatarState, avatarAction, avatarPending] = useActionState(
    uploadAvatarAction,
    initialState,
  );
  const [removeState, removeAction, removePending] = useActionState(
    removeAvatarAction,
    initialState,
  );

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="rounded-2xl border border-washi-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-shu-600">
          {text.profileEyebrow}
        </p>
        <h2 className="mt-2 text-xl font-bold text-sumi-950">
          {text.nameTitle}
        </h2>
        <p className="mt-2 text-sm leading-6 text-sumi-600">
          {text.nameDescription}
        </p>

        <form
          action={nameAction}
          className="group/form mt-6"
          onSubmit={(event) => {
            if (namePending) event.preventDefault();
          }}
        >
          <label
            className="block text-sm font-semibold text-sumi-800"
            htmlFor="displayName"
          >
            {text.displayName}
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-washi-300 bg-white px-4 py-3 text-sumi-950 outline-none transition placeholder:text-sumi-500 focus:border-shu-500 focus:ring-2 focus:ring-shu-100"
            defaultValue={displayName}
            disabled={namePending}
            id="displayName"
            maxLength={50}
            name="displayName"
            required
          />
          <p className="mt-2 text-xs text-sumi-500">
            {text.nameHelp}
          </p>
          <div className="mt-5">
            <button
              className="rounded-xl bg-sumi-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sumi-800 disabled:cursor-wait disabled:opacity-60"
              disabled={namePending}
              type="submit"
            >
              {namePending ? text.saving : text.saveName}
            </button>
          </div>
          <Feedback state={nameState} />
        </form>
      </section>

      <section className="rounded-2xl border border-washi-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <UserAvatar
            alt={text.avatarAlt.replace("{name}", displayName)}
            avatarVersion={avatarVersion}
            displayName={displayName}
            hasAvatar={hasAvatar}
            size="large"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-shu-600">
              {text.photoEyebrow}
            </p>
            <h2 className="mt-2 text-xl font-bold text-sumi-950">
              {text.photoTitle}
            </h2>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-sumi-600">
          {text.photoDescription}
        </p>

        <form action={avatarAction} className="mt-5">
          <label
            className="block text-sm font-semibold text-sumi-800"
            htmlFor="avatar"
          >
            {text.choosePhoto}
          </label>
          <input
            accept="image/jpeg,image/png,image/webp"
            className="mt-2 block w-full text-sm text-sumi-600 file:mr-4 file:rounded-lg file:border-0 file:bg-washi-100 file:px-4 file:py-2.5 file:font-semibold file:text-sumi-800 hover:file:bg-washi-200"
            disabled={avatarPending}
            id="avatar"
            name="avatar"
            required
            type="file"
          />
          <p className="mt-2 text-xs text-sumi-500">
            {text.photoHelp}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              className="rounded-xl bg-sumi-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sumi-800 disabled:cursor-wait disabled:opacity-60"
              disabled={avatarPending}
              type="submit"
            >
              {avatarPending ? text.uploading : text.uploadPhoto}
            </button>
          </div>
          <Feedback state={avatarState} />
        </form>

        {hasAvatar ? (
          <form action={removeAction} className="mt-3">
            <button
              className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
              disabled={removePending}
              type="submit"
            >
              {removePending ? text.removing : text.removePhoto}
            </button>
            <Feedback state={removeState} />
          </form>
        ) : null}
      </section>
    </div>
  );
}
