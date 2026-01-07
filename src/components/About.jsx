import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import ElectricBorder from "./ElectricBorder";

// 💚 global accent
const ACCENT_HEX = "#22c55e";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[260px] w-full">
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        type: "spring",
        duration: 0.9,
        delay: index * 0.15,
      }}
      whileHover={{ y: -6 }}
      className="w-full"
    >
      {/* ⚡ electric frame lives OUTSIDE the solid card */}
      <ElectricBorder
        color={ACCENT_HEX}
        speed={1}
        chaos={0.7}
        thickness={2}
        style={{ borderRadius: 24 }}
      >
        <div
          className="
            m-[3px] sm:m-[4px]
            rounded-[20px]
            min-h-[220px]
            py-6 px-6
            flex flex-col items-center justify-between
            bg-[#020617]
          "
        >
          <div
            className="
              w-14 h-14 rounded-2xl
              flex items-center justify-center
              bg-emerald-400/90
            "
          >
            <span className="text-[18px] font-semibold tracking-widest text-slate-950">
              {icon}
            </span>
          </div>

          <h3 className="text-white text-[18px] font-bold text-center mt-4 leading-snug">
            {title}
          </h3>
        </div>
      </ElectricBorder>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <div className="relative">
      {/* glowing border behind the content */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          rounded-[32px]
          -z-10
        "
        style={{
          border: `1px solid ${ACCENT_HEX}`,
          boxShadow: `
            0 0 40px ${ACCENT_HEX},
            0 0 80px rgba(34,197,94,0.9)
          `,
          background:
            "radial-gradient(circle at top, rgba(15,23,42,0.96), rgba(2,6,23,0.98))",
        }}
      />

      {/* inner content */}
      <div className="rounded-[32px] px-6 py-10 sm:px-10 sm:py-12 bg-transparent">
        {/* heading */}
        <motion.div variants={textVariant(0.1)}>
          <p
            className={styles.sectionSubText}
            style={{ color: ACCENT_HEX }}
          >
            INTRODUCTION
          </p>
          <h2 className={styles.sectionHeadText}>
            <span className="relative inline-block">
              Overview
              <span style={{ color: ACCENT_HEX }}>.</span>
              <span
                className="absolute left-0 -bottom-2 h-[2px] w-10 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${ACCENT_HEX}, transparent)`,
                  boxShadow: `0 0 12px ${ACCENT_HEX}`,
                }}
              />
            </span>
          </h2>
        </motion.div>

        {/* text */}
        <motion.p
          variants={fadeIn("", "tween", 0.2, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          I’m a full-stack web developer with a background in Computer Science &
          Engineering. I enjoy working on problems that require clear thinking,
          structure, and careful design.
          <br />
          <br />
          My path into web development started with curiosity. I’ve always liked
          understanding how things work — breaking down ideas, spotting
          patterns, and figuring out why a system behaves the way it does. That
          way of thinking naturally led me to programming and building real,
          usable products.
          <br />
          <br />
          I’m comfortable working across the stack. On the backend, I enjoy
          designing data models, APIs, and application logic. On the frontend,
          I like turning that logic into clean, usable interfaces. I recently
          built an online tuition platform MVP with real-time features using
          Socket.io, where my focus was on getting the core functionality right
          and keeping the system scalable.
          <br />
          <br />
          Outside of coding, I spend time exploring computer science and
          mathematics topics, following developments in science and
          technology, and listening to music. These interests help me stay
          curious and improve the way I think about structure, patterns, and
          problem-solving — all of which carry over directly into my work as a
          developer.
          <br />
          <br />
          I’m currently looking for opportunities where I can{" "}
          <span style={{ color: ACCENT_HEX }}>
            contribute as a full-stack or backend developer,
          </span>{" "}
          help build production-ready web applications, and grow in a team that
          values clean architecture, ownership, and continuous improvement.
        </motion.p>

        {/* service cards */}
        <div className="mt-16 flex flex-wrap gap-10">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
