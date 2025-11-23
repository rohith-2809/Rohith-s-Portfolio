import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import InteractiveText from "./Effects/InteractiveText";
import SplitText from "./Effects/SplitText";
import SpotlightCard from "./Effects/SpotlightCard";
import TiltedCard from "./Effects/TiltedCard";
import CustomCursor from "./Effects/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENT: Intro Animation Loader ---
const TechStackLoader = ({ techStack, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState("shuffle"); // 'shuffle' | 'logo-reveal'

  useEffect(() => {
    // Phase 1: Shuffle Icons
    if (currentIndex < techStack.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    } else {
      // Shuffle done, show main logo
      setPhase("logo-reveal");
      
      // Keep main logo in center for 1.2s, then trigger the fly-to-nav
      const timeout = setTimeout(() => {
        onComplete();
      }, 1200); 
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, techStack.length, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      // We animate the background opacity out when the component unmounts
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Container for the centered content */}
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        
        <AnimatePresence mode="wait">
          {phase === "shuffle" ? (
            // --- Phase 1: Tech Stack Shuffle ---
            <motion.div
              key="shuffle"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1.2, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)", transition:{duration: 0.3} }}
              className="flex flex-col items-center"
            >
              {techStack[currentIndex] && (
                <img
                  src={techStack[currentIndex].icon}
                  alt="Tech Icon"
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                />
              )}
            </motion.div>
          ) : (
            // --- Phase 2: Main Logo & Text (Centered) ---
            // NOTICE: The layoutId props here match the ones in the Navbar
            <motion.div className="flex items-center gap-4 z-50">
                <motion.img
                  layoutId="main-logo-img"
                  src="/logo.webp"
                  alt="Rohith's Logo"
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-full border-4 border-indigo-500/50 shadow-[0_0_50px_rgba(99,102,241,0.5)]"
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
                <motion.h1
                  layoutId="main-logo-text"
                  className="text-3xl sm:text-5xl font-bold text-gray-100 whitespace-nowrap"
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                  Rohith's Portfolio
                </motion.h1>
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
  
  // isLoading controls whether we see the Loader or the actual Page
  const [isLoading, setIsLoading] = useState(true);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About Me", href: "#about" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Certifications", href: "#certifications" },
  ];

  const techStack = [
    { name: "Deep Learning", icon: "/DeepLearning.webp" },
    { name: "Express.js", icon: "/express-js.webp" },
    { name: "Figma", icon: "/Figma-logo.webp" },
    { name: "MongoDB", icon: "/Mongodb.webp" },
    { name: "Node.js", icon: "/Node.js_logo.svg.webp" },
    { name: "Python", icon: "/Python.webp" },
    { name: "React", icon: "/React.webp" },
    { name: "Tailwind CSS", icon: "/Tailwind_CSS_Logo.webp" },
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    const form = e.target;
    emailjs.sendForm("service_sh057qd", "template_2vmky28", form, "CcFtpOjqJJUhsgyIK")
      .then(() => { alert("Message sent!"); setContactModalOpen(false); form.reset(); },
      (error) => { alert(`Failed: ${error.text}`); });
  };
  
  useEffect(() => {
    // Only initialize GSAP after loading is complete and layout is settled
    if (isLoading) return;

    const hero = heroRef.current;
    // Small delay to ensure the shared element transition finishes before scroll triggers attach
    const timer = setTimeout(() => {
        if (hero) {
          gsap.fromTo( hero, { opacity: 1 }, { opacity: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.5, },
          });
          
          const heroTextElements = hero.querySelectorAll(".hero-text-anim > div > span > span");
          if (heroTextElements.length > 0) {
            gsap.fromTo( heroTextElements,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, ease: "power3.out", stagger: 0.1, duration: 0.8,
                scrollTrigger: { trigger: hero, start: "top 70%", end: "top 40%", scrub: 1, },
              }
            );
          }
        }
    }, 1000); 

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading]); 

  const toggleMainMenu = () => setMainMenuOpen((prev) => !prev);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMainMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative selection:bg-indigo-500 selection:text-white antialiased overflow-x-hidden">
      <CustomCursor />

      {/* --- 1. THE LOADER --- */}
      {/* We use AnimatePresence to allow the loader's black background to fade out */}
      <AnimatePresence>
        {isLoading && (
          <TechStackLoader 
            techStack={techStack} 
            onComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>

      {/* --- 2. THE NAVBAR (Revealed immediately when loading stops) --- */}
      {/* By using layoutId, the Logo and Text will 'fly' from the Loader position to here */}
      {!isLoading && (
        <motion.header 
          // Animate the background glass effect fading in, NOT the logo (it flies in)
          initial={{ backgroundColor: "rgba(0,0,0,0)", borderBottomColor: "rgba(0,0,0,0)" }}
          animate={{ backgroundColor: "rgba(0,0,0,0.75)", borderBottomColor: "rgba(38,38,38,0.6)" }}
          transition={{ duration: 1, delay: 0.5 }} // Background fades in slowly after logo arrives
          className="sticky top-0 z-[1000] backdrop-blur-lg shadow-2xl shadow-black/20 border-b border-neutral-800/60"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center py-3.5 px-4 sm:px-6 lg:px-8">
            <motion.a 
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="flex items-center space-x-3.5 cursor-pointer-interactive group"
            >
              {/* TARGET: The Logo lands here */}
              <motion.img 
                layoutId="main-logo-img"
                src="/logo.webp" 
                alt="Rohith's Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-full border-2 border-indigo-500/60 group-hover:border-indigo-400"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
              {/* TARGET: The Text lands here */}
              <motion.h1 
                layoutId="main-logo-text"
                className="text-xl sm:text-2xl font-semibold text-gray-100 group-hover:text-white tracking-tight"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                Rohith's Portfolio
              </motion.h1>
            </motion.a>

            {/* Hamburger / Nav Links fade in separately */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            > 
              <button
                onClick={toggleMainMenu}
                className="text-gray-300 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 cursor-pointer-interactive"
              >
                {mainMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </motion.div>
          </div>

          <AnimatePresence>
            {mainMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-t border-b border-neutral-800/70 shadow-2xl md:rounded-b-lg md:mx-4 lg:mx-auto lg:max-w-md md:right-4 md:left-auto"
              >
                <nav className="px-4 py-4 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={index} href={item.href} onClick={(e) => handleNavClick(e, item.href)}
                      className="block text-gray-200 hover:text-white px-4 py-2.5 rounded-lg hover:bg-indigo-600/40 transition-all duration-200"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.07 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}

      {/* --- 3. MAIN PAGE CONTENT (Fades in after logo movement) --- */}
      <main className="flex-grow isolate">
        <section ref={heroRef} id="home" className="relative bg-black text-white py-28 md:py-36 min-h-[90vh] flex items-center bg-center bg-cover bg-fixed"
          style={{ backgroundImage: "url('/img_9.webp')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            {/* Delay animations until after the logo has flown to the corner */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: isLoading ? 0 : 1.0, ease: "easeOut" }} 
            >
              <div className="hero-text-anim"> 
                <SplitText text="Embark on a New Journey"
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white text-center !leading-tight"
                  delay={30} animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0) rotateX(-20deg)", }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0) rotateX(0deg)" }}
                  easing="circOut" textAlign="center"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: isLoading ? 0 : 1.3, ease: "easeOut" }} 
              className="mt-5 mb-3 h-12" 
            >
              <InteractiveText className="cursor-pointer-interactive"/>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: isLoading ? 0 : 1.5, ease: "easeOut" }}
              className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200/90 leading-relaxed" 
            >
              Crafting cutting-edge digital solutions that bring ideas to life.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.9 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              transition={{ duration: 0.8, delay: isLoading ? 0 : 1.7, type: "spring" }}
              className="mt-10 flex justify-center gap-4" 
            >
              <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")}
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-lg text-base font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105" >
                Explore My Work ✨
              </a>
            </motion.div>
          </div>
        </section>

        {/* About Me Section - KEPT AS IS */}
        <section id="about" className="py-20 md:py-24 bg-black relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease:"easeOut" }} viewport={{ once: true, amount: 0.3 }} >
              <h2 className="text-4xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative group">
                About Me
                <span className="absolute bottom-0 left-1/2 w-36 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform -translate-x-1/2 translate-y-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full group-hover:w-40 ease-out"></span>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }} viewport={{ once: true, amount: 0.3 }}
              className="p-8 bg-neutral-900/70 backdrop-blur-sm rounded-xl border border-neutral-800/80 hover:border-indigo-500/50 transition-all duration-300 mb-12 shadow-xl hover:shadow-indigo-500/10" >
              <p className="text-lg md:text-xl text-gray-200/95 leading-relaxed">
                I blend cutting-edge technology with creative thinking to build
                digital experiences that solve real problems. With deep
                expertise in <span className="font-semibold text-indigo-400">MERN stack</span>
                , <span className="font-semibold text-cyan-400">AI/ML solutions</span>, and{" "}
                <span className="font-semibold text-purple-400">UI/UX design</span>, I thrive
                on pushing the boundaries of what's possible. Passionate about
                technology’s ever-evolving landscape, I constantly explore new
                trends, frameworks, and innovations to stay ahead of the curve.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 150 }} viewport={{ once: true, amount: 0.5 }} >
              <a href="https://drive.google.com/file/d/1fNS3dupfxzsSNZhXiHlcX7WIHVcKmaGx/view?usp=sharing" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30 focus:outline-none focus:ring-4 focus:ring-indigo-500/50" >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View My Resume
              </a>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="relative py-20 md:py-28 bg-black overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-cyan-600/25 to-blue-600/25 rounded-full blur-3xl -top-32 -left-32 animate-pulse"></div>
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-600/25 to-pink-600/25 rounded-full blur-3xl -bottom-32 -right-32 animate-pulse delay-700"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease:"easeOut" }} viewport={{ once: true, amount: 0.3 }} >
              <div className="mb-16 md:mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-5">
                  Powering Innovation
                </h2>
                <p className="text-gray-300/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                  Combining cutting-edge technologies with modern development
                  practices to create
                  <span className="text-cyan-400 font-semibold"> performant</span>
                  ,<span className="text-blue-400 font-semibold"> scalable</span>,
                  and
                  <span className="text-purple-400 font-semibold"> intuitive</span> solu
