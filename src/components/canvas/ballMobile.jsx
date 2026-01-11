// canvas/BallMobile.jsx
import React from "react";

const BallMobile = ({ icon }) => (
  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#fff8eb] flex items-center justify-center shadow-lg">
    <img src={icon} alt="skill" className="w-10 h-10 sm:w-12 sm:h-12" />
  </div>
);

export default BallMobile;
