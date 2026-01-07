
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ACCENT_HEX = "#22c55e";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.4, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="
          relative
          rounded-2xl
          bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617]
          border border-[rgba(34,197,94,0.7)]
          sm:w-[360px] w-full
        "
        style={{
          boxShadow: `
            0 0 24px rgba(0,0,0,0.9),
            0 0 30px rgba(34,197,94,0.8)
          `,
        }}
      >
        <div className="p-5 rounded-2xl">
          <div className="relative w-full h-[230px] overflow-hidden rounded-xl">
            <img
              src={image}
              alt={`${name} preview`}
              className="w-full h-full object-cover rounded-xl"
            />

            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className="
                  bg-black/70
                  w-10 h-10 rounded-full
                  flex justify-center items-center
                  cursor-pointer
                  shadow-[0_0_12px_rgba(34,197,94,0.8)]
                "
              >
                <img
                  src={github}
                  alt="source code"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-white font-bold text-[22px]">{name}</h3>
            <p className="mt-2 text-secondary text-[14px]">{description}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[13px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    // 👇 negative margin so this panel overlaps About's bottom glow
    <div className="relative mt-[-32px] sm:mt-[-40px]">
      {/* Green border glow behind everything */}
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

      {/* Inner content */}
      <div className="rounded-[32px] px-6 py-10 sm:px-10 sm:py-12 bg-transparent">
        <motion.div variants={textVariant(0.1)}>
          <p
            className={styles.sectionSubText}
            style={{ color: ACCENT_HEX }}
          >
            My work
          </p>
          <h2 className={styles.sectionHeadText}>
            <span className="relative inline-block">
              Projects
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

        <div className="w-full flex">
          <motion.p
            variants={fadeIn("", "tween", 0.2, 1)}
            className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            Following projects showcase my skills and experience through
            real-world examples of my work. Each project is briefly described
            with links to code repositories and live demos. They reflect my
            ability to solve complex problems, work with different technologies,
            and own a project from idea to implementation.
          </motion.p>
        </div>

        <div className="mt-12 sm:mt-16 flex flex-wrap gap-7">
          {projects.map((project, index) => (
            <ProjectCard
              key={`project-${index}`}
              index={index}
              {...project}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Works, "");
