import { useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { CONTACT, CURRICULA, GRADES, LEVELS, MAIL_ENQUIRE, mailLink, waLink } from "../config.js";
import WhatsAppIcon from "./WhatsAppIcon.jsx";

const empty = {
  name: "",
  grade: "",
  country: "",
  curriculum: "",
  subject: "",
  level: "",
  target: "",
  timing: "",
  phone: "",
  email: "",
  message: "",
};

const STEPS = [
  { id: "who", title: "Who is this for?", hint: "A few details about you." },
  { id: "what", title: "What do you need?", hint: "Curriculum, subject and goals." },
  { id: "when", title: "When and how?", hint: "Timing and how we should reply." },
  { id: "send", title: "Ready to send?", hint: "Check this, then send your enquiry." },
];

const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${CONTACT.email}`;

function enquiryPayload(form) {
  const name = form.name.trim();
  return {
    "Parent/Student Name": name,
    Grade: form.grade,
    Country: form.country,
    "School Curriculum": form.curriculum,
    "Subject/Exam": form.subject,
    "Current Academic Level": form.level,
    "Target Exam/Score": form.target,
    "Preferred Class Timing": form.timing,
    "Phone/WhatsApp Number": form.phone,
    "Email Address": form.email,
    Message: form.message,
    _subject: name ? `Enquiry from ${name} — Ivy Sphere Academy` : "Enquiry from Ivy Sphere Academy website",
    _template: "table",
    _captcha: "false",
    ...(form.email.trim() ? { _replyto: form.email.trim() } : {}),
  };
}

function buildBody(form) {
  return [
    "Hello Ivy Sphere Academy, I would like to enquire about tutoring.",
    "",
    `Name: ${form.name}`,
    form.grade ? `Student's grade: ${form.grade}` : null,
    form.country ? `Country: ${form.country}` : null,
    form.curriculum ? `Curriculum: ${form.curriculum}` : null,
    form.subject ? `Subject/Exam: ${form.subject}` : null,
    form.level ? `Current level: ${form.level}` : null,
    form.target ? `Target exam/score: ${form.target}` : null,
    form.timing ? `Preferred timing: ${form.timing}` : null,
    `WhatsApp: ${form.phone}`,
    form.email ? `Email: ${form.email}` : null,
    form.message ? `Message: ${form.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function stepError(step, form) {
  if (step === 0 && !form.name.trim()) return "Please add your name.";
  if (step === 2 && !form.phone.trim()) return "Please add a WhatsApp number.";
  if (step === 3 && (!form.name.trim() || !form.phone.trim())) {
    return "Please add your name and WhatsApp number.";
  }
  return "";
}

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const onPrefill = (event) => {
      const program = event.detail?.program;
      if (!program) return;
      setForm((prev) => ({ ...prev, subject: program }));
    };
    window.addEventListener("ivy-enquire", onPrefill);
    return () => window.removeEventListener("ivy-enquire", onPrefill);
  }, []);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const goTo = (next) => {
    setDir(next > step ? 1 : -1);
    setError("");
    setStep(next);
  };

  const goNext = () => {
    const message = stepError(step, form);
    if (message) {
      setError(message);
      return;
    }
    goTo(Math.min(step + 1, STEPS.length - 1));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (step < STEPS.length - 1) {
      goNext();
      return;
    }
    const message = stepError(3, form);
    if (message) {
      setError(message);
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(enquiryPayload(form)),
      });
      const data = await res.json().catch(() => ({}));
      const ok = res.ok && data.success !== false && data.success !== "false";
      if (!ok) throw new Error(data.message || "Send failed");
      setStatus("sent");
      setForm(empty);
      setStep(0);
    } catch {
      setStatus("idle");
      setError("Could not send your enquiry. Please try again.");
    }
  };

  const sending = status === "sending";

  return (
    <section id="contact" className="section">
      <div className="wrap grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="panel flex flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="section-kicker">Contact</p>
            <h2 className="display mt-3 text-[1.85rem] font-semibold sm:text-4xl">Send an enquiry</h2>
            <p className="mt-4 text-navy/80">A short few questions. Send your enquiry and we will reply with a plan that fits your child.</p>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <a href={waLink("Hello Ivy Sphere Academy, I would like to book an enquiry.")} className="btn-whatsapp" target="_blank" rel="noreferrer">
              <WhatsAppIcon size={16} />
              WhatsApp us
            </a>
            <a href={MAIL_ENQUIRE} className="btn-secondary">
              <Mail size={16} />
              Email us
            </a>
          </div>
        </div>

        {status === "sent" ? (
          <div className="panel p-6 sm:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-white">
              <Check size={18} />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-navy">Thank you. We will be in touch.</h3>
            <a
              href={waLink("Hello Ivy Sphere Academy, I just sent an enquiry from the website.")}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy/70 underline-offset-4 hover:text-navy hover:underline"
            >
              <WhatsAppIcon size={16} />
              Or message us on WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="panel overflow-hidden p-5 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-mid">
                {step + 1} of {STEPS.length}
              </p>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {STEPS.map((item, i) => (
                  <span
                    key={item.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === step ? "w-5 bg-sky" : i < step ? "w-1.5 bg-navy/40" : "w-1.5 bg-navy/15"
                    }`}
                  />
                ))}
              </div>
            </div>
            <h3 className="mt-3 font-serif text-xl font-semibold text-navy">{STEPS[step].title}</h3>
            <p className="mt-1 text-sm text-navy/70">{STEPS[step].hint}</p>

            <div className="relative mt-5 min-h-[14.5rem]">
              <div key={`${step}-${dir}`} className={dir >= 0 ? "wizard-pane" : "wizard-pane-back"}>
                {step === 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Parent/Student Name" className="sm:col-span-2">
                      <input className="input" value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" />
                    </Field>
                    <Field label="Student's Grade">
                      <select className="input" value={form.grade} onChange={(e) => update("grade", e.target.value)}>
                        <option value="">Select</option>
                        {GRADES.map((g) => (
                          <option key={g}>{g}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Country">
                      <input className="input" value={form.country} onChange={(e) => update("country", e.target.value)} placeholder="India, UK, US, Canada, Australia" />
                    </Field>
                  </div>
                )}
                {step === 1 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="School Curriculum">
                      <select className="input" value={form.curriculum} onChange={(e) => update("curriculum", e.target.value)}>
                        <option value="">Select</option>
                        {CURRICULA.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Subject/Exam">
                      <input className="input" value={form.subject} onChange={(e) => update("subject", e.target.value)} placeholder="SAT, Maths, IELTS" />
                    </Field>
                    <Field label="Current Academic Level">
                      <select className="input" value={form.level} onChange={(e) => update("level", e.target.value)}>
                        <option value="">Select</option>
                        {LEVELS.map((l) => (
                          <option key={l}>{l}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Target Exam/Score">
                      <input className="input" value={form.target} onChange={(e) => update("target", e.target.value)} />
                    </Field>
                  </div>
                )}
                {step === 2 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Preferred Class Timing">
                      <input className="input" value={form.timing} onChange={(e) => update("timing", e.target.value)} />
                    </Field>
                    <Field label="Phone/WhatsApp Number">
                      <input className="input" value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" />
                    </Field>
                    <Field label="Email Address">
                      <input type="email" className="input" value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" />
                    </Field>
                    <Field label="Message" className="sm:col-span-2">
                      <textarea className="input min-h-[88px]" value={form.message} onChange={(e) => update("message", e.target.value)} />
                    </Field>
                  </div>
                )}
                {step === 3 && (
                  <dl className="grid gap-2.5 text-sm sm:grid-cols-2">
                    <Summary label="Name" value={form.name} />
                    <Summary label="Grade" value={form.grade} />
                    <Summary label="Country" value={form.country} />
                    <Summary label="Curriculum" value={form.curriculum} />
                    <Summary label="Subject/Exam" value={form.subject} />
                    <Summary label="Level" value={form.level} />
                    <Summary label="Target" value={form.target} />
                    <Summary label="Timing" value={form.timing} />
                    <Summary label="WhatsApp" value={form.phone} />
                    <Summary label="Email" value={form.email} />
                    <Summary label="Message" value={form.message} wide />
                  </dl>
                )}
              </div>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-700">
                {error}
                {error.startsWith("Could not send") && (
                  <>
                    {" "}
                    <a href={mailLink(buildBody(form))} className="font-medium underline underline-offset-2">
                      Email us instead
                    </a>
                  </>
                )}
              </p>
            )}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                disabled={step === 0 || sending}
                className="btn-secondary disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Back
              </button>
              {step < STEPS.length - 1 ? (
                <button type="submit" className="btn-primary">
                  Next
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button type="submit" className="btn-primary disabled:pointer-events-none disabled:opacity-60" disabled={sending}>
                  {sending ? "Sending…" : "Send enquiry"}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Summary({ label, value, wide = false }) {
  return (
    <div className={`rounded-xl bg-white/60 px-3 py-2 ${wide ? "sm:col-span-2" : ""}`}>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-mid">{label}</dt>
      <dd className="mt-0.5 text-navy">{value.trim() ? value : "—"}</dd>
    </div>
  );
}

function Field({ label, className = "", children }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-navy">{label}</span>
      {children}
    </label>
  );
}
