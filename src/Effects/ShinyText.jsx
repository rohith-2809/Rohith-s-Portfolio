// ShinyText.jsx
export default function ShinyText({
  text,
  disabled = false,
  speed = 1.8,
  className = "",
}) {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`
        inline-block
        ${disabled ? "" : "animate-shine"}
        ${className}
      `}
      style={{
        /* The actual shimmering gradient */
        backgroundImage:
          "linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 60%)",
        backgroundSize: "200% 100%",
        backgroundRepeat: "no-repeat",

        /* Required for text color to show the gradient */
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",

        /* The speed of the shimmer, controlled by the parent */
        animationDuration,
      }}
    >
      {text}
    </div>
  );
}
