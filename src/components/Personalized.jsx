import { PERSONALIZED } from "../config.js";

export default function Personalized() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="section-kicker">Personalized learning</p>
          <h2 className="display mt-3 text-[2rem] font-semibold text-navy sm:text-4xl">
            Every Student Has a Different Goal. Every Student Needs a Different Strategy.
          </h2>
          <p className="mt-4 text-navy">
            Students are not treated as one-size-fits-all learners. Plans are built around the
            child in front of us.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {PERSONALIZED.map((item) => (
            <li key={item} className="rounded-2xl border border-navy/10 bg-sky-soft px-4 py-4 text-[15px] font-medium text-navy">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
