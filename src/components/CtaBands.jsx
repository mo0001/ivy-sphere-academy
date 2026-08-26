import { Mail } from "lucide-react";
import { MAIL_ENQUIRE, waLink } from "../config.js";
import WhatsAppIcon from "./WhatsAppIcon.jsx";

export function CtaFinal() {
  return (
    <section className="section pt-4">
      <div className="wrap">
        <div className="panel mx-auto max-w-3xl px-6 py-10 text-center sm:px-10">
          <h2 className="display text-[1.85rem] font-semibold sm:text-4xl">
            Ready when your child is
          </h2>
          <p className="mx-auto mt-3 max-w-md text-navy/80">
            Tell us the grade and exam. We will suggest a plan.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waLink("Hello Ivy Sphere Academy, I would like to talk about tutoring for my child.")}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon size={16} />
              Message us on WhatsApp
            </a>
            <a href={MAIL_ENQUIRE} className="btn-secondary">
              <Mail size={16} />
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
