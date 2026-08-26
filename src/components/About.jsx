const PILLARS = [
  { title: "Personal plan", text: "Built around your child's level, goals and exam." },
  { title: "Expert teaching", text: "Tutors with 7+ years of classroom experience." },
  { title: "Visible progress", text: "Updates and feedback parents can follow." },
  { title: "1-on-1 classes", text: "Customized lessons for each student." },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <p className="section-kicker">About</p>
        <h2 className="display mt-3 max-w-xl text-[1.85rem] font-semibold sm:text-4xl">
          Online tutoring that stays with your child
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((item) => (
            <article key={item.title} className="panel panel-hover p-4 sm:p-5">
              <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-[15px] text-navy/80">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
