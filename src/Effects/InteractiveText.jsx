import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const phrases = ["Web Developer", "UX Designer", "Machine Learning Enthusiast"];

const InteractiveText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000); // Change phrase every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
      >
        {phrases[index]}
      </motion.div>
    </AnimatePresence>
  );
};

export default InteractiveText;
