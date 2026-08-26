import { useEffect, useRef, useState } from "react";
import CountUp from "./CountUp.jsx";
import { STEPS } from "../config.js";

export default function Approach() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setSeen(true);
    }, { threshold: 0.25 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section id="approach" className="section" ref={ref}>
      <div className="wrap">
        <p className="section-kicker">How we teach</p>
        <h2 className="display mt-3 max-w-xl text-[1.85rem] font-semibold sm:text-4xl">
          Five steps. One clear path.
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step) => (
            <article key={step.n} className="panel panel-hover p-4 sm:p-5">
              <p className="display text-4xl font-semibold">
                <CountUp to={step.n} active={seen} duration={700} />
              </p>
              <h3 className="mt-3 font-semibold text-navy">{step.title}</h3>
              <p className="mt-1 text-sm text-navy/75">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
