import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import ElectricBorder from "./ElectricBorder";

const ACCENT_HEX = "#22c55e";
const SHABBIN_GREEN = "#22c55e";
const DARK_GREEN = "#15803d";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const CardBody = (
    <div className="p-5 rounded-2xl">
      <div
        className={`relative w-full ${
          isMobile ? "h-[180px]" : "h-[230px]"
        } overflow-hidden rounded-xl`}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-xl"
        />

        <div className="absolute inset-0 flex justify-end m-3">
          <div
            onClick={() => window.open(source_code_link, "_blank")}
            className="bg-black/70 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_12px_rgba(34,197,94,0.8)]"
          >
            <img src={github} className="w-1/2 h-1/2" />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3
          className="text-[22px] font-bold"
          style={{
            color: SHABBIN_GREEN,
            textShadow: `
              0 0 2px ${ACCENT_HEX},
              0 0 6px ${ACCENT_HEX},
              0 0 12px rgba(34,197,94,0.4)
            `,
          }}
        >
          {name}
        </h3>

        <p className="mt-2 text-[14px]" style={{ color: DARK_GREEN }}>
          {description}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <p
            key={`${name}-${tag.name}`}
            className="text-[13px]"
            style={{ color: DARK_GREEN }}
          >
            #{tag.name}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.3, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className={`${isMobile ? "w-[280px]" : "sm:w-[360px] w-full"}`}
      >
        {isMobile ? (
          <div className="rounded-2xl bg-[#020617] border border-emerald-500/40">
            {CardBody}
          </div>
        ) : (
          <ElectricBorder
            color={ACCENT_HEX}
            speed={1}
            chaos={0.7}
            thickness={2}
            style={{ borderRadius: 24 }}
          >
            <div className="m-[4px] rounded-2xl bg-[#020617]">
              {CardBody}
            </div>
          </ElectricBorder>
        )}
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <div className="relative">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px] -z-10"
        style={{
          border: `1px solid ${ACCENT_HEX}`,
          boxShadow: `0 0 40px ${ACCENT_HEX}, 0 0 80px rgba(34,197,94,0.9)`,
          background:
            "radial-gradient(circle at top, rgba(15,23,42,0.96), rgba(2,6,23,0.98))",
        }}
      />

      <div className="rounded-[32px] px-6 py-10 sm:px-10 sm:py-12">
        {/* Heading */}
        <motion.div
          variants={textVariant(0.1)}
          className="flex flex-col items-center sm:items-start text-center sm:text-left"
        >
          <p className={styles.sectionSubText} style={{ color: DARK_GREEN }}>
            My work
          </p>

          <h2
            className={styles.sectionHeadText}
            style={{
              color: SHABBIN_GREEN,
              textShadow: `0 0 6px ${ACCENT_HEX}`,
            }}
          >
            Projects<span style={{ color: DARK_GREEN }}>.</span>
          </h2>
        </motion.div>

        {/* ✅ RESTORED DESCRIPTION */}
        <motion.p
          variants={fadeIn("", "tween", 0.2, 1)}
          className="mt-4 text-[17px] leading-[30px] max-w-4xl text-center sm:text-left"
          style={{ color: DARK_GREEN }}
        >
          Following projects showcase my skills and experience through real-world
          examples of my work. Each project is briefly described with links to
          code repositories and live demos. They reflect my ability to solve
          complex problems, work with different technologies, and own a project
          from idea to implementation.
        </motion.p>

        {/* Cards */}
        <div className="mt-12 sm:mt-16 flex flex-wrap gap-7 justify-center sm:justify-start">
          {projects.map((project, index) => (
            <ProjectCard key={index} index={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Works, "");
