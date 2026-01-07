import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    const isAbout = idName === "about";

    const paddingX = styles.paddingX; // "sm:px-16 px-6"
    const paddingTop = isAbout ? "pt-0" : "pt-6 sm:pt-10";
    const paddingBottom = "pb-10 sm:pb-16";

    return (
      <motion.section
        variants={staggerContainer(0.15, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${paddingX} ${paddingTop} ${paddingBottom} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        {/* no background overlay here; panels themselves handle glow */}
        <div className="relative z-10">
          <Component />
        </div>
      </motion.section>
    );
  };

export default StarWrapper;
