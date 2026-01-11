import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// 🌿 Green accent
const ACCENT_HEX = "#16a34a";

// ============================
// EASY BORDER COLOR SETUP HERE
// ============================
const BUTTON_BORDER_COLORS = {
  About: "#16a34a",
  Work: "#4ade80",
  Contact: "#12b886",
};

const DEFAULT_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
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

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const floatTweensRef = useRef([]);
  const scrollWarnedRef = useRef(false);

  const menuItems = items && items.length ? items : DEFAULT_ITEMS;

  const containerClassName = [
    "bubble-menu",
    useFixedPosition ? "fixed" : "relative",

    // 🔽 UPDATED POSITIONING (ONLY CHANGE)
    "top-6 right-6",           // moved down + left slightly
    "md:top-8 md:right-8",     // consistent desktop placement

    "flex items-center justify-end",
    "pointer-events-none",
    "z-[1001]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Toggle menu and notify parent
  const handleToggle = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    scrollWarnedRef.current = false;
    onMenuClick?.(nextState);
  };

  // Lock/Unlock scroll
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    if (!isMenuOpen) setShowScrollWarning(false);
  }, [isMenuOpen]);

  // Detect scroll while menu is open
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

  // Animate orbit buttons open
  const animateOrbitOpen = () => {
    const bubbles = bubblesRef.current.filter(Boolean);
    if (!bubbles.length) return;

    floatTweensRef.current.forEach((t) => t?.kill());
    floatTweensRef.current = [];
    gsap.killTweensOf(bubbles);

    const count = bubbles.length;
    const isMobile = window.innerWidth < 768;

    bubbles.forEach((bubble, i) => {
      gsap.set(bubble, { x: 0, y: 0, scale: 0.3, opacity: 0 });

      if (isMobile) {
        const triangleSpacing = 80;
        let x = 0,
          y = 0;

        if (count === 3) {
          if (i === 0) {
            x = 0;
            y = -triangleSpacing;
          } else if (i === 1) {
            x = -triangleSpacing * 0.85;
            y = triangleSpacing * 0.5;
          } else if (i === 2) {
            x = triangleSpacing * 0.85;
            y = triangleSpacing * 0.5;
          }
        } else {
          x = (i - (count - 1) / 2) * triangleSpacing;
          y = 0;
        }

        gsap.to(bubble, {
          x,
          y,
          scale: 1,
          opacity: 1,
          duration: animationDuration,
          delay: i * staggerDelay,
          ease: animationEase,
        });
      } else {
        const radiusBase = Math.min(window.innerWidth, window.innerHeight) * 0.2;
        const angleSpread = Math.PI * 0.9;
        const startAngle = -angleSpread / 2;
        const step = count > 1 ? angleSpread / (count - 1) : 0;
        const angle = startAngle + step * i;
        const radius = radiusBase * (0.95 + i * 0.02);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const delay =
          i * staggerDelay +
          gsap.utils.random(-staggerDelay * 0.25, staggerDelay * 0.25);

        gsap.to(bubble, {
          x,
          y,
          scale: 1,
          opacity: 1,
          duration: animationDuration,
          delay,
          ease: animationEase,
        });

        const floatTween = gsap.to(bubble, {
          y: y + (Math.random() > 0.5 ? 8 : -8),
          duration: 3 + Math.random() * 1.5,
          delay: animationDuration + delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        floatTweensRef.current.push(floatTween);
      }
    });
  };

  const animateOrbitClose = () => {
    const bubbles = bubblesRef.current.filter(Boolean);
    floatTweensRef.current.forEach((t) => t?.kill());
    floatTweensRef.current = [];
    gsap.killTweensOf(bubbles);

    gsap.to(bubbles, {
      x: 0,
      y: 0,
      scale: 0.3,
      opacity: 0,
      duration: 0.25,
      ease: "power3.in",
      stagger: 0.04,
    });
  };

  useEffect(() => {
    if (isMenuOpen) animateOrbitOpen();
    else animateOrbitClose();
  }, [isMenuOpen]);

  return (
    <>
      {/* HAMBURGER */}
      <nav className={containerClassName} style={style}>
        <button
          type="button"
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          className="
            relative
            inline-flex
            flex-col
            items-center
            justify-center
            pointer-events-auto
            w-11 h-11 md:w-12 md:h-12
            rounded-full
            backdrop-blur-md
            bg-white/5
            border
            transition-all
            duration-300
            active:scale-95
          "
          style={{
            borderColor: "rgba(22,163,74,0.45)",
            boxShadow: `
              0 0 12px rgba(22,163,74,0.55),
              inset 0 0 10px rgba(22,163,74,0.18)
            `,
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
              transform: isMenuOpen
                ? "translateY(4px) rotate(45deg)"
                : "none",
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
              transform: isMenuOpen
                ? "translateY(-4px) rotate(-45deg)"
                : "none",
              transition: "transform 0.25s ease",
            }}
          />
        </button>
      </nav>

      {/* FULLSCREEN OVERLAY */}
      {isMenuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[1000] flex justify-center items-center pointer-events-auto"
        >
          <div className="fixed inset-0 bg-white/10 backdrop-blur-md z-[1000]" />

          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                ref={(el) => (bubblesRef.current[idx] = el)}
                className="absolute rounded-full px-6 min-h-[56px] flex items-center justify-center bg-slate-900/70 border text-sm md:text-base cursor-pointer pointer-events-auto z-[1100]"
                style={{
                  borderColor:
                    BUTTON_BORDER_COLORS[item.label] || ACCENT_HEX,
                  color: ACCENT_HEX,
                }}
                onClick={() => {
                  setIsMenuOpen(false);
                  onMenuClick?.(false);
                  document
                    .querySelector(item.href)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item.label}
              </button>
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
