import "client-only";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/**
 * Single registration point for GSAP. Import { gsap, ScrollTrigger, SplitText, useGSAP }
 * from here in client components only, never from "gsap" directly, so plugins are
 * registered exactly once and defaults stay consistent across the site.
 */
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

gsap.defaults({ ease: "power3.out", duration: 1 });

ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText, useGSAP };
