import { STAGES } from "../config.js";

export default function WhoCanJoin() {
  return (
    <section id="who" className="section">
      <div className="wrap">
        <p className="section-kicker">Who can join</p>
        <h2 className="display mt-3 max-w-xl text-[1.85rem] font-semibold sm:text-4xl">
          Grades 1 to 12, and beyond
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STAGES.map((stage) => (
            <article key={stage.title} className="panel panel-hover p-4 sm:p-5">
              <h3 className="font-semibold text-navy">{stage.title}</h3>
              <p className="mt-2 text-sm text-navy/75">{stage.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
