import { useEffect, useRef, useState } from "react";
import { STEPS } from "../config.js";

const LERP = 0.1;

function clamp01(n) {
  return Math.min(1, Math.max(0, n));
}

function sectionProgress(node) {
  const rect = node.getBoundingClientRect();
  const vh = window.innerHeight;
  const start = vh * 0.95;
  let end = Math.max(vh * 0.25, 96);

  if (rect.height > vh) {
    const lastCard = node.querySelector(".approach-step:last-child");
    if (lastCard) {
      const lastOffset = lastCard.getBoundingClientRect().top - rect.top;
      end = vh * 0.55 - lastOffset;
    }
  }

  return clamp01((start - rect.top) / Math.max(start - end, 1));
}

export default function Approach() {
  const ref = useRef(null);
  const displayRef = useRef(0);
  const [flow, setFlow] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const readTarget = () => sectionProgress(node);

    if (prefersReduced) {
      const snap = () => {
        const next = readTarget() >= 0.5 ? 1 : 0;
        displayRef.current = next;
        setFlow(next);
      };
      snap();
      window.addEventListener("scroll", snap, { passive: true });
      window.addEventListener("resize", snap);
      return () => {
        window.removeEventListener("scroll", snap);
        window.removeEventListener("resize", snap);
      };
    }

    let frame = 0;
    let target = readTarget();
    const onScroll = () => {
      target = readTarget();
    };

    const tick = () => {
      target = readTarget();
      const current = displayRef.current;
      const next = current + (target - current) * LERP;
      const settled = Math.abs(target - next) < 0.001 ? target : next;
      if (settled !== current) {
        displayRef.current = settled;
        setFlow(settled);
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="approach" className="section" ref={ref}>
      <div className="wrap">
        <p className="section-kicker">How we teach</p>
        <h2 className="display mt-3 max-w-xl text-[1.85rem] font-semibold sm:text-4xl">
          Five steps. One clear path.
        </h2>
        <div
          className="approach-path mt-8"
          style={{ "--flow": String(flow) }}
        >
          <div className="approach-rail" aria-hidden="true">
            <span className="approach-rail-draw" />
          </div>
          {STEPS.map((step, i) => {
            const threshold = (i + 0.22) / STEPS.length;
            const on = flow >= threshold;
            return (
              <article
                key={step.n}
                className={`approach-step ${on ? "is-in" : ""}`}
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
