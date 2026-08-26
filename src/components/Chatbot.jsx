import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { CONTACT, FAQS, waLink } from "../config.js";

const KNOWLEDGE = [
  {
    keys: ["sat", "psat", "college board", "reading and writing", "digital sat"],
    answer:
      "We offer SAT and PSAT preparation: Reading and Writing, Mathematics, vocabulary, grammar, timed practice, full-length mocks, error analysis and individualized study plans. This is coaching support, not an official College Board programme.",
  },
  {
    keys: ["act"],
    answer:
      "ACT preparation covers English, Mathematics, Reading, Science, strategy, timing, practice tests, error analysis and personalized plans.",
  },
  {
    keys: ["ap", "advanced placement", "frq"],
    answer:
      "AP preparation is based on the student's subjects. We cover concept mastery, curriculum, exam-style questions, timed practice, FRQs where applicable, mocks and revision.",
  },
  {
    keys: ["gcse", "igcse", "international curriculum"],
    answer:
      "We support GCSE and related international curricula with concept development, subject-specific prep, exam technique, past papers, revision planning and mocks.",
  },
  {
    keys: ["11+", "eleven plus", "verbal reasoning", "non-verbal"],
    answer:
      "11+ preparation includes English, Mathematics, Verbal Reasoning, Non-Verbal Reasoning, vocabulary, comprehension, problem-solving, timed practice, mocks and exam strategy.",
  },
  {
    keys: ["ielts", "toefl", "pte", "english proficiency", "speaking", "listening"],
    answer:
      "IELTS and TOEFL preparation covers Reading, Writing, Listening, Speaking, vocabulary, grammar, academic English, mocks, timing and personalized feedback.",
  },
  {
    keys: ["jee", "neet", "cuet", "net", "iit", "medical"],
    answer:
      "We provide coaching and support for JEE Main, JEE Advanced, NEET, CUET and NET. We are not affiliated with NTA, NMC or any examining body.",
  },
  {
    keys: ["cbse", "icse", "state board", "curriculum", "school", "tuition", "subject", "math", "maths", "science", "hindi", "coding"],
    answer:
      "School Academic Support is for Grades 1 to 12 across CBSE, ICSE, State Boards and international curricula. Subjects include Mathematics, English, Science, Social Science, Hindi, languages, Computer Science, Coding and other subjects as needed.",
  },
  {
    keys: ["grade", "class", "year", "age", "who can join", "foundation"],
    answer:
      "We support Grades 1 to 5 (foundation), 6 to 8, 9 to 10, 11 to 12, and university or adult learners for IELTS, TOEFL and academic English.",
  },
  {
    keys: ["parent", "progress", "update", "homework", "report"],
    answer:
      "Parents get regular progress updates, performance feedback, homework tracking, mock-test analysis and notes on areas to improve. We also use WhatsApp when appropriate.",
  },
  {
    keys: ["how", "teach", "approach", "method", "assess", "plan"],
    answer:
      "Our method has five steps: Assess, Plan, Learn, Practice, then Analyse and Improve. We start from the student's level and goals, then teach, practise and review.",
  },
  {
    keys: ["online", "zoom", "timing", "schedule", "timezone", "country", "india", "uk", "us", "canada", "australia"],
    answer:
      "Classes are fully online and scheduled around the student. We teach students in India, the UK, the US, Canada and Australia.",
  },
  {
    keys: ["fee", "fees", "price", "cost", "payment", "package"],
    answer:
      "Fees depend on the programme, hours and the student's plan. Share your grade and subject, and we will outline options. I can take your details and send them on WhatsApp.",
  },
  {
    keys: ["whatsapp", "phone", "call", "email", "contact", "number"],
    answer: `Email ${CONTACT.email}, use WhatsApp from this site, or let me take your enquiry here and send it for you.`,
  },
  {
    keys: ["affiliate", "official", "college board", "nta"],
    answer:
      "Ivy Sphere Academy provides coaching and support. We are not affiliated with SAT, College Board, ACT, CBSE, ICSE, JEE, NEET, IELTS, TOEFL or any other examination authority.",
  },
  {
    keys: ["hello", "hi", "hey", "good morning", "good evening"],
    answer:
      "Hello. I am Ivy, the Ivy Sphere Academy assistant. Ask me about programmes, exams or how we teach. I can also take an enquiry for a counsellor.",
  },
];

const PROGRAMME_HINTS = [
  ["sat", "SAT & PSAT Preparation"],
  ["psat", "SAT & PSAT Preparation"],
  ["act", "ACT Preparation"],
  ["ap ", "AP Preparation"],
  ["gcse", "GCSE & International Curriculum"],
  ["11+", "11+ Preparation"],
  ["ielts", "IELTS & TOEFL"],
  ["toefl", "IELTS & TOEFL"],
  ["jee", "JEE / NEET / CUET"],
  ["neet", "JEE / NEET / CUET"],
  ["cuet", "JEE / NEET / CUET"],
  ["school", "School Academic Support"],
  ["cbse", "School Academic Support"],
  ["math", "School Academic Support"],
];

function scoreKnowledge(text) {
  const t = text.toLowerCase();
  let best = null;
  let bestScore = 0;
  KNOWLEDGE.forEach((item) => {
    const score = item.keys.reduce((sum, key) => sum + (t.includes(key) ? key.length : 0), 0);
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  });
  if (bestScore < 2) {
    const faqHit = FAQS.find((f) =>
      f.q
        .toLowerCase()
        .split(" ")
        .filter((w) => w.length > 4)
        .some((w) => t.includes(w))
    );
    if (faqHit) return faqHit.a;
    return null;
  }
  return best.answer;
}

function looksLikeEnquire(text) {
  return /enquir|enrol|enroll|join|register|admission|book|counsel|demo|trial|start|interested|need (help|tutor|class)/i.test(
    text
  );
}

function extractPhone(text) {
  const m = text.replace(/[()\s-]/g, "").match(/(\+?\d{10,13})/);
  return m ? m[1] : "";
}

function extractGrade(text) {
  const m = text.match(/\b(?:grade|class|year|std|standard)\s*(\d{1,2})\b/i) || text.match(/\b([1-9]|1[0-2])\b/);
  if (!m) {
    if (/university|college|adult/i.test(text)) return "University / Adult";
    return "";
  }
  return `Grade ${m[1]}`;
}

function extractProgramme(text) {
  const t = ` ${text.toLowerCase()} `;
  const hit = PROGRAMME_HINTS.find(([key]) => t.includes(key));
  return hit ? hit[1] : "";
}

function nextLeadPrompt(lead) {
  if (!lead.name) return { field: "name", prompt: "May I have your name?" };
  if (!lead.grade) return { field: "grade", prompt: "Which grade is the student in?" };
  if (!lead.programme) return { field: "programme", prompt: "Which subject or exam should we focus on?" };
  if (!lead.phone) return { field: "phone", prompt: "Please share a WhatsApp number so a counsellor can reply." };
  return null;
}

function leadSummary(lead) {
  return [
    "Hello Ivy Sphere Academy, enquiry via website chat.",
    `Name: ${lead.name}`,
    `Grade: ${lead.grade}`,
    `Programme: ${lead.programme}`,
    lead.country ? `Country: ${lead.country}` : null,
    `WhatsApp: ${lead.phone}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lead, setLead] = useState({ name: "", grade: "", programme: "", country: "", phone: "" });
  const [collecting, setCollecting] = useState(false);
  const [pendingField, setPendingField] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi, I am Ivy, the Ivy Sphere Academy assistant. Ask me about programmes, exams or classes. I can also take your enquiry and send it on WhatsApp.",
    },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const chips = useMemo(
    () => ["SAT prep", "School tutoring", "JEE / NEET", "Take an enquiry"],
    []
  );

  const push = (from, text, extra) => {
    setMessages((prev) => [...prev, { from, text, extra }]);
  };

  const handleBotLogic = (raw) => {
    const text = raw.trim();
    if (!text) return;
    const lower = text.toLowerCase();
    let nextLead = { ...lead };
    let nextCollecting = collecting;
    let field = pendingField;

    const phone = extractPhone(text);
    if (phone) nextLead.phone = phone;
    const grade = extractGrade(text);
    if (grade && (field === "grade" || !nextLead.grade)) nextLead.grade = grade;
    const programme = extractProgramme(text);
    if (programme && (field === "programme" || !nextLead.programme)) nextLead.programme = programme;
    if (field === "name" && !phone) nextLead.name = text.replace(/^i(?:'m| am)\s+/i, "").slice(0, 60);
    if (/(india|uk|united kingdom|usa|united states|canada|australia)/i.test(text)) {
      nextLead.country = text.match(/india|united kingdom|\buk\b|usa|united states|canada|australia/i)?.[0] || nextLead.country;
    }

    if (looksLikeEnquire(text) || lower.includes("enquiry") || lower === "take an enquiry") {
      nextCollecting = true;
    }

    if (nextCollecting && field === "phone" && phone) {
      nextLead.phone = phone;
    }

    let reply = scoreKnowledge(text);

    if (nextCollecting) {
      if (field === "name" && nextLead.name) reply = `Thanks, ${nextLead.name}.`;
      const nxt = nextLeadPrompt(nextLead);
      if (!nxt) {
        const summary = leadSummary(nextLead);
        push("bot", "I have your details. I will open WhatsApp so you can send this to Ivy Sphere Academy.");
        window.open(waLink(summary), "_blank", "noopener,noreferrer");
        setLead(nextLead);
        setCollecting(false);
        setPendingField("");
        return;
      }
      setLead(nextLead);
      setCollecting(true);
      setPendingField(nxt.field);
      push("bot", `${reply && !looksLikeEnquire(text) ? `${reply}\n\n` : ""}${nxt.prompt}`.trim());
      return;
    }

    if (!reply) {
      reply =
        "I can help with school tutoring (Grades 1 to 12), SAT, ACT, AP, GCSE, 11+, IELTS, TOEFL, JEE, NEET and CUET. Ask a question, or say “enquiry” and I will take your details.";
    }
    setLead(nextLead);
    push("bot", reply);
  };

  const send = (text) => {
    const value = (text ?? input).trim();
    if (!value) return;
    push("user", value);
    setInput("");
    window.setTimeout(() => handleBotLogic(value), 250);
  };

  return (
    <>
      {open && (
        <div className="flex h-[min(70vh,520px)] w-[min(calc(100vw-2.5rem),360px)] flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-lift">
          <div className="flex items-center justify-between bg-navy px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Ivy Assistant</p>
              <p className="text-[11px] text-sky">Ivy Sphere Academy</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-1 hover:bg-white/10">
              <X size={16} />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-sky-soft p-3">
            {messages.map((msg, i) => (
              <div
                key={`${msg.from}-${i}`}
                className={`max-w-[90%] rounded-2xl px-3 py-2 text-[14px] leading-snug ${
                  msg.from === "bot" ? "bg-white text-navy" : "ml-auto bg-navy text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="flex flex-wrap gap-1.5 border-t border-navy/10 bg-white px-3 py-2">
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                className="rounded-full bg-sky-soft px-2.5 py-1 text-[12px] font-medium text-navy"
                onClick={() => send(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2 border-t border-navy/10 p-2"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              className="input py-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about SAT, grades, IELTS..."
            />
            <button type="submit" className="rounded-full bg-navy p-2.5 text-white" aria-label="Send">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-lift transition hover:bg-navy-mid sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-3 sm:text-sm sm:font-semibold"
        aria-label="Chat with Ivy"
      >
        <MessageCircle size={18} />
        <span className="hidden sm:inline">Chat with Ivy</span>
      </button>
    </>
  );
}
