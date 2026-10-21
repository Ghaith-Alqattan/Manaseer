"use client";

import { useActionState, useId } from "react";
import { submitOrder, type OrderState } from "@/app/actions/order";
import { ORDER_COMPANIES } from "@/lib/order";
import { cn } from "@/lib/utils";

const initial: OrderState = { status: "idle" };

const field =
  "w-full rounded-sm border border-line bg-bg px-4 py-3 text-base text-fg placeholder:text-fg-muted/70 focus-visible:border-ring";
const label = "mb-2 block text-sm font-medium text-fg";
const error = "mt-2 text-sm text-cyan-300";

/** The B2B "Order now" entry point from the current site, rebuilt as a proper form. */
export function OrderForm() {
  const [state, action, pending] = useActionState(submitOrder, initial);
  const id = useId();
  const errs = state.status === "error" ? state.fieldErrors : {};

  if (state.status === "ok") {
    return (
      <div role="status" aria-live="polite" className="rounded-sm bg-bg-elevated p-8">
        <p className="font-display text-2xl font-bold">Request received.</p>
        <p className="mt-3 text-fg-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="rounded-sm bg-bg-elevated p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor={`${id}-company`} className={label}>
            Company <span aria-hidden className="text-accent">*</span>
          </label>
          <select
            id={`${id}-company`}
            name="company"
            required
            defaultValue=""
            aria-invalid={!!errs.company}
            className={cn(field, "appearance-none")}
          >
            <option value="" disabled>
              Choose a company
            </option>
            {ORDER_COMPANIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errs.company && <p className={error}>{errs.company}</p>}
        </div>

        <div>
          <label htmlFor={`${id}-product`} className={label}>
            Product <span aria-hidden className="text-accent">*</span>
          </label>
          <input
            id={`${id}-product`}
            name="product"
            type="text"
            required
            placeholder="e.g. Ready-mix C30, 0-5 mm aggregate"
            aria-invalid={!!errs.product}
            className={field}
          />
          {errs.product && <p className={error}>{errs.product}</p>}
        </div>

        <div>
          <label htmlFor={`${id}-quantity`} className={label}>
            Quantity
          </label>
          <input
            id={`${id}-quantity`}
            name="quantity"
            type="text"
            inputMode="decimal"
            placeholder="e.g. 120 m³ per week"
            className={field}
          />
        </div>

        <div>
          <label htmlFor={`${id}-name`} className={label}>
            Your name <span aria-hidden className="text-accent">*</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={!!errs.name}
            className={field}
          />
          {errs.name && <p className={error}>{errs.name}</p>}
        </div>

        <div>
          <label htmlFor={`${id}-contact`} className={label}>
            Phone or email <span aria-hidden className="text-accent">*</span>
          </label>
          <input
            id={`${id}-contact`}
            name="contact"
            type="text"
            required
            autoComplete="tel email"
            aria-invalid={!!errs.contact}
            className={field}
          />
          {errs.contact && <p className={error}>{errs.contact}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor={`${id}-notes`} className={label}>
            Notes
          </label>
          <textarea
            id={`${id}-notes`}
            name="notes"
            rows={3}
            placeholder="Delivery site, timing, specifications"
            className={field}
          />
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
        className="mt-6 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-sm bg-primary px-6 font-display text-base font-bold text-primary-fg transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60 md:w-auto"
      >
        {pending ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
