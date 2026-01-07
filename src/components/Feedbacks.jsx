// src/components/Feedbacks.jsx
import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";
import ElectricBorder from "./ElectricBorder"; // ⚡ adjust path if needed

/* 💚 keep accent in one place */
const ACCENT_HEX = "#22c55e";

/* Empty state – new card design + electric border */
const EmptyState = () => (
  <motion.div
    variants={fadeIn("", "spring", 0.1, 0.75)}
    className="rounded-2xl"
    role="status"
    aria-label="No testimonials yet"
  >
    <ElectricBorder
      color={ACCENT_HEX}
      // ⚡ tweak these three to control the vibe:
      // lower speed = calmer; lower chaos = smoother line; higher thickness = more visible
      speed={0.6}
      chaos={0.7}
      thickness={3}
      style={{ borderRadius: 20 }}
    >
      <div
        className="
          w-full h-full
          rounded-[20px]
          bg-[#020617]/95
          px-6 py-5 sm:px-8 sm:py-6
          flex flex-col gap-4
        "
      >
        {/* top chip + subtle label row */}
        <div className="flex items-center justify-between gap-3">
          <span
            className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
            style={{
              color: "rgba(34,197,94,0.95)",
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

          <span className="text-[11px] text-slate-400/80">
            Honest by design
          </span>
        </div>

        {/* main copy */}
        <div className="space-y-2">
          <h3 className="text-white text-2xl sm:text-[26px] font-bold">
            Real reviews coming soon
          </h3>
          <p className="text-secondary text-[14px] sm:text-[15px] leading-relaxed">
            I don’t use fake testimonials. Once I receive genuine feedback on my
            work, you’ll see it here—attached to real projects and real people.
          </p>
        </div>

        {/* CTA row */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <a
            href="mailto:ambiance0100@gmail.com?subject=Feedback%20on%20your%20portfolio"
            className="
              inline-flex items-center justify-center
              rounded-lg px-4 py-2
              text-[14px] font-bold
              focus:outline-none focus:ring-2
            "
            style={{
              background: ACCENT_HEX,
              color: "#020617",
              boxShadow: `0 0 12px ${ACCENT_HEX}`,
              border: `1px solid rgba(34,197,94,0.9)`,
            }}
          >
            Leave feedback
          </a>

          <span className="text-[12px] sm:text-[13px] text-slate-400/90">
            Built to be reference-friendly once real clients arrive.
          </span>
        </div>
      </div>
    </ElectricBorder>
  </motion.div>
);
const Feedbacks = () => {
  const hasTestimonials =
    Array.isArray(testimonials) && testimonials.length > 0;

  return (
    /* 🔰 glowing panel wrapper like About / Experience */
    <div className="relative mt-16">
      {/* big section glow BEHIND the content */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px] -z-10"
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

      {/* inner content on top of the glow */}
      <div className="rounded-[32px] px-6 py-10 sm:px-10 sm:py-12 bg-transparent">
        {/* heading */}
        <motion.div variants={textVariant(0.1)}>
          <p className={styles.sectionSubText} style={{ color: ACCENT_HEX }}>
            What others say
          </p>
          <h2 className={styles.sectionHeadText}>
            <span className="relative inline-block">
              Testimonials
              <span style={{ color: ACCENT_HEX }}>.</span>
              <span
                className="absolute left-1/2 -bottom-2 -translate-x-1/2 h-[2px] w-12 rounded-full"
                style={{
                  background: `linear-gradient(to right, transparent, ${ACCENT_HEX}, transparent)`,
                  boxShadow: `0 0 12px ${ACCENT_HEX}`,
                }}
              />
            </span>
          </h2>
        </motion.div>

        {/* content */}
        <div className="mt-12">
          {hasTestimonials ? (
            <div className="flex flex-wrap gap-7">
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.name + index}
                  variants={fadeIn("", "spring", index * 0.35, 0.75)}
                  className="rounded-3xl xs:w-[320px] w-full p-8 transition-transform duration-200"
                  style={{
                    background: "#020617",
                    border: `1px solid rgba(34,197,94,0.55)`,
                    boxShadow: `
                      0 0 22px rgba(34,197,94,0.7),
                      0 0 16px rgba(0,0,0,0.9)
                    `,
                  }}
                >
                  <p
                    className="font-black text-[48px] leading-none select-none"
                    style={{
                      color: ACCENT_HEX,
                      textShadow: `0 0 12px ${ACCENT_HEX}`,
                    }}
                  >
                    "
                  </p>

                  <div className="mt-3">
                    <p className="text-white tracking-wider text-[17px] leading-relaxed">
                      {t.testimonial}
                    </p>

                    <div className="mt-7 flex justify-between items-center gap-1">
                      <div className="flex-1 flex flex-col">
                        <p className="text-white font-medium text-[16px]">
                          <span style={{ color: ACCENT_HEX }}>@</span> {t.name}
                        </p>
                        <p className="mt-1 text-secondary text-[12px]">
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
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
