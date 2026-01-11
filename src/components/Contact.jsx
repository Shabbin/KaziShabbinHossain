// src/components/Contact.jsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import NetworkGlobe from "./networkGlobe";
import { SectionWrapper } from "../hoc";
import ElectricBorder from "./ElectricBorder";
import { useIsMobile } from "../utils/useInMobile"; // detect mobile

// 💚 global accent
const ACCENT_HEX = "#22c55e";

// animations
const formVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 140, damping: 18, delay: 0.15 },
  },
};

const planetVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18, delay: 0.25 },
  },
};

const Contact = () => {
  const isMobile = useIsMobile();
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "sujata@jsmastery.pro",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  // Form content (reusable for mobile & desktop)
  const FormContent = () => (
    <>
      <p className={styles.sectionSubText} style={{ color: ACCENT_HEX }}>Get in touch</p>
      <h3 className={styles.sectionHeadText}>
        <span className="relative inline-block">
          Contact
          <span style={{ color: ACCENT_HEX }}>.</span>
          <span
            className="absolute left-0 -bottom-2 h-[2px] w-10 rounded-full"
            style={{ background: `linear-gradient(to right, ${ACCENT_HEX}, transparent)`, boxShadow: `0 0 12px ${ACCENT_HEX}` }}
          />
        </span>
      </h3>

      <form ref={formRef} onSubmit={handleSubmit} className="mt-10 flex flex-col gap-7">
        <label className="flex flex-col">
          <span className="text-white font-medium mb-2">Your Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="What's your good name?"
            className="bg-[#020617] py-4 px-5 rounded-lg text-white placeholder:text-slate-500 border border-slate-700/60 focus:border-[rgba(34,197,94,0.8)]"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-white font-medium mb-2">Your Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="What's your email address?"
            className="bg-[#020617] py-4 px-5 rounded-lg text-white placeholder:text-slate-500 border border-slate-700/60 focus:border-[rgba(34,197,94,0.8)]"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-white font-medium mb-2">Your Message</span>
          <textarea
            rows={6}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What would you like to talk about?"
            className="bg-[#020617] py-4 px-5 rounded-lg text-white placeholder:text-slate-500 border border-slate-700/60 focus:border-[rgba(34,197,94,0.8)] resize-none"
          />
        </label>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03, boxShadow: `0 0 18px ${ACCENT_HEX}` }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 rounded-xl py-3 px-8 font-bold text-[14px] text-[#020617]"
          style={{ background: ACCENT_HEX, boxShadow: `0 0 14px ${ACCENT_HEX}` }}
        >
          {loading ? "Sending..." : "Send"}
        </motion.button>
      </form>
    </>
  );

  return (
    <div className="relative xl:mt-12">
      {/* 🔰 big glowing wrapper */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px] -z-10"
        style={{
          border: `1px solid ${ACCENT_HEX}`,
          boxShadow: `0 0 40px ${ACCENT_HEX}, 0 0 80px rgba(34,197,94,0.9)`,
          background: `
            radial-gradient(circle at 0% 0%, rgba(34,197,94,0.25), transparent 55%),
            radial-gradient(circle at 100% 100%, rgba(34,197,94,0.25), transparent 55%),
            linear-gradient(135deg, #020617, #020617 40%, #020617)
          `,
        }}
      />

      {/* layout */}
      <div className="rounded-[32px] px-6 py-10 sm:px-10 sm:py-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
        {/* LEFT — Form */}
        <motion.div variants={formVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="flex-[0.9]">
          {isMobile ? (
            <div className="bg-[#020617]/80 rounded-2xl p-8 backdrop-blur-sm border border-[rgba(15,23,42,0.9)]" style={{ boxShadow: `0 0 22px rgba(0,0,0,0.85), 0 0 26px rgba(34,197,94,0.4)` }}>
              <FormContent />
            </div>
          ) : (
            <ElectricBorder color={ACCENT_HEX} speed={1.1} chaos={0.65} thickness={2} style={{ borderRadius: 20 }}>
              <div className="bg-[#020617]/80 rounded-2xl p-8 backdrop-blur-sm border border-[rgba(15,23,42,0.9)]" style={{ boxShadow: `0 0 22px rgba(0,0,0,0.85), 0 0 26px rgba(34,197,94,0.4)` }}>
                <FormContent />
              </div>
            </ElectricBorder>
          )}
        </motion.div>

        {/* RIGHT — Network Globe */}
        {/* <motion.div variants={planetVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="xl:flex-1 flex items-center justify-center">
          {isMobile ? (
            <div className="aspect-square w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] flex items-center justify-center relative">
              <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(circle, rgba(0, 0, 0, 0.32), transparent 60%)", filter: "blur(8px)" }} />
              <NetworkGlobe rotationEnabled={false} />
            </div>
          ) : (
            <ElectricBorder color={ACCENT_HEX} speed={0.9} chaos={0.6} thickness={2} style={{ borderRadius: 24, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="aspect-square w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] flex items-center justify-center relative">
                <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(circle, rgba(0, 0, 0, 0.32), transparent 60%)", filter: "blur(8px)" }} />
                <NetworkGlobe rotationEnabled={true} />
              </div>
            </ElectricBorder>
          )}
        </motion.div> */}
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
