import { motion } from "framer-motion";
import { styles } from "../styles";
import Lightning from "./Lightning";
import BlurText from "./BlurText";
import { FaGithub, FaFacebookF, FaInstagram } from "react-icons/fa";

// 🌿 Green accent for Lightning and Hi, I'm
const ACCENT_HUE = 142;       // hue for Lightning
const ACCENT_HEX = "#16a34a"; // Tailwind green-700

const Hero = ({ isMenuOpen }) => {
  const headingAnimationFrom = {
    filter: "blur(20px)",
    opacity: 0,
    y: -50,
  };

  const headingAnimationTo = [
    { filter: "blur(10px)", opacity: 0.4, y: 10 },
    { filter: "blur(4px)", opacity: 0.7, y: 3 },
    { filter: "blur(0px)", opacity: 1, y: 0 },
  ];

  const subtitleAnimationFrom = {
    filter: "blur(16px)",
    opacity: 0,
    y: -40,
  };

  const subtitleAnimationTo = [
    { filter: "blur(8px)", opacity: 0.5, y: 8 },
    { filter: "blur(3px)", opacity: 0.8, y: 2 },
    { filter: "blur(0px)", opacity: 1, y: 0 },
  ];

  return (
    <section
      className="relative w-full h-screen mx-auto overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/myself.jpg')" }}
    >
      {/* Dark flickering overlay */}
      <motion.div
        className="absolute inset-0 bg-black z-0"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: [0.8, 0.4, 0.8] }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />

      {/* Lightning overlay */}
      <div className="absolute inset-0 z-10 mix-blend-screen opacity-100 pointer-events-none">
        <Lightning hue={ACCENT_HUE} xOffset={0} speed={1.1} intensity={1.6} size={1} />
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
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          {/* "Hi, I'm" in green */}
          <BlurText
            text="Hi, I'm"
            delay={220}
            animateBy="letters"
            direction="top"
            className="font-bold"
            style={{ color: ACCENT_HEX }} // <-- green
            animationFrom={headingAnimationFrom}
            animationTo={headingAnimationTo}
            stepDuration={0.5}
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
              delay={260}
              animateBy="letters"
              direction="top"
              className="font-bold"
              style={{}} // <-- no green here, keep normal
              animationFrom={headingAnimationFrom}
              animationTo={headingAnimationTo}
              stepDuration={0.5}
              easing="easeOut"
            />
          </motion.span>
        </motion.div>

        {/* Subtitle (now green) */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <BlurText
            text="I enjoy solving problems through code, structure, and creative discipline."
            delay={140}
            animateBy="words"
            direction="top"
            className={`${styles.heroSubText} mt-2 text-center`}
            style={{ color: ACCENT_HEX }} // <-- make subtitle green
            animationFrom={subtitleAnimationFrom}
            animationTo={subtitleAnimationTo}
            stepDuration={0.45}
            easing="easeOut"
          />
        </motion.div>

        {/* Social icons */}
        <div className="mt-6 flex gap-6">
          <a
            href="https://github.com/Shabbin"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full transition-transform transform hover:scale-110"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              color: ACCENT_HEX,
              boxShadow: `0 0 8px ${ACCENT_HEX}44`,
            }}
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://www.facebook.com/shabbin.hossain.35/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full transition-transform transform hover:scale-110"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              color: ACCENT_HEX,
              boxShadow: `0 0 8px ${ACCENT_HEX}44`,
            }}
          >
            <FaFacebookF size={26} />
          </a>
          <a
            href="https://www.instagram.com/shabbin251/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full transition-transform transform hover:scale-110"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              color: ACCENT_HEX,
              boxShadow: `0 0 8px ${ACCENT_HEX}44`,
            }}
          >
            <FaInstagram size={26} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
