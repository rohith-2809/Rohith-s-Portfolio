// src/components/Effects/CustomCursor.js
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Don't run cursor logic on mobile

    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    // Add event listeners for hover effects on interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .cursor-pointer-interactive, [role="button"], input[type="submit"], input[type="text"], input[type="email"], textarea'
    );
    const textElements = document.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, span, li, label"
    );

    const enterHandler = () => setCursorVariant("link");
    const textEnterHandler = () => setCursorVariant("text");
    const leaveHandler = () => setCursorVariant("default");

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", enterHandler);
      el.addEventListener("mouseleave", leaveHandler);
    });
    textElements.forEach((el) => {
      el.addEventListener("mouseenter", textEnterHandler);
      el.addEventListener("mouseleave", leaveHandler);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", enterHandler);
        el.removeEventListener("mouseleave", leaveHandler);
      });
      textElements.forEach((el) => {
        el.removeEventListener("mouseenter", textEnterHandler);
        el.removeEventListener("mouseleave", leaveHandler);
      });
    };
  }, [isMobile]);

  if (isMobile) {
    return null; // Don't render custom cursor on mobile
  }

  const variants = {
    default: {
      x: mousePosition.x - 8, // Center the dot
      y: mousePosition.y - 8,
      width: 16,
      height: 16,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      mixBlendMode: "difference",
      transition: { type: "spring", stiffness: 500, damping: 20, mass: 0.5 },
    },
    link: {
      x: mousePosition.x - 20, // Center the larger circle
      y: mousePosition.y - 20,
      width: 40,
      height: 40,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      mixBlendMode: "difference",
      border: "2px solid rgba(255,255,255,0.5)",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    text: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 15,
      width: 2,
      height: 30,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      mixBlendMode: "difference",
      borderRadius: 0,
      transition: { type: "spring", stiffness: 400, damping: 20 },
    },
  };

  const outerVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      width: 32,
      height: 32,
      border: "1.5px solid rgba(167, 139, 250, 0.5)", // Tailwind's indigo-400 with opacity
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.2,
        delay: 0.05,
      },
    },
    link: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      border: "2px solid rgba(167, 139, 250, 0.7)",
      backgroundColor: "rgba(167, 139, 250, 0.1)",
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
    text: {
      x: mousePosition.x - 16, // Same as default to keep it subtle for text
      y: mousePosition.y - 16,
      width: 32,
      height: 32,
      border: "1.5px solid rgba(167, 139, 250, 0.3)",
      opacity: 0.5,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.2,
        delay: 0.05,
      },
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        variants={outerVariants}
        animate={cursorVariant}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        variants={variants}
        animate={cursorVariant}
      />
      <style jsx global>{`
        body,
        html {
          cursor: none !important; /* Hide the default cursor */
        }
        a,
        button,
        .cursor-pointer-interactive,
        [role="button"],
        input,
        textarea {
          cursor: none !important; /* Ensure no default cursor on interactive elements */
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
