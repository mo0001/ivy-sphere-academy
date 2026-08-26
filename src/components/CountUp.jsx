import { useEffect, useState } from "react";

export default function CountUp({
  to,
  suffix = "",
  prefix = "",
  active,
  duration = 1400,
  from = 0,
}) {
  const [n, setN] = useState(from);

  useEffect(() => {
    if (!active) {
      setN(from);
      return undefined;
    }
    setN(from);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setN(to);
      return undefined;
    }
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - (1 - p) ** 3;
      setN(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration, from]);

  return (
    <>
      {prefix}
      {n}
      {suffix}
    </>
  );
}
