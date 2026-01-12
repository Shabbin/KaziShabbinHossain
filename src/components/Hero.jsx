import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import Lightning from "./Lightning";
import { FaGithub, FaFacebookF, FaInstagram } from "react-icons/fa";

const ACCENT_HUE = 142;
const ACCENT_HEX = "#16a34a";

const Hero = ({ isMenuOpen }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Typing states
  const headingText = "Hi, I'm Shabbin";
  const punchlineText =
    "I enjoy solving problems through code, structure, and creative discipline.";
  const [typedHeading, setTypedHeading] = useState("");
  const [typedPunchline, setTypedPunchline] = useState("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Typing effect: first heading, then punchline
    let indexH = 0;
    let indexP = 0;

    const typeHeading = setInterval(() => {
      setTypedHeading(headingText.slice(0, indexH + 1));
      indexH++;
      if (indexH === headingText.length) {
        clearInterval(typeHeading);

        // start punchline typing after heading finishes
        const typePunchline = setInterval(() => {
          setTypedPunchline(punchlineText.slice(0, indexP + 1));
          indexP++;
          if (indexP === punchlineText.length) clearInterval(typePunchline);
        }, 60); // punchline typing slower
      }
    }, 120); // heading typing speed

    return () => {
      clearInterval(typeHeading);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (!isMobile) {
      setIsDragging(true);
      updateMousePos(e);
    }
  };

  const handleMouseMove = (e) => {
    if (!isMobile && isDragging) updateMousePos(e);
  };

  const handleMouseUp = () => {
    if (!isMobile) setIsDragging(false);
  };

  const updateMousePos = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * -2 + 1;
    setMousePos({ x, y });
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/myself.jpg')" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Ambient cinematic light */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(
              100% 65% at 50% 28%,
              rgba(22,163,74,0.10) 0%,
              rgba(0,0,0,0.78) 42%,
              rgba(0,0,0,0.92) 70%,
              rgba(0,0,0,0.98) 100%
            )
          `,
        }}
      />

      {/* Enhanced Lightning */}
      {!isMobile && (
        <div className="absolute inset-0 z-10 mix-blend-screen pointer-events-none">
          <Lightning
            hue={ACCENT_HUE}
            xOffset={mousePos.x}
            yOffset={mousePos.y}
            speed={1.4}              
            intensity={isDragging ? 4.0 : 2.8} 
            size={1.2}               
            glow={2.2}               
            isActive={isDragging}
            randomFlicker={true}     
          />
        </div>
      )}

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-15"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, transparent 100%)",
        }}
      />

      {isMenuOpen && (
        <div className="absolute inset-0 z-25 bg-white/10 backdrop-blur-md" />
      )}

      <div
        className="relative z-20 w-full flex flex-col items-center gap-5 px-4"
        style={{ pointerEvents: isMenuOpen ? "none" : "auto" }}
      >
        <div className="flex flex-col items-center gap-2">
          {isMobile ? (
            <>
              <h1
                className="text-4xl font-bold text-center"
                style={{ color: ACCENT_HEX }}
              >
                {headingText}
              </h1>
              <p className="text-center" style={{ color: ACCENT_HEX }}>
                {punchlineText}
              </p>
            </>
          ) : (
            <>
              {/* Heading typing */}
              <div
                className={`${styles.heroHeadText} flex flex-wrap gap-2 justify-center`}
                style={{
                  color: ACCENT_HEX,
                  textShadow: `0 0 4px ${ACCENT_HEX}, 0 0 12px ${ACCENT_HEX}`,
                }}
              >
                {typedHeading.split("").map((char, index) => (
                  <span key={index} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>

              {/* Punchline typing + subtle floating */}
              <motion.div
                animate={{
                  x: [0, 1.5, -1, 0.5, 0], // subtle horizontal drift
                  y: [0, -1.5, 1, -0.5, 0], // subtle vertical drift
                }}
                transition={{
                  duration: 8,   // long duration to confuse the eye
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`${styles.heroSubText} mt-2 text-center`}
                style={{ color: ACCENT_HEX }}
              >
                {typedPunchline.split("").map((char, index) => (
                  <span key={index} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </motion.div>
            </>
          )}
        </div>

        {/* Social icons */}
        <div className="mt-6 flex gap-6 justify-center">
          {[FaGithub, FaFacebookF, FaInstagram].map((Icon, i) => (
            <a
              key={i}
              href={
                i === 0
                  ? "https://github.com/Shabbin"
                  : i === 1
                  ? "https://www.facebook.com/shabbin.hossain.35/"
                  : "https://www.instagram.com/shabbin251/"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full hover:scale-110 transition-transform"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                color: ACCENT_HEX,
                boxShadow: `0 0 6px ${ACCENT_HEX}44`,
              }}
            >
              <Icon size={isMobile ? 20 : 26} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
