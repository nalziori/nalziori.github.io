"use client";

import { animate, LazyMotion, domAnimation, m, MotionConfig, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

/** Fade + 14px rise, once, when the block enters the viewport. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

const SINGLE_NUMBER = /^(\D*)(\d[\d,]*(?:\.\d+)?)(\D*)$/;

/**
 * Counts up a single number ("93.33%", "31,796", "$0.75") as it scrolls into view.
 * The DOM always holds the real value until the moment the number reaches the viewport edge,
 * screen readers get a static copy, and values already on screen or with reduced motion never animate.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const animatable = SINGLE_NUMBER.test(value);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(SINGLE_NUMBER);
    if (!el || !match || reduce || el.getBoundingClientRect().top < window.innerHeight) return;

    const [, pre, num, post] = match;
    const target = Number(num.replace(/,/g, ""));
    const decimals = num.split(".")[1]?.length ?? 0;
    const format = (v: number) =>
      pre + v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: num.includes(",") }) + post;

    let controls: ReturnType<typeof animate> | undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      el.textContent = format(0);
      controls = animate(0, target, { duration: 1.1, ease: "easeOut", onUpdate: (v) => (el.textContent = format(v)) });
    });
    io.observe(el);
    return () => {
      io.disconnect();
      controls?.stop();
      el.textContent = value;
    };
  }, [value, reduce]);

  if (!animatable) return <>{value}</>;
  return (
    <>
      <span ref={ref} aria-hidden>
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
