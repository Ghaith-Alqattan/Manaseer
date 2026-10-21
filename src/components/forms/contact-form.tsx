"use client";

import { useActionState, useId } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { CONTACT_TOPICS } from "@/lib/contact";
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle" };

const field =
  "w-full rounded-sm border border-line bg-bg/70 px-4 py-3 text-base text-fg placeholder:text-fg-muted/70 backdrop-blur-sm focus-visible:border-ring";
const label = "mb-2 block text-sm font-medium text-fg";
const error = "mt-2 text-sm text-cyan-300";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const id = useId();
  const errs = state.status === "error" ? state.fieldErrors : {};

  if (state.status === "ok") {
    return (
      <div role="status" aria-live="polite" className="rounded-sm bg-bg-elevated/80 p-8 backdrop-blur-md">
        <p className="font-display text-2xl font-bold">Message received.</p>
        <p className="mt-3 text-fg-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="rounded-sm bg-bg-elevated/80 p-6 backdrop-blur-md md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={label}>
            Your name <span aria-hidden className="text-accent">*</span>
          </label>
          <input id={`${id}-name`} name="name" type="text" required autoComplete="name" aria-invalid={!!errs.name} className={field} />
          {errs.name && <p className={error}>{errs.name}</p>}
        </div>

        <div>
          <label htmlFor={`${id}-org`} className={label}>
            Organisation
          </label>
          <input id={`${id}-org`} name="organisation" type="text" autoComplete="organization" className={field} />
        </div>

        <div>
          <label htmlFor={`${id}-contact`} className={label}>
            Phone or email <span aria-hidden className="text-accent">*</span>
          </label>
          <input id={`${id}-contact`} name="contact" type="text" required autoComplete="tel email" aria-invalid={!!errs.contact} className={field} />
          {errs.contact && <p className={error}>{errs.contact}</p>}
        </div>

        <div>
          <label htmlFor={`${id}-topic`} className={label}>
            About <span aria-hidden className="text-accent">*</span>
          </label>
          <select id={`${id}-topic`} name="topic" required defaultValue="General enquiry" aria-invalid={!!errs.topic} className={cn(field, "appearance-none")}>
            {CONTACT_TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errs.topic && <p className={error}>{errs.topic}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor={`${id}-message`} className={label}>
            Message <span aria-hidden className="text-accent">*</span>
          </label>
          <textarea id={`${id}-message`} name="message" rows={4} required aria-invalid={!!errs.message} placeholder="What you need, where, and when" className={field} />
          {errs.message && <p className={error}>{errs.message}</p>}
        </div>
      </div>

      {state.status === "error" && (
        <p role="alert" className="mt-5 text-sm text-cyan-300">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-sm bg-white px-6 font-display text-base font-bold text-navy-900 transition-colors hover:bg-cyan-100 disabled:cursor-wait disabled:opacity-60 md:w-auto"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
