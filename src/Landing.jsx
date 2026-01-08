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
  const [phase, setPhase] = useState("shuffle");

  useEffect(() => {
    if (currentIndex < techStack.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    } else {
      setPhase("logo-reveal");
      const timeout = setTimeout(() => {
        onComplete();
      }, 1400); 
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, techStack.length, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <AnimatePresence mode="wait">
          {phase === "shuffle" ? (
            <motion.div
              key="shuffle"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1.2, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)", transition: { duration: 0.3 } }}
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
            <motion.div className="flex items-center gap-4 z-50">
              <motion.img
                layoutId="main-logo-img"
                src="/logo.webp"
                alt="Logo"
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
    { name: "Deep Learning", icon: "/DeepLearning.webp", description: "Neural networks & predictive modeling." },
    { name: "Express.js", icon: "/express-js.webp", description: "Minimalist web framework for Node.js." },
    { name: "Figma", icon: "/Figma-logo.webp", description: "Collaborative interface design tool." },
    { name: "MongoDB", icon: "/Mongodb.webp", description: "NoSQL database for modern applications." },
    { name: "Node.js", icon: "/Node.js_logo.svg.webp", description: "Scalable server-side JS runtime." },
    { name: "Python", icon: "/Python.webp", description: "Versatile language for AI and Scripting." },
    { name: "React", icon: "/React.webp", description: "Library for building interactive UIs." },
    { name: "Tailwind CSS", icon: "/Tailwind_CSS_Logo.webp", description: "Utility-first CSS framework." },
    { name: "Grafana", icon: "/Grafana.webp", description: "Data visualization and monitoring." },
    { name: "HuggingFace", icon: "/HuggingFace.webp", description: "The platform for AI models." },
    { name: "GCP", icon: "/gcp.webp", description: "Scalable cloud infrastructure." },
    { name: "Docker", icon: "/Docker.webp", description: "Containerization for consistent deployment." },
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    const form = e.target;
    emailjs.sendForm("service_sh057qd", "template_2vmky28", form, "CcFtpOjqJJUhsgyIK")
      .then(() => { 
        alert("Message sent!"); 
        setContactModalOpen(false); 
        form.reset(); 
      },
      (error) => { alert(`Failed: ${error.text}`); });
  };
  
  useEffect(() => {
    if (isLoading) return;

    const hero = heroRef.current;
    const timer = setTimeout(() => {
        // Refresh ScrollTrigger to account for page layout change after loader
        ScrollTrigger.refresh();

        if (hero) {
          gsap.fromTo(hero, { opacity: 1 }, {
            opacity: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.5 },
          });
          
          const heroTextElements = hero.querySelectorAll(".hero-text-anim > div > span > span");
          if (heroTextElements.length > 0) {
            gsap.fromTo(heroTextElements,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, ease: "power3.out", stagger: 0.1, duration: 0.8,
                scrollTrigger: { trigger: hero, start: "top 70%", end: "top 40%", scrub: 1 },
              }
            );
          }
        }
    }, 500); 

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

      <AnimatePresence>
        {isLoading && (
          <TechStackLoader 
            techStack={techStack} 
            onComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.header 
          initial={{ backgroundColor: "rgba(0,0,0,0)", borderBottomColor: "rgba(0,0,0,0)" }}
          animate={{ backgroundColor: "rgba(0,0,0,0.75)", borderBottomColor: "rgba(38,38,38,0.6)" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="sticky top-0 z-[1000] backdrop-blur-lg shadow-2xl border-b border-neutral-800/60"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center py-3.5 px-4 sm:px-6 lg:px-8">
            <motion.a 
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="flex items-center space-x-3.5 group"
            >
              <motion.img 
                layoutId="main-logo-img"
                src="/logo.webp" 
                alt="Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-full border-2 border-indigo-500/60 group-hover:border-indigo-400"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
              <motion.h1 
                layoutId="main-logo-text"
                className="text-xl sm:text-2xl font-semibold text-gray-100 group-hover:text-white tracking-tight"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                Rohith's Portfolio
              </motion.h1>
            </motion.a>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}> 
              <button
                onClick={toggleMainMenu}
                className="text-gray-300 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
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
                className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-neutral-800/70 shadow-2xl"
              >
                <nav className="px-4 py-4 space-y-2 max-w-7xl mx-auto">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={index} href={item.href} onClick={(e) => handleNavClick(e, item.href)}
                      className="block text-gray-200 hover:text-white px-4 py-2.5 rounded-lg hover:bg-indigo-600/40 transition-all duration-200"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
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

      <main className="flex-grow isolate">
        <section ref={heroRef} id="home" className="relative bg-black text-white py-28 md:py-36 min-h-[90vh] flex items-center bg-center bg-cover bg-fixed"
          style={{ backgroundImage: "url('/img_9.webp')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.4 }} 
            >
              <div className="hero-text-anim"> 
                <SplitText text="Embark on a New Journey"
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white text-center !leading-tight"
                  delay={30} animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0) rotateX(-20deg)" }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0) rotateX(0deg)" }}
                  easing="circOut" textAlign="center"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-5 mb-3 h-12">
              <InteractiveText />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200/90 leading-relaxed" 
            >
              Crafting cutting-edge digital solutions that bring ideas to life.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mt-10 flex justify-center gap-4">
              <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")}
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-lg text-base font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105" >
                Explore My Work
              </a>
            </motion.div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="py-20 md:py-24 bg-black relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true }}
              className="p-8 bg-neutral-900/70 backdrop-blur-sm rounded-xl border border-neutral-800 shadow-xl" >
              <p className="text-lg md:text-xl text-gray-200/95 leading-relaxed">
                I blend cutting-edge technology with creative thinking to build
                digital experiences that solve real problems. With deep
                expertise in <span className="font-semibold text-indigo-400">MERN stack</span>
                , <span className="font-semibold text-cyan-400">AI/ML solutions</span>, and{" "}
                <span className="font-semibold text-purple-400">UI/UX design</span>, I thrive
                on pushing the boundaries of what's possible.
              </p>
            </motion.div>
            <div className="mt-10">
              <a href="https://drive.google.com/file/d/1fNS3dupfxzsSNZhXiHlcX7WIHVcKmaGx/view?usp=sharing" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-lg font-semibold transition-all duration-300" >
                View My Resume
              </a>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="relative py-20 md:py-28 bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-16">
              Powering Innovation
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="group relative p-5 h-52 md:h-56 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-cyan-500/60 transition-all duration-300 flex flex-col items-center justify-center shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <img src={tech.icon} alt={tech.name} className="h-12 w-12 object-contain mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-cyan-400">{tech.name}</h3>
                  <p className="text-gray-400 text-xs mt-2 text-center">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 md:py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-center font-extrabold mb-16 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Project Card Template */}
              <SpotlightCard className="p-6 h-full bg-neutral-900 rounded-xl border border-neutral-800 group transition-all">
                <h3 className="text-xl font-bold mb-4">Plant Disease Detection</h3>
                <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                   <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                      <source src="/project-demo.webm" type="video/webm" />
                   </video>
                </div>
                <p className="text-gray-400 text-sm mb-6">AI-powered web application that identifies plant diseases from images using CNN models.</p>
                <div className="flex gap-4">
                  <a href="https://github.com/rohith-2809/mern-test" target="_blank" rel="noopener noreferrer" className="text-indigo-400 text-sm font-bold">Source Code</a>
                  <a href="https://mern-test-client.onrender.com/" target="_blank" rel="noopener noreferrer" className="text-white bg-indigo-600 px-3 py-1 rounded text-sm">Live Demo</a>
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-6 h-full bg-neutral-900 rounded-xl border border-neutral-800 group transition-all">
                <h3 className="text-xl font-bold mb-4">DocuAgent AI</h3>
                <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                   <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                      <source src="/DocuAgent-demo.webm" type="video/webm" />
                   </video>
                </div>
                <p className="text-gray-400 text-sm mb-6">Automates software documentation by generating UML diagrams and code explanations.</p>
                <div className="flex gap-4">
                  <a href="https://github.com/rohith-2809" target="_blank" rel="noopener noreferrer" className="text-emerald-400 text-sm font-bold">Source Code</a>
                  <a href="https://docuagent-2vp4.onrender.com/" target="_blank" rel="noopener noreferrer" className="text-white bg-emerald-600 px-3 py-1 rounded text-sm">Live Demo</a>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 md:py-24 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Experience
            </h2>
            <div className="max-w-3xl mx-auto text-gray-300 text-lg mb-12">
              <p>
                At BuildFlow Technologies Pvt. Ltd., I improved the overall user experience, built high-quality web applications, and implemented seamless end-to-end connections using the MERN stack.
              </p>
            </div>
            <div className="flex justify-center">
              <TiltedCard imageSrc="/Intern.webp" altText="Certificate" captionText="Internship Certificate"
                containerHeight="380px" containerWidth="300px" scaleOnHover={1.04} rotateAmplitude={7}
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="get-quote" className="py-20 bg-black text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6">Ready to Start?</h2>
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-lg font-semibold shadow-xl hover:scale-105 transition-transform"
            >
              Get Quote
            </button>
          </div>
          
          <AnimatePresence>
            {isContactModalOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-neutral-900 p-8 rounded-xl w-full max-w-md border border-neutral-700 relative">
                  <button onClick={() => setContactModalOpen(false)} className="absolute top-4 right-4 text-gray-400"><FaTimes /></button>
                  <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                  <form className="space-y-4" onSubmit={sendEmail}>
                    <input type="text" name="name" placeholder="Name" required className="w-full p-3 bg-neutral-800 rounded-lg border border-neutral-700" />
                    <input type="email" name="email" placeholder="Email" required className="w-full p-3 bg-neutral-800 rounded-lg border border-neutral-700" />
                    <textarea name="message" placeholder="Message" rows="4" required className="w-full p-3 bg-neutral-800 rounded-lg border border-neutral-700" />
                    <button className="w-full py-3 bg-indigo-600 rounded-lg font-bold">Send Message</button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <footer className="bg-black border-t border-neutral-800 py-10 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Rohith Vittamraj. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
