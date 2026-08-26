import { PROGRAMMES, COMPETITIVE_EXAMS } from "../config.js";

function enquire(program) {
  window.dispatchEvent(new CustomEvent("ivy-enquire", { detail: { program } }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

const CARDS = [
  {
    id: "academic-support",
    kicker: PROGRAMMES[0].kicker,
    title: PROGRAMMES[0].title,
    line: "CBSE, ICSE, state boards and international curricula.",
    chips: ["Maths", "English", "Science", "Coding", "Languages"],
  },
  ...PROGRAMMES.slice(1).map((program) => ({
    id: program.id,
    kicker: program.kicker,
    title: program.title,
    line: program.intro,
    chips: program.items.slice(0, 5),
  })),
  {
    id: "competitive-exams",
    kicker: "India",
    title: "JEE, NEET, CUET & NET",
    line: "Entrance coaching and support. Not affiliated with any examining body.",
    chips: COMPETITIVE_EXAMS,
  },
];

export default function Programmes() {
  return (
    <section id="programmes" className="section">
      <div className="wrap">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Programmes</p>
            <h2 className="display mt-3 max-w-xl text-[1.85rem] font-semibold sm:text-4xl">
              School, tests and competitive prep
            </h2>
          </div>
          <a href="#contact" className="btn-primary self-start sm:self-auto">
            Enquire
          </a>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {CARDS.map((card) => (
            <article
              key={card.id}
              id={card.id}
              role="button"
              tabIndex={0}
              className="panel panel-hover flex h-full cursor-pointer flex-col gap-3 p-4 text-left sm:p-5"
              onClick={() => enquire(card.title)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  enquire(card.title);
                }
              }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-mid">{card.kicker}</p>
              <h3 className="text-lg font-semibold text-navy">{card.title}</h3>
              <p className="line-clamp-2 text-sm text-navy/75">{card.line}</p>
              <div className="flex flex-wrap gap-1.5">
                {card.chips.map((chip) => (
                  <span key={chip} className="rounded-full bg-white px-2.5 py-1 text-xs text-navy">
                    {chip}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
