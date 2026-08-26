import { TESTIMONIALS } from "../config.js";

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="wrap">
        <p className="section-kicker">From families</p>
        <h2 className="display mt-3 max-w-xl text-[1.85rem] font-semibold sm:text-4xl">
          What parents and students say
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <article
              key={item.name}
              className="panel panel-hover flex h-full min-h-[220px] flex-col p-6"
            >
              <p className="flex-1 text-[15px] leading-relaxed text-navy/80">
                “{item.quote}”
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    index % 2 === 0
                      ? "bg-navy text-sky-light"
                      : "bg-sky text-navy"
                  }`}
                  aria-hidden="true"
                >
                  {initials(item.name)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">{item.name}</p>
                  <p className="text-xs text-navy/70">{item.role}</p>
                  <p className="text-xs text-navy/50">{item.place}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
