import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import './styles/global.css'; // ← import your global CSS here

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import BubbleMenu from "./components/bubbleMenu"; // ← make sure path is correct

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Bubble Menu */}
      <BubbleMenu onMenuClick={setMenuOpen} />

      {/* All content that should be blurred/blocked when menu is open */}
      <div
        style={{
          filter: menuOpen ? "blur(8px)" : "none",
          pointerEvents: menuOpen ? "none" : "auto",
          transition: "filter 0.3s ease",
        }}
      >
        <div className='relative z-0 bg-primary'>
          <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
            <Navbar />
            <Hero />
          </div>
          <About />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />
          <div className='relative z-0'>
            <Contact />
            <StarsCanvas />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
