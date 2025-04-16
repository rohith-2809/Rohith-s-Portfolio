import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
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

  // Navigation items
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About Me", href: "#about" },
    { label: "Projects", href: "#projects" },
    // { label: "Get Quote", href: "#get-quote" },
  ];

  // Certifications data with links and preview images
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
      text: "Google User Exprerience Design",
      link: "https://coursera.org/share/c617189e47b33926082172340be87f71",
      image: "/PreviewUX.webp",
      description:
        "User-centered design principles and interaction research methodologies",
    },
  ];

  // Tech stack  array
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
  // Function to handle email sending
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_sh057qd", // Service ID
        "template_2vmky28", // Template ID
        e.target, // The form element
        "CcFtpOjqJJUhsgyIK" // Public Key
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          alert("Your message has been sent!");
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
      // Fade out hero section on scroll
      gsap.fromTo(
        hero,
        { opacity: 1 },
        {
          opacity: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Animate hero text
      const heroText = hero.querySelector(".hero-text");
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
              end: "top 60%",
              scrub: true,
            },
          }
        );
      }
    }

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col bg-black relative">
      {/* Header with Responsive Navigation */}
      <header className="bg-black shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center space-x-3"
          >
            <img
              src="/logo.webp"
              alt="Rohith's Logo"
              className="w-10 h-10 object-cover rounded-full"
            />
            <h1 className="text-3xl font-bold text-white">
              Rohith's Portfolio
            </h1>
          </motion.div>

          {/* Desktop Navigation: GooeyNav */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            >
              <GooeyNav items={navItems} />
            </motion.div>
          </div>

          {/* Mobile Navigation: Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black">
            <nav className="px-4 pt-4 pb-2 space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block text-white px-3 py-2 rounded-md hover:bg-gray-700 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/****************************************************************************************************************************************/}

        {/* Hero Section */}
        <section
          ref={heroRef}
          id="home"
          className="
    relative bg-black text-white py-20
    min-h-[90vh] flex items-center
    bg-center bg-cover bg-scroll md:bg-fixed
  "
          style={{ backgroundImage: "url('/img_9.webp')" }}
        >
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60" />

          {/* Blurred gradient circles */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl -top-32 -left-32 animate-pulse" />
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl -bottom-32 -right-32 animate-pulse delay-1000" />
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full z-10">
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0, ease: "easeOut" }}
            >
              <SplitText
                text="Embark on a New Journey"
                className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto"
                delay={100}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,40px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                easing="easeOutCubic"
                textAlign="center"
              />
            </motion.div>

            {/* Interactive Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
              className="mt-4 h-12 text-white"
            >
              <InteractiveText />
            </motion.div>

            {/* Descriptive Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
              className="mt-4"
            >
              <p className="text-lg max-w-2xl mx-auto text-gray-300">
                Crafting cutting-edge digital solutions that bring ideas to
                life.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
              className="mt-8 flex justify-center"
            >
              <a
                href="#projects"
                className="relative inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-md font-medium overflow-hidden transition-all duration-300"
              >
                {/* 10% white overlay */}
                <span className="absolute inset-0 bg-white/10 rounded-md pointer-events-none" />
                <span className="relative">Explore My Work</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/****************************************************************************************************************************************/}

        {/* About Me Section with Animation */}
        <section id="about" className="py-20 bg-black relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl -top-32 -left-32 animate-pulse" />
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl -bottom-32 -right-32 animate-pulse delay-1000" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-8 relative group">
                About Me
                <span className="absolute bottom-0 left-1/2 w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-indigo-500/30 transition-all duration-300 mb-12"
            >
              <p className="text-xl text-gray-300 leading-relaxed">
                I blend cutting-edge technology with creative thinking to build
                digital experiences that solve real problems. With deep
                expertise in <span className="text-indigo-400">MERN stack</span>
                ,<span className="text-purple-400"> AI/ML solutions</span>, and
                <span className="text-pink-400"> UI/UX design</span>, I thrive
                on pushing the boundaries of what's possible. Passionate about
                technology’s ever-evolving landscape, I constantly explore new
                trends, frameworks, and innovations to stay ahead of the curve.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <a
                href="https://drive.google.com/file/d/1dJKCrpJTReFvzrQ3HMdBa_WO_-s52c_t/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 overflow-hidden"
              >
                {/* 10% white overlay */}
                <span className="absolute inset-0 bg-white/10 rounded-xl pointer-events-none" />
                <span className="relative flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  View My Resume
                </span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* About Me Section with Animation */}

        {/****************************************************************************************************************************************/}

        {/* Tech Stack Section  */}
        <section
          id="tech-stack"
          className="relative py-28 bg-black overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl -top-32 -left-32 animate-pulse" />
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl -bottom-32 -right-32 animate-pulse delay-1000" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-20">
                <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6">
                  <span className="inline-block bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                    Powering Innovation
                  </span>
                </h2>
                <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
                  Combining cutting-edge technologies with modern development
                  practices to create
                  <span className="text-indigo-400 font-medium">
                    {" "}
                    performant
                  </span>
                  ,
                  <span className="text-purple-400 font-medium"> scalable</span>
                  , and
                  <span className="text-pink-400 font-medium"> intuitive</span>
                  solutions.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 place-items-center">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="group relative p-6 w-full h-56 rounded-2xl bg-gradient-to-br from-black via-gray-900 to-black border-2 border-gray-800 hover:border-indigo-500/30 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    rotate: Math.random() * 4 - 2,
                    boxShadow: "0 0 40px rgba(99,102,241,0.2)",
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    type: "spring",
                    bounce: 0.4,
                  }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(400px_circle_at_var(--x)_var(--y),rgba(99,102,241,0.15),transparent)]" />

                  <div className="flex flex-col items-center space-y-4 h-full justify-center">
                    <motion.img
                      src={tech.icon}
                      alt={tech.name}
                      className="h-16 w-16 object-contain mb-4 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(99,102,241,0.4)] transition-all duration-300"
                      whileHover={{ y: -5 }}
                    />
                    <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]">
                      {tech.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2 group-hover:text-gray-200 transition-colors font-medium">
                      {tech.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Animated separator */}
            <motion.div
              className="mt-24 mx-auto w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
            />

            <motion.div
              className="mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                Every tool in my arsenal is carefully selected for its
                performance, ecosystem, and maintainability. I specialize in
                creating full-stack solutions that leverage AI capabilities
                while maintaining{" "}
                <span className="text-indigo-400">peak performance</span> and{" "}
                <span className="text-purple-400">developer-friendly</span>{" "}
                architectures.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-lg shadow-indigo-500/20">
                  See Projects
                </button>
                <button className="px-6 py-3 border-2 border-indigo-500/30 text-indigo-400 rounded-lg font-semibold hover:border-indigo-500/60 hover:bg-indigo-500/10 transition-all duration-300">
                  Tech Breakdown
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section  */}
        {/******************************************************************************************************************************************/}

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-center relative group">
                Projects
                <span className="absolute bottom-0 left-1/2 w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-stretch">
              {/* Project 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="h-full relative group"
              >
                <SpotlightCard className="p-6 flex flex-col justify-between h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 border-2 border-gray-800 hover:border-indigo-500">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-indigo-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        Plant Disease Detection
                      </h3>
                    </div>

                    <div className="mb-6 rounded-lg overflow-hidden border border-neutral-800 hover:border-indigo-500/30 transition-all duration-300">
                      <video
                        loading="lazy"
                        autoPlay
                        loop
                        muted
                        className="w-full h-48 object-cover"
                        preload="metadata"
                      >
                        <source src="project-demo.webm" type="video/webm" />
                        Your browser does not support the video tag.
                      </video>
                    </div>

                    <p className="text-gray-400 leading-relaxed mb-6">
                      AI-powered web application that identifies plant diseases
                      from images using CNN models. Provides detailed analysis
                      and preventive measures for healthy crop maintenance.
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-neutral-700 pt-4">
                    <a
                      href="https://github.com/rohith-2809/mern-test"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 mr-2 transition-transform group-hover:scale-110"
                      >
                        {/* GitHub icon path */}
                      </svg>
                      <span className="font-medium">Source Code</span>
                    </a>
                    <a
                      href="https://mern-test-client.onrender.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-md transition-all duration-300 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-white/10 rounded-md pointer-events-none" />
                      <span className="relative flex items-center">
                        <span className="mr-2">Live Demo</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </span>
                    </a>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-2xl blur-xl" />
                  </div>
                </SpotlightCard>
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 group-hover:opacity-40 rotate-45 transition-all duration-500" />
                </div>
              </motion.div>

              {/* Project 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="h-full relative group"
              >
                <SpotlightCard className="p-6 flex flex-col justify-between h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 border-2 border-gray-800 hover:border-indigo-500">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-indigo-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        AI Model Deployment
                      </h3>
                    </div>

                    <p className="text-gray-400 leading-relaxed mb-6">
                      End-to-end MLOps solution deploying machine learning
                      models via Hugging Face and Flask APIs. Demonstrates
                      real-time predictions with seamless integration and
                      scalability.
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-neutral-700 pt-4">
                    <a
                      href="https://github.com/YourUserName/AI-Model-Deployment"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 mr-2 transition-transform group-hover:scale-110"
                      >
                        {/* GitHub icon path */}
                      </svg>
                      <span className="font-medium">Source Code</span>
                    </a>
                    <a
                      href="https://huggingface.co/vittamraj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-md transition-all duration-300 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-white/10 rounded-md pointer-events-none" />
                      <span className="relative flex items-center">
                        <span className="mr-2">Live Demo</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </span>
                    </a>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-2xl blur-xl" />
                  </div>
                </SpotlightCard>
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 group-hover:opacity-40 rotate-45 transition-all duration-500" />
                </div>
              </motion.div>

              {/* Project 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="h-full relative group"
              >
                <SpotlightCard className="p-6 flex flex-col justify-between h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 border-2 border-gray-800 hover:border-indigo-500">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-indigo-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        Employee Management System
                      </h3>
                    </div>

                    <p className="text-gray-400 leading-relaxed mb-6">
                      A fast, responsive app built with React, Tailwind, and
                      Vite to manage employee data using local storage — no
                      backend needed.
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-neutral-700 pt-4">
                    <a
                      href="https://github.com/rohith-2809/Employee-Mangement-System"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 mr-2 transition-transform group-hover:scale-110"
                      >
                        {/* GitHub icon path */}
                      </svg>
                      <span className="font-medium">Source Code</span>
                    </a>
                    <a
                      href="https://employee-mangement-system-w79y.onrender.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-md transition-all duration-300 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-white/10 rounded-md pointer-events-none" />
                      <span className="relative flex items-center">
                        <span className="mr-2">Live Demo</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </span>
                    </a>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-2xl blur-xl" />
                  </div>
                </SpotlightCard>
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 group-hover:opacity-40 rotate-45 transition-all duration-500" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        {/****************************************************************************************************************************************/}

        {/* experience */}
        {/******************************************************************************************************************************************/}
        <section id="experience" className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              My Experience
            </h2>

            {/* Paragraph about triventotrade.com contributions */}
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              I helped enhance the user experience on{" "}
              <a
                href="https://triventotrade.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                triventotrade.com
              </a>{" "}
              by improving crucial UI/UX elements, resulting in a significant
              increase in traffic. During my internship at Buildflow Pvt, I also
              contributed to app design improvements, further boosting
              engagement and user satisfaction.
            </p>

            {/* Interactive Certificate Card (appears on scroll) */}
            <motion.div
              className="flex justify-center mt-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <a
                href="https://drive.google.com/file/d/1G8Xkw0S_TF99Bz3gbyvjwFU70QEIsE0g/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TiltedCard
                  imageSrc="/Intern.webp" // Replace with an actual preview image of your certificate
                  altText="Certificate from Buildflow Pvt"
                  captionText="Certificate of Internship" // Adjust if your PDF says something else
                  containerHeight="380px"
                  containerWidth="300px"
                  imageHeight="380px"
                  imageWidth="300px"
                  scaleOnHover={1.1}
                  rotateAmplitude={12}
                  showMobileWarning={true}
                  showTooltip={true}
                  overlayContent={null}
                  displayOverlayContent={false}
                />
              </a>
            </motion.div>
          </div>
        </section>
        {/* experience */}
        {/****************************************************************************************************************************************/}

        {/* Certifications Section */}
        <section id="certifications" className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-16 text-center"
            >
              <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Certifications & Expertise
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="max-w-3xl mx-auto mb-16 text-center"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                Earned through Google's rigorous professional certification
                programs on Coursera, these credentials validate expertise in
                cutting-edge technologies. Each represents 100+ hours of
                coursework, hands-on projects, and industry-aligned assessments.
                Hover to preview specialization details, or click to verify
                through Coursera's official platform.
              </p>
              <motion.div
                className="mt-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 w-32 mx-auto rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 justify-center"
            >
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 h-full border-2 border-gray-800 hover:border-indigo-500"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={cert.image}
                        alt={`${cert.text} Certification`}
                        className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-8 space-y-4">
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                        {cert.text}
                      </h3>

                      <div className="flex items-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <span className="relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-full text-sm font-semibold overflow-hidden">
                          {/* white overlay at 10% */}
                          <span className="absolute inset-0 bg-white/10 rounded-full pointer-events-none" />
                          <span className="relative flex items-center">
                            <span>View Credential</span>
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-2xl blur-xl" />
                    </div>
                  </a>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 group-hover:opacity-40 rotate-45 transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Certifications Section */}
        {/****************************************************************************************************************************************/}
        {/*Quote section */}
        <section
          id="get-quote"
          className="relative py-20 bg-black text-white text-center overflow-hidden"
        >
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            <motion.div
              className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-l from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto px-4">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Ready to Start Your Project?
            </motion.h2>

            <motion.p
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Let's collaborate to create something extraordinary. Get your free
              quote today!
            </motion.p>

            <motion.button
              onClick={() => setContactModalOpen(true)}
              className="relative group inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get Quote 🌝</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {isContactModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={(e) =>
                  e.target === e.currentTarget && setContactModalOpen(false)
                }
              >
                <motion.div
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 w-full max-w-lg relative border border-gray-700/50 shadow-xl"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setContactModalOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-700/50 transition-colors"
                    aria-label="Close"
                  >
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Let's Connect
                      </h3>
                      <p className="mt-2 text-gray-400">
                        We'll respond within 24 hours
                      </p>
                    </div>

                    <form className="space-y-6" onSubmit={sendEmail}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Name
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="name" // Ensure this matches your EmailJS template
                              required
                              className="w-full px-10 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-500 text-gray-200 transition-all"
                              placeholder="Your name"
                            />
                            <div className="absolute inset-y-0 left-3 flex items-center pr-3 pointer-events-none">
                              <svg
                                className="w-5 h-5 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              name="email"
                              required
                              className="w-full px-10 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-500 text-gray-200 transition-all"
                              placeholder="john@example.com"
                            />
                            <div className="absolute inset-y-0 left-3 flex items-center pr-3 pointer-events-none">
                              <svg
                                className="w-5 h-5 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Message
                          </label>
                          <textarea
                            rows="4"
                            name="message"
                            required
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-500 text-gray-200 transition-all"
                            placeholder="Tell us about your project..."
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 relative overflow-hidden group"
                      >
                        <span className="relative z-10">Send Message</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>
        {/*Quote section */}

        {/****************************************************************************************************************************************/}
      </main>
      {/* Footer */}
      <footer className="bg-black border-t border-gray-900/50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright with gradient text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-400 hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300"
            >
              © 2025 Rohith Vittamraj. All rights reserved.
            </motion.p>

            {/* Social links with improved animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex space-x-6"
            >
              {/* Updated X/Twitter icon */}
              <a
                href="https://x.com/rohithofficial5?s=21&t=cVo-4UEJaqOqaL-meqeikQ"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 rounded-full bg-gray-800 hover:bg-gradient-to-br from-blue-500 to-purple-600 transition-all duration-300"
                aria-label="Twitter profile"
              >
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram with gradient hover */}
              <a
                href="https://www.instagram.com/_rohtzz_"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 rounded-full bg-gray-800 hover:bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 transition-all duration-300"
                aria-label="Instagram profile"
              >
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* LinkedIn with professional styling */}
              <a
                href="https://www.linkedin.com/in/rohith-vittamraj-0ab76a313"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-all duration-300"
                aria-label="LinkedIn profile"
              >
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* GitHub with dark mode hover */}
              <a
                href="https://github.com/rohith-2809"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 rounded-full bg-gray-800 hover:bg-gray-100 transition-all duration-300"
                aria-label="GitHub profile"
              >
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Footer note with subtle animation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500/75">
              "🚀 Let’s build something amazing together! Drop me a message! 💬"
            </p>
          </motion.div>
        </div>
      </footer>
      {/* Footer */}
    </div>
  );
};

export default Landing;
