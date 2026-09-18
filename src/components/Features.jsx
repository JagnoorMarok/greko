import React, { useRef, useEffect, useState } from 'react';

const TOTAL_FRAMES = 120;

export default function Features() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [scrubPercent, setScrubPercent] = useState(0);

  useEffect(() => {
    // 1. Preload all frame images
    const images = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(4, '0');
      img.src = `/frames/frame_${paddedIndex}.jpg`;
      images.push(img);
    }
    imagesRef.current = images;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let currentFrameIndex = 0;
    let targetFrameIndex = 0;
    let animId = null;

    // Draw frame on canvas with crisp cover aspect ratio
    const drawFrame = (index) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = w / h;

      let renderW, renderH, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        renderW = w;
        renderH = w / imgRatio;
        offsetX = 0;
        offsetY = (h - renderH) / 2;
      } else {
        renderH = h;
        renderW = h * imgRatio;
        offsetX = (w - renderW) / 2;
        offsetY = 0;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      ctx.restore();
    };

    // Draw first frame once loaded
    images[0].onload = () => drawFrame(0);
    if (images[0].complete) drawFrame(0);

    // Continuous smooth interpolation loop for buttery 60fps scrubbing
    const renderLoop = () => {
      const diff = targetFrameIndex - currentFrameIndex;
      if (Math.abs(diff) > 0.05) {
        currentFrameIndex += diff * 0.25;
        drawFrame(Math.round(currentFrameIndex));
      }
      animId = requestAnimationFrame(renderLoop);
    };
    animId = requestAnimationFrame(renderLoop);

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      targetFrameIndex = progress * (TOTAL_FRAMES - 1);
      setScrubPercent(Math.round(progress * 100));

      // Calculate active milestone (0: 0-25%, 1: 25-50%, 2: 50-75%, 3: 75-100%)
      const milestone = Math.min(3, Math.floor(progress * 4));
      setActiveMilestone(milestone);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const milestones = [
    {
      id: 0,
      title: "GREKO RESERVE BEANS",
      desc: "Carefully selected single-origin and ethically sourced beans for rich body.",
      position: "top-left",
      metric: "100% ARABICA"
    },
    {
      id: 1,
      title: "EXPERT BARISTAS",
      desc: "Mastery of extraction pressures, micro-foam texturing, and calibrated roasts.",
      position: "top-right",
      metric: "9 BAR EXTRACTION"
    },
    {
      id: 2,
      title: "FRESH EVERY DAY",
      desc: "Small-batch roasted daily to lock in aromatic oils and peak flavour profiles.",
      position: "bottom-left",
      metric: "DAILY ROAST"
    },
    {
      id: 3,
      title: "COZY CAFE EXPERIENCE",
      desc: "A warm, architecturally designed sanctuary crafted to relax, work, or connect.",
      position: "bottom-right",
      metric: "CURATED SPACE"
    }
  ];

  return (
    <div ref={containerRef} className="features-scroll-track" id="features">
      <div className="features-sticky-viewport">
        {/* Full-bleed 100% Screen Canvas Video Scrubbing */}
        <canvas ref={canvasRef} className="features-canvas-fullscreen" />

        {/* Badges and Content Layered Directly Above the Scrubbing Video */}
        <div className="features-overlay-content">
          <div className="features-header">
            <div className="section-pill-badge reveal-up">
              <span>THE GREKO COMMITMENT • {scrubPercent}% BREWED</span>
            </div>
            <h2 className="heading-section reveal-up delay-100">
              EVERY CUP,<br />PERFECTLY BREWED
            </h2>
          </div>

          <div className="features-badges-grid">
            {milestones.map((item) => {
              const isActive = activeMilestone === item.id;
              return (
                <div 
                  key={item.id}
                  className={`feature-box ${item.position} ${isActive ? 'active-milestone' : ''}`}
                >
                  <div className="feature-box-header">
                    <span className="feature-badge-metric">{item.metric}</span>
                    {isActive && <span className="feature-active-pulse" />}
                  </div>
                  <h3 className="feature-title">{item.title}</h3>
                  <p className="feature-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Mobile Milestone Navigation Dots */}
          <div className="features-mobile-dots">
            {milestones.map((m) => (
              <div 
                key={m.id} 
                className={`mobile-dot ${activeMilestone === m.id ? 'active' : ''}`}
                aria-label={m.title}
              />
            ))}
          </div>

          {/* Curved Bottom Arch Divider */}
          <div className="section-bottom-curve curve-to-navy-dark" />
        </div>
      </div>
    </div>
  );
}
