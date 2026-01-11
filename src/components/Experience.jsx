import { motion } from "framer-motion";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import ElectricBorder from "./ElectricBorder";

const ACCENT_HEX = "#22c55e";

// ✅ mobile detector
const isMobile =
  typeof window !== "undefined" && window.innerWidth < 640;

const ExperienceCard = ({ experience, index }) => {
  const CardInner = (
    <article className="relative rounded-2xl bg-[#020617]/95 px-5 py-6 sm:px-7 sm:py-7 overflow-hidden border border-emerald-500/30 sm:border-none">
      {/* top accent line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: `linear-gradient(to right, transparent, ${ACCENT_HEX}, transparent)`,
          boxShadow: isMobile ? "none" : `0 0 10px ${ACCENT_HEX}`,
        }}
      />

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-900 flex items-center justify-center shadow-[0_0_12px_rgba(34,197,94,0.6)]">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-8 h-8 object-contain"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h3 className="text-white text-[18px] sm:text-[20px] font-bold">
                {experience.title}
              </h3>
              <p className="text-secondary text-[14px] sm:text-[15px] font-semibold">
                {experience.company_name}
              </p>
            </div>

            <span className="text-[11px] sm:text-[12px] px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/40">
              {experience.date}
            </span>
          </div>

          {experience.site && (
            <a
              href={experience.site}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center text-[12px] sm:text-[13px] text-emerald-400 hover:text-emerald-300 underline decoration-emerald-500/70 decoration-dotted"
            >
              <span>Visit live site</span>
              <span className="ml-1 text-[11px] opacity-70">
                (under construction)
              </span>
            </a>
          )}

          <ul className="mt-4 list-disc ml-4 space-y-2">
            {experience.points.map((point, idx) => (
              <li
                key={`experience-point-${index}-${idx}`}
                className="text-white-100 text-[13px] sm:text-[14px] pl-1 tracking-wider"
              >
                {typeof point === "string" ? (
                  point
                ) : (
                  <>
                    {point.text}{" "}
                    <a
                      href={point.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 underline"
                    >
                      {point.linkText}
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 20 : 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: isMobile ? 0 : index * 0.12,
      }}
    >
      {/* ⚡ Electric border only on desktop */}
      {isMobile ? (
        CardInner
      ) : (
        <ElectricBorder
          color={ACCENT_HEX}
          speed={1.1}
          chaos={0.7}
          thickness={2}
          style={{ borderRadius: 18 }}
          className="w-full"
        >
          {CardInner}
        </ElectricBorder>
      )}
    </motion.div>
  );
};

const Experience = () => {
  return (
    <div className="relative mt-10 sm:mt-12">
      {/* section glow (reduced on mobile) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px] -z-10"
        style={{
          border: `1px solid ${ACCENT_HEX}`,
          boxShadow: isMobile
            ? "0 0 24px rgba(34,197,94,0.6)"
            : `0 0 40px ${ACCENT_HEX}, 0 0 80px rgba(34,197,94,0.9)`,
          background:
            "radial-gradient(circle at top, rgba(15,23,42,0.96), rgba(2,6,23,0.98))",
        }}
      />

      <div className="rounded-[32px] px-5 py-8 sm:px-10 sm:py-12">
        <motion.div variants={textVariant(0.1)}>
          <p
            className={`${styles.sectionSubText} text-center`}
            style={{ color: ACCENT_HEX }}
          >
            What I have done so far
          </p>
          <h2 className={`${styles.sectionHeadText} text-center`}>
            <span className="relative inline-block">
              Work Experience<span style={{ color: ACCENT_HEX }}>.</span>
            </span>
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-2 items-start">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
