import { useRef } from "react";

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.25)" }) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseEnter = () => {
    if (divRef.current) {
      divRef.current.style.setProperty("--spotlight-opacity", "0.6");
    }
  };

  const handleMouseLeave = () => {
    if (divRef.current) {
      divRef.current.style.setProperty("--spotlight-opacity", "0");
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 ${className}`}
      style={{
        "--mouse-x": "0px",
        "--mouse-y": "0px",
        "--spotlight-opacity": "0",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity: "var(--spotlight-opacity)",
          background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 80%)`,
          willChange: "opacity, background",
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;