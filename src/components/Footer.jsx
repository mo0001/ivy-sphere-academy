import { Facebook, Instagram, Mail, Youtube } from "lucide-react";
import { asset, BASE_URL, CONTACT, MAIL_ENQUIRE, NAV_LINKS, waLink } from "../config.js";
import WhatsAppIcon from "./WhatsAppIcon.jsx";

const WA_FOOTER = waLink("Hello Ivy Sphere Academy.");

export default function Footer() {
  return (
    <footer className="relative pb-28 pt-4 sm:pb-32 sm:pt-8">
      <div className="wrap">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="panel p-6 sm:p-8 lg:col-span-6">
            <a href={`${BASE_URL}#top`} className="inline-block">
              <img
                src={asset("logo-wide.png")}
                alt="Ivy Sphere Academy"
                className="h-14 w-auto max-w-[16rem] object-contain object-left sm:h-16 sm:max-w-[20rem]"
              />
            </a>
            <p className="mt-4 text-sm text-navy-mid">Elevating Scores. Expanding Futures.</p>
            <p className="mt-4 max-w-md text-sm text-navy/80">
              Academic Support. International Exam Preparation. Competitive Exam Coaching.
              Personalized Online Learning.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <a href={WA_FOOTER} className="btn-whatsapp" target="_blank" rel="noreferrer">
                <WhatsAppIcon size={16} />
                WhatsApp
              </a>
              <a href={MAIL_ENQUIRE} className="btn-secondary">
                <Mail size={16} />
                {CONTACT.email}
              </a>
            </div>
          </div>

          <div className="panel p-6 sm:p-8 lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-mid">Explore</p>
            <nav className="mt-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="text-sm font-medium text-navy/80 hover:text-navy">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="panel p-6 sm:p-8 lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-mid">Legal</p>
            <nav className="mt-4 flex flex-col gap-2 text-sm font-medium text-navy/80">
              <a href={`${BASE_URL}privacy`} className="hover:text-navy">Privacy Policy</a>
              <a href={`${BASE_URL}terms`} className="hover:text-navy">Terms & Conditions</a>
              <a href={`${BASE_URL}#contact`} className="hover:text-navy">Contact Us</a>
            </nav>
            <div className="mt-6 flex gap-2">
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="rounded-full bg-navy/5 p-2 text-navy hover:bg-sky" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href={CONTACT.facebook} target="_blank" rel="noreferrer" className="rounded-full bg-navy/5 p-2 text-navy hover:bg-sky" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href={CONTACT.youtube} target="_blank" rel="noreferrer" className="rounded-full bg-navy/5 p-2 text-navy hover:bg-sky" aria-label="YouTube">
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-navy/50">
          © {new Date().getFullYear()} Ivy Sphere Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
