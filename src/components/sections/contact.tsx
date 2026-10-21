import { Logo } from "@/components/brand/logo";
import { OrderForm } from "@/components/forms/order-form";
import { brand } from "@/lib/brand";

const telHref = `tel:${brand.contact.phone.replace(/[^\d+]/g, "")}`;
/** Static so the route stays fully prerendered (Cache Components forbids Date() here). */
const COPYRIGHT_YEAR = 2026;

/** Contact details from the current site, the Order now entry point, and the footer. */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="theme-dark bg-bg text-fg"
    >
      <div className="container-site py-28 md:py-40">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-24">
          <div>
            <p className="eyebrow mb-6">Talk to us</p>
            <h2
              id="contact-title"
              className="font-display text-[clamp(2.25rem,5.2vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.02em]"
            >
              Building
              <br />
              with you.
            </h2>
            <address className="mt-12 space-y-7 not-italic text-base leading-relaxed md:text-lg">
              <div>
                <p className="mb-1 text-sm font-medium uppercase tracking-[0.16em] text-fg-muted">
                  Head office
                </p>
                <p>
                  8th Circle, King Abdullah II St 302
                  <br />
                  P.O. Box 925988, Amman 11110, Jordan
                </p>
              </div>
              <div>
                <p className="mb-1 text-sm font-medium uppercase tracking-[0.16em] text-fg-muted">
                  Phone
                </p>
                <a href={telHref} className="underline-offset-4 hover:underline">
                  {brand.contact.phone}
                </a>
                <p className="text-fg-muted">Fax {brand.contact.fax}</p>
              </div>
              <div>
                <p className="mb-1 text-sm font-medium uppercase tracking-[0.16em] text-fg-muted">
                  Email
                </p>
                <a href={`mailto:${brand.contact.email}`} className="underline-offset-4 hover:underline">
                  {brand.contact.email}
                </a>
              </div>
            </address>
          </div>

          <div>
            <h3 className="mb-6 font-display text-2xl font-bold">Order now</h3>
            <OrderForm />
          </div>
        </div>

        <footer className="mt-28 flex flex-col gap-6 border-t border-line pt-8 text-sm text-fg-muted md:flex-row md:items-center md:justify-between">
          <Logo variant="white" className="w-32" />
          <p>
            &copy; {COPYRIGHT_YEAR} {brand.name}. {brand.tagline}.
          </p>
        </footer>
      </div>
    </section>
  );
}
