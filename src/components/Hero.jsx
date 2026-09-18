import React, { useRef, useEffect, useState } from 'react';

export default function Hero() {
  const tickerItems = [
    "AMERICANO", "CAPPUCCINO", "LATTE", "FLAT WHITE", 
    "MACCHIATO", "MOCHA", "AFFOGATO", "CORTADO", "COLD BREW", "ESPRESSO"
  ];

  const textPathRef = useRef(null);
  const isHoveredRef = useRef(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let offset = 0;
    let animId;

    const animate = () => {
      const speed = isHoveredRef.current ? 0.4 : 1.35;
      offset -= speed;
      // Wrap seamlessly around the repeated pattern length
      if (offset <= -2400) {
        offset += 2400;
      }
      if (textPathRef.current) {
        textPathRef.current.setAttribute('startOffset', `${offset}px`);
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 28;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  // Repeat items for seamless, continuous curved ribbon wrapping
  const repeatedText = Array(12).fill(tickerItems.join("   •   ")).join("   •   ");

  return (
    <section 
      className="hero-section" 
      id="about"
      onMouseMove={handleMouseMove}
    >
      <div className="hero-content">
        <h1 className="heading-hero">
          YOUR DAILY<br />GREKO RITUAL
        </h1>

        <div className="hero-cta-group reveal-up delay-100">
          <a href="#menu" className="btn-hero-primary">
            <span>ORDER ONLINE</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#gallery" className="btn-hero-secondary">
            EXPLORE ATMOSPHERE
          </a>
        </div>

        <div className="hero-cups-showcase">
          {/* Liquid Coffee Splash Image with Interactive Mouse Parallax */}
          <div 
            className="hero-splash-layer"
            style={{
              transform: `translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px))`
            }}
          >
            <img 
              src="/assets/greko_cup_splash.png" 
              alt="Liquid Coffee Splash Under Ribbon" 
              className="hero-splash-img"
            />
          </div>

          {/* Authentic Dynamic S-Curve Ribbon Ticker behind cups */}
          <div 
            className="curved-ticker-container"
            onMouseEnter={() => (isHoveredRef.current = true)}
            onMouseLeave={() => (isHoveredRef.current = false)}
          >
            <svg 
              viewBox="0 0 1800 340" 
              className="curved-ribbon-svg" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="heroRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#07162F" stopOpacity="0.9" />
                  <stop offset="20%" stopColor="#0F2345" stopOpacity="0.98" />
                  <stop offset="50%" stopColor="#1C355E" stopOpacity="1" />
                  <stop offset="80%" stopColor="#0F2345" stopOpacity="0.98" />
                  <stop offset="100%" stopColor="#07162F" stopOpacity="0.9" />
                </linearGradient>

                {/* Pronounced S-Curve Path with balanced vertical bounds */}
                <path 
                  id="heroSCurvePath" 
                  d="M -150,60 C 250,340 650,-20 950,180 C 1280,360 1650,-10 2000,180" 
                />
              </defs>

              {/* 3D Drop Shadow */}
              <filter id="sRibbonShadow" x="-20%" y="-30%" width="140%" height="160%">
                <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#000000" floodOpacity="0.7" />
              </filter>

              {/* Golden Outer Border Outline */}
              <use 
                href="#heroSCurvePath" 
                fill="none" 
                stroke="rgba(184, 121, 69, 0.6)" 
                strokeWidth="88" 
                filter="url(#sRibbonShadow)"
              />

              {/* Deep Navy Ribbon Solid Body */}
              <use 
                href="#heroSCurvePath" 
                fill="none" 
                stroke="url(#heroRibbonGrad)" 
                strokeWidth="82" 
              />

              {/* Subtle Center Guide Highlight */}
              <use 
                href="#heroSCurvePath" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.08)" 
                strokeWidth="2" 
              />

              {/* Text Marquee Flowing Along the S-Curve */}
              <text className="curved-ribbon-text" dy="7">
                <textPath 
                  ref={textPathRef} 
                  href="#heroSCurvePath" 
                  startOffset="0px"
                >
                  {repeatedText}
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Curved Arch Bottom Divider */}
      <div className="hero-bottom-curve" />
    </section>
  );
}
