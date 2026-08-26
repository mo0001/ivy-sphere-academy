import { useEffect, useState } from "react";

export default function CountUp({
  to,
  suffix = "",
  prefix = "",
  active,
  duration = 1400,
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) {
      setN(0);
      return undefined;
    }

    setN(0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setN(to);
      return undefined;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - p) ** 3;
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration]);

  return (
    <>
      {prefix}
      {n}
      {suffix}
    </>
  );
}
