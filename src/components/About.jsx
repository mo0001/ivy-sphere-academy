import { waLink } from "../config.js";
import WhatsAppIcon from "./WhatsAppIcon.jsx";

const DEMO_WA = waLink(
  "Hello Ivy Sphere Academy, I would like to book a free demo class for my child."
);

const PILLARS = [
  { title: "Personal plan", text: "Built around your child's level, goals and exam." },
  { title: "Expert teaching", text: "Tutors with 7+ years of classroom experience." },
  { title: "Visible progress", text: "Updates and feedback parents can follow." },
  { title: "1-on-1 classes", text: "Customized lessons for each student." },
  {
    title: "Free demo class",
    text: "Book a session and see how your child learns.",
    href: DEMO_WA,
    cta: "Book on WhatsApp",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <p className="section-kicker">About</p>
        <h2 className="display mt-3 max-w-xl text-[1.85rem] font-semibold sm:text-4xl">
          Online tutoring that stays with your child
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((item) => {
            const inner = (
              <>
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-[15px] text-navy/80">{item.text}</p>
                {item.cta ? (
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#178C46]">
                    <WhatsAppIcon size={14} />
                    {item.cta}
                  </span>
                ) : null}
              </>
            );

            if (item.href) {
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="panel panel-hover flex flex-col p-4 no-underline sm:p-5"
                >
                  {inner}
                </a>
              );
            }

            return (
              <article key={item.title} className="panel panel-hover p-4 sm:p-5">
                {inner}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
