import { Counter } from "@/components/motion/counter";
import { brand } from "@/lib/brand";

/**
 * The group's scale as one running sentence, not four stat tiles. The numbers count up
 * as they enter the viewport; 1999 is a date and stays put. Sits on the same navy as the
 * world's sky so the sheet that slides over the finale reads as one surface.
 */
export function Glance() {
  const num = "font-display font-bold text-accent tabular-nums";
  return (
    <section
      id="glance"
      aria-labelledby="glance-title"
      className="theme-dark bg-bg text-fg"
    >
      <div className="container-site py-28 md:py-40">
        <p className="eyebrow mb-8">Based in Amman, with global outreach</p>
        <h2 id="glance-title" className="sr-only">
          Manaseer Group at a glance
        </h2>
        <p className="max-w-5xl font-display text-[clamp(1.85rem,4.3vw,4.25rem)] font-light leading-[1.12] tracking-[-0.01em] text-fg">
          Since <span className={num}>{brand.founded}</span>, Manaseer Group has grown from
          fifteen people selling fertilizer into{" "}
          <Counter to={20} suffix="+" className={num} /> companies,{" "}
          <Counter to={10000} className={num} /> people and{" "}
          <Counter to={3} prefix="USD " suffix=" billion" className={num} /> invested across{" "}
          <Counter to={6} className={num} /> strategic sectors of Jordan&rsquo;s economy.
        </p>
        <p className="mt-10 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
          Partnerships with three of the largest companies in Jordan. Market leader in building
          materials, with operations reaching from quarry floors to fuel forecourts.
        </p>
      </div>
    </section>
  );
}
