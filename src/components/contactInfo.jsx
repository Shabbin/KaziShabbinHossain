// src/components/ContactInfoPanel.jsx
import React from "react";

const ContactInfoPanel = () => {
  return (
    <div className="flex flex-col justify-center h-full text-center sm:text-left px-4 sm:px-0">
      <h3
        className="text-2xl sm:text-3xl font-bold mb-4"
        style={{ color: "#22c55e" }} // your accent green
      >
        Let’s Build Together.
      </h3>

      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
        I believe in creating web experiences that combine creativity, performance,
        and usability. Every project is an opportunity to solve problems elegantly
        and push the boundaries of what’s possible.
      </p>

      <ul className="text-gray-300 text-sm sm:text-base space-y-3">
        <li>🌿 5+ years crafting modern web apps</li>
        <li>🚀 Passionate about scalable & clean code</li>
        <li>💡 Always learning and exploring new technologies</li>
        <li>📬 Reach out and let’s make something remarkable</li>
      </ul>
    </div>
  );
};

export default ContactInfoPanel;
