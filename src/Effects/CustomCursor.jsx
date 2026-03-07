import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isMobile, setIsMobile] = useState(false);

  // Use MotionValues for high-performance direct DOM updates without re-rendering
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the cursor motion
  const springConfig = { damping: 20, stiffness: 500, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const outerSpringConfig = { damping: 20, stiffness: 100, mass: 0.2 };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const mouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", mouseMove, { passive: true });

    // Delegated event listening for hover effects for better performance
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a, button, .cursor-pointer-interactive, [role="button"], input[type="submit"]')
      ) {
        setCursorVariant("link");
      } else if (
        target.closest('input[type="text"], input[type="email"], textarea')
      ) {
        setCursorVariant("link"); // Both input and textarea use link variant for focus
      } else if (
        target.closest("p, h1, h2, h3, h4, h5, h6, span, li, label")
      ) {
        setCursorVariant("text");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  const variants = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    link: {
      width: 40,
      height: 40,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      border: "2px solid rgba(255,255,255,0.5)",
    },
    text: {
      width: 2,
      height: 30,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: 0,
    },
  };

  const outerVariants = {
    default: {
      width: 32,
      height: 32,
      border: "1.5px solid rgba(167, 139, 250, 0.5)",
      opacity: 1,
    },
    link: {
      width: 48,
      height: 48,
      border: "2px solid rgba(167, 139, 250, 0.7)",
      backgroundColor: "rgba(167, 139, 250, 0.1)",
      opacity: 1,
    },
    text: {
      width: 32,
      height: 32,
      border: "1.5px solid rgba(167, 139, 250, 0.3)",
      opacity: 0.5,
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] bg-transparent"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform, width, height, opacity, border, backgroundColor",
        }}
        variants={outerVariants}
        animate={cursorVariant}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
          willChange: "transform, width, height, backgroundColor, borderRadius",
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ duration: 0.3 }}
      />
      <style jsx global>{`
        body, html, a, button, .cursor-pointer-interactive, [role="button"], input, textarea {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
