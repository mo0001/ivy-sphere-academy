import { useEffect, useRef, useState } from "react";
import CountUp from "./CountUp.jsx";
import { asset, COUNTRIES } from "../config.js";

const STATS = [
  { to: 100, suffix: "+", label: "Students", duration: 2200 },
  { to: 7, suffix: "+", label: "Years of tutor experience", duration: 1600 },
  { to: 12, prefix: "1–", label: "School grades", duration: 1400 },
  { to: 5, suffix: "", label: "Countries", duration: 1200 },
];

export default function StatsBar() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive(true);
      },
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-navy/90 py-12 text-white">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="display text-5xl font-semibold text-sky sm:text-6xl">
                <CountUp
                  to={stat.to}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  active={active}
                  duration={stat.duration}
                  from={0}
                />
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4 border-t border-white/20 pt-6">
          {COUNTRIES.map((country) => (
            <span key={country.code} className="inline-flex items-center gap-2 text-sm font-medium text-white">
              <img src={asset(`flags/${country.code}.png`)} alt="" className="h-4 w-6 rounded-sm object-cover" />
              {country.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
