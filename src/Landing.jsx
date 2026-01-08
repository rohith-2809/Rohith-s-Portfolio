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

// --- SIMPLIFIED LOADER ---
const TechStackLoader = ({ onComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <motion.div 
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <img
              src="/logo.webp"
              alt="Rohith's Logo"
              className="w-32 h-32 object-contain rounded-full border-4 border-indigo-500 shadow-2xl shadow-indigo-500/50"
            />
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Rohith's Portfolio
            </h1>
            
            <div className="h-2 w-64 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            
            <p className="text-gray-400 mt-4 text-sm">
              Loading... {loadingProgress}%
            </p>
          </div>
        </motion.div>
      </div>
    </div>
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

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // Initialize animations after loading
    gsap.fromTo(
      ".hero-title span",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, [isLoading]);

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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {isLoading && <TechStackLoader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <>
          {/* Header */}
          <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center space-x-3">
                  <img src="/logo.webp" alt="Logo" className="w-10 h-10 rounded-full" />
                  <span className="text-xl font-bold text-white">Rohith's Portfolio</span>
                </a>
                
                <button onClick={toggleMainMenu} className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700">
                  {mainMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                </button>
              </div>

              {mainMenuOpen && (
                <div className="py-4 border-t border-gray-800">
                  <nav className="space-y-2">
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="block py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </header>

          {/* Hero Section */}
          <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
              <img
                src="/img_9.webp"
                alt="Background"
                className="w-full h-full object-cover opacity-20"
              />
            </div>
            
            <div className="relative max-w-4xl mx-auto px-4 text-center">
              <div className="hero-title mb-8">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6">
                  Crafting Digital
                  <br />
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Experiences
                  </span>
                </h1>
              </div>
              
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Transforming ideas into elegant, high-performance digital solutions through innovative technology and thoughtful design.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#projects"
                  onClick={(e) => handleNavClick(e, "#projects")}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Explore My Work
                </a>
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="px-8 py-3 border-2 border-gray-700 text-white font-semibold rounded-lg hover:border-gray-600 transition-colors"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </section>

          {/* About Me Section */}
          <section id="about" className="py-20 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  About Me
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Full-stack developer with expertise in creating innovative digital solutions
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
                  <p className="text-gray-300 mb-6">
                    I specialize in building scalable web applications with modern technologies. 
                    With experience in both frontend and backend development, I create solutions 
                    that are both efficient and user-friendly.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">React</span>
                    <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">Node.js</span>
                    <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">Python</span>
                    <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">AI/ML</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-6 bg-gray-800 rounded-lg">
                    <h4 className="text-xl font-bold text-white mb-2">3+ Years Experience</h4>
                    <p className="text-gray-400">Building production-ready applications</p>
                  </div>
                  <div className="p-6 bg-gray-800 rounded-lg">
                    <h4 className="text-xl font-bold text-white mb-2">100+ Projects</h4>
                    <p className="text-gray-400">Successfully delivered solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tech Stack Section */}
          <section id="tech-stack" className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Tech Stack
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Technologies I work with to build amazing products
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {techStack.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="group p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
                    onMouseEnter={() => setHoveredTech(index)}
                    onMouseLeave={() => setHoveredTech(null)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 mb-4 flex items-center justify-center">
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="font-semibold text-white">{tech.name}</h3>
                      {hoveredTech === index && (
                        <p className="text-sm text-gray-400 mt-2">{tech.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Featured Projects
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Check out some of my recent work
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Plant Disease Detection */}
                <div className="bg-gray-800 rounded-xl overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Plant Disease Detection</h3>
                    <p className="text-gray-400 mb-4">AI-powered web application for identifying plant diseases from images</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">AI/ML</span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">React</span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Node.js</span>
                    </div>
                    <div className="flex gap-4">
                      <a
                        href="https://github.com/rohith-2809/mern-test"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        GitHub
                      </a>
                      <a
                        href="https://mern-test-client.onrender.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* DocuAgent AI */}
                <div className="bg-gray-800 rounded-xl overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">DocuAgent AI</h3>
                    <p className="text-gray-400 mb-4">Intelligent documentation automation for codebases</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Automation</span>
                      <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm">AI</span>
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">Python</span>
                    </div>
                    <div className="flex gap-4">
                      <a
                        href="https://github.com/rohith-2809"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300"
                      >
                        GitHub
                      </a>
                      <a
                        href="https://docuagent-2vp4.onrender.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-400 hover:text-teal-300"
                      >
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <a
                  href="https://github.com/rohith-2809"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-700 text-white rounded-lg hover:border-gray-600 transition-colors"
                >
                  View All Projects
                  <FaExternalLinkAlt className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-20 bg-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Experience
              </h2>
              <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                Internship at BuildFlow Technologies Pvt. Ltd.
              </p>
              
              <div className="bg-gray-900 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Full Stack Developer Intern</h3>
                <ul className="text-gray-300 space-y-3 text-left max-w-xl mx-auto">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Developed scalable web applications using MERN stack
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Enhanced user experience across multiple platforms
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Optimized application performance by 40%
                  </li>
                </ul>
              </div>
              
              <a
                href="https://drive.google.com/file/d/1G8Xkw0S_TF99Bz3gbyvjwFU70QEIsE0g/view"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Certificate
                <FaExternalLinkAlt className="w-4 h-4" />
              </a>
            </div>
          </section>

          {/* Certifications Section */}
          <section id="certifications" className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Certifications
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Professional certifications from Google and leading platforms
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Google Machine Learning",
                    link: "https://coursera.org/share/27665abf668c0479e649f09c01ce75b9",
                    description: "Mastering predictive algorithms and data-driven model development"
                  },
                  {
                    title: "Google AI Essentials",
                    link: "https://coursera.org/share/e76522223bd36da3f4a8feeb93d2d2f7",
                    description: "Neural networks and AI system implementation"
                  },
                  {
                    title: "Google UX Design",
                    link: "https://coursera.org/share/c617189e47b33926082172340be87f71",
                    description: "User-centered design principles and research"
                  },
                  {
                    title: "Advanced Data Analytics",
                    link: "https://coursera.org/share/09e30d48b4d38a664c30b12795d8b144",
                    description: "Data patterns, ML models, and visualization techniques"
                  },
                  {
                    title: "Cybersecurity Automation",
                    link: "https://coursera.org/share/b00ad7de4b6962060b8d47800927b352",
                    description: "Python scripting for automated threat detection"
                  },
                  {
                    title: "Network Security",
                    link: "https://coursera.org/share/9bd3492f4984a22b035647ca0e151226",
                    description: "Network architecture and system hardening"
                  }
                ].map((cert, index) => (
                  <a
                    key={index}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                    <p className="text-gray-400 text-sm">{cert.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 bg-black">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Let's Work Together
              </h2>
              <p className="text-gray-400 mb-8">
                Have a project in mind? Let's discuss how we can create something amazing.
              </p>
              
              <button
                onClick={() => setContactModalOpen(true)}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Contact Me
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 py-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="flex justify-center space-x-6 mb-6">
                  <a href="https://github.com/rohith-2809" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/rohith-vittamraj-0ab76a313" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    LinkedIn
                  </a>
                  <a href="https://x.com/rohithofficial5" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    Twitter
                  </a>
                </div>
                <p className="text-gray-500 text-sm">
                  © {new Date().getFullYear()} Rohith Vittamraj. All rights reserved.
                </p>
              </div>
            </div>
          </footer>

          {/* Contact Modal */}
          {isContactModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
              <div className="bg-gray-900 rounded-xl w-full max-w-md">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">Contact Me</h3>
                    <button onClick={() => setContactModalOpen(false)} className="text-gray-400 hover:text-white">
                      <FaTimes className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <form onSubmit={sendEmail}>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-indigo-500 focus:outline-none"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-indigo-500 focus:outline-none"
                      />
                      <textarea
                        name="message"
                        rows="4"
                        placeholder="Your Message"
                        required
                        className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-indigo-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Landing;
