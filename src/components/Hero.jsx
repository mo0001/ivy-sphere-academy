import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { asset, COUNTRIES, MAIL_ENQUIRE, waLink } from "../config.js";
import CountUp from "./CountUp.jsx";
import WhatsAppIcon from "./WhatsAppIcon.jsx";

const HERO_WA = waLink(
  "Hello Ivy Sphere Academy, I would like to talk about tutoring for my child."
);

const STATS = [
  { to: 100, suffix: "+", label: "Students", duration: 2000 },
  { to: 7, suffix: "+", label: "Years of tutor experience", duration: 1600 },
];

function useHeroCountActive() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let startTimer;
    let fallbackTimer;

    const start = (ms) => {
      window.clearTimeout(startTimer);
      startTimer = window.setTimeout(() => {
        if (!cancelled) setActive(true);
      }, ms);
    };

    if (window.__ivyIntro?.played) {
      start(200);
      return () => {
        cancelled = true;
        window.clearTimeout(startTimer);
      };
    }

    const onDone = () => start(500);
    window.addEventListener("ivy-intro-done", onDone);
    fallbackTimer = window.setTimeout(() => start(400), 3200);

    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("ivy-intro-done", onDone);
    };
  }, []);

  return active;
}

export default function Hero() {
  const countActive = useHeroCountActive();

  return (
    <section id="top" className="section pb-24 pt-32 sm:pb-20 sm:pt-32">
      <div className="wrap">
        <div className="panel mx-auto max-w-2xl bg-white/40 px-7 py-9 text-center backdrop-blur-md sm:p-10">
          <h1 className="display text-[1.85rem] font-semibold leading-[1.28] sm:text-4xl sm:leading-[1.22] lg:text-[3.4rem]">
            Elevating Scores.
            <br />
            Expanding Futures.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-navy sm:mt-6 sm:text-lg">
            A personal plan, expert teaching, and progress you can actually see.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={HERO_WA} target="_blank" rel="noreferrer" className="btn-whatsapp">
              <WhatsAppIcon size={16} />
              Message us on WhatsApp
            </a>
            <a href={MAIL_ENQUIRE} className="btn-secondary hidden lg:inline-flex">
              <Mail size={16} />
              Email us
            </a>
          </div>
          <div className="mt-8 flex flex-col gap-5 overflow-visible">
            <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
              {STATS.map((stat) => (
                <div key={stat.label} className="relative rounded-2xl bg-white/40 px-3 py-4 sm:px-4">
                  <p className="display text-4xl font-semibold leading-none sm:text-5xl">
                    <CountUp to={stat.to} suffix={stat.suffix} active={countActive} duration={stat.duration} />
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-navy-mid">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {COUNTRIES.map((country) => (
                <span
                  key={country.code}
                  className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-navy"
                >
                  <img src={asset(`flags/${country.code}.png`)} alt="" className="h-3 w-4 rounded-[2px] object-cover" />
                  {country.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
