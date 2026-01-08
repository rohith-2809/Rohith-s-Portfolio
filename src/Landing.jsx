import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, useCallback } from "react";
import { FaBars, FaTimes, FaArrowRight, FaStar, FaExternalLinkAlt } from "react-icons/fa";
import InteractiveText from "./Effects/InteractiveText";
import SplitText from "./Effects/SplitText";
import SpotlightCard from "./Effects/SpotlightCard";
import TiltedCard from "./Effects/TiltedCard";
import CustomCursor from "./Effects/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENT: Intro Animation Loader ---
const TechStackLoader = ({ techStack, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState("shuffle");
  const [shuffledStack, setShuffledStack] = useState([]);

  useEffect(() => {
    // Create shuffled array for more dynamic animation
    const shuffled = [...techStack].sort(() => Math.random() - 0.5);
    setShuffledStack(shuffled);
  }, [techStack]);

  useEffect(() => {
    if (phase === "shuffle") {
      if (currentIndex < shuffledStack.length) {
        const timeout = setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setPhase("logo-reveal");
        const timeout = setTimeout(() => {
          onComplete();
        }, 1200);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, shuffledStack.length, phase, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black"
      exit={{ 
        opacity: 0, 
        transition: { 
          duration: 0.4, 
          ease: "easeInOut",
          staggerChildren: 0.05 
        } 
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-500/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0 
            }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <AnimatePresence mode="wait">
          {phase === "shuffle" ? (
            <motion.div
              key="shuffle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex flex-col items-center"
            >
              {shuffledStack[currentIndex] && (
                <div className="relative group">
                  <motion.img
                    src={shuffledStack[currentIndex].icon}
                    alt="Tech Icon"
                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:drop-shadow-[0_0_30px_rgba(99,102,241,0.7)] transition-all duration-300"
                    initial={{ rotate: -10, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 10, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                  />
                </div>
              )}
              <motion.p
                className="mt-6 text-gray-300 text-sm font-medium tracking-wider"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Loading {shuffledStack[currentIndex]?.name}...
              </motion.p>
            </motion.div>
          ) : (
            <motion.div 
              className="flex flex-col items-center gap-6 z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative group">
                <motion.img
                  layoutId="main-logo-img"
                  src="/logo.webp"
                  alt="Rohith's Logo"
                  className="w-28 h-28 sm:w-36 sm:h-36 object-contain rounded-full border-4 border-gradient-to-r from-indigo-500 to-purple-500 p-1 shadow-[0_0_60px_rgba(99,102,241,0.6)] hover:shadow-[0_0_80px_rgba(99,102,241,0.8)] transition-all duration-500 group-hover:scale-105"
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  whileHover={{ rotate: 5 }}
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <motion.h1
                layoutId="main-logo-text"
                className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-indigo-200 to-purple-200 whitespace-nowrap tracking-tight"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                initial={{ letterSpacing: "0.5em" }}
                animate={{ letterSpacing: "normal" }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                Rohith's Portfolio
              </motion.h1>
              
              <motion.div
                className="h-1 w-48 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
              
              <motion.p
                className="text-gray-400 text-sm font-light tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Welcome to my digital space
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- MAIN LANDING COMPONENT ---
const Landing = () => {
  const heroRef = useRef(null);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredTech, setHoveredTech] = useState(null);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About Me", href: "#about" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Certifications", href: "#certifications" },
  ];

  const techStack = [
    { 
      name: "Deep Learning", 
      icon: "/DeepLearning.webp",
      description: "Building intelligent neural networks",
      color: "from-purple-500 to-pink-500"
    },
    { 
      name: "Express.js", 
      icon: "/express-js.webp",
      description: "Robust backend API development",
      color: "from-gray-700 to-gray-900"
    },
    { 
      name: "Figma", 
      icon: "/Figma-logo.webp",
      description: "UI/UX design & prototyping",
      color: "from-pink-500 to-purple-500"
    },
    { 
      name: "MongoDB", 
      icon: "/Mongodb.webp",
      description: "NoSQL database architecture",
      color: "from-green-500 to-emerald-600"
    },
    { 
      name: "Node.js", 
      icon: "/Node.js_logo.svg.webp",
      description: "Server-side JavaScript runtime",
      color: "from-green-600 to-green-800"
    },
    { 
      name: "Python", 
      icon: "/Python.webp",
      description: "Data science & automation",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      name: "React", 
      icon: "/React.webp",
      description: "Interactive UI components",
      color: "from-cyan-400 to-blue-500"
    },
    { 
      name: "Tailwind CSS", 
      icon: "/Tailwind_CSS_Logo.webp",
      description: "Utility-first CSS framework",
      color: "from-teal-400 to-cyan-500"
    },
    { 
      name: "Grafana", 
      icon: "/Grafana.webp",
      description: "Monitoring & observability",
      color: "from-orange-500 to-red-500"
    },
    { 
      name: "HuggingFace", 
      icon: "/HuggingFace.webp",
      description: "ML model deployment platform",
      color: "from-yellow-400 to-orange-500"
    },
    { 
      name: "GCP", 
      icon: "/gcp.webp",
      description: "Cloud infrastructure & services",
      color: "from-blue-400 to-blue-600"
    },
    { 
      name: "Docker", 
      icon: "/Docker.webp",
      description: "Container orchestration",
      color: "from-blue-500 to-blue-700"
    },
  ];

  const sendEmail = useCallback((e) => {
    e.preventDefault();
    const form = e.target;
    
    // Add loading state to button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="flex items-center justify-center"><span class="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></span>Sending...</span>';
    submitBtn.disabled = true;
    
    emailjs
      .sendForm("service_sh057qd", "template_2vmky28", form, "CcFtpOjqJJUhsgyIK")
      .then(
        () => {
          alert("Message sent successfully!");
          setContactModalOpen(false);
          form.reset();
        },
        (error) => {
          alert(`Failed to send message: ${error.text}`);
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      )
      .finally(() => {
        if (!submitBtn.disabled) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      });
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const hero = heroRef.current;
    const timer = setTimeout(() => {
      if (hero) {
        // Enhanced parallax effect
        gsap.fromTo(
          hero.querySelector(".hero-bg-overlay"),
          { opacity: 0.7 },
          {
            opacity: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        // Staggered text animation
        const heroTextElements = hero.querySelectorAll(".hero-text-anim > div > span > span");
        if (heroTextElements.length > 0) {
          gsap.fromTo(
            heroTextElements,
            { 
              opacity: 0, 
              y: 50,
              rotationX: -20 
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              ease: "back.out(1.7)",
              stagger: 0.15,
              duration: 1.2,
              scrollTrigger: {
                trigger: hero,
                start: "top 70%",
                end: "top 30%",
                scrub: true,
              },
            }
          );
        }

        // Floating elements animation
        const floatingElements = hero.querySelectorAll(".floating-element");
        floatingElements.forEach((el, i) => {
          gsap.to(el, {
            y: 20 * (i % 2 === 0 ? 1 : -1),
            duration: 3 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading]);

  const toggleMainMenu = useCallback(() => setMainMenuOpen((prev) => !prev), []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMainMenuOpen(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black text-white relative selection:bg-indigo-500/30 selection:text-white antialiased overflow-x-hidden">
      <CustomCursor />

      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-500/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {isLoading && (
          <TechStackLoader techStack={techStack} onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20,
            delay: 0.3 
          }}
          className="sticky top-0 z-[1000] backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-2xl shadow-black/40"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
            <motion.a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="flex items-center space-x-4 cursor-pointer-interactive group relative"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <motion.img
                  layoutId="main-logo-img"
                  src="/logo.webp"
                  alt="Rohith's Logo"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-full border-2 border-gradient-to-r from-indigo-500 to-purple-500 p-0.5 group-hover:border-white transition-all duration-300 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-indigo-500/50"
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="flex flex-col">
                <motion.h1
                  layoutId="main-logo-text"
                  className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-indigo-200 to-purple-200 group-hover:from-white group-hover:via-indigo-100 group-hover:to-purple-100 transition-all duration-300 tracking-tight"
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                  Rohith's Portfolio
                </motion.h1>
                <span className="text-xs text-gray-400 font-light tracking-wider group-hover:text-gray-300 transition-colors">
                  Developer & Designer
                </span>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <button
                onClick={toggleMainMenu}
                className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer-interactive border border-white/10 hover:border-indigo-500/50"
                aria-label="Toggle menu"
              >
                <div className="relative">
                  {mainMenuOpen ? (
                    <FaTimes className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                  ) : (
                    <FaBars className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                  )}
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 rounded-lg blur-sm transition-all duration-300" />
                </div>
              </button>
            </motion.div>
          </div>

          <AnimatePresence>
            {mainMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full left-0 right-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95 backdrop-blur-2xl border-t border-white/10 shadow-2xl md:rounded-b-2xl md:mx-4 lg:mx-auto lg:max-w-lg md:right-4 md:left-auto overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
                <nav className="relative px-6 py-6 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="group relative flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 transition-all duration-300 overflow-hidden"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full group-hover:scale-125 transition-transform duration-300" />
                        <span className="text-gray-300 group-hover:text-white font-medium transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <FaArrowRight className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}

      <main className="flex-grow isolate relative z-10">
        {/* Hero Section */}
        <section
          ref={heroRef}
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black"
        >
          {/* Animated background */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 opacity-20 bg-[url('/img_9.webp')] bg-cover bg-center bg-fixed scale-105"
              style={{ 
                backgroundImage: "url('/img_9.webp')",
                filter: "blur(0.5px) brightness(0.7)"
              }}
            />
            <div className="hero-bg-overlay absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/20 to-black/80" />
            
            {/* Floating elements */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i}
                className="floating-element absolute w-64 h-64 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 10}%`,
                  transform: `scale(${0.5 + i * 0.1})`
                }}
              />
            ))}
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: isLoading ? 0 : 1.0, ease: "easeOut" }}
            >
              <div className="hero-text-anim mb-8">
                <SplitText
                  text="Crafting Digital Experiences"
                  className="text-5xl sm:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-indigo-100 to-purple-100 text-center !leading-[1.1] tracking-tight"
                  delay={20}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,60px,0) rotateX(-30deg)",
                    filter: "blur(10px)"
                  }}
                  animationTo={{
                    opacity: 1,
                    transform: "translate3d(0,0,0) rotateX(0deg)",
                    filter: "blur(0px)"
                  }}
                  easing="back.out(1.7)"
                  textAlign="center"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: isLoading ? 0 : 1.3, ease: "easeOut" }}
              className="mt-8 mb-6 h-16"
            >
              <InteractiveText className="cursor-pointer-interactive text-lg" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: isLoading ? 0 : 1.5, ease: "easeOut" }}
              className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-gray-300/80 leading-relaxed font-light"
            >
              Transforming ideas into elegant, high-performance digital solutions through innovative technology and thoughtful design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: isLoading ? 0 : 1.7, 
                type: "spring",
                stiffness: 150 
              }}
              className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6"
            >
              <motion.a
                href="#projects"
                onClick={(e) => handleNavClick(e, "#projects")}
                className="group relative px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-lg font-semibold text-white overflow-hidden shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore My Work
                  <FaArrowRight className="w-4 h-4 transform -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </motion.a>
              
              <motion.button
                onClick={() => setContactModalOpen(true)}
                className="group relative px-10 py-4 border-2 border-white/20 hover:border-indigo-400 rounded-xl text-lg font-semibold text-gray-300 hover:text-white overflow-hidden transition-all duration-300 transform hover:scale-105"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get In Touch
                  <FaExternalLinkAlt className="w-4 h-4 transform -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-500 tracking-wider">SCROLL</span>
                <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
                  <motion.div
                    className="w-1.5 h-1.5 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full mx-auto"
                    animate={{ y: [0, 16, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="mb-16"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                <span className="text-sm font-semibold tracking-widest text-indigo-400 uppercase">About Me</span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-100 via-indigo-100 to-purple-100 bg-clip-text text-transparent">
                The Developer Behind
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">The Code</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-10 bg-gradient-to-br from-white/5 to-black/30 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all duration-300 shadow-2xl shadow-black/50">
                <div className="flex items-start gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-white/10">
                      <FaStar className="w-8 h-8 text-indigo-400" />
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white mb-3">My Philosophy</h3>
                    <p className="text-gray-300/90 text-lg leading-relaxed">
                      I believe that exceptional digital experiences are born from the perfect marriage of 
                      <span className="font-semibold text-indigo-400"> cutting-edge technology</span> and 
                      <span className="font-semibold text-purple-400"> thoughtful design</span>. With deep expertise in 
                      <span className="font-semibold text-cyan-400"> full-stack development</span> and 
                      <span className="font-semibold text-pink-400"> AI/ML solutions</span>, I transform complex challenges 
                      into elegant, scalable solutions that push the boundaries of what's possible.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  {[
                    { title: "100+", subtitle: "Projects Completed", color: "from-indigo-500 to-blue-500" },
                    { title: "3+", subtitle: "Years Experience", color: "from-purple-500 to-pink-500" },
                    { title: "∞", subtitle: "Passion for Learning", color: "from-cyan-500 to-teal-500" },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      className="p-6 bg-gradient-to-br from-white/5 to-black/30 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300"
                      whileHover={{ y: -5, scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      viewport={{ once: true }}
                    >
                      <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                        {stat.title}
                      </div>
                      <div className="text-gray-400 font-medium">{stat.subtitle}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 150 }}
              viewport={{ once: true, amount: 0.5 }}
              className="mt-12"
            >
              <a
                href="https://drive.google.com/file/d/1fNS3dupfxzsSNZhXiHlcX7WIHVcKmaGx/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/30 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View My Resume
              </a>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="mb-20"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                <span className="text-sm font-semibold tracking-widest text-cyan-400 uppercase">Tech Stack</span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Tools of Innovation
              </h2>
              
              <p className="text-gray-300/80 text-xl max-w-3xl mx-auto leading-relaxed">
                A carefully curated arsenal of technologies that power my journey in creating
                <span className="font-semibold text-cyan-400"> performant</span>,
                <span className="font-semibold text-blue-400"> scalable</span>, and
                <span className="font-semibold text-purple-400"> intuitive</span> digital experiences.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="group relative"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ 
                    y: -8,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    type: "spring", 
                    stiffness: 200, 
                    damping: 20 
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  onMouseEnter={() => setHoveredTech(index)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-black/30 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 h-full flex flex-col items-center justify-center gap-4 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
                    <div className="relative">
                      <motion.img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-16 h-16 object-contain group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-300"
                        animate={{ 
                          rotate: hoveredTech === index ? [0, 5, -5, 0] : 0
                        }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className={`absolute -inset-4 bg-gradient-to-r ${tech.color} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    </div>
                    
                    <div className="text-center">
                      <h3 className={`text-lg font-bold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent mb-2`}>
                        {tech.name}
                      </h3>
                      <p className="text-gray-400/90 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {tech.description}
                      </p>
                    </div>
                    
                    <motion.div
                      className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredTech === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-24 mx-auto w-1/3 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: "circOut" }}
              viewport={{ once: true }}
            />
            
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
                <a
                  href="#projects"
                  onClick={(e) => handleNavClick(e, "#projects")}
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-semibold text-white overflow-hidden shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    See Projects
                    <FaArrowRight className="w-4 h-4 transform -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                
                <button className="group relative px-8 py-4 border-2 border-cyan-500/40 text-cyan-400 rounded-xl font-semibold hover:border-cyan-400/70 hover:bg-cyan-500/10 transition-all duration-300 hover:text-cyan-300 transform hover:scale-105">
                  <span className="relative z-10 flex items-center gap-3">
                    Tech Insights
                    <FaExternalLinkAlt className="w-4 h-4 transform -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                <span className="text-sm font-semibold tracking-widest text-purple-400 uppercase">Projects</span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Work
              </h2>
              
              <p className="text-gray-300/80 text-xl max-w-3xl mx-auto leading-relaxed">
                A showcase of my most impactful projects, blending innovative technology with elegant design solutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Project 1: Plant Disease Detection */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group"
              >
                <SpotlightCard className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-black/30 backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition-all duration-300 h-full shadow-2xl shadow-black/50 group-hover:shadow-indigo-500/20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16" />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                          <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                            Plant Disease Detection
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">AI-Powered Web Application</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-sm font-medium rounded-full border border-indigo-500/30">
                        AI/ML
                      </span>
                    </div>
                    
                    <div className="relative mb-8 rounded-2xl overflow-hidden border border-white/10 group-hover:border-indigo-500/50 transition-colors shadow-xl">
                      <div className="aspect-video relative overflow-hidden">
                        <video
                          loading="lazy"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                          preload="metadata"
                        >
                          <source src="/project-demo.webm" type="video/webm" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    </div>
                    
                    <p className="text-gray-300/80 leading-relaxed mb-8">
                      Advanced AI application that identifies plant diseases from images using convolutional neural networks, 
                      providing detailed analysis and preventive measures with real-time processing capabilities.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                      <div className="flex items-center gap-4">
                        <a
                          href="https://github.com/rohith-2809/mern-test"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
                        >
                          <svg className="w-5 h-5 group-hover/link:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">Source Code</span>
                        </a>
                        <div className="w-px h-4 bg-white/20" />
                        <a
                          href="https://mern-test-client.onrender.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          <svg className="w-5 h-5 group-hover/link:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span className="font-medium">Live Demo</span>
                        </a>
                      </div>
                      
                      <a
                        href="https://mern-test-client.onrender.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30"
                      >
                        <span>View Project</span>
                        <FaArrowRight className="w-4 h-4 transform -translate-x-1 group-hover/btn:translate-x-0 transition-transform" />
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>

              {/* Project 2: DocuAgent AI */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group"
              >
                <SpotlightCard className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-black/30 backdrop-blur-sm border border-white/10 hover:border-emerald-500/50 transition-all duration-300 h-full shadow-2xl shadow-black/50 group-hover:shadow-emerald-500/20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/10 to-teal-500/10 rounded-full -translate-y-16 translate-x-16" />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                          <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l-1.414-1.414M19.778 19.778l-1.414-1.414M18.364 5.636l1.414-1.414M4.222 19.778l1.414-1.414M12 12a3 3 0 100-6 3 3 0 000 6z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                            DocuAgent AI
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">Intelligent Documentation Automation</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full border border-emerald-500/30">
                        Automation
                      </span>
                    </div>
                    
                    <div className="relative mb-8 rounded-2xl overflow-hidden border border-white/10 group-hover:border-emerald-500/50 transition-colors shadow-xl">
                      <div className="aspect-video relative overflow-hidden">
                        <video
                          loading="lazy"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                          preload="metadata"
                        >
                          <source src="/DocuAgent-demo.webm" type="video/webm" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    </div>
                    
                    <p className="text-gray-300/80 leading-relaxed mb-8">
                      AI-powered agent that automates software documentation by generating UML diagrams and 
                      comprehensive code explanations directly from codebases, enhancing developer productivity.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                      <div className="flex items-center gap-4">
                        <a
                          href="https://github.com/rohith-2809"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                          <svg className="w-5 h-5 group-hover/link:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">Source Code</span>
                        </a>
                        <div className="w-px h-4 bg-white/20" />
                        <a
                          href="https://docuagent-2vp4.onrender.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors"
                        >
                          <svg className="w-5 h-5 group-hover/link:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span className="font-medium">Live Demo</span>
                        </a>
                      </div>
                      
                      <a
                        href="https://docuagent-2vp4.onrender.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
                      >
                        <span>View Project</span>
                        <FaArrowRight className="w-4 h-4 transform -translate-x-1 group-hover/btn:translate-x-0 transition-transform" />
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            </div>

            {/* Additional projects grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Project 3: AI Model Deployment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="group"
              >
                <SpotlightCard className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-black/30 backdrop-blur-sm border border-white/10 hover:border-teal-500/50 transition-all duration-300 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-white/10">
                      <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A7.962 7.962 0 0112 2c2.497 0 4.792.995 6.486 2.628C21.5 6.914 22 9.828 22 12c0 2.172-.5 5-2.343 6.657z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">AI Model Deployment</h3>
                      <p className="text-sm text-gray-400">MLOps & Production Systems</p>
                    </div>
                  </div>
                  <p className="text-gray-300/80 text-sm leading-relaxed mb-6">
                    End-to-end MLOps pipeline deploying machine learning models with real-time prediction APIs.
                  </p>
                  <a
                    href="https://huggingface.co/vittamraj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    <span className="font-medium">Explore Models</span>
                    <FaArrowRight className="w-3 h-3" />
                  </a>
                </SpotlightCard>
              </motion.div>

              {/* Project 4: Employee Management */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="group"
              >
                <SpotlightCard className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-black/30 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-white/10">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Employee Management</h3>
                      <p className="text-sm text-gray-400">React & Local Storage App</p>
                    </div>
                  </div>
                  <p className="text-gray-300/80 text-sm leading-relaxed mb-6">
                    Fast, responsive application built with modern React stack for efficient employee data management.
                  </p>
                  <a
                    href="https://employee-management-system-jdxe.onrender.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <span className="font-medium">Live Demo</span>
                    <FaArrowRight className="w-3 h-3" />
                  </a>
                </SpotlightCard>
              </motion.div>
            </div>

            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <a
                href="https://github.com/rohith-2809"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-white/20 hover:border-purple-500/50 text-gray-300 hover:text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
                <span>View All Projects on GitHub</span>
                <FaArrowRight className="w-4 h-4 transform -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="mb-16"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                <span className="text-sm font-semibold tracking-widest text-blue-400 uppercase">Experience</span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Professional Journey
              </h2>
              
              <p className="text-gray-300/80 text-xl max-w-3xl mx-auto leading-relaxed">
                At BuildFlow Technologies Pvt. Ltd., I transformed user experiences and built scalable 
                web applications using cutting-edge MERN stack technologies.
              </p>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.2, 
                type: "spring", 
                stiffness: 120 
              }}
              viewport={{ once: true }}
            >
              <a
                href="https://drive.google.com/file/d/1G8Xkw0S_TF99Bz3gbyvjwFU70QEIsE0g/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <TiltedCard
                  imageSrc="/Intern.webp"
                  altText="Internship Certificate from Buildflow Technologies"
                  captionText="Internship Certificate"
                  containerHeight="400px"
                  containerWidth="320px"
                  imageHeight="400px"
                  imageWidth="320px"
                  scaleOnHover={1.05}
                  rotateAmplitude={8}
                  showMobileWarning={true}
                  showTooltip={true}
                  tooltipText="View Certificate"
                  className="shadow-2xl shadow-blue-900/30 group-hover:shadow-2xl group-hover:shadow-blue-500/40"
                />
                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm group-hover:text-blue-400 transition-colors">
                    Click to view full certificate
                  </p>
                </div>
              </a>
            </motion.div>

            <motion.div
              className="mt-16 max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-white/5 to-black/30 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Key Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Enhanced user experience across multiple platforms",
                  "Built scalable full-stack applications with MERN",
                  "Implemented end-to-end system integrations",
                  "Optimized application performance by 40%"
                ].map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <span className="text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
                <span className="text-sm font-semibold tracking-widest text-pink-400 uppercase">Certifications</span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Verified Expertise
              </h2>
              
              <p className="text-gray-300/80 text-xl max-w-3xl mx-auto leading-relaxed">
                Professional certifications from Google and leading platforms, validating expertise in 
                cutting-edge technologies through rigorous coursework and hands-on projects.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Google Machine Learning",
                  link: "https://coursera.org/share/27665abf668c0479e649f09c01ce75b9",
                  image: "/MachineLearningPreview.webp",
                  description: "Mastering predictive algorithms and data-driven model development",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  title: "Google AI Essentials",
                  link: "https://coursera.org/share/e76522223bd36da3f4a8feeb93d2d2f7",
                  image: "/AiPreview.webp",
                  description: "Neural networks and AI system implementation",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Google UX Design",
                  link: "https://coursera.org/share/c617189e47b33926082172340be87f71",
                  image: "/PreviewUX.webp",
                  description: "User-centered design principles and research",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  title: "Advanced Data Analytics",
                  link: "https://coursera.org/share/09e30d48b4d38a664c30b12795d8b144",
                  image: "/Google Advanced Data Analytics Capstone.webp",
                  description: "Data patterns, ML models, and visualization techniques",
                  gradient: "from-orange-500 to-red-500"
                },
                {
                  title: "Cybersecurity Automation",
                  link: "https://coursera.org/share/b00ad7de4b6962060b8d47800927b352",
                  image: "/Google Python.webp",
                  description: "Python scripting for automated threat detection",
                  gradient: "from-yellow-500 to-orange-500"
                },
                {
                  title: "Network Security",
                  link: "https://coursera.org/share/9bd3492f4984a22b035647ca0e151226",
                  image: "/Google networking.webp",
                  description: "Network architecture and system hardening",
                  gradient: "from-indigo-500 to-purple-500"
                }
              ].map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    delay: idx * 0.1 
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="group"
                >
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block h-full rounded-2xl bg-gradient-to-br from-white/5 to-black/30 backdrop-blur-sm border border-white/10 hover:border-white/30 overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${cert.gradient} text-white text-xs font-semibold rounded-full`}>
                        Google Certified
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-pink-400 transition-all duration-300">
                        {cert.title}
                      </h3>
                      <p className="text-gray-400/90 text-sm leading-relaxed mb-6">
                        {cert.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          <span>View Credential</span>
                          <FaArrowRight className="w-3 h-3 transform -translate-x-1 group-hover:translate-x-0 transition-transform" />
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                          <FaExternalLinkAlt className="w-3 h-3 text-gray-400 group-hover:text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="get-quote" className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-indigo-500/5 to-purple-500/5 blur-3xl"
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                }}
                transition={{
                  duration: 20 + i * 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                <span className="text-sm font-semibold tracking-widest text-indigo-400 uppercase">Let's Connect</span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-100 via-indigo-100 to-purple-100 bg-clip-text text-transparent">
                Start Your Project
              </h2>
              
              <p className="text-gray-300/80 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
                Have an idea? Let's collaborate to create something extraordinary. 
                Reach out today and let's build the future together.
              </p>
              
              <motion.button
                onClick={() => setContactModalOpen(true)}
                className="group relative px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-lg font-semibold text-white overflow-hidden shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get In Touch
                  <FaArrowRight className="w-5 h-5 transform -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={(e) => e.target === e.currentTarget && setContactModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl shadow-indigo-500/20 overflow-hidden"
            >
              <button
                onClick={() => setContactModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
                aria-label="Close"
              >
                <FaTimes className="w-5 h-5" />
              </button>
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    Let's Connect
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Share your project details and I'll get back to you within 24 hours.
                  </p>
                </div>
                
                <form className="space-y-6" onSubmit={sendEmail}>
                  {[
                    {
                      name: "name",
                      type: "text",
                      placeholder: "Your Name",
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      )
                    },
                    {
                      name: "email",
                      type: "email",
                      placeholder: "you@example.com",
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25-2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      )
                    }
                  ].map((field) => (
                    <div key={field.name} className="group">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {field.icon}
                          </svg>
                        </div>
                        <input
                          type={field.type}
                          name={field.name}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder-gray-500 transition-all duration-300"
                          placeholder={field.placeholder}
                        />
                      </div>
                    </div>
                  ))}
                  
                  <div className="group">
                    <textarea
                      name="message"
                      rows="4"
                      required
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder-gray-500 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative bg-gradient-to-t from-black via-gray-900 to-black border-t border-white/10 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <img
                  src="/logo.webp"
                  alt="Logo"
                  className="w-10 h-10 rounded-full border border-white/10"
                />
                <span className="text-xl font-bold text-white">Rohith's Portfolio</span>
              </div>
              <p className="text-gray-400 text-sm max-w-md">
                Crafting digital experiences through innovative technology and thoughtful design.
              </p>
            </div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              transition={{ staggerChildren: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              {[
                {
                  href: "https://x.com/rohithofficial5?s=21&t=cVo-4UEJaqOqaL-meqeikQ",
                  label: "Twitter",
                  icon: (
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  )
                },
                {
                  href: "https://www.instagram.com/_rohtzz_",
                  label: "Instagram",
                  icon: (
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  )
                },
                {
                  href: "https://www.linkedin.com/in/rohith-vittamraj-0ab76a313",
                  label: "LinkedIn",
                  icon: (
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  )
                },
                {
                  href: "https://github.com/rohith-2809",
                  label: "GitHub",
                  icon: (
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                  )
                }
              ].map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    {social.icon}
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Rohith Vittamraj. All rights reserved.
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> • </span>
              Crafted with passion and precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
