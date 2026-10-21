import { FacebookLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/brand/logo";
import { ContactForm } from "@/components/forms/contact-form";
import { Rise } from "@/components/motion/rise";
import { FanBackdrop } from "@/components/three/fan-backdrop";
import { SOCIAL_LINKS } from "@/lib/contact";
import { brand } from "@/lib/brand";

const telHref = `tel:${brand.contact.phone.replace(/[^\d+]/g, "")}`;
/** Static so the route stays fully prerendered (Cache Components forbids Date() here). */
const COPYRIGHT_YEAR = 2026;

const ICONS = {
  Facebook: FacebookLogo,
  Instagram: InstagramLogo,
  LinkedIn: LinkedinLogo,
} as const;

/** Contact details, the message form, socials and footer, over the 3D pinwheel backdrop. */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="theme-dark relative isolate bg-bg text-fg"
    >
      <FanBackdrop trigger="#contact" />
      <div className="container-site pt-28 pb-10 md:pt-40 md:pb-12">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-24">
          <Rise>
            <p data-rise className="eyebrow mb-6">
              Contact us
            </p>
            <h2
              data-rise
              id="contact-title"
              className="font-display text-[clamp(2.25rem,5.2vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.02em]"
            >
              Building
              <br />
              with you.
            </h2>
            <address data-rise className="mt-12 space-y-7 not-italic text-base leading-relaxed md:text-lg">
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
          </Rise>

          <Rise start="top 80%">
            <div data-rise>
              <h3 className="mb-6 font-display text-2xl font-bold">Send us a message</h3>
              <ContactForm />
            </div>
          </Rise>
        </div>

        <footer className="mt-14 flex flex-col gap-6 border-t border-line pt-6 text-sm text-fg-muted md:flex-row md:items-center md:justify-between">
          <Logo variant="white" className="w-32" />
          <ul className="flex items-center gap-5" aria-label="Manaseer Group on social media">
            {SOCIAL_LINKS.map((s) => {
              const Icon = ICONS[s.name];
              return (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Manaseer Group on ${s.name}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon size={22} weight="regular" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
          <p>
            &copy; {COPYRIGHT_YEAR} {brand.name}. {brand.tagline}.
          </p>
        </footer>
      </div>
    </section>
  );
}
