import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, ChevronRight, Mail } from "lucide-react";
import { CURRICULA, GRADES, LEVELS, MAIL_ENQUIRE, mailLink, waLink } from "../config.js";
import { sendFormSubmit } from "../formSubmit.js";
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

const QUESTIONS = [
  {
    id: "name",
    field: "name",
    type: "text",
    prompt: "What's your name?",
    hint: "Parent or student — whoever we should address.",
    placeholder: "Your name",
    required: true,
    autoComplete: "name",
  },
  {
    id: "country",
    field: "country",
    type: "text",
    prompt: "Which country are you in?",
    hint: "Helps us match a suitable class time.",
    placeholder: "India, UK, US, Canada, Australia…",
    autoComplete: "country-name",
  },
  {
    id: "grade",
    field: "grade",
    type: "choice",
    prompt: "What's the student's grade?",
    hint: "Pick the closest range.",
    options: GRADES,
  },
  {
    id: "curriculum",
    field: "curriculum",
    type: "choice",
    prompt: "Which school curriculum?",
    hint: "Choose the closest match.",
    options: CURRICULA,
  },
  {
    id: "subject",
    field: "subject",
    type: "text",
    prompt: "Which subject or exam?",
    hint: "For example SAT, Maths, IELTS, or JEE.",
    placeholder: "SAT, Maths, IELTS…",
  },
  {
    id: "level",
    field: "level",
    type: "choice",
    prompt: "What's the current academic level?",
    hint: "A rough sense is enough.",
    options: LEVELS,
  },
  {
    id: "target",
    field: "target",
    type: "text",
    prompt: "What's the target exam or score?",
    hint: "Optional — a board, a percentile, or a score goal.",
    placeholder: "e.g. SAT 1450, Grade 10 boards",
  },
  {
    id: "timing",
    field: "timing",
    type: "text",
    prompt: "Preferred class timing?",
    hint: "Weekdays, weekends, or a time window.",
    placeholder: "e.g. weekday evenings IST",
  },
  {
    id: "phone",
    field: "phone",
    type: "tel",
    prompt: "What's the best WhatsApp number?",
    hint: "We'll use this to reply — include country code if you can.",
    placeholder: "WhatsApp number",
    required: true,
    autoComplete: "tel",
  },
  {
    id: "email",
    field: "email",
    type: "email",
    prompt: "And your email?",
    hint: "Optional, but useful for a written plan.",
    placeholder: "name@email.com",
    autoComplete: "email",
  },
  {
    id: "message",
    field: "message",
    type: "textarea",
    prompt: "Anything else we should know?",
    hint: "Goals, availability, or questions. Shift+Enter for a new line.",
    placeholder: "Optional note",
  },
  {
    id: "review",
    type: "review",
    prompt: "Ready to send?",
    hint: "Check the details, then send your enquiry.",
  },
];

function enquiryPayload(form) {
  const name = form.name.trim();
  const email = form.email.trim();
  return {
    name,
    email,
    message: buildBody(form),
    "Parent/Student Name": name,
    Grade: form.grade,
    Country: form.country,
    "School Curriculum": form.curriculum,
    "Subject/Exam": form.subject,
    "Current Academic Level": form.level,
    "Target Exam/Score": form.target,
    "Preferred Class Timing": form.timing,
    "Phone/WhatsApp Number": form.phone,
    "Email Address": email,
    _subject: name ? `Enquiry from ${name} — Ivy Sphere Academy` : "Enquiry from Ivy Sphere Academy website",
    _template: "table",
    _captcha: "false",
    ...(email ? { _replyto: email } : {}),
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

function stepError(question, form) {
  if (!question?.required) return "";
  const value = String(form[question.field] || "").trim();
  if (question.field === "name" && !value) return "Please add your name.";
  if (question.field === "phone" && !value) return "Please add a WhatsApp number.";
  if (!value) return "This one is needed to continue.";
  return "";
}

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const inputRef = useRef(null);

  const question = QUESTIONS[step];
  const last = QUESTIONS.length - 1;
  const progress = ((step + 1) / QUESTIONS.length) * 100;
  const sending = status === "sending";

  useEffect(() => {
    const onPrefill = (event) => {
      const program = event.detail?.program;
      if (!program) return;
      setForm((prev) => ({ ...prev, subject: program }));
    };
    window.addEventListener("ivy-enquire", onPrefill);
    return () => window.removeEventListener("ivy-enquire", onPrefill);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(id);
  }, [step]);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const goTo = (next) => {
    const clamped = Math.max(0, Math.min(next, last));
    setDir(clamped > step ? 1 : -1);
    setError("");
    setStep(clamped);
  };

  const goNext = () => {
    const message = stepError(question, form);
    if (message) {
      setError(message);
      return false;
    }
    goTo(step + 1);
    return true;
  };

  const skip = () => {
    if (question.required) return;
    goTo(step + 1);
  };

  const sendEnquiry = async () => {
    const nameErr = stepError(QUESTIONS[0], form);
    const phoneErr = stepError(QUESTIONS.find((q) => q.field === "phone"), form);
    const message = nameErr || phoneErr;
    if (message) {
      setError(message);
      if (nameErr) goTo(0);
      else goTo(QUESTIONS.findIndex((q) => q.field === "phone"));
      return;
    }
    setError("");
    setStatus("sending");
    const result = await sendFormSubmit(enquiryPayload(form));
    if (result.ok) {
      setStatus("sent");
      setForm(empty);
      setStep(0);
      return;
    }
    setStatus("idle");
    setError(
      result.usedFallback
        ? `${result.error} A backup send window opened — finish it there if it appeared.`
        : result.error
    );
  };

  const submit = (event) => {
    event.preventDefault();
    if (sending) return;
    if (step < last) {
      goNext();
      return;
    }
    sendEnquiry();
  };

  const onKeyDown = (event) => {
    if (event.key !== "Enter") return;
    if (event.target.tagName === "TEXTAREA") {
      if (event.shiftKey) return;
      event.preventDefault();
      if (sending) return;
      goNext();
    }
  };

  const pickChoice = (value) => {
    update(question.field, value);
    setError("");
  };

  return (
    <section id="contact" className="section">
      <div className="wrap grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="panel flex flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="section-kicker">Contact</p>
            <h2 className="display mt-3 text-[1.85rem] font-semibold sm:text-4xl">Send an enquiry</h2>
            <p className="mt-4 text-navy/80">
              One question at a time. Send your enquiry and we will reply with a plan that fits your child.
            </p>
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
          <div className="panel overflow-hidden p-0">
            <div className="tf-progress-track" aria-hidden="true">
              <div className="tf-progress-fill" style={{ width: "100%" }} />
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-white">
                <Check size={18} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-navy">Thank you. We will be in touch.</h3>
              <p className="mt-2 text-sm text-navy/70">Your enquiry is with us. We will follow up shortly.</p>
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
          </div>
        ) : (
          <form onSubmit={submit} onKeyDown={onKeyDown} className="panel overflow-hidden p-0">
            <div className="tf-progress-track" role="progressbar" aria-valuemin={1} aria-valuemax={QUESTIONS.length} aria-valuenow={step + 1} aria-label="Enquiry progress">
              <div className="tf-progress-fill" style={{ width: `${progress}%` }} />
            </div>

            <div className="flex min-h-[22rem] flex-col p-5 sm:min-h-[24rem] sm:p-8">
              <div className="relative flex-1">
                <div key={`${step}-${dir}`} className={dir >= 0 ? "wizard-pane" : "wizard-pane-back"}>
                  <p className="flex items-baseline gap-2 font-serif text-[1.65rem] font-semibold leading-snug text-navy sm:text-[1.85rem]">
                    <span className="shrink-0 text-base font-sans font-semibold tracking-tight text-sky-bright sm:text-lg">
                      {step + 1} <span className="text-navy/30">→</span>
                    </span>
                    <span>{question.prompt}</span>
                  </p>
                  {question.hint && <p className="mt-2 text-sm text-navy/70">{question.hint}</p>}

                  {question.type === "review" ? (
                    <dl className="mt-5 grid gap-2.5 text-sm sm:grid-cols-2">
                      <Summary label="Name" value={form.name} />
                      <Summary label="Country" value={form.country} />
                      <Summary label="Grade" value={form.grade} />
                      <Summary label="Curriculum" value={form.curriculum} />
                      <Summary label="Subject/Exam" value={form.subject} />
                      <Summary label="Level" value={form.level} />
                      <Summary label="Target" value={form.target} />
                      <Summary label="Timing" value={form.timing} />
                      <Summary label="WhatsApp" value={form.phone} />
                      <Summary label="Email" value={form.email} />
                      <Summary label="Message" value={form.message} wide />
                    </dl>
                  ) : question.type === "choice" ? (
                    <div className="mt-5 flex flex-col gap-2" role="listbox" aria-label={question.prompt}>
                      {question.options.map((option) => {
                        const selected = form[question.field] === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            role="option"
                            aria-selected={selected}
                            onClick={() => pickChoice(option)}
                            className={`rounded-xl border px-4 py-2.5 text-left text-[15px] font-medium transition ${
                              selected
                                ? "border-navy bg-navy text-white"
                                : "border-navy/10 bg-white text-navy hover:border-sky hover:bg-sky-soft"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  ) : question.type === "textarea" ? (
                    <textarea
                      ref={inputRef}
                      className="input mt-5 min-h-[120px]"
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder={question.placeholder}
                    />
                  ) : (
                    <input
                      ref={inputRef}
                      type={question.type === "email" || question.type === "tel" ? question.type : "text"}
                      className="input mt-5 text-lg sm:text-xl"
                      value={form[question.field]}
                      onChange={(e) => update(question.field, e.target.value)}
                      placeholder={question.placeholder}
                      autoComplete={question.autoComplete}
                    />
                  )}
                </div>
              </div>

              {error && (
                <p className="mt-4 text-sm text-red-700" role="alert">
                  {error}
                  {!error.startsWith("Please add") && (
                    <>
                      {" "}
                      <a href={mailLink(buildBody(form))} className="font-medium underline underline-offset-2">
                        Email us instead
                      </a>
                    </>
                  )}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  disabled={step === 0 || sending}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-navy/70 transition hover:bg-white hover:text-navy disabled:pointer-events-none disabled:opacity-40"
                  aria-label="Back"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>

                <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
                  {!question.required && question.type !== "review" && (
                    <button type="button" onClick={skip} disabled={sending} className="btn-secondary">
                      Skip
                    </button>
                  )}
                  {step < last ? (
                    <button type="submit" className="btn-primary">
                      OK
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button type="submit" className="btn-primary disabled:pointer-events-none disabled:opacity-60" disabled={sending}>
                      {sending ? "Sending…" : "Send enquiry"}
                    </button>
                  )}
                </div>
              </div>
              {step < last && (
                <p className="mt-2 text-right text-[11px] font-medium tracking-wide text-navy/45">
                  press Enter ↵
                </p>
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
