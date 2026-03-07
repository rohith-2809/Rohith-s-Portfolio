import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

const CustomToast = ({ message, type = "success", duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);

  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);

  useEffect(() => {
    if (isPaused) return;

    const interval = 10;
    const step = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleClose();
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getIcon = () => {
    switch (type) {
      case "success": return <FaCheckCircle className="text-emerald-400" />;
      case "error": return <FaExclamationCircle className="text-rose-400" />;
      default: return <FaInfoCircle className="text-sky-400" />;
    }
  };

  const getTypeStyles = () => {
    switch (type) {
      case "success": return "border-emerald-500/30 bg-emerald-500/10 shadow-emerald-500/10";
      case "error": return "border-rose-500/30 bg-rose-500/10 shadow-rose-500/10";
      default: return "border-indigo-500/30 bg-indigo-500/10 shadow-indigo-500/10";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)", transition: { duration: 0.3 } }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x, opacity }}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 100) handleClose();
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`fixed bottom-8 right-8 z-[10000] flex flex-col gap-0 w-full max-w-[320px] rounded-2xl border backdrop-blur-xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing will-change-transform ${getTypeStyles()}`}
        >
          <div className="flex items-start gap-4 p-5">
            <div className="text-2xl mt-0.5 drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]">
              {getIcon()}
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm font-medium text-white/95 leading-snug">
                {message}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white/40 hover:text-white/90 transition-colors p-1 -mt-1 -mr-1"
            >
              <FaTimes size={14} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-[3px] w-full bg-white/5">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
              className={`h-full ${
                type === "success" ? "bg-emerald-500" :
                type === "error" ? "bg-rose-500" : "bg-indigo-500"
              }`}
            />
          </div>

          {/* Liquid Shine Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomToast;
