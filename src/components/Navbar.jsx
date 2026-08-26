import { useState } from "react";
import { Menu, X } from "lucide-react";
import { asset, BASE_URL, ISLAND_LINKS, NAV_LINKS } from "../config.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center">
      <div
        className={`mx-3 w-full border border-white/60 bg-white/50 shadow-lift backdrop-blur-xl md:bg-white/60 ${
          open ? "rounded-[1.6rem]" : "rounded-full"
        } max-w-[calc(100%-1.5rem)] sm:max-w-lg lg:max-w-5xl`}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 lg:px-2.5 lg:py-1.5">
          <a href={`${BASE_URL}#top`} className="flex min-w-0 items-center rounded-full">
            <img
              src={asset("logo-wide.png")}
              alt="Ivy Sphere Academy"
              className="h-9 w-auto max-w-[140px] object-contain object-left sm:h-10 sm:max-w-[14rem]"
            />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {ISLAND_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-navy/80 transition hover:bg-white/60 hover:text-navy"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <a href={`${BASE_URL}#contact`} className="btn-primary hidden py-2 text-[13px] lg:inline-flex">
              Enquire
            </a>
            <button
              type="button"
              className="rounded-full p-2.5 text-navy lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="grid gap-1 border-t border-navy/10 px-4 pb-4 pt-2 lg:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-[15px] font-medium text-navy hover:bg-white/60"
              >
                {link.label}
              </a>
            ))}
            <a href={`${BASE_URL}#contact`} onClick={() => setOpen(false)} className="btn-primary mt-1">
              Enquire
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
