import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  
  // Configure GSAP
  gsap.config({
    nullTargetWarn: false,
  });
}

export { gsap, ScrollTrigger };