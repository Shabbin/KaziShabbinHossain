import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import { navLinks } from "../constants";
import BubbleMenu from "./bubbleMenu";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [menuKey, setMenuKey] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // 🔥 Hamburger only visible near hero
      if (scrollTop > 80) {
        setShowMenu(false);
        setMenuKey((prev) => prev + 1); // force close menu
      } else {
        setShowMenu(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = navLinks.map((nav, index) => {
    const colors = [
      { bgColor: "#38bdf8", textColor: "#ffffff" },
      { bgColor: "#22c55e", textColor: "#ffffff" },
      { bgColor: "#f59e0b", textColor: "#111827" },
      { bgColor: "#8b5cf6", textColor: "#f9fafb" },
    ];

    return {
      label: nav.title,
      href: `#${nav.id}`,
      ariaLabel: nav.title,
      hoverStyles: colors[index % colors.length],
    };
  });

  return (
    <nav
      className={`${styles.paddingX} w-full fixed top-0 z-20 pointer-events-none`}
    >
      <div className="w-full flex justify-end max-w-7xl mx-auto">
        {showMenu && (
          <div className="pointer-events-auto">
            <BubbleMenu
              key={menuKey}
              items={items}
              menuAriaLabel="Toggle navigation"
              menuContentColor="#e5e7eb"
              useFixedPosition={true}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
