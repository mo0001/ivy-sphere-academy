import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Programmes from "../components/Programmes.jsx";
import WhyChoose from "../components/WhyChoose.jsx";
import Approach from "../components/Approach.jsx";
import Parents from "../components/Parents.jsx";
import WhoCanJoin from "../components/WhoCanJoin.jsx";
import Testimonials from "../components/Testimonials.jsx";
import FAQ from "../components/FAQ.jsx";
import { CtaFinal } from "../components/CtaBands.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <div className="relative z-10 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programmes />
        <WhyChoose />
        <Approach />
        <WhoCanJoin />
        <Parents />
        <Testimonials />
        <FAQ />
        <Contact />
        <CtaFinal />
      </main>
      <Footer />
    </div>
  );
}
