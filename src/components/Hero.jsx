import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import Lightning from "./Lightning";
import BlurText from "./BlurText";
import { FaGithub, FaFacebookF, FaInstagram } from "react-icons/fa";

const ACCENT_HUE = 142;
const ACCENT_HEX = "#16a34a";

const Hero = ({ isMenuOpen }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animations only for desktop
  const headingAnimationFrom = {
    filter: isMobile ? "none" : "blur(6px)",
    opacity: isMobile ? 1 : 0,
    y: isMobile ? 0 : -20,
  };

  const headingAnimationTo = [{ filter: isMobile ? "none" : "blur(0px)", opacity: 1, y: 0 }];

  const subtitleAnimationFrom = {
    filter: isMobile ? "none" : "blur(4px)",
    opacity: isMobile ? 1 : 0,
    y: isMobile ? 0 : -12,
  };

  const subtitleAnimationTo = [{ filter: isMobile ? "none" : "blur(0px)", opacity: 1, y: 0 }];

  // Mouse handlers only for desktop
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
      className="relative w-full h-screen overflow-hidden overflow-x-hidden bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/myself.jpg')" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-black z-0"
        initial={{ opacity: isMobile ? 0.6 : 0.8 }}
        animate={{ opacity: isMobile ? [0.6, 0.6, 0.6] : [0.8, 0.4, 0.8] }}
        transition={{
          duration: isMobile ? 1 : 1.1,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />

      {/* Lightning only on desktop */}
      {!isMobile && (
        <div className="absolute inset-0 z-10 mix-blend-screen pointer-events-none">
          <Lightning
            hue={ACCENT_HUE}
            xOffset={mousePos.x}
            yOffset={mousePos.y}
            speed={1.2}
            intensity={isDragging ? 2.5 : 1.6}
            size={1}
            isActive={isDragging}
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

      {/* Glass/blur overlay when menu is open */}
      {isMenuOpen && <div className="absolute inset-0 z-25 bg-white/10 backdrop-blur-md" />}

      {/* Hero content */}
      <div
        className={`relative z-20 w-full max-w-full flex flex-col items-center gap-5 px-4`}
        style={{ pointerEvents: isMenuOpen ? "none" : "auto" }}
      >
        {/* Heading */}
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          {isMobile ? (
            <h1 className="text-4xl font-bold text-center" style={{ color: ACCENT_HEX }}>
              Hi, I'm Shabbin
            </h1>
          ) : (
            <motion.div
              className={`${styles.heroHeadText} flex flex-wrap items-baseline gap-2 justify-center`}
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <BlurText
                text="Hi, I'm"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold"
                style={{ color: ACCENT_HEX }}
                animationFrom={headingAnimationFrom}
                animationTo={headingAnimationTo}
                stepDuration={0.25}
                easing="easeOut"
              />
              <motion.span
                animate={{
                  color: [ACCENT_HEX, "#f9f5ff", ACCENT_HEX],
                  textShadow: [
                    `0 0 0px #000`,
                    `0 0 8px ${ACCENT_HEX}, 0 0 20px ${ACCENT_HEX}`,
                    "0 0 0px #000",
                  ],
                  filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"],
                  y: [0, -1, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeOut",
                  repeatDelay: 1.5,
                }}
                className="inline-block"
              >
                <BlurText
                  text="Shabbin"
                  delay={120}
                  animateBy="letters"
                  direction="top"
                  className="font-bold"
                  animationFrom={headingAnimationFrom}
                  animationTo={headingAnimationTo}
                  stepDuration={0.25}
                  easing="easeOut"
                />
              </motion.span>
            </motion.div>
          )}
        </div>

        {/* Subtitle */}
        {isMobile ? (
          <p className="text-center" style={{ color: ACCENT_HEX }}>
            I enjoy solving problems through code, structure, and creative discipline.
          </p>
        ) : (
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 2.7,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <BlurText
              text="I enjoy solving problems through code, structure, and creative discipline."
              delay={80}
              animateBy="words"
              direction="top"
              className={`${styles.heroSubText} mt-2 text-center`}
              style={{ color: ACCENT_HEX }}
              animationFrom={subtitleAnimationFrom}
              animationTo={subtitleAnimationTo}
              stepDuration={0.25}
              easing="easeOut"
            />
          </motion.div>
        )}

        {/* Social icons */}
        <div className="mt-6 flex gap-6 flex-wrap justify-center">
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
                boxShadow: `0 0 6px ${ACCENT_HEX}44`,
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