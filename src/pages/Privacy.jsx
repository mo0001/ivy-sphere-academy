import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { CONTACT } from "../config.js";

export default function Privacy() {
  return (
    <div className="relative z-10 min-h-screen">
      <Navbar />
      <main className="wrap max-w-3xl pb-20 pt-32">
        <div className="panel p-6 sm:p-10">
        <h1 className="display text-4xl font-semibold text-navy">Privacy Policy</h1>
        <div className="mt-6 space-y-4 text-navy/75">
          <p>
            Ivy Sphere Academy collects the information you submit through our enquiry form so we
            can respond to your request. This typically includes your name, email, phone or
            WhatsApp number, and details about the student and programme of interest.
          </p>
          <p>
            We use this information only to contact you about tutoring and exam-preparation
            enquiries. We do not sell personal data.
          </p>
          <p>
            Enquiries may reach us by email at {CONTACT.email} or through WhatsApp on this website.
          </p>
          <p>
            To ask about the data we hold, email {CONTACT.email}.
          </p>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
