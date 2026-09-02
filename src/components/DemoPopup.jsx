import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { waLink } from "../config.js";
import WhatsAppIcon from "./WhatsAppIcon.jsx";

const STORAGE_KEY = "ivy-demo-popup";
const DELAY_MS = 5000;
const DEMO_WA = waLink(
  "Hello Ivy Sphere Academy, I would like to book a free demo class for my child."
);

function alreadySeen() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* private mode */
  }
}

export default function DemoPopup() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return undefined;
    if (alreadySeen()) return undefined;

    let delayTimer;
    let fallbackTimer;
    let armed = false;

    const schedule = () => {
      if (armed || alreadySeen()) return;
      if (window.__ivyIntro && !window.__ivyIntro.played) return;
      armed = true;
      delayTimer = window.setTimeout(() => {
        if (alreadySeen()) return;
        if (window.__ivyIntro && !window.__ivyIntro.played) return;
        markSeen();
        setOpen(true);
      }, DELAY_MS);
    };

    if (window.__ivyIntro?.played) {
      schedule();
    } else {
      window.addEventListener("ivy-intro-done", schedule, { once: true });
      fallbackTimer = window.setTimeout(schedule, 8500);
    }

    return () => {
      window.clearTimeout(delayTimer);
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("ivy-intro-done", schedule);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const close = () => setOpen(false);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center px-5 pb-28 pt-10 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ivy-demo-popup-title"
      onClick={close}
    >
      <div className="absolute inset-0 bg-navy/25 backdrop-blur-[2px]" aria-hidden="true" />
      <div
        className="ivy-demo-popup panel relative w-full max-w-[22.5rem] bg-white/70 px-6 pb-6 pt-7 text-center sm:max-w-sm sm:px-7 sm:pb-7"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-navy/55 transition hover:bg-navy/5 hover:text-navy"
          onClick={close}
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <p className="section-kicker">Free demo</p>
        <h2 id="ivy-demo-popup-title" className="mt-2 font-serif text-[1.45rem] font-semibold leading-snug text-navy sm:text-[1.6rem]">
          Book a free demo class
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-navy/80">
          Try a session and see how your child learns with us.
        </p>
        <a
          href={DEMO_WA}
          target="_blank"
          rel="noreferrer"
          className="btn-whatsapp mt-5 w-full"
          onClick={close}
        >
          <WhatsAppIcon size={16} />
          Book on WhatsApp
        </a>
        <button type="button" className="mt-3 text-sm font-medium text-navy/55 transition hover:text-navy" onClick={close}>
          Maybe later
        </button>
      </div>
    </div>
  );
}
