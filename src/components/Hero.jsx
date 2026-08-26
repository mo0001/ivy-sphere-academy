import { Mail } from "lucide-react";
import { asset, COUNTRIES, MAIL_ENQUIRE, waLink } from "../config.js";
import CountUp from "./CountUp.jsx";
import WhatsAppIcon from "./WhatsAppIcon.jsx";

const HERO_WA = waLink(
  "Hello Ivy Sphere Academy, I would like to talk about tutoring for my child."
);

const STATS = [
  { to: 100, suffix: "+", label: "Students" },
  { to: 7, suffix: "+", label: "Years of tutor experience" },
];

export default function Hero() {
  return (
    <section id="top" className="section pb-24 pt-32 sm:pb-20 sm:pt-32">
      <div className="wrap">
        <div className="panel bg-white/50 backdrop-blur-md max-w-2xl px-7 py-9 sm:p-10">
          <h1 className="display text-[1.85rem] font-semibold leading-[1.15] sm:text-4xl lg:text-[3.4rem]">
            Elevating Scores.
            <br />
            Expanding Futures.
          </h1>
          <p className="mt-4 max-w-md text-base text-navy sm:mt-6 sm:text-lg">
            A personal plan, expert teaching, and progress you can actually see.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={HERO_WA} target="_blank" rel="noreferrer" className="btn-whatsapp">
              <WhatsAppIcon size={16} />
              Talk on WhatsApp
            </a>
            <a href={MAIL_ENQUIRE} className="btn-secondary hidden lg:inline-flex">
              <Mail size={16} />
              Email us
            </a>
          </div>
          <div className="mb-6 mt-8 grid grid-cols-2 gap-3 pr-0 sm:mb-0">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/50 px-3 py-4 sm:px-4">
                <p className="display text-4xl font-semibold sm:text-5xl">
                  <CountUp to={stat.to} suffix={stat.suffix} active from={0} duration={2000} />
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-navy-mid">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pb-6 sm:pb-0">
            {COUNTRIES.map((country) => (
              <span key={country.code} className="inline-flex items-center gap-1.5 rounded-full bg-white/50 px-2.5 py-1.5 text-xs font-medium text-navy">
                <img src={asset(`flags/${country.code}.png`)} alt="" className="h-3 w-4 rounded-[2px] object-cover" />
                {country.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
