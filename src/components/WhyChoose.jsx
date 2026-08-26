import { REASONS } from "../config.js";

export default function WhyChoose() {
  return (
    <section id="why" className="section">
      <div className="wrap">
        <p className="section-kicker">Why us</p>
        <h2 className="display mt-3 max-w-xl text-[1.85rem] font-semibold sm:text-4xl">
          Clear teaching. Visible results.
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((item, index) => (
            <article key={item.title} className="panel panel-hover p-4 sm:p-5">
              <p className="display text-2xl font-semibold text-navy-mid">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-[17px] font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm text-navy/75">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
