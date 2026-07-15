"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CinematicValue = {
  /** user prefers reduced motion */
  reduced: boolean;
  /** coarse pointer / touch device */
  touch: boolean;
  /** safe to run the heavy cinematic layer (desktop + motion ok) */
  cinematic: boolean;
  /** safe to run the curated, cheap mobile motion layer (touch + motion ok) */
  mobileMotion: boolean;
};

const Ctx = createContext<CinematicValue | null>(null);

export function CinematicProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);
  const [touch, setTouch] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    const setFlags = () => {
      setReduced(mqReduce.matches);
      setTouch(mqCoarse.matches);
    };
    setFlags();
    setReady(true);
    mqReduce.addEventListener("change", setFlags);
    mqCoarse.addEventListener("change", setFlags);
    return () => {
      mqReduce.removeEventListener("change", setFlags);
      mqCoarse.removeEventListener("change", setFlags);
    };
  }, []);

  const value = useMemo<CinematicValue>(
    () => ({
      reduced,
      touch,
      cinematic: ready && !reduced && !touch,
      mobileMotion: ready && touch && !reduced,
    }),
    [reduced, touch, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCinematic(): CinematicValue {
  const ctx = useContext(Ctx);
  if (!ctx)
    return { reduced: true, touch: true, cinematic: false, mobileMotion: false };
  return ctx;
}
