"use server";

import { z } from "zod";
import { CONTACT_TOPICS } from "@/lib/contact";

const schema = z.object({
  name: z.string().trim().min(2, "Your name, so we know who to reply to.").max(120),
  organisation: z.string().trim().max(160).optional(),
  contact: z.string().trim().min(5, "A phone number or email so we can reply.").max(160),
  topic: z.enum(CONTACT_TOPICS, { error: "Choose what your message is about." }),
  message: z.string().trim().min(10, "A few words about what you need.").max(3000),
});

export type ContactState =
  | { status: "idle" }
  | { status: "ok"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<keyof z.infer<typeof schema>, string>>;
    };

/**
 * Validates a contact message. Delivery (email to the relevant desk, or a CRM write) is
 * a go-live item: for the proposal build this returns the validated result and logs it on
 * the server, so the form behaves exactly as it will, without a mailbox behind it yet.
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error);
    const fieldErrors: Record<string, string> = {};
    for (const [k, v] of Object.entries(flat.fieldErrors)) if (v?.[0]) fieldErrors[k] = v[0];
    return { status: "error", message: "Check the highlighted fields.", fieldErrors };
  }
  console.info("[contact message]", JSON.stringify(parsed.data));
  return {
    status: "ok",
    message: `Thank you, ${parsed.data.name}. The ${parsed.data.topic.toLowerCase()} desk replies within one working day.`,
  };
}
