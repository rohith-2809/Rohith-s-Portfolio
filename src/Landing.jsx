import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import {
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCheck,
  FiChevronUp,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiLayers,
  FiMail,
  FiMenu,
  FiMessageCircle,
  FiMonitor,
  FiSend,
  FiTerminal,
  FiUser,
  FiX,
} from "react-icons/fi";
import CustomCursor from "./Effects/CustomCursor";
import CustomToast from "./Effects/CustomToast";
import GradientWaves from "./ReactBits/GradientWaves";
import OptionWheel from "./ReactBits/OptionWheel";

const navItems = [
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#tech-stack" },
  { label: "Experience", href: "#experience" },
  { label: "Proof", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const focusRoles = [
  "Full-stack software engineer",
  "AI product builder",
  "MERN systems developer",
  "UX-minded problem solver",
];

const stats = [
  { value: "9+", label: "Product builds" },
  { value: "17", label: "Core technologies" },
  { value: "6", label: "Google credentials" },
  { value: "2", label: "Research artifacts" },
];

const techStack = [
  { name: "JavaScript", icon: "/JS.png", group: "Frontend" },
  { name: "React", icon: "/opt_React.webp", group: "Frontend" },
  { name: "Tailwind CSS", icon: "/opt_Tailwind_CSS_Logo.webp", group: "Frontend" },
  { name: "Node.js", icon: "/opt_Node.js_logo.svg.webp", group: "Backend" },
  { name: "Express.js", icon: "/opt_express-js.webp", group: "Backend" },
  { name: "MongoDB", icon: "/Mongodb.webp", group: "Data" },
  { name: "MySQL", icon: "/MySql.png", group: "Data" },
  { name: "Redis", icon: "/redis.png", group: "Data" },
  { name: "Python", icon: "/Python.webp", group: "AI" },
  { name: "TensorFlow", icon: "/TensorFlow.png", group: "AI" },
  { name: "PyTorch", icon: "/Pytourch.png", group: "AI" },
  { name: "Hugging Face", icon: "/opt_HuggingFace.webp", group: "AI" },
  { name: "Docker", icon: "/opt_Docker.webp", group: "Cloud" },
  { name: "GCP", icon: "/opt_gcp.webp", group: "Cloud" },
  { name: "Grafana", icon: "/Grafana.webp", group: "Cloud" },
  { name: "Git", icon: "/git.png", group: "Workflow" },
  { name: "Figma", icon: "/opt_Figma-logo.webp", group: "Design" },
];

const projects = [
  {
    title: "ORION",
    category: "Autonomous agent",
    period: "Dec 2025 - Feb 2026",
    media: "/orion-demo.webm",
    repo: "https://github.com/rohith-2809/ORION",
    live: "https://github.com/rohith-2809/ORION",
    cta: "Explore architecture",
    summary:
      "A sovereign, offline-first cognitive agent for secure, system-aware execution with task orchestration and defensive runtime behavior.",
    impact: ["Offline-first runtime", "System-aware execution", "Security-focused orchestration"],
    stack: ["Python", "Agents", "Security", "Automation"],
  },
  {
    title: "DocuAgent AI",
    category: "Retrieval assistant",
    period: "2025",
    media: "/DocuAgent-demo.webm",
    repo: "https://github.com/rohith-2809/DocuAgent",
    live: "https://github.com/rohith-2809/DocuAgent",
    cta: "View repository",
    summary:
      "Agentic document intelligence workflow that turns unstructured files into searchable answers and task-ready context.",
    impact: ["Document retrieval", "Context-aware responses", "Reusable agent workflow"],
    stack: ["React", "Node", "RAG", "AI"],
  },
  {
    title: "Plant Disease Detection",
    category: "Computer vision",
    period: "Feb 2025 - May 2025",
    media: "/project-demo.webm",
    repo: "https://github.com/rohith-2809/mern-test",
    live: "https://mern-test-client.onrender.com/",
    cta: "Launch demo",
    summary:
      "AI-powered MERN application that identifies plant diseases from images and returns practical preventive guidance.",
    impact: ["CNN classification", "Image upload workflow", "Actionable guidance"],
    stack: ["MERN", "CNN", "TensorFlow", "Tailwind"],
  },
  {
    title: "Employee Management System",
    category: "Operations app",
    period: "Nov 2024 - Dec 2024",
    media: "/EMS.webm",
    repo: "https://github.com/rohith-2809/Employee-Management-System",
    live: "https://employee-management-system-jdxe.onrender.com",
    cta: "Open product",
    summary:
      "Fast, responsive employee management interface built with React, Tailwind, Vite, and local persistence.",
    impact: ["Responsive CRUD flows", "Zero-backend persistence", "Clean employee records"],
    stack: ["React", "Vite", "Tailwind", "LocalStorage"],
  },
];

const experience = [
  {
    company: "BuildFlow Technologies Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    meta: "Remote full-time internship",
    period: "Oct 2024 - Dec 2024",
    link: "https://drive.google.com/file/d/1G8Xkw0S_TF99Bz3gbyvjwFU70QEIsE0g/view",
    proof: "Internship certificate",
    points: [
      "Enhanced user experience across multiple web applications.",
      "Built responsive MERN stack interfaces and API-connected workflows.",
      "Implemented frontend to backend integrations for production-ready features.",
      "Collaborated with team members to deliver scalable application improvements.",
    ],
  },
  {
    company: "Trivento Trade LLP",
    role: "Freelance Web Developer",
    meta: "Remote freelance",
    period: "2025",
    link: "https://www.triventotrade.com/",
    proof: "Visit website",
    points: [
      "Designed and deployed a modern company web presence.",
      "Integrated an AI chatbot to support customer interactions.",
      "Improved site responsiveness, navigation clarity, and user flow.",
      "Delivered a professional interface aligned to business credibility.",
    ],
  },
  {
    company: "Hyderabadi Dawat",
    role: "Freelance Web Developer",
    meta: "Remote freelance",
    period: "2025",
    link: "#contact",
    proof: "Discuss similar work",
    points: [
      "Built a responsive restaurant web experience for discovery and engagement.",
      "Created clear navigation and content hierarchy for customers.",
      "Optimized presentation for mobile browsing and fast decision-making.",
      "Improved brand impression with a clean, modern visual structure.",
    ],
  },
];

const certifications = [
  {
    title: "Google Machine Learning",
    image: "/MachineLearningPreview.webp",
    link: "https://coursera.org/share/27665abf668c0479e649f09c01ce75b9",
    copy: "Predictive modeling, supervised learning, and practical ML workflows.",
  },
  {
    title: "Google AI Essentials",
    image: "/AiPreview.webp",
    link: "https://coursera.org/share/e76522223bd36da3f4a8feeb93d2d2f7",
    copy: "AI fundamentals, prompt workflows, and applied productivity patterns.",
  },
  {
    title: "Google UX Design",
    image: "/PreviewUX.webp",
    link: "https://coursera.org/share/c617189e47b33926082172340be87f71",
    copy: "Research, wireframing, prototyping, usability testing, and interaction design.",
  },
  {
    title: "Advanced Data Analytics",
    image: "/Google Advanced Data Analytics Capstone.webp",
    link: "https://coursera.org/share/09e30d48b4d38a664c30b12795d8b144",
    copy: "Data storytelling, analysis, visualization, and model-backed decisions.",
  },
  {
    title: "Python for Cybersecurity",
    image: "/Google Python.webp",
    link: "https://coursera.org/share/b00ad7de4b6962060b8d47800927b352",
    copy: "Automating security tasks, investigation workflows, and Python scripting.",
  },
  {
    title: "Network Security",
    image: "/Google networking.webp",
    link: "https://coursera.org/share/9bd3492f4984a22b035647ca0e151226",
    copy: "Network architecture, protection strategies, and secure system foundations.",
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/rohith-2809", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rohith-vittamraj-0ab76a313", icon: FaLinkedinIn },
  { label: "X", href: "https://x.com/rohithofficial5?s=21&t=cVo-4UEJaqOqaL-meqeikQ", icon: FaXTwitter },
  { label: "Instagram", href: "https://www.instagram.com/_rohtzz_", icon: FaInstagram },
];

const projectNames = projects.map((project) => project.title);

const sectionVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function scrollToId(href) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionIntro({ icon: Icon, title, copy, align = "left" }) {
  return (
    <motion.div
      variants={sectionVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`mb-10 ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <div className={`mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
          <Icon size={18} />
        </span>
        <span className="h-px w-16 bg-cyan-300/35" />
      </div>
      <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
        {title}
      </h2>
      {copy && (
        <p className={`mt-5 max-w-2xl text-base leading-7 text-slate-300 ${align === "center" ? "mx-auto" : ""}`}>
          {copy}
        </p>
      )}
    </motion.div>
  );
}

function MagneticButton({ children, href, onClick, variant = "primary", className = "", external = false }) {
  const Comp = href ? "a" : "button";
  const styles =
    variant === "primary"
      ? "border-cyan-300 bg-cyan-300 text-[#031317] shadow-[0_18px_50px_rgba(103,232,249,0.18)] hover:bg-white"
      : "border-white/15 bg-white/[0.04] text-white hover:border-cyan-300/50 hover:bg-cyan-300/10";
  return (
    <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className={className}>
      <Comp
        href={href}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition ${styles}`}
      >
        {children}
      </Comp>
    </motion.div>
  );
}

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeProject, setActiveProject] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (latest) => setShowTop(latest > 700));

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % focusRoles.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  const handleNav = (event, href) => {
    event.preventDefault();
    scrollToId(href);
    setMenuOpen(false);
  };

  const handleSubmit = () => {
    setContactOpen(false);
    setToast({ message: "Message is opening through the contact form flow.", type: "info", id: Date.now() });
  };

  const active = projects[activeProject];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#060a0f] font-poppins text-white selection:bg-cyan-300 selection:text-[#031317]">
      <CustomCursor />
      <motion.div className="fixed left-0 right-0 top-0 z-[2000] h-1 origin-left bg-cyan-300" style={{ scaleX: progress }} />

      <header className="fixed inset-x-0 top-4 z-[1500] px-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-3xl border border-white/10 bg-[#071018]/80 px-4 py-3 shadow-[0_18px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl">
          <a href="#home" onClick={(event) => handleNav(event, "#home")} className="group flex items-center gap-3">
            <img src="/opt_logo.webp" alt="Rohith logo" className="h-10 w-10 rounded-2xl border border-cyan-300/30 bg-white/5 object-cover transition group-hover:rotate-3" />
            <span className="hidden text-sm font-bold tracking-[-0.02em] text-white sm:block">Rohith Vittamraj</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={(event) => handleNav(event, item.href)} className="rounded-2xl px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.07] hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <MagneticButton href="https://drive.google.com/file/d/1hRrlvA0nnKueRpO-wAWF6M2SduXxSHvG/view?usp=sharing" external variant="secondary">
              <FiDownload /> Resume
            </MagneticButton>
            <MagneticButton onClick={() => setContactOpen(true)}>
              <FiMessageCircle /> Hire me
            </MagneticButton>
          </div>

          <button
            className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white md:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-[#071018]/95 p-3 shadow-2xl backdrop-blur-xl md:hidden"
            >
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={(event) => handleNav(event, item.href)} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-300/10">
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="relative min-h-[100dvh] overflow-hidden pt-32">
          <div className="absolute inset-0">
            <GradientWaves
              horizonColor="#061118"
              waveColor="#0f766e"
              crestColor="#e6fffb"
              speed={0.28}
              amplitude={2.15}
              waveScale={0.72}
              waveRatio={0.82}
              swell={28}
              turbulence={14}
              tilt={1.04}
              zoom={0.92}
              height={5.8}
              fogDepth={18}
              detail="medium"
              brightness={0.92}
              opacity={0.92}
              mouseInteraction
              parallaxStrength={0.38}
              grain
              grainIntensity={0.025}
            />
            <img src="/img_9.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.09] mix-blend-screen" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(103,232,249,0.2),transparent_30rem),linear-gradient(120deg,#060a0f_18%,rgba(6,10,15,0.72)_54%,#060a0f_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#060a0f] to-transparent" />
          </div>
          <div className="relative mx-auto grid min-h-[calc(100dvh-8rem)] max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
                Available for full-time software engineering roles
              </div>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
                Building AI-backed products with full-stack precision.
              </h1>
              <div className="mt-6 h-9 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={focusRoles[roleIndex]}
                    initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                    className="text-xl font-semibold text-cyan-200"
                  >
                    {focusRoles[roleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                I design, engineer, and ship web systems that combine robust MERN architecture, AI workflows, clear interfaces, and production-minded execution.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <MagneticButton href="#projects" onClick={(event) => handleNav(event, "#projects")}>
                  View selected work <FiArrowUpRight />
                </MagneticButton>
                <MagneticButton variant="secondary" onClick={() => setContactOpen(true)}>
                  Start a conversation <FiMail />
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }} className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-cyan-300/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] bg-white/[0.055] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur">
                <div className="rounded-[1.5rem] bg-[#09131d]/90 p-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="text-sm font-bold text-white">Engineering console</p>
                      <p className="mt-1 text-xs text-slate-400">Live portfolio snapshot</p>
                    </div>
                    <FiTerminal className="text-cyan-200" size={24} />
                  </div>
                  <div className="grid gap-3 py-5 sm:grid-cols-2">
                    {stats.map((stat) => (
                      <motion.div key={stat.label} whileHover={{ y: -4 }} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                        <p className="text-3xl font-semibold text-white">{stat.value}</p>
                        <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                    <p className="text-sm font-bold text-cyan-100">Current build focus</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      AI tools, secure agent workflows, ML-backed applications, and polished product interfaces.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/[0.04] p-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">Interaction layer</p>
                      <p className="mt-1 text-sm text-slate-300">Shader motion, scroll reveals, tactile selectors.</p>
                    </div>
                    <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,0.85)]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionIntro icon={FiUser} title="A software engineer with a systems mindset and a product eye." copy="I work across frontend, backend, AI workflows, and UX details. The thread through my work is practical engineering: understand the problem, build the right system, and make it usable enough for real people." />
            <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
              <motion.div variants={sectionVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 shadow-[0_20px_80px_rgba(0,0,0,0.22)]">
                <p className="text-xl leading-9 text-slate-200">
                  I am actively seeking full-time opportunities where I can help teams ship useful software. My projects span medical AI concepts, agentic retrieval systems, plant disease detection, internal operations apps, and freelance business websites.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {["Scalable architecture", "Readable user flows", "AI-assisted systems"].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-[#09131d] p-4 text-sm font-bold text-slate-200">
                      <FiCheck className="mb-3 text-cyan-200" /> {item}
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={sectionVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="rounded-[2rem] border border-white/10 bg-[#09131d] p-7">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">Education</p>
                <h3 className="mt-5 text-2xl font-semibold text-white">Bachelor of Technology</h3>
                <p className="mt-2 text-slate-300">Computer Science and engineering foundation with hands-on work in full-stack systems, ML, analytics, and interface design.</p>
                <div className="mt-7 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                  <p className="text-sm font-semibold text-cyan-100">Working style</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Prototype quickly, validate behavior, tighten UX, then harden the system for maintainability.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="tech-stack" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionIntro icon={FiLayers} title="Tooling that connects interface craft with intelligent systems." copy="The stack is organized around what each tool helps me ship: responsive interfaces, reliable APIs, data workflows, AI models, deployment, and observability." />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.025, duration: 0.45 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -5, rotate: index % 2 ? 0.6 : -0.6 }}
                  className="group rounded-3xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  <div className="flex items-center gap-4">
                    <img src={tech.icon} alt={`${tech.name} logo`} className="h-11 w-11 rounded-2xl bg-white p-2 object-contain" loading="lazy" />
                    <div>
                      <p className="font-bold text-white">{tech.name}</p>
                      <p className="mt-1 text-sm text-slate-400 group-hover:text-cyan-100">{tech.group}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionIntro icon={FiMonitor} title="Selected work, shown through the problems each build solves." copy="The project section works like a product lab: choose a build, inspect the live media, then review the outcome, stack, and next action." />
            <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <motion.div
                  variants={sectionVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  className="relative hidden h-[440px] overflow-hidden rounded-[2rem] bg-[#09131d] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)] lg:block"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_50%,rgba(20,184,166,0.2),transparent_22rem)]" />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-cyan-200">Project wheel</p>
                        <p className="mt-2 max-w-xs text-sm leading-6 text-slate-300">Scroll, drag, or use arrow keys to move through the portfolio narrative.</p>
                      </div>
                      <span className="rounded-full bg-cyan-300 px-3 py-1 text-xs font-bold text-[#031317]">{activeProject + 1} / {projects.length}</span>
                    </div>
                    <div className="relative mt-6 min-h-0 flex-1">
                      <OptionWheel
                        items={projectNames}
                        defaultSelected={activeProject}
                        onChange={(index) => setActiveProject(index)}
                        textColor="#6b7b82"
                        activeColor="#ffffff"
                        side="left"
                        fontSize={2.05}
                        spacing={1.38}
                        curve={0.92}
                        tilt={8}
                        blur={1.25}
                        fade={0.28}
                        minOpacity={0.12}
                        smoothing={170}
                        inset={18}
                        loop={false}
                        draggable
                      />
                    </div>
                    <div className="rounded-2xl bg-white/[0.045] p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">{active.category}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{active.summary}</p>
                    </div>
                  </div>
                </motion.div>
                <div className="space-y-3 lg:hidden">
                {projects.map((project, index) => (
                  <motion.button
                    key={project.title}
                    type="button"
                    onClick={() => setActiveProject(index)}
                    whileHover={{ x: 6 }}
                    className={`w-full rounded-3xl border p-5 text-left transition ${activeProject === index ? "border-cyan-300/50 bg-cyan-300/10" : "border-white/10 bg-white/[0.035] hover:border-white/20"}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-200">{project.category}</p>
                        <h3 className="mt-2 text-2xl font-semibold text-white">{project.title}</h3>
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-slate-300">{project.period}</span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-300">{project.summary}</p>
                  </motion.button>
                ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={active.title}
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#09131d] shadow-[0_24px_90px_rgba(0,0,0,0.28)]"
                >
                  <video autoPlay loop muted playsInline preload="metadata" className="aspect-video w-full border-b border-white/10 object-cover">
                    <source src={active.media} type="video/webm" />
                  </video>
                  <div className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-bold text-cyan-200">{active.period}</p>
                        <h3 className="mt-2 text-3xl font-semibold text-white">{active.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <MagneticButton href={active.repo} external variant="secondary"><FiGithub /> Code</MagneticButton>
                        <MagneticButton href={active.live} external>{active.cta} <FiExternalLink /></MagneticButton>
                      </div>
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {active.impact.map((item) => (
                        <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold leading-6 text-slate-200">{item}</div>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {active.stack.map((item) => <span key={item} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">{item}</span>)}
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="experience" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionIntro icon={FiBriefcase} title="Experience shaped by shipping, integration, and client delivery." copy="This timeline emphasizes the work behind the visuals: system connections, practical delivery, responsive UI, and communication with real stakeholders." />
            <div className="space-y-5">
              {experience.map((item, index) => (
                <motion.article
                  key={item.company}
                  variants={sectionVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  className="group grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.07] lg:grid-cols-[0.55fr_1fr]"
                >
                  <div>
                    <div className="mb-5 flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-sm font-bold text-slate-400">{item.period}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{item.company}</h3>
                    <p className="mt-2 font-semibold text-cyan-200">{item.role}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.meta}</p>
                    <a href={item.link} target={item.link.startsWith("#") ? undefined : "_blank"} rel={item.link.startsWith("#") ? undefined : "noopener noreferrer"} onClick={item.link.startsWith("#") ? (event) => handleNav(event, item.link) : undefined} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-cyan-200">
                      {item.proof} <FiArrowUpRight />
                    </a>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {item.points.map((point) => (
                      <div key={point} className="rounded-2xl border border-white/10 bg-[#09131d] p-4 text-sm leading-6 text-slate-300">
                        <FiCheck className="mb-3 text-cyan-200" /> {point}
                      </div>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionIntro icon={FiAward} title="Credentialed learning across AI, analytics, UX, Python, and security." copy="The certificates support the project work with structured learning in machine learning, human-centered design, analytics, scripting, and networks." />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert, index) => (
                <motion.a
                  key={cert.title}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -7 }}
                  className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] transition hover:border-cyan-300/35 hover:bg-cyan-300/10"
                >
                  <img src={cert.image} alt={`${cert.title} certificate preview`} className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{cert.copy}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-200">View credential <FiArrowUpRight /></span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section id="publications" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionIntro icon={FiBookOpen} title="Research artifact for autonomous agent architecture." copy="The publication section gives the ORION work a stronger explanation layer, connecting the demo to the reasoning behind secure autonomous agents." />
            <motion.article variants={sectionVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] lg:grid-cols-[0.8fr_1.2fr]">
              <img src="/orion-whitepaper.webp" alt="ORION whitepaper preview" className="h-full min-h-[320px] w-full object-cover" loading="lazy" />
              <div className="p-7 sm:p-10">
                <p className="text-sm font-bold text-cyan-200">Whitepaper</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white">ORION: A Framework for Cognitive Intelligence in Autonomous Agents</h3>
                <p className="mt-5 text-base leading-8 text-slate-300">
                  A framework for building sovereign cognitive agents capable of system-aware execution, kernel-level defense, and autonomous task orchestration. The paper documents the architecture behind the ORION project and its secure execution model.
                </p>
                <MagneticButton href="https://zenodo.org/records/18831625?token=eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjU3MmJmYzkwLTY5M2YtNDY1Ni1iOGE3LWJkZDU3MmMwZjZjOSIsImRhdGEiOnt9LCJyYW5kb20iOiJhNmZkMTJhOGQ1MzM1NjBkYzQ5NTA4MTExYjY4ZGZkMiJ9.BXtsgAUU-isnmL3pMrfIc832aVObiG515pWwZE1IhWJ2doCYe7SMmnR8gSVp3BZVOgYDa5bKt1gNsjjloHyOqA" external className="mt-7">
                  Read whitepaper <FiExternalLink />
                </MagneticButton>
              </div>
            </motion.article>
          </div>
        </section>

        <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div variants={sectionVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="overflow-hidden rounded-[2.5rem] border border-cyan-300/20 bg-cyan-300/10 p-8 sm:p-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-100">Let us build</p>
                  <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">Have a product, AI workflow, or engineering role in mind?</h2>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Send the context and I will respond with how I can help, what I would clarify first, and the fastest path to a useful build.</p>
                </div>
                <div className="space-y-4">
                  <MagneticButton onClick={() => setContactOpen(true)} className="w-full">
                    <FiSend /> Open contact form
                  </MagneticButton>
                  <MagneticButton href="mailto:rohithvitteamraj@gmail.com" variant="secondary" className="w-full">
                    <FiMail /> rohithvitteamraj@gmail.com
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">Copyright {new Date().getFullYear()} Rohith Vittamraj. Built for useful software and thoughtful teams.</p>
          <div className="flex gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} profile`} className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100">
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {contactOpen && (
          <motion.div className="fixed inset-0 z-[3000] grid place-items-center bg-black/75 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(event) => event.target === event.currentTarget && setContactOpen(false)}>
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.97 }} className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#09131d] p-6 shadow-2xl">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">Start a conversation</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Share the project, role, or collaboration context.</p>
                </div>
                <button className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white" onClick={() => setContactOpen(false)} aria-label="Close contact form">
                  <FiX />
                </button>
              </div>
              <form className="space-y-4" action="https://formsubmit.co/rohithvitteamraj@gmail.com" method="POST" onSubmit={handleSubmit}>
                <input type="hidden" name="_subject" value="New Portfolio Inquiry" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <label className="block text-sm font-semibold text-slate-300">
                  Name
                  <input name="name" required className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10" placeholder="Your name" />
                </label>
                <label className="block text-sm font-semibold text-slate-300">
                  Email
                  <input type="email" name="email" required className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10" placeholder="you@example.com" />
                </label>
                <label className="block text-sm font-semibold text-slate-300">
                  Message
                  <textarea name="message" required rows="4" className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10" placeholder="Tell me what you want to build or discuss." />
                </label>
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-300 bg-cyan-300 px-5 py-3 text-sm font-bold text-[#031317] transition hover:bg-white" type="submit">
                  Send message <FiSend />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-[1200] grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/25 bg-cyan-300 text-[#031317] shadow-[0_20px_60px_rgba(103,232,249,0.25)]"
            aria-label="Scroll to top"
          >
            <FiChevronUp />
          </motion.button>
        )}
      </AnimatePresence>

      {toast && <CustomToast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Landing;
