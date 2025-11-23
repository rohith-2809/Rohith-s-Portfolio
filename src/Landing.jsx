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

// Tech stack logos for the animation
const techLogos = [
  { name: "Deep Learning", icon: "/DeepLearning.webp" },
  { name: "Express.js", icon: "/express-js.webp" },
  { name: "Figma", icon: "/Figma-logo.webp" },
  { name: "MongoDB", icon: "/Mongodb.webp" },
  { name: "Node.js", icon: "/Node.js_logo.svg.webp" },
  { name: "Python", icon: "/Python.webp" },
  { name: "React", icon: "/React.webp" },
  { name: "Tailwind CSS", icon: "/Tailwind_CSS_Logo.webp" },
];

/**
 * The main landing page component for the portfolio.
 * It includes sections for Home, About, Tech Stack, Projects, Experience, and Certifications.
 * It features a hamburger navigation menu, smooth scrolling, and various animations using GSAP and Framer Motion.
 * @returns {JSX.Element} The rendered Landing component.
 */
const Landing = () => {
  const heroRef = useRef(null);
  /**
   * @state {boolean} isContactModalOpen - Controls the visibility of the contact form modal.
   */
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  /**
   * @state {boolean} mainMenuOpen - Controls the visibility of the main navigation dropdown for mobile/smaller screens.
   */
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  /**
   * @state {boolean} isLoading - Controls whether the loading animation is active.
   */
  const [isLoading, setIsLoading] = useState(true);
  /**
   * @state {number} currentLogoIndex - Current index of the tech logo being displayed.
   */
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About Me", href: "#about" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Certifications", href: "#certifications" },
  ];

  const certifications = [
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
      description:
        "Examine data to identify patterns and trends, build models using machine learning techniques, and create data visualizations.",
    },
    {
      text: "Automate Cybersecurity Tasks with Python",
      link: "https://coursera.org/share/b00ad7de4b6962060b8d47800927b352",
      image: "/Google Python.webp",
      description:
        "Enhancing cybersecurity workflows through Python scripting and automated threat detection.",
    },
    {
      text: "Connect and Protect: Networks and Network Security",
      link: "https://coursera.org/share/9bd3492f4984a22b035647ca0e151226",
      image: "/Google networking.webp",
      description:
        "Mastering network architecture, intrusion prevention, and system hardening for secure digital environments.",
    },
  ];

  const techStack = [
    { name: "Deep Learning", icon: "/DeepLearning.webp", description: "Neural network architectures" },
    { name: "Express.js", icon: "/express-js.webp", description: "High-performance backend" },
    { name: "Figma", icon: "/Figma-logo.webp", description: "Pixel-perfect UI/UX design" },
    { name: "MongoDB", icon: "/Mongodb.webp", description: "Scalable NoSQL databases" },
    { name: "Node.js", icon: "/Node.js_logo.svg.webp", description: "Event-driven architecture" },
    { name: "Python", icon: "/Python.webp", description: "AI/ML & data processing" },
    { name: "React", icon: "/React.webp", description: "Interactive front-ends" },
    { name: "Tailwind CSS", icon: "/Tailwind_CSS_Logo.webp", description: "Modern utility-first styling" },
  ];

  /**
   * Handles the submission of the contact form using EmailJS.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const sendEmail = (e) => {
    e.preventDefault();
    const form = e.target;
    emailjs
      .sendForm(
        "service_sh057qd", // Your EmailJS Service ID
        "template_2vmky28", // Your EmailJS Template ID
        form,
        "CcFtpOjqJJUhsgyIK"  // Your EmailJS Public Key
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          alert("Your message has been sent successfully!");
          setContactModalOpen(false);
          form.reset();
        },
        (error) => {
          console.error("Error sending email:", error);
          const errorMessage = error.text || "Oops! Something went wrong. Please try again later.";
          alert(`Failed to send message: ${errorMessage}`);
        }
      );
  };

  // Loading animation sequence
  useEffect(() => {
    let currentIndex = 0;
    const totalLogos = techLogos.length;
    const cycleDuration = 300; // milliseconds per logo

    const cycleLogos = () => {
      if (currentIndex < totalLogos) {
        setCurrentLogoIndex(currentIndex);
        currentIndex++;
        setTimeout(cycleLogos, cycleDuration);
      } else {
        // After cycling through all logos, show the actual logo and then the page
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    // Start the animation after a brief delay
    const startAnimation = setTimeout(cycleLogos, 500);

    return () => {
      clearTimeout(startAnimation);
    };
  }, []);

  // Sets up GSAP scroll-triggered animations for the hero section.
  useEffect(() => {
    if (isLoading) return; // Don't setup scroll animations until loading is complete

    const hero = heroRef.current;
    if (hero) {
      // Fades out the hero section slightly on scroll
      gsap.fromTo( hero, { opacity: 1 }, { opacity: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.5, },
      });
      
      // Animates the hero text words into view on scroll
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
    // Cleanup function to kill all ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading]);

  /**
   * Toggles the state of the main navigation menu.
   */
  const toggleMainMenu = () => setMainMenuOpen((prev) => !prev);

  /**
   * Handles smooth scrolling to a section when a navigation link is clicked.
   * @param {React.MouseEvent<HTMLAnchorElement>} e - The click event.
   * @param {string} href - The ID of the target element to scroll to (e.g., "#about").
   */
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMainMenuOpen(false); // Close menu after click
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative selection:bg-indigo-500 selection:text-white antialiased">
      <CustomCursor />

      {/* Loading Animation Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          >
            <div className="text-center">
              {/* Tech Stack Animation */}
              <motion.div
                key={`tech-logo-${currentLogoIndex}`}
                initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 1.2, opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="mb-8"
              >
                {currentLogoIndex < techLogos.length ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={techLogos[currentLogoIndex]?.icon} 
                      alt={techLogos[currentLogoIndex]?.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl border-2 border-indigo-500/40 bg-white/5 p-3 mb-4"
                    />
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-lg font-semibold text-indigo-300"
                    >
                      {techLogos[currentLogoIndex]?.name}
                    </motion.p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                    className="flex flex-col items-center"
                  >
                    <img 
                      src="/logo.webp" 
                      alt="Rohith's Logo"
                      className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-full border-4 border-indigo-500/60 mb-6"
                    />
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                    >
                      Rohith's Portfolio
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-400 mt-2 text-lg"
                    >
                      Welcome
                    </motion.p>
                  </motion.div>
                )}
              </motion.div>

              {/* Progress Dots */}
              <div className="flex justify-center space-x-2 mt-8">
                {techLogos.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index <= currentLogoIndex ? 'bg-indigo-500' : 'bg-gray-600'
                    }`}
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: index === currentLogoIndex ? 1.2 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Only shown after loading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={isLoading ? "pointer-events-none" : ""}
      >
        <header className="sticky top-0 z-[1000] bg-black/75 backdrop-blur-lg shadow-2xl shadow-black/20">
          <div className="max-w-7xl mx-auto flex justify-between items-center py-3.5 px-4 sm:px-6 lg:px-8">
            <motion.a 
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "circOut", delay: 0.2 }}
              className="flex items-center space-x-3.5 cursor-pointer-interactive group"
            >
              <img src="/logo.webp" alt="Rohith's Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-full border-2 border-indigo-500/60 group-hover:border-indigo-400 transition-all duration-300 transform group-hover:scale-105"
              />
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-100 group-hover:text-white transition-colors duration-300 tracking-tight">
                Rohith's Portfolio
              </h1>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "circOut", delay: 0.3 }}
            > 
              <button
                onClick={toggleMainMenu}
                className="text-gray-300 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-indigo-500 transition-colors duration-200 cursor-pointer-interactive"
                aria-label="Toggle Navigation Menu"
                aria-expanded={mainMenuOpen}
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
                exit={{ opacity: 0, y: -20, transition: {duration: 0.2, ease: "easeIn"} }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-t border-b border-neutral-800/70 shadow-2xl md:rounded-b-lg md:mx-4 lg:mx-auto lg:max-w-md md:right-4 md:left-auto"
              >
                <nav className="px-4 py-4 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={index} href={item.href} onClick={(e) => handleNavClick(e, item.href)}
                      className="block text-gray-200 hover:text-white text-base tracking-wide px-4 py-2.5 rounded-lg hover:bg-indigo-600/40 transition-all duration-200 ease-out cursor-pointer-interactive"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.07, duration: 0.25, ease: "circOut" }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="flex-grow isolate">
          <section ref={heroRef} id="home" className="relative bg-black text-white py-28 md:py-36 min-h-[90vh] flex items-center bg-center bg-cover bg-fixed"
            style={{ backgroundImage: "url('/img_9.webp')" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
              <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }} 
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
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7, delay: 0.6, ease: "circOut" }} 
                className="mt-5 mb-3 h-12" 
              >
                <InteractiveText className="cursor-pointer-interactive"/>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7, delay: 0.8, ease: "circOut" }}
                className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200/90 leading-relaxed" 
              >
                Crafting cutting-edge digital solutions that bring ideas to life.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                transition={{ duration: 0.7, delay: 1.0, type: "spring", stiffness:150, damping: 20 }}
                className="mt-10 flex justify-center gap-4" 
              >
                <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")}
                  className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-lg text-base font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/40 focus:outline-none focus:ring-4 focus:ring-indigo-500/50" >
                  Explore My Work ✨
                </a>
              </motion.div>
            </div>
          </section>

          {/* All other sections remain exactly the same with proper loading delays */}
          {/* About Me Section */}
          <section id="about" className="py-20 md:py-24 bg-black relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, ease:"easeOut" }} 
                viewport={{ once: true, amount: 0.3 }} 
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative group">
                  About Me
                  <span className="absolute bottom-0 left-1/2 w-36 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform -translate-x-1/2 translate-y-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full group-hover:w-40 ease-out"></span>
                </h2>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }} 
                viewport={{ once: true, amount: 0.3 }}
                className="p-8 bg-neutral-900/70 backdrop-blur-sm rounded-xl border border-neutral-800/80 hover:border-indigo-500/50 transition-all duration-300 mb-12 shadow-xl hover:shadow-indigo-500/10" 
              >
                <p className="text-lg md:text-xl text-gray-200/95 leading-relaxed">
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
                transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 150 }} 
                viewport={{ once: true, amount: 0.5 }} 
              >
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
            {/* ... existing tech stack section content ... */}
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20 md:py-24 bg-black">
            {/* ... existing projects section content ... */}
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-20 md:py-24 bg-black text-white">
            {/* ... existing experience section content ... */}
          </section>

          {/* Certifications Section */}
          <section id="certifications" className="py-20 md:py-24 bg-black">
            {/* ... existing certifications section content ... */}
          </section>

          {/* Get Quote Section */}
          <section id="get-quote" className="relative py-20 md:py-28 bg-black text-white text-center overflow-hidden" >
            {/* ... existing get quote section content ... */}
          </section>
        </main>

        <footer className="bg-black border-t border-neutral-800/60">
          {/* ... existing footer content ... */}
        </footer>
      </motion.div>
    </div>
  );
};

export default Landing;
