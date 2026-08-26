export const BASE_URL = import.meta.env.BASE_URL;

export function asset(path) {
  return `${BASE_URL}${String(path).replace(/^\//, "")}`;
}

export const CONTACT = {
  whatsappDisplay: "+91 8796365212",
  whatsappE164: "918796365212",
  email: "ivysphereacademy@gmail.com",
  instagram: "https://www.instagram.com/ivysphere2026",
  facebook: "https://www.facebook.com/profile.php?id=61560796768112",
  youtube: "https://youtube.com/@ivysphereacademy2",
};

/** Inbox for FormSubmit POSTs only — not shown in the public footer. */
export const FORM_EMAIL = "mo0001chauhan@gmail.com";

export const WA_URL = `https://wa.me/${CONTACT.whatsappE164}`;
export const MAIL_URL = `mailto:${CONTACT.email}`;

export function waLink(text) {
  return `${WA_URL}?text=${encodeURIComponent(text)}`;
}

export function mailLink(body, subject = "Enquiry from Ivy Sphere Academy website") {
  return `${MAIL_URL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const MAIL_ENQUIRE = mailLink(
  "Hello Ivy Sphere Academy,\n\nI would like to enquire about tutoring for my child.\n\nName:\nStudent's grade:\nCountry:\nSubject / exam:\nPreferred class timing:\n\nThank you."
);

export const NAV_LINKS = [
  { href: `${BASE_URL}#top`, label: "Home" },
  { href: `${BASE_URL}#about`, label: "About" },
  { href: `${BASE_URL}#programmes`, label: "Programmes" },
  { href: `${BASE_URL}#why`, label: "Why us" },
  { href: `${BASE_URL}#faq`, label: "FAQ" },
  { href: `${BASE_URL}#contact`, label: "Contact" },
];

export const ISLAND_LINKS = NAV_LINKS.filter((link) =>
  ["Programmes", "Why us", "FAQ", "Contact"].includes(link.label)
);

export const COUNTRIES = [
  { code: "in", name: "India", lat: 22.35, lng: 78.96 },
  { code: "gb", name: "United Kingdom", lat: 53.4, lng: -2.0 },
  { code: "us", name: "United States", lat: 39.83, lng: -98.58 },
  { code: "ca", name: "Canada", lat: 56.13, lng: -106.35 },
  { code: "au", name: "Australia", lat: -25.27, lng: 133.78 },
];

export const SCHOOL_SUBJECTS = [
  "Mathematics",
  "English",
  "Science",
  "Social Science",
  "Hindi",
  "Other languages",
  "Computer Science",
  "Coding",
  "Other school subjects based on student requirements",
];

export const PROGRAMMES = [
  {
    id: "academic-support",
    kicker: "Grades 1 to 12",
    title: "School Academic Support",
    intro:
      "Comprehensive subject-wise academic support for CBSE, ICSE, State Boards, international curricula and other school programmes.",
    items: [
      "Mathematics",
      "English",
      "Science",
      "Social Science",
      "Hindi",
      "Languages",
      "Computer Science",
      "Coding",
      "Other academic subjects",
    ],
    cta: "Explore Academic Support",
  },
  {
    id: "sat",
    kicker: "SAT and PSAT",
    title: "SAT & PSAT Preparation",
    intro:
      "Structured preparation for the SAT and PSAT, with individualized study plans and timed practice.",
    items: [
      "SAT Reading & Writing",
      "SAT Mathematics",
      "PSAT preparation",
      "Vocabulary development",
      "Grammar and Standard English Conventions",
      "Reading comprehension",
      "Evidence-based reasoning",
      "Algebra",
      "Advanced Mathematics",
      "Problem-solving",
      "Data analysis",
      "Timed practice",
      "Full-length mock tests",
      "Error analysis",
      "Individualized study plans",
      "Score improvement strategies",
    ],
    cta: "Prepare Smarter for the SAT",
  },
  {
    id: "act",
    kicker: "ACT",
    title: "ACT Preparation",
    intro: "Section-wise ACT coaching with strategy, timing and practice tests.",
    items: [
      "ACT English",
      "ACT Mathematics",
      "ACT Reading",
      "ACT Science",
      "ACT strategy",
      "Time-management techniques",
      "Practice tests",
      "Error analysis",
      "Personalized preparation plans",
    ],
    cta: "Start ACT Preparation",
  },
  {
    id: "ap",
    kicker: "AP",
    title: "AP Preparation",
    intro: "AP subject preparation based on student requirements.",
    items: [
      "Concept mastery",
      "Curriculum coverage",
      "Exam-style questions",
      "Timed practice",
      "FRQs where applicable",
      "Mock examinations",
      "Revision strategies",
    ],
    cta: "Explore AP Preparation",
  },
  {
    id: "gcse",
    kicker: "International",
    title: "GCSE & International Curriculum",
    intro: "Support for students preparing for GCSE and related international curricula.",
    items: [
      "Concept development",
      "Subject-specific preparation",
      "Exam technique",
      "Past-paper practice",
      "Revision planning",
      "Mock examinations",
      "Individualized support",
    ],
    cta: "Explore GCSE Support",
  },
  {
    id: "eleven-plus",
    kicker: "11+",
    title: "11+ Preparation",
    intro: "Focused 11+ preparation covering reasoning, English, mathematics and exam strategy.",
    items: [
      "English",
      "Mathematics",
      "Verbal Reasoning",
      "Non-Verbal Reasoning",
      "Vocabulary",
      "Comprehension",
      "Problem-solving",
      "Timed practice",
      "Mock tests",
      "Exam strategy",
    ],
    cta: "Explore 11+ Preparation",
  },
  {
    id: "english-proficiency",
    kicker: "IELTS and TOEFL",
    title: "English Proficiency Exams",
    intro: "Preparation for IELTS and TOEFL with skill-wise practice and personalized feedback.",
    items: [
      "Reading",
      "Writing",
      "Listening",
      "Speaking",
      "Vocabulary",
      "Grammar",
      "Academic English",
      "Mock tests",
      "Time management",
      "Exam strategies",
      "Personalized feedback",
    ],
    cta: "Prepare for IELTS & TOEFL",
  },
];

export const COMPETITIVE_EXAMS = ["JEE Main", "JEE Advanced", "NEET", "CUET", "NET"];

export const REASONS = [
  {
    title: "Experienced tutors",
    text: "Teachers who know the subject and the exam.",
  },
  {
    title: "Personal attention",
    text: "Plans that match the student's level and goals.",
  },
  {
    title: "Concept first",
    text: "Strong fundamentals, not last-minute cramming.",
  },
  {
    title: "Exam strategy",
    text: "Practice, timing and revision built into the plan.",
  },
  {
    title: "Progress tracking",
    text: "Mocks, feedback and clear next steps.",
  },
  {
    title: "Flexible online classes",
    text: "Scheduled around students in five countries.",
  },
];

export const STEPS = [
  { n: 1, title: "Assess", text: "Level, strengths and goals." },
  { n: 2, title: "Plan", text: "A clear path for the term." },
  { n: 3, title: "Learn", text: "Expert-led concept teaching." },
  { n: 4, title: "Practice", text: "Targeted drills and mocks." },
  { n: 5, title: "Improve", text: "Review errors and refine." },
];

export const PERSONALIZED = [
  "Individual learning needs",
  "Personalized study plans",
  "Targeted practice",
  "Doubt-solving support",
  "Regular feedback",
  "Exam-specific strategies",
  "Flexible learning support",
];

export const PARENT_POINTS = [
  "Progress updates",
  "Performance feedback",
  "Homework tracking",
  "Mock-test analysis",
  "What still needs work",
  "WhatsApp when it helps",
];

export const TESTIMONIALS = [
  {
    name: "Priya Mehta",
    role: "Parent, Grade 8",
    place: "Mumbai, India",
    quote:
      "I finally know what we're working on each week. After class I get a short note, so I can actually follow the plan at home.",
  },
  {
    name: "James Okonkwo",
    role: "Student, SAT",
    place: "Houston, United States",
    quote:
      "My tutor explained algebra clearly instead of rushing a worksheet. I still have work to do, but the weekly plan makes sense.",
  },
  {
    name: "Aisha Rahman",
    role: "Parent, GCSE",
    place: "Birmingham, United Kingdom",
    quote:
      "We needed help with science past papers. Classes are online, but she doesn't feel on her own — someone checks the homework.",
  },
  {
    name: "Daniel Chen",
    role: "Student, Grade 10",
    place: "Toronto, Canada",
    quote:
      "English used to feel messy. We pick one skill a week, like paragraph structure, and I remember it in school the next day.",
  },
  {
    name: "Sophie Walsh",
    role: "Parent, 11+",
    place: "Melbourne, Australia",
    quote:
      "The mock tests helped because we got a proper debrief, not just a mark. I can see what still needs work.",
  },
  {
    name: "Arjun Patel",
    role: "Student, JEE",
    place: "Pune, India",
    quote:
      "Physics was the gap. The tutor slows down when I get stuck, and we redo the idea until I can try a similar problem myself.",
  },
  {
    name: "Maya Thompson",
    role: "Parent, Grade 6",
    place: "Seattle, United States",
    quote:
      "My son was skipping homework. Now there's a simple tracker, and I know which topics to ask about at home.",
  },
  {
    name: "Liam Nguyen",
    role: "Student, IELTS",
    place: "Sydney, Australia",
    quote:
      "Speaking practice is what I needed. We record a short answer, then go through the wording. Ordinary work, but it helps.",
  },
];

export const STAGES = [
  { title: "Grades 1 to 5", text: "Literacy, numeracy, science and coding." },
  { title: "Grades 6 to 8", text: "Stronger concepts and early exam prep." },
  { title: "Grades 9 to 10", text: "Boards, GCSE and academic stretch." },
  { title: "Grades 11 to 12", text: "Boards, SAT, ACT, AP, JEE and NEET." },
  { title: "University & adults", text: "IELTS, TOEFL and academic English." },
];

export const GRADES = [
  "Grade 1 to 5",
  "Grade 6 to 8",
  "Grade 9 to 10",
  "Grade 11 to 12",
  "University / Adult",
];

export const CURRICULA = [
  "CBSE",
  "ICSE",
  "State Board",
  "International / IGCSE / IB",
  "GCSE",
  "Other",
];

export const LEVELS = ["Beginner", "Developing", "On track", "Advanced", "Not sure"];

export const FAQS = [
  {
    q: "How do I enquire or enrol?",
    a: "Fill the enquiry form, message us on WhatsApp, or email ivysphereacademy@gmail.com. Share the student's grade, curriculum and the exam or subject they need help with. We then suggest a suitable plan.",
  },
  {
    q: "Which grades do you teach?",
    a: "We support Grades 1 to 12 for school academics, plus university and adult learners for IELTS, TOEFL and other English proficiency needs.",
  },
  {
    q: "What school curricula do you cover?",
    a: "CBSE, ICSE, State Boards, international curricula and other school programmes. Subjects include Mathematics, English, Science, Social Science, Hindi, languages, Computer Science, Coding and other subjects based on the student's needs.",
  },
  {
    q: "Do you offer SAT, ACT, AP and other international exams?",
    a: "Yes. We provide preparation for SAT, PSAT, ACT, AP, GCSE, 11+, IELTS and TOEFL. Support is also available for NAPLAN, AMC and UK SATs based on student requirements. This is coaching and support only. We are not affiliated with any examination authority.",
  },
  {
    q: "Do you help with JEE, NEET and CUET?",
    a: "Yes. We offer coaching and support for JEE Main, JEE Advanced, NEET, CUET and NET. We are not affiliated with NTA, NMC or any examining body.",
  },
  {
    q: "Are classes online? Which countries do you teach in?",
    a: "Yes. Classes are online and designed for students in different locations and schedules, including India, the UK, the US, Canada and Australia.",
  },
  {
    q: "How do parents stay informed?",
    a: "Parents receive regular progress updates, performance feedback, homework tracking, mock-test analysis and notes on areas that need improvement. We also communicate on WhatsApp when appropriate.",
  },
  {
    q: "Is learning personalized?",
    a: "Yes. Students are not treated as one-size-fits-all learners. We assess the student, then build a plan around their goals, level and exam.",
  },
  {
    q: "How do you teach?",
    a: "We follow five steps: Assess, Plan, Learn, Practice, then Analyse and Improve. That covers diagnostics, a structured plan, expert-led teaching, targeted practice and regular review.",
  },
  {
    q: "How can I contact Ivy Sphere Academy?",
    a: "Message us on WhatsApp, email ivysphereacademy@gmail.com, use the enquiry form, or the chat assistant on this website.",
  },
];
