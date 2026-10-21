import { World } from "@/components/world/world";
import { WorldChrome } from "@/components/world/world-chrome";
import { SiteNav } from "@/components/site-nav";
import { Glance } from "@/components/sections/glance";
import { Sectors } from "@/components/sections/sectors";
import { Contact } from "@/components/sections/contact";

/**
 * Home = the scroll-world camera flight (docs/SCENARIO.md), then the sections.
 * The engine's stage is fixed and its track ends with one spare viewport, so the sheet
 * of sections sits above the engine's layers (z 70) and pulls up by one viewport to
 * slide over the finale with no empty sky in between. SiteNav appears at #after-world.
 */
export default function HomePage() {
  return (
    <main id="top" className="relative">
      <WorldChrome />
      <SiteNav />
      <World />
      <div id="after-world" className="relative z-[70] -mt-[100dvh]">
        <Glance />
        <Sectors />
        <Contact />
      </div>
    </main>
  );
}
