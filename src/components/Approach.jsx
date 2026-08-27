import { useEffect, useRef, useState } from "react";
import { STEPS } from "../config.js";

const STAGGER_MS = 150;

export default function Approach() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReduced = mq.matches;
    setReduced(prefersReduced);

    if (prefersReduced) {
      setSeen(true);
      setLit(STEPS.length);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen || reduced) return undefined;
    setLit(0);
    const timers = STEPS.map((_, i) =>
      window.setTimeout(() => setLit(i + 1), i * STAGGER_MS)
    );
    return () => timers.forEach(clearTimeout);
  }, [seen, reduced]);

  return (
    <section id="approach" className="section" ref={ref}>
      <div className="wrap">
        <p className="section-kicker">How we teach</p>
        <h2 className="display mt-3 max-w-xl text-[1.85rem] font-semibold sm:text-4xl">
          Five steps. One clear path.
        </h2>
        <div className={`approach-path mt-8 ${seen ? "is-flow" : ""}`}>
          <div className="approach-rail" aria-hidden="true">
            <span className="approach-rail-draw" />
          </div>
          {STEPS.map((step, i) => {
            const on = lit > i;
            return (
              <article
                key={step.n}
                className="approach-step"
                style={{ "--i": i }}
              >
                <div className={`approach-node ${on ? "is-on" : ""}`}>
                  <span className="display text-lg font-semibold leading-none">{step.n}</span>
                </div>
                <div className="panel panel-hover p-4 sm:p-5">
                  <h3 className="font-semibold text-navy">{step.title}</h3>
                  <p className="mt-1 text-sm text-navy/75">{step.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
