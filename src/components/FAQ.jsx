import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "../config.js";

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section">
      <div className="wrap max-w-3xl">
        <p className="section-kicker">FAQ</p>
        <h2 className="display mt-3 text-[1.85rem] font-semibold sm:text-4xl">Quick answers</h2>
        <div className="panel mt-8 divide-y divide-navy/10 overflow-hidden">
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-navy">{item.q}</span>
                  <ChevronDown size={18} className={`shrink-0 text-navy transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <p className="px-5 pb-4 text-[15px] text-navy/80">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
