"use server";

import { z } from "zod";
import { ORDER_COMPANIES } from "@/lib/order";

const schema = z.object({
  company: z.enum(ORDER_COMPANIES, { error: "Choose the company you want to order from." }),
  product: z.string().trim().min(2, "Tell us what you need.").max(200),
  quantity: z.string().trim().max(80).optional(),
  name: z.string().trim().min(2, "Your name helps us route the request.").max(120),
  contact: z
    .string()
    .trim()
    .min(5, "A phone number or email so we can reply.")
    .max(160),
  notes: z.string().trim().max(2000).optional(),
});

export type OrderState =
  | { status: "idle" }
  | { status: "ok"; message: string }
  | { status: "error"; message: string; fieldErrors: Partial<Record<keyof z.infer<typeof schema>, string>> };

/**
 * Validates an order request. Delivery (email to the sales desk, or a CRM write) is a
 * go-live item: for the proposal build this returns the validated result and logs it on
 * the server, so the form behaves exactly as it will, without a mailbox behind it yet.
 */
export async function submitOrder(_prev: OrderState, formData: FormData): Promise<OrderState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error);
    const fieldErrors: Record<string, string> = {};
    for (const [k, v] of Object.entries(flat.fieldErrors)) if (v?.[0]) fieldErrors[k] = v[0];
    return { status: "error", message: "Check the highlighted fields.", fieldErrors };
  }
  console.info("[order request]", JSON.stringify(parsed.data));
  return {
    status: "ok",
    message: `Request received for ${parsed.data.company}. The sales desk replies within one working day.`,
  };
}
