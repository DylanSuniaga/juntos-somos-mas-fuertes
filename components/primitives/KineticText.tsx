"use client";

import { Fragment, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const word: Variants = {
  hidden: { y: 22, opacity: 0, filter: "blur(6px)" },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Splits a heading into words that rise + unblur into place, staggered.
 * `play: "view"` animates on scroll-into-view. Uses a persistent `animate`
 * (not whileInView) so words that mount AFTER the in-view trigger — e.g. when
 * the language toggle swaps in a longer string — still inherit "show".
 */
export function KineticText({
  text,
  play = "view",
  stagger = 0.08,
  className = "",
}: {
  text: string;
  play?: "view" | boolean;
  stagger?: number;
  className?: string;
}) {
  const words = text.split(" ");
  const viewMode = play === "view";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  const state = viewMode
    ? inView
      ? "show"
      : "hidden"
    : play
      ? "show"
      : "hidden";

  return (
    <motion.span
      ref={ref}
      className={`inline ${className}`}
      variants={container}
      custom={stagger}
      initial="hidden"
      animate={state}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </motion.span>
  );
}
