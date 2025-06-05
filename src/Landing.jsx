import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import GooeyNav from "./Effects/GooeyNav";
import InteractiveText from "./Effects/InteractiveText";
import SplitText from "./Effects/SplitText";
import SpotlightCard from "./Effects/SpotlightCard";
import TiltedCard from "./Effects/TiltedCard";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const heroRef = useRef(null);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About Me", href: "#about" },
    { label: "Tech Stack", href: "#tech-stack"}, // Added for clarity
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience"}, // Added for clarity
    { label: "Certifications", href: "#certifications"}, // Added for clarity
    // { label: "Get Quote", href: "#get-quote" }, // Already a button, can be removed from nav if preferred
  ];

  const certifications = [
    {
      text: "Google Machine Learning",
      link: "https://coursera.org/share/27665abf668c0479e649f09c01ce75b9",
      image: "/MachineLearningPreview.webp",
      description:
        "Mastering predictive algorithms and data-driven model development",
    },
    {
      text: "Google AI Essentials",
      link: "https://coursera.org/share/e76522223bd36da3f4a8feeb93d2d2f7",
      image: "/AiPreview.webp",
      description:
        "Foundational knowledge in neural networks and AI system implementation",
    },
    {
      text: "Google User Experience Design", // Corrected typo: Exprerience -> Experience
      link: "https://coursera.org/share/c617189e47b33926082172340be87f71",
      image: "/PreviewUX.webp",
      description:
        "User-centered design principles and interaction research methodologies",
    },
  ];

  const techStack = [
    {
      name: "Deep Learning",
      icon: "/DeepLearning.webp",
      description: "Neural network architectures for complex AI solutions",
    },
    {
      name: "Express.js",
      icon: "/express-js.webp",
      description: "High-performance backend infrastructure",
    },
    {
      name: "Figma",
      icon: "/Figma-logo.webp",
      description: "Pixel-perfect UI/UX design process",
    },
    {
      name: "MongoDB",
      icon: "/Mongodb.webp",
      description: "Scalable NoSQL database solutions",
    },
    {
      name: "Node.js",
      icon: "/Node.js_logo.svg.webp",
      description: "Event-driven architecture for real-time apps",
    },
    {
      name: "Python",
      icon: "/Python.webp",
      description: "AI/ML development & data processing",
    },
    {
      name: "React",
      icon: "/React.webp",
      description: "Interactive front-end experiences",
    },
    {
      name: "Tailwind CSS",
      icon: "/Tailwind_CSS_Logo.webp",
      description: "Modern utility-first styling",
    },
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_sh057qd",
        "template_2vmky28",
        e.target,
        "CcFtpOjqJJUhsgyIK"
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          alert("Your message has been sent!");
          setContactModalOpen(false); // Close modal on success
        },
        (error) => {
          console.error("Error in sending email:", error.text);
          alert("Oops! Something went wrong, please try again.");
        }
      );
    e.target.reset();
  };

  useEffect(() => {
    const hero = heroRef.current;
    if (hero) {
      gsap.fromTo(
        hero,
        { opacity: 1 },
        {
          opacity: 0.7, // Slightly less fade to keep some bg visibility
          ease: "power2.out",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.5, // Smoother scrub
          },
        }
      );

      const heroText = hero.querySelector(".hero-text-anim"); // Use a specific class for animation target
      if (heroText) {
        gsap.fromTo(
          heroText,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heroText,
              start: "top 80%",
              end: "top 50%", // Adjust end point for a bit longer animation
              scrub: 1,
            },
          }
        );
      }
    }
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  // Smooth scroll for nav links
  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative selection:bg-indigo-500 selection:text-white"> {/* Added selection styles */}
      {/* Header with Responsive Navigation */}
      {/* Enhanced Header: sticky, backdrop-blur, slightly more pronounced shadow */}
      <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8"> {/* Adjusted padding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center space-x-3"
          >
            <img
              src="/logo.webp"
              alt="Rohith's Logo"
              className="w-10 h-10 object-cover rounded-full border-2 border-indigo-500/50" // Added subtle border
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-white"> {/* Responsive text size */}
              Rohith's Portfolio
            </h1>
          </motion.div>

          <div className="hidden md:flex items-center space-x-1"> {/* Reduced space for GooeyNav */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            >
              <GooeyNav items={navItems} onLinkClick={handleNavClick} />
            </motion.div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" // Added focus ring
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel with Animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-black/90 border-t border-gray-700/50" // Added subtle border
            >
              <nav className="px-4 pt-4 pb-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block text-white text-lg px-3 py-3 rounded-md hover:bg-indigo-600/30 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }} // Faster stagger
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        <section
          ref={heroRef}
          id="home"
          className="relative bg-black text-white py-24 md:py-32 min-h-[90vh] flex items-center bg-center bg-cover bg-scroll md:bg-fixed"
          style={{ backgroundImage: "url('/img_9.webp')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-65" /> {/* Slightly increased opacity for better text contrast */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }} // Adjusted delay
            >
              {/* Added hero-text-anim class for GSAP targeting */}
              <div className="hero-text-anim"> 
                <SplitText
                  text="Embark on a New Journey"
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white text-center" // Responsive font size
                  delay={50} // Faster split
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,40px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  easing="easeOutCubic"
                  textAlign="center"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }} // Adjusted delay
              className="mt-6 h-12" // Increased margin
            >
              <InteractiveText />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }} // Adjusted delay
            >
              <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-200"> {/* Brighter text */}
                Crafting cutting-edge digital solutions that bring ideas to
                life.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }} // Adjusted delay
              className="mt-10 flex justify-center gap-4" // Increased margin
            >
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, "#projects")}
                className="inline-block bg-indigo-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" // Enhanced styling
              >
                Explore My Work
              </a>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-20 bg-black relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }} // Trigger when 50% in view
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent relative group">
                About Me
                <span className="absolute bottom-0 left-1/2 w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span> {/* Gradient underline */}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              // Enhanced paragraph box styling
              className="p-8 bg-neutral-900/80 backdrop-blur-sm rounded-xl border border-neutral-700/60 hover:border-indigo-500/70 transition-all duration-300 mb-12 shadow-xl"
            >
              <p className="text-xl text-gray-200 leading-relaxed"> {/* Brighter text */}
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

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <a
                href="https://drive.google.com/file/d/1dJKCrpJTReFvzrQ3HMdBa_WO_-s52c_t/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                // Enhanced Resume Button
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mr-3"
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

        <section
          id="tech-stack"
          className="relative py-24 md:py-28 bg-black overflow-hidden" // Adjusted padding
        >
          <div className="absolute inset-0 opacity-15"> {/* Reduced opacity for subtlety */}
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl -top-32 -left-32 animate-pulse"></div>
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl -bottom-32 -right-32 animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="mb-16 md:mb-20"> {/* Adjusted margin */}
                <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6">
                  Powering Innovation
                </h2>
                <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"> {/* Brighter text, responsive size */}
                  Combining cutting-edge technologies with modern development
                  practices to create
                  <span className="text-cyan-400 font-semibold"> performant</span>
                  ,<span className="text-blue-400 font-semibold"> scalable</span>,
                  and
                  <span className="text-purple-400 font-semibold">
                    {" "}
                    intuitive
                  </span>{" "}
                  solutions.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:gap-8 place-items-center"> {/* Increased gap */}
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  // Enhanced Tech Card Styling
                  className="group relative p-6 w-full h-56 rounded-xl bg-neutral-900 hover:bg-neutral-800/70 border border-neutral-800 hover:border-cyan-500/50 transition-all duration-300 ease-out flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    // boxShadow: "0 0 30px rgba(34, 211, 238, 0.25)", // Softer, more focused shadow
                    // rotate: 1, // Subtle consistent rotation
                  }}
                  transition={{
                    duration: 0.3, // Faster transition
                    delay: index * 0.05, // Faster stagger
                    type: "spring",
                    stiffness: 260, // Adjusted spring
                    damping: 20
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(300px_circle_at_var(--x)_var(--y),rgba(34,211,238,0.1),transparent)]" />
                  
                  <motion.img
                    src={tech.icon}
                    alt={tech.name}
                    className="h-14 w-14 sm:h-16 sm:w-16 object-contain mb-3 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-300" // Responsive icon size
                    // whileHover={{ y: -5 }} // Removed as card hover is sufficient
                  />
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]"> {/* Responsive text */}
                    {tech.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mt-2 group-hover:text-gray-300 transition-colors font-medium text-center px-1"> {/* Responsive text */}
                    {tech.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-20 md:mt-24 mx-auto w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" // Increased opacity
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "circOut" }} // Smoother ease
              viewport={{ once: true }}
            />

            <motion.div
              className="mt-12 md:mt-16" // Adjusted margin
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }} // Added y animation
              viewport={{ once: true }}
            >
              <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                Every tool in my arsenal is carefully selected for its
                performance, ecosystem, and maintainability. I specialize in
                creating full-stack solutions that leverage AI capabilities
                while maintaining{" "}
                <span className="text-cyan-400 font-semibold">peak performance</span>
                and <span className="text-blue-400 font-semibold">
                  developer-friendly
                </span>{" "}
                architectures.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")} className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  See Projects
                </a>
                {/* Consider linking this button to a specific part of tech stack or a blog post if available */}
                <button className="px-7 py-3 border-2 border-cyan-500/50 text-cyan-400 rounded-lg font-semibold hover:border-cyan-500/80 hover:bg-cyan-500/15 transition-all duration-300 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  Tech Insights
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }} // Added y animation
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }}
            >
             <h2 className="text-4xl sm:text-5xl md:text-6xl text-center font-extrabold mb-12 md:mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent relative group"> {/* Adjusted margin */}
                Projects
                <span className="absolute bottom-0 left-1/2 w-28 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform -translate-x-1/2 translate-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-stretch">
              {/* Project 1 - Plant Disease Detection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }} // Adjusted delay
                viewport={{ once: true, amount: 0.3 }}
                className="h-full"
              >
                {/* Enhanced Project Card */}
                <SpotlightCard className="p-6 flex flex-col justify-between h-full bg-neutral-900 hover:bg-neutral-800/80 border border-neutral-800 hover:border-indigo-500/60 rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 ease-in-out group">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center border border-indigo-500/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> {/* Changed Icon to represent web app */}
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                        Plant Disease Detection
                      </h3>
                    </div>

                    <div className="mb-6 rounded-lg overflow-hidden border border-neutral-700 group-hover:border-indigo-500/40 transition-all duration-300 shadow-md">
                      <video
                        loading="lazy" autoPlay loop muted playsInline // Added playsInline for mobile
                        className="w-full h-48 object-cover" preload="metadata"
                      >
                        <source src="project-demo.webm" type="video/webm" />
                        Your browser does not support the video tag.
                      </video>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-6 text-sm"> {/* Slightly smaller text for desc */}
                      AI-powered web application that identifies plant diseases
                      from images using CNN models. Provides detailed analysis
                      and preventive measures for healthy crop maintenance.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-700/70 pt-4 mt-auto"> {/* mt-auto pushes to bottom */}
                    <a
                      href="https://github.com/rohith-2809/mern-test" target="_blank" rel="noopener noreferrer"
                      className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors duration-200 group/link"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 transition-transform group-hover/link:scale-110">
                         <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium text-sm">Source Code</span>
                    </a>
                    <a
                      href="https://mern-test-client.onrender.com/" target="_blank" rel="noopener noreferrer"
                      className="flex items-center w-full sm:w-auto justify-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-md hover:shadow-indigo-500/30"
                    >
                      <span className="mr-2">Live Demo</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>

              {/* Project 2 - AI Model Deployment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="h-full"
              >
                <SpotlightCard className="p-6 flex flex-col justify-between h-full bg-neutral-900 hover:bg-neutral-800/80 border border-neutral-800 hover:border-teal-500/60 rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all duration-300 ease-in-out group">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center border border-teal-500/30">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A7.962 7.962 0 0112 2c2.497 0 4.792.995 6.486 2.628C21.5 6.914 22 9.828 22 12c0 2.172-.5 5-2.343 6.657z" />
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a6 6 0 00-6-6c0 1.931.786 3.673 2.056 4.944A6.005 6.005 0 0012 18z" />
                         </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
                        AI Model Deployment
                      </h3>
                    </div>
                     {/* Placeholder for image/video if available */}
                    <div className="mb-6 rounded-lg overflow-hidden border border-neutral-700 group-hover:border-teal-500/40 transition-all duration-300 shadow-md aspect-video bg-neutral-800 flex items-center justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                       </svg>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                      End-to-end MLOps solution deploying machine learning
                      models via Hugging Face and Flask APIs. Demonstrates
                      real-time predictions with seamless integration and
                      scalability.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-700/70 pt-4 mt-auto">
                    <a
                      href="https://github.com/rohith-2809" /* Update with actual repo */
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center text-gray-400 hover:text-teal-400 transition-colors duration-200 group/link"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 transition-transform group-hover/link:scale-110">
                         <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium text-sm">Source Code</span>
                    </a>
                    <a
                      href="https://huggingface.co/vittamraj" target="_blank" rel="noopener noreferrer"
                      className="flex items-center w-full sm:w-auto justify-center px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-md font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-md hover:shadow-teal-500/30"
                    >
                      <span className="mr-2">Explore Models</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>

              {/* Project 3 - Employee Management System */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }} // Adjusted delay
                viewport={{ once: true, amount: 0.3 }}
                className="h-full"
              >
                <SpotlightCard className="p-6 flex flex-col justify-between h-full bg-neutral-900 hover:bg-neutral-800/80 border border-neutral-800 hover:border-purple-500/60 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 ease-in-out group">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        Employee Management
                      </h3>
                    </div>
                     {/* Placeholder for image/video if available */}
                    <div className="mb-6 rounded-lg overflow-hidden border border-neutral-700 group-hover:border-purple-500/40 transition-all duration-300 shadow-md aspect-video bg-neutral-800 flex items-center justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                       </svg>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                      A fast, responsive app built with React, Tailwind, and
                      Vite to manage employee data using local storage — no
                      backend needed.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-700/70 pt-4 mt-auto">
                    <a
                      href="https://github.com/rohith-2809/Employee-Mangement-System" target="_blank" rel="noopener noreferrer"
                      className="flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-200 group/link"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 transition-transform group-hover/link:scale-110">
                         <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium text-sm">Source Code</span>
                    </a>
                    <a
                      href="https://employee-mangement-system-w79y.onrender.com" target="_blank" rel="noopener noreferrer"
                      className="flex items-center w-full sm:w-auto justify-center px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-md font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-md hover:shadow-purple-500/30"
                    >
                      <span className="mr-2">Live Demo</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="experience" className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent relative group">
              My Experience
              <span className="absolute bottom-0 left-1/2 w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"> {/* Brighter text, larger */}
              I helped enhance the user experience on{" "}
              <a
                href="https://triventotrade.com" target="_blank" rel="noopener noreferrer"
                className="font-semibold text-indigo-400 hover:text-indigo-300 underline decoration-indigo-500/50 hover:decoration-indigo-400 transition-colors"
              >
                triventotrade.com
              </a>{" "}
              by improving crucial UI/UX elements, resulting in a significant
              increase in traffic. During my internship at Buildflow Pvt, I also
              contributed to app design improvements, further boosting
              engagement and user satisfaction.
            </motion.p>

            <motion.div
              className="flex justify-center mt-10"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3, type: "spring", stiffness: 100 }} // Spring animation
            >
              <a
                href="https://drive.google.com/file/d/1G8Xkw0S_TF99Bz3gbyvjwFU70QEIsE0g/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group" // Added group for potential child hover effects
              >
                <TiltedCard
                  imageSrc="/Intern.webp" 
                  altText="Certificate from Buildflow Pvt"
                  captionText="Internship Certificate" 
                  containerHeight="380px" // Consider responsive height
                  containerWidth="300px"  // Consider responsive width
                  imageHeight="380px"
                  imageWidth="300px"
                  scaleOnHover={1.05} // Slightly reduced scale
                  rotateAmplitude={8}  // Reduced rotation
                  showMobileWarning={true}
                  showTooltip={true}
                  tooltipText="View Certificate" // Added tooltip text
                  overlayContent={null}
                  displayOverlayContent={false}
                  className="shadow-xl group-hover:shadow-2xl group-hover:shadow-indigo-500/30 transition-all duration-300" // Enhanced shadow on hover
                />
              </a>
            </motion.div>
          </div>
        </section>

        <section id="certifications" className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Adjusted padding */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }} // Changed to whileInView
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
              className="mb-12 md:mb-16 text-center" // Adjusted margin
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent relative group">
                Certifications & Expertise
                <span className="absolute bottom-0 left-1/2 w-40 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} // Changed to whileInView
              transition={{ delay: 0.2, duration: 0.6 }} // Adjusted delay
              viewport={{ once: true, amount: 0.5 }}
              className="max-w-3xl mx-auto mb-12 md:mb-16 text-center" // Adjusted margin
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                Earned through Google's rigorous professional certification
                programs on Coursera, these credentials validate expertise in
                cutting-edge technologies. Each represents 100+ hours of
                coursework, hands-on projects, and industry-aligned assessments.
              </p>
              <motion.div
                className="mt-8 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 w-32 mx-auto rounded-full" // Thicker line
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }} // Changed to whileInView
                transition={{ delay: 0.4, duration: 0.7, ease: "circOut" }} // Adjusted delay and ease
                viewport={{ once: true }}
              />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"> {/* Adjusted gap */}
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  whileInView={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 15, delay: idx * 0.1 }} // Adjusted spring and delay
                  whileHover={{ scale: 1.03, y: -5 }} // Subtle lift on hover
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative group h-full" // Ensure full height for consistent card sizing
                >
                  {/* Enhanced Certification Card */}
                  <a
                    href={cert.link} target="_blank" rel="noopener noreferrer"
                    className="flex flex-col bg-gradient-to-br from-neutral-900 to-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-400 h-full border border-neutral-800 hover:border-indigo-500/70"
                  >
                    <div className="relative overflow-hidden aspect-[4/3]"> {/* Fixed aspect ratio for image consistency */}
                      <img
                        src={cert.image} alt={`${cert.text} Certification`}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-400 ease-out" // Smoother scale
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6 space-y-3 flex-grow flex flex-col"> {/* flex-grow and flex-col for content alignment */}
                      <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
                        {cert.text}
                      </h3>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                        {cert.description}
                      </p>
                      <div className="mt-auto pt-3"> {/* Push button to bottom */}
                        <span className="inline-flex items-center px-4 py-2 bg-indigo-600 group-hover:bg-indigo-700 rounded-md text-sm font-semibold text-white transition-all duration-300 transform group-hover:scale-105">
                          <span>View Credential</span>
                          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg" /> {/* Softer glow */}
                  </a>
                   {/* Corner Accent - slightly more subtle */}
                  <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden rounded-tr-xl">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-700 opacity-10 group-hover:opacity-20 rotate-45 transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="get-quote"
          className="relative py-20 md:py-24 bg-black text-white text-center overflow-hidden" // Adjusted padding
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-80"> {/* Increased opacity */}
            <motion.div
              className="absolute -top-40 -left-40 w-96 h-96 md:w-[500px] md:h-[500px] bg-gradient-to-r from-indigo-500/25 to-purple-500/25 rounded-full blur-3xl" // Larger and slightly more opaque
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }} // Full opacity when in view
              transition={{ duration: 2.5, ease: "circOut" }} // Smoother ease
              viewport={{ once: true, amount: 0.3 }}
            />
            <motion.div
              className="absolute -bottom-40 -right-40 w-96 h-96 md:w-[500px] md:h-[500px] bg-gradient-to-l from-purple-500/25 to-pink-500/25 rounded-full blur-3xl" // Larger and slightly more opaque
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2.5, ease: "circOut", delay: 0.3 }} // Smoother ease, adjusted delay
              viewport={{ once: true, amount: 0.3 }}
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto px-4">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Ready to Start Your Project?
            </motion.h2>

            <motion.p
              className="text-lg text-gray-300 mb-10" // Increased margin
              initial={{ opacity: 0, y: 10 }} // Subtle y animation
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Let's collaborate to create something extraordinary. Reach out today!
            </motion.p>

            <motion.button
              onClick={() => setContactModalOpen(true)}
              // Enhanced Button Styling
              className="relative group inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-lg font-semibold text-white transition-all duration-300 overflow-hidden shadow-lg hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05, y: -2 }} // Lift on hover
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Get Quote   <span className="inline-block group-hover:animate-pulse">💡</span></span> {/* Added emoji and pulse */}
              <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150 blur-xl group-hover:scale-100 group-hover:blur-none ease-out" />
            </motion.button>
            
            <AnimatePresence>
            {isContactModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[999] p-4" // Increased z-index
                onClick={(e) =>
                  e.target === e.currentTarget && setContactModalOpen(false)
                }
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  // Enhanced Modal Styling
                  className="bg-gradient-to-br from-neutral-900 via-black to-neutral-900 rounded-xl p-6 sm:p-8 w-full max-w-md relative border border-neutral-700/70 shadow-2xl shadow-indigo-500/20"
                >
                  <button
                    onClick={() => setContactModalOpen(false)}
                    className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:bg-neutral-700/60 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <FaTimes size={20} />
                  </button>

                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Let's Connect
                      </h3>
                      <p className="mt-1 text-gray-400 text-sm">
                        Tell me about your idea, I'll respond within 24 hours.
                      </p>
                    </div>

                    <form className="space-y-5" onSubmit={sendEmail}>
                      {/* Enhanced Input Fields */}
                      {[
                        {name: "name", type: "text", placeholder: "Your Full Name", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /> },
                        {name: "email", type: "email", placeholder: "your.email@example.com", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /> },
                      ].map(field => (
                        <div key={field.name}>
                          <label htmlFor={field.name} className="block text-sm font-medium text-gray-300 mb-1.5 text-left">
                            {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                {field.icon}
                              </svg>
                            </div>
                            <input
                              type={field.type} name={field.name} id={field.name} required
                              className="w-full pl-10 pr-3 py-3 bg-neutral-800/70 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-500 text-gray-200 transition-all duration-200 text-sm"
                              placeholder={field.placeholder}
                            />
                          </div>
                        </div>
                      ))}
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5 text-left">
                          Message
                        </label>
                        <textarea
                          id="message" rows="4" name="message" required
                          className="w-full px-4 py-3 bg-neutral-800/70 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-500 text-gray-200 transition-all duration-200 text-sm"
                          placeholder="Tell me about your project or inquiry..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-semibold text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transform hover:scale-105"
                      >
                        <span className="relative z-10">Send Message</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-neutral-800/70"> {/* Softer border */}
        <div className="max-w-7xl mx-auto py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm text-gray-400 hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-300"
            >
              © {new Date().getFullYear()} Rohith Vittamraj. All rights reserved.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex space-x-5" // Slightly increased spacing
            >
              {[
                { href: "https://x.com/rohithofficial5?s=21&t=cVo-4UEJaqOqaL-meqeikQ", label: "Twitter", icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />, hoverBg: "hover:bg-sky-500" },
                { href: "https://www.instagram.com/_rohtzz_", label: "Instagram", icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />, hoverBg: "hover:bg-pink-500" },
                { href: "https://www.linkedin.com/in/rohith-vittamraj-0ab76a313", label: "LinkedIn", icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />, hoverBg: "hover:bg-blue-600" },
                { href: "https://github.com/rohith-2809", label: "GitHub", icon: <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />, hoverBg: "hover:bg-neutral-700" },
              ].map(social => (
                <a
                  key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className={`group p-2.5 rounded-full bg-neutral-800 ${social.hoverBg} text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-md`}
                  aria-label={`${social.label} profile`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500/80">
              "🚀 Let’s build something amazing together! Drop me a message! 💬"
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
