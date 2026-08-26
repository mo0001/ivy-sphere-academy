import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import GlobeBackground from "./components/GlobeBackground.jsx";
import IntroLoader from "./components/IntroLoader.jsx";
import WhatsAppFloat from "./components/WhatsAppFloat.jsx";
import Home from "./pages/Home.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";

function HashScroll() {
  const location = useLocation();
  useEffect(() => {
    const introPending = location.pathname === "/" && window.__ivyIntro && !window.__ivyIntro.played;
    const delay = location.hash && introPending ? 2300 : 50;
    if (location.hash) {
      const id = location.hash.replace("#", "");
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, delay);
    } else if (!introPending) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);
  return null;
}

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <HashScroll />
      <GlobeBackground />
      <IntroLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <WhatsAppFloat />
    </BrowserRouter>
  );
}
