import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { CONTACT } from "../config.js";

export default function Terms() {
  return (
    <div className="relative z-10 min-h-screen">
      <Navbar />
      <main className="wrap max-w-3xl pb-20 pt-32">
        <div className="panel p-6 sm:p-10">
        <h1 className="display text-4xl font-semibold text-navy">Terms & Conditions</h1>
        <div className="mt-6 space-y-4 text-navy/75">
          <p>
            Ivy Sphere Academy provides online academic tutoring and exam-preparation support.
            Programmes, schedules and fees are confirmed in writing after an enquiry.
          </p>
          <p>
            An enquiry through this website is a request for information. It is not an enrolment
            until both sides agree the plan, timing and fees.
          </p>
          <p>
            Ivy Sphere Academy offers coaching and support for school curricula and examinations
            including SAT, PSAT, ACT, AP, GCSE, 11+, IELTS, TOEFL, JEE, NEET, CUET and NET. We are
            not affiliated with College Board, ACT, CBSE, ICSE, NTA, or any other examination
            authority.
          </p>
          <p>
            We do not guarantee scores, ranks or admissions. Progress depends on the student's
            starting point, attendance and practice.
          </p>
          <p>
            Questions: {CONTACT.email} or WhatsApp via this website.
          </p>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
