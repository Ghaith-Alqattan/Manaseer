/** What a visitor can write to the group about. Sectors first, then the usual desks. */
export const CONTACT_TOPICS = [
  "General enquiry",
  "Building Materials",
  "Industrial Minerals",
  "Life Sciences",
  "Energy & Mobility",
  "Commercial Services",
  "Partnerships",
  "Careers",
  "Media",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

/** Verified official accounts (2026-10-22). No confirmed X or YouTube account was found. */
export const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://www.facebook.com/ManaseerG/" },
  { name: "Instagram", href: "https://www.instagram.com/manaseerg/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/manaseer-group" },
] as const;
