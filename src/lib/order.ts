/** Companies offered in the Order now flow, as listed in the current site's order modal. */
export const ORDER_COMPANIES = [
  "Crushers",
  "Cement",
  "Ready Mix",
  "Concrete",
  "Carbonate",
  "Magnesia",
  "Fertilizers",
  "Trade",
  "Machinery",
  "Transport",
  "IT",
] as const;

export type OrderCompany = (typeof ORDER_COMPANIES)[number];
