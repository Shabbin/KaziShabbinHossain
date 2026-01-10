import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import Lightning from "./Lightning";
import BlurText from "./BlurText";
import { FaGithub, FaFacebookF, FaInstagram } from "react-icons/fa";

// 🌿 Green accent for Lightning and Hi, I'm
const ACCENT_HUE = 142;
const ACCENT_HEX = "#16a34a";

const Hero = ({ isMenuOpen }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);
  }, []);

  const headingAnimationFrom = {
    filter: isMobile ? "blur(8px)" : "blur(20px)",
    opacity: 0,
    y: isMobile ? -20 : -50,
  };

  const headingAnimationTo = [
    { filter: isMobile ? "blur(4px)" : "blur(10px)", opacity: 0.4, y: isMobile ? 5 : 10 },
    { filter: isMobile ? "blur(2px)" : "blur(4px)", opacity: 0.7, y: isMobile ? 2 : 3 },
    { filter: "blur(0px)", opacity: 1, y: 0 },
  ];

  const subtitleAnimationFrom = {
    filter: isMobile ? "blur(6px)" : "blur(16px)",
    opacity: 0,
    y: isMobile ? -12 : -40,
  };

  const subtitleAnimationTo = [
    { filter: isMobile ? "blur(3px)" : "blur(8px)", opacity: 0.5, y: isMobile ? 3 : 8 },
    { filter: isMobile ? "blur(1px)" : "blur(3px)", opacity: 0.8, y: isMobile ? 1 : 2 },
    { filter: "blur(0px)", opacity: 1, y: 0 },
  ];

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
      className="relative w-full h-screen mx-auto overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/myself.jpg')" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Dark flickering overlay */}
      <motion.div
        className="absolute inset-0 bg-black z-0"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: [0.8, 0.4, 0.8] }}
        transition={{
          duration: isMobile ? 2 : 1.1,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />

      {/* Lightning overlay */}
      <div className="absolute inset-0 z-10 mix-blend-screen pointer-events-none">
        <Lightning
          hue={ACCENT_HUE}
          xOffset={mousePos.x}
          yOffset={mousePos.y}
          speed={isMobile ? 0.6 : 1.2}
          intensity={isDragging ? 2.5 : 1.6}
          size={isMobile ? 0.7 : 1}
          isActive={isDragging}
        />
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-15"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, transparent 100%)",
        }}
      />

      {/* Glass/blur overlay when menu is open */}
      {isMenuOpen && <div className="absolute inset-0 z-25 bg-white/10 backdrop-blur-md" />}

      {/* Hero content */}
      <div
        className={`relative z-20 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col items-center gap-5`}
        style={{
          pointerEvents: isMenuOpen ? "none" : "auto",
          transition: "filter 0.3s ease",
        }}
      >
        {/* Heading */}
        <motion.div
          className={`${styles.heroHeadText} flex flex-wrap items-baseline gap-2 justify-center`}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: isMobile ? 2.5 : 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <BlurText
            text="Hi, I'm"
            delay={isMobile ? 100 : 220}
            animateBy="letters"
            direction="top"
            className="font-bold"
            style={{ color: ACCENT_HEX }}
            animationFrom={headingAnimationFrom}
            animationTo={headingAnimationTo}
            stepDuration={isMobile ? 0.25 : 0.5}
            easing="easeOut"
          />

          {/* Your name with glow animation */}
          <motion.span
            animate={{
              color: [ACCENT_HEX, "#f9f5ff", ACCENT_HEX],
              textShadow: [
                `0 0 0px #000`,
                `0 0 10px ${ACCENT_HEX}, 0 0 28px ${ACCENT_HEX}`,
                "0 0 0px #000",
              ],
              filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
              y: [0, -2, 0, 1, 0],
              scale: [1, 1.04, 0.99, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeOut",
              repeatDelay: 1.8,
            }}
            className="inline-block"
          >
            <BlurText
              text="Shabbin"
              delay={isMobile ? 120 : 260}
              animateBy="letters"
              direction="top"
              className="font-bold"
              style={{}}
              animationFrom={headingAnimationFrom}
              animationTo={headingAnimationTo}
              stepDuration={isMobile ? 0.25 : 0.5}
              easing="easeOut"
            />
          </motion.span>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: isMobile ? 2.7 : 3.2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <BlurText
            text="I enjoy solving problems through code, structure, and creative discipline."
            delay={isMobile ? 80 : 140}
            animateBy="words"
            direction="top"
            className={`${styles.heroSubText} mt-2 text-center`}
            style={{ color: ACCENT_HEX }}
            animationFrom={subtitleAnimationFrom}
            animationTo={subtitleAnimationTo}
            stepDuration={isMobile ? 0.25 : 0.45}
            easing="easeOut"
          />
        </motion.div>

        {/* Social icons */}
        <div className="mt-6 flex gap-6">
          {[
            { href: "https://github.com/Shabbin", icon: <FaGithub size={isMobile ? 20 : 28} /> },
            { href: "https://www.facebook.com/shabbin.hossain.35/", icon: <FaFacebookF size={isMobile ? 18 : 26} /> },
            { href: "https://www.instagram.com/shabbin251/", icon: <FaInstagram size={isMobile ? 18 : 26} /> },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full transition-transform transform hover:scale-110"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                color: ACCENT_HEX,
                boxShadow: `0 0 8px ${ACCENT_HEX}44`,
              }}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
