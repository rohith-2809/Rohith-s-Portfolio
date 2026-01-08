import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes, FaEnvelope, FaUser, FaPaperPlane } from "react-icons/fa";
import InteractiveText from "./Effects/InteractiveText";
import SplitText from "./Effects/SplitText";
import SpotlightCard from "./Effects/SpotlightCard";
import TiltedCard from "./Effects/TiltedCard";
import CustomCursor from "./Effects/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENT: Intro Animation Loader (Optimized) ---
const IntroOverlay = ({ techStack, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(true);
  const [isFlying, setIsFlying] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const showNextLogo = (index) => {
      if (index < techStack.length) {
        setCurrentIndex(index);
        timerRef.current = setTimeout(() => showNextLogo(index + 1), 280);
      } else {
        setIsShuffling(false);
        
        timerRef.current = setTimeout(() => {
          setIsFlying(true);
          
          setTimeout(() => {
            onComplete();
            document.body.style.overflow = "auto";
          }, 1500);
        }, 1200);
      }
    };

    showNextLogo(0);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [techStack, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      initial={{ backgroundColor: "#000000" }}
      animate={{ 
        backgroundColor: isFlying ? "rgba(0,0,0,0)" : "#000000" 
      }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
    >
      <AnimatePresence mode="wait">
        {isShuffling && (
          <motion.div
            key="shuffle-container"
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              key={`tech-${currentIndex}`}
              src={techStack[currentIndex]?.icon}
              alt="Tech"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1.2, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(4px)" }}
              transition={{ duration: 0.25 }}
              className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
              loading="eager"
            />
            <motion.p
              key={`text-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-indigo-400 font-mono tracking-widest uppercase text-sm"
            >
              {techStack[currentIndex]?.name}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isShuffling && (
        <motion.div
          className="absolute z-50 flex items-center gap-3"
          initial={{ 
            top: "50%", 
            left: "50%", 
            x: "-50%", 
            y: "-50%", 
            scale: 1.5 
          }}
          animate={isFlying ? { 
            top: "24px",
            left: "8%",
            x: "0%", 
            y: "0%", 
            scale: 1 
          } : { 
            top: "50%", 
            left: "50%", 
            x: "-50%", 
            y: "-50%", 
            scale: 1.5 
          }}
          transition={{ 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1
          }}
        >
          <img
            src="/logo.webp"
            alt="Rohith's Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-full border-2 border-indigo-500/60 shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            loading="eager"
          />
          <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight whitespace-nowrap">
            Rohith's Portfolio
          </h1>
        </motion.div>
      )}
    </motion.div>
  );
};

// --- Floating Particles Background ---
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full"
          initial={{
            x: Math.random() * 100 + 'vw',
            y: Math.random() * 100 + 'vh',
            scale: 0
          }}
          animate={{
            x: [null, `+=${Math.random() * 100 - 50}px`],
            y: [null, `+=${Math.random() * 100 - 50}px`],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// --- MAIN LANDING COMPONENT ---
const Landing = () => {
  const heroRef = useRef(null);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const formRef = useRef(null);

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

  const handleAnimationComplete = () => {
    setIsLoading(false);
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Enhanced email sending with loading state
  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSendingEmail(true);
    
    try {
      await emailjs.sendForm(
        "service_sh057qd",
        "template_2vmky28",
        formRef.current,
        "CcFtpOjqJJUhsgyIK"
      );
      
      // Show success animation
      const submitBtn = e.target.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = '<span class="flex items-center justify-center"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Sent Successfully!</span>';
        submitBtn.classList.remove('from-indigo-600', 'to-purple-600');
        submitBtn.classList.add('from-green-500', 'to-emerald-600');
      }
      
      setTimeout(() => {
        setContactModalOpen(false);
        if (formRef.current) formRef.current.reset();
        setIsSendingEmail(false);
      }, 1500);
      
    } catch (error) {
      console.error('Email error:', error);
      alert('Failed to send message. Please try again.');
      setIsSendingEmail(false);
    }
  };
  
  // Optimized GSAP Scroll Animations
  useEffect(() => {
    if (!showContent) return;

    const ctx = gsap.context(() => {
      // Hero section parallax effect
      gsap.to(heroRef.current, {
        opacity: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Stagger animation for hero text
      const heroText = heroRef.current?.querySelectorAll(".hero-text-anim > div > span > span");
      if (heroText?.length) {
        gsap.from(heroText, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Subtle fade-in for sections
      gsap.utils.toArray("section").forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, [showContent]);

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
      <FloatingParticles />

      {/* --- INTRO OVERLAY --- */}
      <AnimatePresence>
        {isLoading && (
          <IntroOverlay 
            techStack={techStack} 
            onComplete={handleAnimationComplete} 
          />
        )}
      </AnimatePresence>

      {/* --- HEADER --- */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: !isLoading ? 1 : 0, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-[1000] backdrop-blur-lg shadow-2xl shadow-black/20 border-b border-neutral-800/60 bg-black/75"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center py-3.5 px-4 sm:px-6 lg:px-8">
          <motion.a 
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center space-x-3.5 cursor-pointer-interactive group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.img 
              src="/logo.webp" 
              alt="Rohith's Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-full border-2 border-indigo-500/60 group-hover:border-indigo-400 transition-all duration-300"
              whileHover={{ rotate: 5, scale: 1.1 }}
            />
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-100 group-hover:text-white tracking-tight">
              Rohith's Portfolio
            </h1>
          </motion.a>

          <motion.button
            onClick={toggleMainMenu}
            className="text-gray-300 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 cursor-pointer-interactive"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mainMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </motion.button>
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
                    className="block text-gray-200 hover:text-white px-4 py-2.5 rounded-lg hover:bg-indigo-600/40 transition-all duration-200 flex items-center group"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* --- MAIN CONTENT --- */}
      <motion.main 
        className="flex-grow isolate"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* HERO SECTION */}
        <section 
          ref={heroRef} 
          id="home" 
          className="relative bg-black text-white py-28 md:py-36 min-h-[90vh] flex items-center bg-center bg-cover bg-fixed"
          style={{ backgroundImage: "url('/img_9.webp')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-purple-900/20 backdrop-blur-[1px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }} 
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} 
            >
              <div className="hero-text-anim"> 
                <SplitText 
                  text="Embark on a New Journey"
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white text-center !leading-tight"
                  delay={20}
                  animationFrom={{ opacity: 0, y: 50 }}
                  animationTo={{ opacity: 1, y: 0 }}
                  easing="circOut"
                  textAlign="center"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }} 
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }} 
              className="mt-5 mb-3 h-12" 
            >
              <InteractiveText className="cursor-pointer-interactive"/>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }} 
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200/90 leading-relaxed" 
            >
              Crafting cutting-edge digital solutions that bring ideas to life.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.9 }} 
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30, scale: showContent ? 1 : 0.9 }} 
              transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
              className="mt-10 flex justify-center gap-4" 
            >
              <motion.a 
                href="#projects" 
                onClick={(e) => handleNavClick(e, "#projects")}
                className="relative inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-lg text-base font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  Explore My Work
                  <motion.span 
                    className="ml-2"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ✨
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="py-20 md:py-24 bg-black relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative inline-block">
                About Me
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.15 }} 
              viewport={{ once: true, amount: 0.3 }}
              className="relative p-8 bg-gradient-to-br from-neutral-900/70 to-black/50 backdrop-blur-sm rounded-xl border border-neutral-800/80 hover:border-indigo-500/50 transition-all duration-300 mb-12 shadow-2xl hover:shadow-indigo-500/20 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="text-lg md:text-xl text-gray-200/95 leading-relaxed relative z-10">
                I blend cutting-edge technology with creative thinking to build
                digital experiences that solve real problems. With deep
                expertise in <span className="font-semibold text-indigo-400">MERN stack</span>
                , <span className="font-semibold text-cyan-400">AI/ML solutions</span>, and{" "}
                <span className="font-semibold text-purple-400">UI/UX design</span>, I thrive
                on pushing the boundaries of what's possible. Passionate about
                technology's ever-evolving landscape, I constantly explore new
                trends, frameworks, and innovations to stay ahead of the curve.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.6, delay: 0.3, type: "spring" }} 
              viewport={{ once: true, amount: 0.5 }}
            >
              <motion.a 
                href="https://drive.google.com/file/d/1fNS3dupfxzsSNZhXiHlcX7WIHVcKmaGx/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View My Resume
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* TECH STACK SECTION */}
        <section id="tech-stack" className="relative py-20 md:py-28 bg-black overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-cyan-600/25 to-blue-600/25 rounded-full blur-3xl -top-32 -left-32 animate-pulse"></div>
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-600/25 to-pink-600/25 rounded-full blur-3xl -bottom-32 -right-32 animate-pulse delay-700"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true, amount: 0.3 }}
            >
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
                  <span className="text-purple-400 font-semibold"> intuitive</span> solutions.
                </p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6 place-items-center">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="group relative p-5 w-full h-52 md:h-56 rounded-xl bg-gradient-to-br from-neutral-900/80 to-black/60 border border-neutral-800/70 hover:border-cyan-500/60 transition-all duration-300 ease-out flex flex-col items-center justify-center cursor-pointer-interactive shadow-lg hover:shadow-cyan-500/20"
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.06, 
                    type: "spring", 
                    stiffness: 180 
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                  <motion.img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className="h-12 w-12 sm:h-14 sm:w-14 object-contain mb-2.5 relative z-10 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  />
                  <h3 className="relative z-10 text-base sm:text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-300">
                    {tech.name}
                  </h3>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-20 md:mt-24 mx-auto w-2/5 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewport={{ once: true }}
            />
            
            <motion.div 
              className="mt-12 md:mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300/90 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
                Every tool in my arsenal is carefully selected for its
                performance, ecosystem, and maintainability. I specialize in
                creating full-stack solutions that leverage AI capabilities
                while maintaining{" "}
                <span className="text-cyan-400 font-semibold">peak performance</span>
                and <span className="text-blue-400 font-semibold">developer-friendly</span> architectures.
              </p>
              <motion.a 
                href="#projects" 
                onClick={(e) => handleNavClick(e, "#projects")} 
                className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  See Projects
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 md:py-24 bg-black relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl text-center font-extrabold mb-12 md:mb-16 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative inline-block">
                Projects
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-stretch">
              {/* Project 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="h-full flex"
              >
                <SpotlightCard className="p-6 flex flex-col justify-between h-full bg-gradient-to-br from-neutral-900/80 to-black/60 hover:from-neutral-800/70 hover:to-black/50 border border-neutral-800/80 hover:border-indigo-500/60 rounded-xl shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 ease-in-out group cursor-pointer-interactive w-full">
                  {/* Project content remains same */}
                  {/* ... */}
                </SpotlightCard>
              </motion.div>

              {/* Project 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="h-full flex"
              >
                <SpotlightCard className="p-6 flex flex-col justify-between h-full bg-gradient-to-br from-neutral-900/80 to-black/60 hover:from-neutral-800/70 hover:to-black/50 border border-neutral-800/80 hover:border-emerald-500/60 rounded-xl shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 ease-in-out group cursor-pointer-interactive w-full">
                  {/* Project content remains same */}
                  {/* ... */}
                </SpotlightCard>
              </motion.div>

              {/* Project 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
                className="h-full flex"
              >
                <SpotlightCard className="p-6 flex flex-col justify-between h-full bg-gradient-to-br from-neutral-900/80 to-black/60 hover:from-neutral-800/70 hover:to-black/50 border border-neutral-800/80 hover:border-teal-500/60 rounded-xl shadow-xl hover:shadow-teal-500/20 transition-all duration-300 ease-in-out group cursor-pointer-interactive w-full">
                  {/* Project content remains same */}
                  {/* ... */}
                </SpotlightCard>
              </motion.div>

              {/* Project 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, amount: 0.2 }}
                className="h-full flex"
              >
                <SpotlightCard className="p-6 flex flex-col justify-between h-full bg-gradient-to-br from-neutral-900/80 to-black/60 hover:from-neutral-800/70 hover:to-black/50 border border-neutral-800/80 hover:border-purple-500/60 rounded-xl shadow-xl hover:shadow-purple-500/20 transition-all duration-300 ease-in-out group cursor-pointer-interactive w-full">
                  {/* Project content remains same */}
                  {/* ... */}
                </SpotlightCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION (UPDATED) */}
        <section id="experience" className="py-20 md:py-24 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-purple-900/10" />
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true, amount: 0.3 }} 
              className="text-4xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative inline-block"
            >
              My Experience
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative p-8 bg-gradient-to-br from-neutral-900/80 to-black/60 backdrop-blur-sm rounded-xl border border-neutral-800/80 hover:border-indigo-500/50 transition-all duration-300 mb-12 shadow-2xl hover:shadow-indigo-500/20 group"
            >
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-indigo-500 rounded-full blur-sm opacity-60" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-purple-500 rounded-full blur-sm opacity-60" />
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white mb-2">BuildFlow Technologies Pvt. Ltd.</h3>
                  <p className="text-gray-300/90 leading-relaxed">
                    During my time at BuildFlow Technologies, I designed user-centric digital experiences 
                    and engineered scalable, production-ready web applications using the MERN stack. 
                    I focused on crafting clean, responsive interfaces, optimizing performance, and 
                    building seamless API integrations that connected every layer of the system effortlessly. 
                    My work helped deliver fast, intuitive, and reliable products that enhanced the 
                    overall experience for end users.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }} 
              viewport={{ once: true, amount: 0.3 }}
              className="text-gray-300/95 text-lg max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              I also contributed to enhancing user experience on{" "}
              <a href="https://triventotrade.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-400 hover:text-indigo-300 underline decoration-indigo-500/60 hover:decoration-indigo-400 transition-colors duration-200">
                triventotrade.com
              </a>
              , implementing UI/UX improvements that significantly increased user engagement and traffic.
            </motion.p>
            
            <motion.div 
              className="flex justify-center mt-10"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <a href="https://drive.google.com/file/d/1G8Xkw0S_TF99Bz3gbyvjwFU70QEIsE0g/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="group">
                <TiltedCard 
                  imageSrc="/Intern.webp" 
                  altText="Certificate from Buildflow Pvt" 
                  captionText="Internship Certificate"
                  containerHeight="380px" 
                  containerWidth="300px" 
                  imageHeight="380px" 
                  imageWidth="300px"
                  scaleOnHover={1.04} 
                  rotateAmplitude={7} 
                  showMobileWarning={true} 
                  showTooltip={true}
                  tooltipText="View Certificate"
                  className="shadow-2xl shadow-indigo-900/30 group-hover:shadow-2xl group-hover:shadow-indigo-500/40 transition-all duration-300"
                />
              </a>
            </motion.div>
          </div>
        </section>

        {/* CERTIFICATIONS SECTION */}
        <section id="certifications" className="py-20 md:py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mb-12 md:mb-16 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative inline-block">
                Certifications & Expertise
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-3xl mx-auto mb-12 md:mb-16 text-center"
            >
              <p className="text-lg text-gray-300/90 leading-relaxed">
                Earned through Google's rigorous professional certification programs on
                Coursera, these credentials validate expertise in cutting-edge
                technologies. Each represents 100+ hours of coursework, hands-on
                projects, and industry-aligned assessments.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {[
                {
                  text: "Google Machine Learning",
                  link: "https://coursera.org/share/27665abf668c0479e649f09c01ce75b9",
                  image: "/MachineLearningPreview.webp",
                  description: "Mastering predictive algorithms and data-driven model development",
                },
                {
                  text: "Google AI Essentials",
                  link: "https://coursera.org/share/e76522223bd36da3f4a8feeb93d2d2f7",
                  image: "/AiPreview.webp",
                  description: "Foundational knowledge in neural networks and AI system implementation",
                },
                {
                  text: "Google User Experience Design",
                  link: "https://coursera.org/share/c617189e47b33926082172340be87f71",
                  image: "/PreviewUX.webp",
                  description: "User-centered design principles and interaction research methodologies",
                },
                {
                  text: "Google Advanced Data Analytics",
                  link: "https://coursera.org/share/09e30d48b4d38a664c30b12795d8b144",
                  image: "/Google Advanced Data Analytics Capstone.webp",
                  description: "Examine data to identify patterns and trends, build models using machine learning techniques",
                },
                {
                  text: "Automate Cybersecurity Tasks with Python",
                  link: "https://coursera.org/share/b00ad7de4b6962060b8d47800927b352",
                  image: "/Google Python.webp",
                  description: "Enhancing cybersecurity workflows through Python scripting and automated threat detection",
                },
                {
                  text: "Connect and Protect: Networks and Network Security",
                  link: "https://coursera.org/share/9bd3492f4984a22b035647ca0e151226",
                  image: "/Google networking.webp",
                  description: "Mastering network architecture, intrusion prevention, and system hardening",
                },
              ].map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  whileInView={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 130,
                    damping: 18,
                    delay: idx * 0.1 + 0.2,
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -6,
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative group h-full flex"
                >
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col w-full bg-gradient-to-br from-neutral-900/90 to-black/95 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-400 h-full border border-neutral-800/70 hover:border-indigo-500/60 cursor-pointer-interactive"
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={cert.image}
                        alt={`${cert.text} Certification`}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-400 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6 space-y-3 flex-grow flex flex-col">
                      <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:from-blue-300 group-hover:to-pink-300 transition-all duration-300 leading-tight">
                        {cert.text}
                      </h3>
                      <p className="text-sm text-gray-400/90 group-hover:text-gray-300/95 transition-colors duration-300 flex-grow leading-relaxed">
                        {cert.description}
                      </p>
                      <div className="mt-auto pt-3">
                        <span className="inline-flex items-center px-4 py-2 bg-indigo-600 group-hover:bg-indigo-500 rounded-md text-sm font-semibold text-white transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-indigo-500/30">
                          <span>View Credential</span>
                          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GET QUOTE SECTION */}
        <section id="get-quote" className="relative py-20 md:py-28 bg-black text-white text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-90">
            <motion.div className="absolute -top-40 -left-40 w-96 h-96 md:w-[550px] md:h-[550px] bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl" 
              initial={{ scale: 0.7, opacity: 0 }} 
              whileInView={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 2.5 }} 
              viewport={{ once: true, amount: 0.1 }} 
            />
            <motion.div className="absolute -bottom-40 -right-40 w-96 h-96 md:w-[550px] md:h-[550px] bg-gradient-to-l from-purple-600/20 to-pink-600/20 rounded-full blur-3xl" 
              initial={{ scale: 0.7, opacity: 0 }} 
              whileInView={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 2.5, delay: 0.3 }} 
              viewport={{ once: true, amount: 0.1 }} 
            />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto px-4">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              viewport={{ once: true, amount: 0.5 }}
            >
              Ready to Start Your Project?
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-300/90 mb-10 leading-relaxed" 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.15 }} 
              viewport={{ once: true, amount: 0.5 }}
            >
              Let's collaborate to create something extraordinary. Reach out today!
            </motion.p>
            
            <motion.button
              onClick={() => setContactModalOpen(true)}
              className="relative group inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-lg font-semibold text-white transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-indigo-500/40 focus:outline-none focus:ring-4 focus:ring-indigo-500/60"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                Get Quote
                <motion.span className="ml-2" animate={{ rotate: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  💡
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </motion.button>
            
            <AnimatePresence>
              {isContactModalOpen && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  transition={{ duration: 0.3 }} 
                  className="fixed inset-0 bg-black/85 backdrop-blur-lg flex items-center justify-center z-[9999] p-4"
                  onClick={(e) => e.target === e.currentTarget && setContactModalOpen(false)}
                >
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 15 }} 
                    animate={{ scale: 1, opacity: 1, y: 0 }} 
                    exit={{ scale: 0.95, opacity: 0, y: 15 }} 
                    transition={{ duration: 0.3 }} 
                    className="bg-gradient-to-br from-neutral-900 via-black to-neutral-900 rounded-xl p-6 sm:p-8 w-full max-w-md relative border border-neutral-700/60 shadow-2xl shadow-indigo-500/20"
                  >
                    <button 
                      onClick={() => setContactModalOpen(false)} 
                      className="absolute top-3.5 right-3.5 p-2 rounded-full text-gray-400 hover:bg-neutral-700/50 hover:text-white transition-colors z-10"
                      aria-label="Close"
                    >
                      <FaTimes size={18} />
                    </button>
                    
                    <div className="space-y-6">
                      <div className="text-center pt-2">
                        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                          Let's Connect
                        </h3>
                        <p className="mt-1.5 text-gray-400/90 text-sm">
                          Tell me about your idea, I'll respond within 24 hours.
                        </p>
                      </div>
                      
                      <form ref={formRef} className="space-y-5" onSubmit={sendEmail}>
                        <div>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <FaUser className="w-5 h-5 text-gray-500" />
                            </div>
                            <input 
                              type="text" 
                              name="name" 
                              id="name" 
                              required 
                              className="w-full pl-10 pr-3 py-2.5 bg-neutral-800/60 border border-neutral-700/80 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-500/90 text-gray-100 transition-all duration-200 text-sm focus:bg-neutral-800" 
                              placeholder="Your Full Name" 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <FaEnvelope className="w-5 h-5 text-gray-500" />
                            </div>
                            <input 
                              type="email" 
                              name="email" 
                              id="email" 
                              required 
                              className="w-full pl-10 pr-3 py-2.5 bg-neutral-800/60 border border-neutral-700/80 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-500/90 text-gray-100 transition-all duration-200 text-sm focus:bg-neutral-800" 
                              placeholder="your.email@example.com" 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <textarea 
                            id="message" 
                            rows="4" 
                            name="message" 
                            required 
                            className="w-full px-3.5 py-2.5 bg-neutral-800/60 border border-neutral-700/80 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-500/90 text-gray-100 transition-all duration-200 text-sm focus:bg-neutral-800" 
                            placeholder="Tell me about your project or inquiry..." 
                          />
                        </div>
                        
                        <button 
                          type="submit" 
                          disabled={isSendingEmail}
                          className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 relative overflow-hidden group focus:outline-none focus:ring-4 focus:ring-indigo-500/60 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            {isSendingEmail ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Message
                                <FaPaperPlane className="ml-2 w-4 h-4" />
                              </>
                            )}
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </button>
                      </form>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </motion.main>

      {/* FOOTER */}
      <footer className="bg-black border-t border-neutral-800/60">
        <div className="max-w-7xl mx-auto py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <motion.p 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              transition={{ duration: 0.5, delay: 0.1 }} 
              viewport={{ once: true }} 
              className="text-sm text-gray-400/90 hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-300"
            >
              © {new Date().getFullYear()} Rohith Vittamraj. All rights reserved.
            </motion.p>
            
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }} 
              viewport={{ once: true }} 
              className="flex space-x-4 sm:space-x-5"
            >
              {[
                { 
                  href: "https://x.com/rohithofficial5?s=21&t=cVo-4UEJaqOqaL-meqeikQ", 
                  label: "Twitter", 
                  icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />, 
                  color: "sky" 
                },
                { 
                  href: "https://www.instagram.com/_rohtzz_", 
                  label: "Instagram", 
                  icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />, 
                  color: "pink" 
                },
                { 
                  href: "https://www.linkedin.com/in/rohith-vittamraj-0ab76a313", 
                  label: "LinkedIn", 
                  icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />, 
                  color: "blue" 
                },
                { 
                  href: "https://github.com/rohith-2809", 
                  label: "GitHub", 
                  icon: <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />, 
                  color: "gray" 
                },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} profile`}
                  className={`group p-2.5 rounded-full bg-neutral-800/80 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg hover:bg-${social.color}-600/20`}
                  variants={{ 
                    hidden: { opacity: 0, y: 10 }, 
                    visible: { opacity: 1, y: 0 } 
                  }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    {social.icon}
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.3 }} 
            viewport={{ once: true }} 
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500/80">
              "🚀 Let's build something amazing together! Drop me a message! 💬"
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
