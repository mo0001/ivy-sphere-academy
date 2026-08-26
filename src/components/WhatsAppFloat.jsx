import { useEffect, useRef, useState } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { CONTACT, waLink } from "../config.js";
import Chatbot from "./Chatbot.jsx";
import WhatsAppIcon from "./WhatsAppIcon.jsx";

const DEFAULT = waLink("Hello Ivy Sphere Academy, I would like to enquire about tutoring.");

const socialBtn =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/80 text-navy shadow-lift backdrop-blur-xl transition hover:bg-white";

function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export default function WhatsAppFloat() {
  const [socials, setSocials] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (!wrapRef.current?.contains(event.target)) setSocials(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  return (
    <div className="fixed bottom-4 right-3 z-40 flex flex-col items-end gap-2.5 sm:bottom-5 sm:right-5 sm:gap-3">
      <Chatbot />
      <div
        ref={wrapRef}
        className="relative"
        onMouseEnter={() => {
          if (canHover()) setSocials(true);
        }}
        onMouseLeave={() => {
          if (canHover()) setSocials(false);
        }}
      >
        <div
          className={`absolute right-full top-1/2 mr-3 flex -translate-y-1/2 items-center gap-2 transition duration-200 ${
            socials ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-3 opacity-0"
          }`}
        >
          <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className={socialBtn} aria-label="Instagram">
            <Instagram size={18} />
          </a>
          <a href={CONTACT.facebook} target="_blank" rel="noreferrer" className={socialBtn} aria-label="Facebook">
            <Facebook size={18} />
          </a>
          <a href={CONTACT.youtube} target="_blank" rel="noreferrer" className={socialBtn} aria-label="YouTube">
            <Youtube size={18} />
          </a>
        </div>
        <a
          href={DEFAULT}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Ivy Sphere Academy"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:bg-[#1EBE5D] sm:h-14 sm:w-14"
          onClick={(event) => {
            if (!canHover() && !socials) {
              event.preventDefault();
              setSocials(true);
            }
          }}
        >
          <WhatsAppIcon size={24} className="sm:hidden" />
          <WhatsAppIcon size={28} className="hidden sm:block" />
        </a>
      </div>
    </div>
  );
}
