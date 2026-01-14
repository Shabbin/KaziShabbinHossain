import React, { useEffect, useRef, useState, useId } from "react";
import { gsap } from "gsap";

// 🌿 Green accent
const ACCENT_HEX = "#16a34a";

const BUTTON_BORDER_COLORS = {
  About: "#16a34a",
  Work: "#4ade80",
  Contact: "#12b886",
  Experience: "#22c55e",
  Projects: "#16a34a",
  Feedbacks: "#4ade80",
};

const DEFAULT_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#work-experience" },
  { label: "Contact", href: "#contact" },
  { label: "Projects", href: "#projects" },
  { label: "Feedbacks", href: "#testimonials" },
];

export default function BubbleMenu({
  items,
  onMenuClick,
  className,
  style,
  menuAriaLabel = "Toggle menu",
  menuContentColor = ACCENT_HEX,
  useFixedPosition = true,
  animationEase = "back.out(1.7)",
  animationDuration = 0.65,
  staggerDelay = 0.08,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollWarning, setShowScrollWarning] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const linesRef = useRef([]);
  const scrollWarnedRef = useRef(false);
  const bubblePositions = useRef([]);

  const menuItems = items && items.length ? items : DEFAULT_ITEMS;

  const containerClassName = [
    "bubble-menu",
    useFixedPosition ? "fixed" : "relative",
    "top-6 right-6",
    "md:top-8 md:right-8",
    "flex items-center justify-end",
    "pointer-events-none",
    "z-[1001]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    scrollWarnedRef.current = false;
    onMenuClick?.(nextState);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    if (!isMenuOpen) setShowScrollWarning(false);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen && !scrollWarnedRef.current) {
        setShowScrollWarning(true);
        scrollWarnedRef.current = true;
      }
    };
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [isMenuOpen]);

  // Compute bubble positions dynamically for desktop and mobile
  const computeBubblePositions = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const maxBubbleSize = 56; // w-14 h-14 approx
    const padding = 16;
    const radius = Math.min(centerX, centerY) - maxBubbleSize - padding;

    bubblePositions.current = menuItems.map((_, i) => {
      const angle = (i / menuItems.length) * Math.PI * 2;
      const z = Math.random() * 0.5 + 0.75;
      return {
        x: Math.cos(angle) * radius * z,
        y: Math.sin(angle) * radius * z,
        scale: 0.5 + z * 0.8,
      };
    });
  };

  useEffect(() => {
    computeBubblePositions();
    window.addEventListener("resize", computeBubblePositions);
    return () => window.removeEventListener("resize", computeBubblePositions);
  }, [menuItems]);

  const createPathData = (x1, y1, x2, y2) => {
    const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * 60;
    const my = (y1 + y2) / 2 + (Math.random() - 0.5) * 60;
    return `M${x1},${y1} Q${mx},${my} ${x2},${y2}`;
  };

  const animateGraph = () => {
    const bubbles = bubblesRef.current.filter(Boolean);
    if (!bubbles.length) return;

    gsap.killTweensOf(bubbles);

    bubbles.forEach((bubble, i) => {
      const pos = bubblePositions.current[i];
      gsap.set(bubble, { x: pos.x, y: pos.y, scale: 0.3, opacity: 0 });
      gsap.to(bubble, {
        scale: pos.scale,
        opacity: 1,
        duration: animationDuration,
        delay: i * staggerDelay,
        ease: animationEase,
      });
    });
  };

  useEffect(() => {
    if (isMenuOpen) animateGraph();
    else {
      bubblesRef.current.forEach((b, i) => {
        const pos = bubblePositions.current[i];
        gsap.to(b, { scale: 0.3, opacity: 0, x: pos.x, y: pos.y, duration: 0.25 });
      });
    }
  }, [isMenuOpen]);

  // Animate lines like wavy threads on desktop
  useEffect(() => {
    if (!isMenuOpen || window.innerWidth < 768) return;

    const animateLines = () => {
      linesRef.current.forEach((line) => {
        if (!line) return;
        const originalD = line.getAttribute("data-original");
        const wave = () => {
          const newD = originalD.replace(
            /Q(\d+(\.\d+)?),(\d+(\.\d+)?)/g,
            (_, mx, __, my) => {
              const offsetX = (Math.random() - 0.5) * 10;
              const offsetY = (Math.random() - 0.5) * 10;
              return `Q${parseFloat(mx) + offsetX},${parseFloat(my) + offsetY}`;
            }
          );
          line.setAttribute("d", newD);
          requestAnimationFrame(wave);
        };
        wave();
      });
    };
    animateLines();
  }, [isMenuOpen]);

  // Unique ID for SVG filter
  const rawId = useId().replace(/[:]/g, "");
  const filterId = `electric-filter-${rawId}`;

  return (
    <>
      {/* HAMBURGER */}
      <nav className={containerClassName} style={style}>
        <button
          type="button"
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          className="relative inline-flex flex-col items-center justify-center pointer-events-auto w-11 h-11 md:w-12 md:h-12 rounded-full backdrop-blur-md bg-white/5 border transition-all duration-300 active:scale-95"
          style={{
            borderColor: "rgba(22,163,74,0.45)",
            boxShadow: `0 0 12px rgba(22,163,74,0.55), inset 0 0 10px rgba(22,163,74,0.18)`,
          }}
        >
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: isMenuOpen
                ? `0 0 18px ${ACCENT_HEX}`
                : `0 0 10px rgba(22,163,74,0.35)`,
            }}
          />
          <span
            style={{
              width: 22,
              height: 2,
              background: ACCENT_HEX,
              boxShadow: `0 0 6px ${ACCENT_HEX}`,
              transform: isMenuOpen ? "translateY(4px) rotate(45deg)" : "none",
              transition: "transform 0.25s ease",
            }}
          />
          <span
            style={{
              marginTop: 5,
              width: 22,
              height: 2,
              background: ACCENT_HEX,
              boxShadow: `0 0 6px ${ACCENT_HEX}`,
              transform: isMenuOpen ? "translateY(-4px) rotate(-45deg)" : "none",
              transition: "transform 0.25s ease",
            }}
          />
        </button>
      </nav>

      {/* FULLSCREEN OVERLAY */}
      {isMenuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[1000] flex justify-center items-center pointer-events-auto backdrop-blur-md"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          {/* SVG filter for lightning */}
          <svg className="hidden">
            <defs>
              <filter
                id={filterId}
                colorInterpolationFilters="sRGB"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.02"
                  numOctaves="3"
                  result="turb"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="turb"
                  scale="20"
                  xChannelSelector="R"
                  yChannelSelector="B"
                />
              </filter>
            </defs>
          </svg>

          {/* SVG LINES */}
          <svg className="absolute inset-0 w-full h-full z-[1001] pointer-events-none">
            {menuItems.map((item, i) => {
              const pos1 = bubblePositions.current[i];
              const x1 = pos1.x + window.innerWidth / 2;
              const y1 = pos1.y + window.innerHeight / 2;

              return menuItems.map((target, j) => {
                if (i < j) {
                  const pos2 = bubblePositions.current[j];
                  const x2 = pos2.x + window.innerWidth / 2;
                  const y2 = pos2.y + window.innerHeight / 2;
                  const d = createPathData(x1, y1, x2, y2);
                  return (
                    <path
                      key={`${i}-${j}`}
                      ref={(el) => (linesRef.current.push(el))}
                      d={d}
                      data-original={d}
                      stroke={ACCENT_HEX}
                      strokeWidth={2}
                      fill="none"
                      strokeOpacity={0.8}
                      style={{ filter: `url(#${filterId})` }}
                    />
                  );
                }
                return null;
              });
            })}
          </svg>

          {/* BUBBLES */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => (bubblesRef.current[idx] = el)}
                className="absolute flex flex-col items-center gap-2 pointer-events-auto z-[1100]"
              >
                <button
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsMenuOpen(false);
                    onMenuClick?.(false);
                    const el = document.querySelector(item.href);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`relative w-14 h-14 rounded-full bg-slate-900 border flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95`}
                  style={{
                    borderColor:
                      activeIndex === idx
                        ? ACCENT_HEX
                        : BUTTON_BORDER_COLORS[item.label] || ACCENT_HEX,
                    boxShadow:
                      activeIndex === idx
                        ? `0 0 26px ${ACCENT_HEX}, inset 0 0 14px ${ACCENT_HEX}`
                        : `0 0 12px ${ACCENT_HEX}55, inset 0 0 6px ${ACCENT_HEX}22`,
                  }}
                >
                  <span
                    className="absolute inset-0 rounded-full animate-pulse"
                    style={{
                      boxShadow:
                        activeIndex === idx
                          ? `0 0 28px ${ACCENT_HEX}aa`
                          : `0 0 18px ${ACCENT_HEX}55`,
                    }}
                  />
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: ACCENT_HEX,
                      boxShadow: `0 0 12px ${ACCENT_HEX}`,
                    }}
                  />
                </button>
                <span className="text-xs text-green-400 tracking-wide">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {showScrollWarning && (
            <div className="fixed bottom-60 left-1/2 transform -translate-x-1/2 bg-black p-4 rounded shadow-lg z-[1200]">
              <p
                className="text-green-400 text-center cursor-pointer"
                onClick={() => setShowScrollWarning(false)}
              >
                You cannot scroll while the menu is open. Click here to acknowledge.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
