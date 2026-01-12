import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";
import ElectricBorder from "./ElectricBorder";
import { useIsMobile } from "../utils/useInMobile";

const ACCENT_HEX = "#22c55e";       // Shabbin-like glow
const SHABBIN_GREEN = "#22c55e";    // Shabbin-like text color
const DARK_GREEN = "#15803d";       // normal dark green for body text

const EmptyState = () => {
  const isMobile = useIsMobile();

  const content = (
    <div
      className={`
        w-full h-full
        rounded-[20px]
        bg-[#020617]/95
        px-6 py-5 sm:px-8 sm:py-6
        flex flex-col gap-4
        ${isMobile ? "items-center text-center" : ""}
      `}
    >
      <div className={`flex items-center justify-between gap-3 ${isMobile ? "justify-center" : ""}`}>
        <span
          className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
          style={{
            color: SHABBIN_GREEN,
            background: "rgba(34,197,94,0.12)",
            border: `1px solid rgba(34,197,94,0.35)`,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2l2.9 6.6 7.1.6-5.3 4.6 1.6 6.8L12 16.9 5.7 20.6l1.6-6.8L2 9.2l7.1-.6L12 2z" />
          </svg>
          Early stage
        </span>

        {!isMobile && (
          <span className="text-[11px]" style={{ color: SHABBIN_GREEN + "cc" }}>Honest by design</span>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl sm:text-[26px] font-bold" style={{ color: SHABBIN_GREEN, textShadow: `0 0 4px ${ACCENT_HEX}, 0 0 10px ${ACCENT_HEX}` }}>
          Real reviews coming soon
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-relaxed" style={{ color: DARK_GREEN }}>
          I don’t use fake testimonials. Once I receive genuine feedback on my
          work, you’ll see it here—attached to real projects and real people.
        </p>
      </div>

      <div className={`mt-2 flex flex-wrap items-center gap-3 ${isMobile ? "justify-center" : "justify-between"}`}>
        <a
          href="mailto:ambiance0100@gmail.com?subject=Feedback%20on%20your%20portfolio"
          className="
            inline-flex items-center justify-center
            rounded-lg px-4 py-2
            text-[14px] font-bold
            focus:outline-none focus:ring-2
          "
          style={{
            background: SHABBIN_GREEN,
            color: "#020617",
            boxShadow: `0 0 12px ${ACCENT_HEX}`,
            border: `1px solid rgba(34,197,94,0.9)`,
          }}
        >
          Leave feedback
        </a>

        <span className="text-[12px] sm:text-[13px]" style={{ color: DARK_GREEN + "cc" }}>
          Built to be reference-friendly once real clients arrive.
        </span>
      </div>
    </div>
  );

  return isMobile ? content : (
    <ElectricBorder
      color={ACCENT_HEX}
      speed={0.6}
      chaos={0.7}
      thickness={3}
      style={{ borderRadius: 20 }}
    >
      {content}
    </ElectricBorder>
  );
};

const Feedbacks = () => {
  const isMobile = useIsMobile();
  const hasTestimonials = Array.isArray(testimonials) && testimonials.length > 0;

  return (
    <div className="relative mt-16">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px] -z-10"
        style={{
          border: `1px solid ${ACCENT_HEX}`,
          boxShadow: `0 0 40px ${ACCENT_HEX}, 0 0 80px rgba(34,197,94,0.9)`,
          background: "radial-gradient(circle at top, rgba(15,23,42,0.96), rgba(2,6,23,0.98))",
        }}
      />

      <div className="rounded-[32px] px-6 py-10 sm:px-10 sm:py-12 bg-transparent">
        <motion.div variants={textVariant(0.1)}>
          <p
            className={`${styles.sectionSubText} ${isMobile ? "text-center" : ""}`}
            style={{ color: SHABBIN_GREEN }}
          >
            What others say
          </p>
          <h2
            className={`${styles.sectionHeadText} ${isMobile ? "text-center" : ""}`}
            style={{
              color: SHABBIN_GREEN,
              textShadow: `0 0 4px ${ACCENT_HEX}, 0 0 10px ${ACCENT_HEX}`, // soft Shabbin-like glow
            }}
          >
            <span className="relative inline-block">
              Testimonials
              <span style={{ color: SHABBIN_GREEN }}>.</span>
              <span
                className={`absolute -bottom-2 h-[2px] w-12 rounded-full`}
                style={{
                  left: isMobile ? "50%" : "25px",
                  transform: isMobile ? "translateX(-50%)" : "none",
                  background: `linear-gradient(to right, transparent, ${ACCENT_HEX}, transparent)`,
                  boxShadow: `0 0 12px ${ACCENT_HEX}`,
                }}
              />
            </span>
          </h2>
        </motion.div>

        <div className={`mt-6 sm:mt-8 flex flex-wrap gap-7 ${isMobile ? "justify-center" : ""}`}>
          {hasTestimonials ? (
            testimonials.map((t, index) => (
              <motion.div
                key={t.name + index}
                variants={fadeIn("", "spring", index * 0.35, 0.75)}
                className="rounded-3xl xs:w-[320px] w-full p-8 transition-transform duration-200"
                style={{
                  background: "#020617",
                  border: `1px solid rgba(34,197,94,0.55)`,
                  boxShadow: `0 0 22px rgba(34,197,94,0.7), 0 0 16px rgba(0,0,0,0.9)`,
                }}
              >
                <p
                  className="font-black text-[48px] leading-none select-none"
                  style={{
                    color: SHABBIN_GREEN,
                    textShadow: `0 0 12px ${ACCENT_HEX}`,
                  }}
                >
                  "
                </p>

                <div className="mt-3">
                  <p className="tracking-wider text-[17px] leading-relaxed" style={{ color: DARK_GREEN }}>
                    {t.testimonial}
                  </p>

                  <div className="mt-7 flex justify-between items-center gap-1">
                    <div className="flex-1 flex flex-col">
                      <p className="font-medium text-[16px]" style={{ color: DARK_GREEN }}>
                        <span style={{ color: SHABBIN_GREEN }}>@</span> {t.name}
                      </p>
                      <p className="mt-1 text-[12px]" style={{ color: DARK_GREEN + "aa" }}>
                        {t.designation} of {t.company}
                      </p>
                    </div>
                    <img
                      src={t.image}
                      alt={`feedback_by-${t.name}`}
                      className="w-10 h-10 rounded-full object-cover"
                      style={{ boxShadow: `0 0 10px rgba(34,197,94,0.6)` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
