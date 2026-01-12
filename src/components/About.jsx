import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import ElectricBorder from "./ElectricBorder";

// 🌿 Shabbin-like green color and glow
const ACCENT_HEX = "#22c55e"; // accent glow
const SHABBIN_GREEN = "#22c55e"; // color of text (same as glow)
const DARK_GREEN = "#15803d"; // for normal text

const ServiceCard = ({ index, title, icon, isMobile }) => {
  const CardContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: isMobile ? 12 : 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        type: "spring",
        duration: isMobile ? 0.6 : 0.9,
        delay: isMobile ? 0 : index * 0.15,
      }}
      whileHover={!isMobile ? { y: -6 } : undefined}
      className="w-full"
    >
      {isMobile ? (
        <div className="rounded-[20px] bg-[#020617] py-5 px-5 min-h-[180px] flex flex-col items-center justify-between border border-emerald-500/40">
          <IconAndTitle title={title} icon={icon} />
        </div>
      ) : (
        <ElectricBorder
          color={ACCENT_HEX}
          speed={1}
          chaos={0.7}
          thickness={2}
          style={{ borderRadius: 24 }}
        >
          <div className="m-[4px] rounded-[20px] min-h-[220px] py-6 px-6 flex flex-col items-center justify-between bg-[#020617]">
            <IconAndTitle title={title} icon={icon} />
          </div>
        </ElectricBorder>
      )}
    </motion.div>
  );

  return isMobile ? CardContent : <Tilt className="xs:w-[260px] w-full">{CardContent}</Tilt>;
};

const IconAndTitle = ({ title, icon }) => (
  <>
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-400/90"
      style={{ color: DARK_GREEN }}
    >
      <span className="text-[18px] font-semibold tracking-widest">{icon}</span>
    </div>
    <h3
      className="text-[18px] font-bold text-center mt-4 leading-snug"
      style={{ color: DARK_GREEN }}
    >
      {title}
    </h3>
  </>
);

const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      {/* 🔥 Background glow stays on all devices */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px] -z-10"
        style={{
          border: `1px solid ${ACCENT_HEX}`,
          boxShadow: `0 0 40px ${ACCENT_HEX}, 0 0 80px rgba(34,197,94,0.9)`,
          background:
            "radial-gradient(circle at top, rgba(15,23,42,0.96), rgba(2,6,23,0.98))",
        }}
      />

      <div className="rounded-[32px] px-5 py-8 sm:px-10 sm:py-12">
        <motion.div
          variants={textVariant(0.1)}
          className="flex flex-col items-center sm:items-start text-center sm:text-left"
        >
          <p className={styles.sectionSubText} style={{ color: ACCENT_HEX }}>
            INTRODUCTION
          </p>
          <h2
            className={styles.sectionHeadText}
            style={{
              color: SHABBIN_GREEN,
              textShadow: `
                0 0 2px ${ACCENT_HEX},
                0 0 6px ${ACCENT_HEX},
                0 0 12px rgba(34,197,94,0.4)
              `, // soft Shabbin-like glow
            }}
          >
            <span className="relative inline-block">
              Overview<span style={{ color: DARK_GREEN }}>.</span>
            </span>
          </h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "tween", 0.15, 0.8)}
          className="mt-4 text-[15px] sm:text-[17px] max-w-3xl leading-[26px] sm:leading-[30px]"
          style={{ color: DARK_GREEN }}
        >
          I’m a full-stack web developer with a background in Computer Science &
          Engineering. I enjoy working on problems that require clear thinking,
          structure, and careful design.
          <br />
          <br />
          I’m comfortable working across the stack — from backend APIs and data
          models to clean, usable frontend interfaces. I recently built an
          online tuition platform MVP with real-time features using Socket.io,
          focusing on scalability and core functionality.
        </motion.p>

        <div className="mt-12 flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-10">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              index={index}
              {...service}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
