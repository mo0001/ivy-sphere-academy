import { PARENT_POINTS } from "../config.js";

export default function Parents() {
  return (
    <section id="parents" className="section">
      <div className="wrap">
        <p className="section-kicker">For families</p>
        <h2 className="display mt-3 max-w-xl text-[1.85rem] font-semibold sm:text-4xl">
          Stay in the loop
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARENT_POINTS.map((item) => (
            <article key={item} className="panel panel-hover p-4 sm:p-5">
              <p className="font-medium text-navy">{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
