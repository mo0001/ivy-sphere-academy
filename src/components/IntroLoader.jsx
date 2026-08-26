import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { asset } from "../config.js";

function getIntro() {
  if (typeof window === "undefined") return { played: true, started: false, fading: false, listeners: new Set() };
  if (!window.__ivyIntro) {
    window.__ivyIntro = { played: false, started: false, fading: false, listeners: new Set() };
  }
  return window.__ivyIntro;
}

function notify(state) {
  getIntro().listeners.forEach((fn) => fn(state));
}

function startIntro(reduce) {
  const intro = getIntro();
  if (intro.started || intro.played) return;
  intro.started = true;
  const hold = reduce ? 700 : 2000;
  window.setTimeout(() => {
    intro.fading = true;
    notify({ open: true, fading: true });
  }, hold);
  window.setTimeout(() => {
    intro.played = true;
    intro.fading = false;
    notify({ open: false, fading: false });
  }, hold + 420);
}

export default function IntroLoader() {
  const { pathname } = useLocation();
  const intro = getIntro();
  const [open, setOpen] = useState(() => pathname === "/" && !intro.played);
  const [fading, setFading] = useState(() => intro.fading);

  useEffect(() => {
    if (pathname !== "/") {
      intro.played = true;
      setOpen(false);
      return;
    }
    if (intro.played) {
      setOpen(false);
      return;
    }

    const onUpdate = ({ open: nextOpen, fading: nextFade }) => {
      setOpen(nextOpen);
      setFading(nextFade);
    };
    intro.listeners.add(onUpdate);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    startIntro(reduce);
    setOpen(true);

    return () => intro.listeners.delete(onUpdate);
  }, [pathname, intro]);

  if (!open) return null;

  return (
    <div
      className={`ivy-intro ${fading ? "ivy-intro-exit" : ""}`}
      role="dialog"
      aria-label="Ivy Sphere Academy"
      aria-modal="true"
    >
      <div className="relative flex flex-col items-center px-6">
        <div className="relative h-[8.5rem] w-[8.5rem]">
          <div className="ivy-intro-spark-wrap absolute inset-0" aria-hidden="true">
            <span className="ivy-intro-spark" />
          </div>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 120 120" aria-hidden="true">
            <circle
              className="ivy-intro-ring"
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#78D0E8"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength="1"
            />
          </svg>
          <div className="ivy-intro-mark absolute inset-[0.7rem] overflow-hidden rounded-full bg-white shadow-card">
            <img src={asset("logo.png")} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
        <p className="ivy-intro-word mt-5 font-serif text-3xl font-semibold tracking-tight text-navy">Ivy Sphere</p>
        <p className="ivy-intro-word ivy-intro-word-delay mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-mid">
          Academy
        </p>
      </div>
    </div>
  );
}
