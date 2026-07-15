"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useCinematic } from "@/components/providers/CinematicProvider";

/** Momentum smooth scroll (native scroll still updates, so useScroll works).
 *  Disabled under reduced-motion / touch. */
export function SmoothScroll() {
  const { reduced, touch } = useCinematic();

  useEffect(() => {
    if (reduced || touch) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [reduced, touch]);

  return null;
}
