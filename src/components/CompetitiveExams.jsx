import { COMPETITIVE_EXAMS } from "../config.js";

function enquire() {
  window.dispatchEvent(
    new CustomEvent("ivy-enquire", { detail: { program: "Indian competitive exam preparation" } })
  );
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export default function CompetitiveExams() {
  return (
    <section id="competitive-exams" className="bg-navy py-16 text-white lg:py-20">
      <div className="wrap">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold">India</p>
        <h2 className="display mt-3 text-[2rem] font-semibold sm:text-4xl">
          Competitive Exam Preparation in India
        </h2>
        <p className="mt-3 text-xl text-sky">Dream Big. Prepare Smart. Achieve Success.</p>
        <p className="mt-4 max-w-2xl text-white/90">
          Coaching and support for entrance examinations. Ivy Sphere Academy is not affiliated with
          NTA, NMC, or any other examining body.
        </p>
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-sky">Entrance Exams</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {COMPETITIVE_EXAMS.map((exam) => (
              <button
                key={exam}
                type="button"
                onClick={enquire}
                className="rounded-2xl border border-white/20 bg-white/5 px-4 py-5 text-left text-lg font-semibold hover:bg-white/10"
              >
                {exam}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
