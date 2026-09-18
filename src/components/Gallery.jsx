import React, { useRef, useEffect, useState } from 'react';

export default function Gallery() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const moments = [
    {
      id: 1,
      title: "SUNLIT ESPRESSO BAR",
      src: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80",
      tag: "MORNING RITUAL",
      desc: "Bathed in natural morning luminescence, our espresso bar features custom-calibrated Synesso machines and daily single-origin pull rotations.",
      vibe: "Warm Luminescence",
      roastHighlight: "Ethiopian Yirgacheffe",
      acoustics: "Gentle Morning Jazz"
    },
    {
      id: 2,
      title: "ARTISAN POUR OVER",
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
      tag: "HANDCRAFTED",
      desc: "Precision goose-neck kettles, exact 93°C thermal stability, and bespoke Japanese paper filters that unlock subtle floral notes.",
      vibe: "Zen & Focused",
      roastHighlight: "Geisha Panama Floral",
      acoustics: "Flowing Water Melodies"
    },
    {
      id: 3,
      title: "BARISTA LATTE ART",
      src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
      tag: "PRECISION POUR",
      desc: "Silky micro-foam textured to exact 65°C sweetness threshold, hand-poured with intricate symmetry in heavy ceramic stoneware.",
      vibe: "Dynamic & Expressive",
      roastHighlight: "House Velvet Espresso",
      acoustics: "Cafe Steam Ambience"
    },
    {
      id: 4,
      title: "ARCHITECTURAL LOUNGE",
      src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80",
      tag: "SPACE & DESIGN",
      desc: "Curated oak tables, acoustic acoustic paneling, and warm amber illumination designed for deep creative focus and conversation.",
      vibe: "Minimalist Comfort",
      roastHighlight: "Cold Drip Colombian",
      acoustics: "Curated Lo-Fi Beats"
    },
    {
      id: 5,
      title: "COZY WOODEN CORNERS",
      src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&auto=format&fit=crop&q=80",
      tag: "COMMUNITY",
      desc: "Tucked nooks with plush leather seating, reading lamps, and direct views of our slow-brew bar for an intimate escape.",
      vibe: "Intimate & Nostalgic",
      roastHighlight: "Costa Rican Honey",
      acoustics: "Vinyl Needle Warmth"
    },
    {
      id: 6,
      title: "GOLDEN HOUR ROASTS",
      src: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=800&auto=format&fit=crop&q=80",
      tag: "FRESH DAILY",
      desc: "Our in-house cast-iron drum roaster caramelizes green coffees in small 12kg batches every afternoon to ensure zero oxidation.",
      vibe: "Aromatic & Earthy",
      roastHighlight: "Dark Caramel Reserve",
      acoustics: "Roaster Drum Resonance"
    }
  ];

  const total = moments.length;

  // Handle keyboard escape to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedMoment(null);
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Touch swipe handling for mobile
  const minSwipeDistance = 45;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  // Orbit rotation based on active index + scroll offset
  useEffect(() => {
    let currentAngle = 0;
    let targetAngle = -activeIndex * (360 / total);
    let animId = null;

    const getRadius = () => {
      const w = window.innerWidth;
      if (w <= 640) return 150;
      if (w <= 1024) return 210;
      return 270;
    };

    const renderLoop = () => {
      const diff = targetAngle - currentAngle;
      if (Math.abs(diff) > 0.005) {
        currentAngle += diff * 0.08;
        const radius = getRadius();

        itemsRef.current.forEach((el, index) => {
          if (!el) return;
          const theta = (index / total) * 360 + currentAngle;
          const isCurrentActive = index === activeIndex;

          el.style.transform = `rotate(${theta}deg) translateX(${radius}px) rotate(${-theta}deg)`;
          el.style.zIndex = isCurrentActive ? '30' : '10';
        });
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
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

      // Calculate closest index from scroll progress
      const scrollIndex = Math.min(total - 1, Math.floor(progress * total));
      targetAngle = -progress * 180 - (activeIndex * 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [activeIndex, total]);

  return (
    <div ref={containerRef} className="gallery-scroll-track" id="gallery">
      <div className="gallery-sticky-viewport">
        {/* Section Header */}


        {/* Desktop Revolving Orbit Experience */}
        <div className="gallery-orbit-stage gallery-desktop-stage">
          {/* Luminous Concentric Orbit Rings */}
          <div className="orbit-ring orbit-ring-outer" />
          <div className="orbit-ring orbit-ring-main" />
          <div className="orbit-ring orbit-ring-inner" />

          {/* Centerpiece 3D Bean Burst / Core Glow */}
          <div className="gallery-orbit-center">
            <div className="orbit-center-glow" />
            <img
              src="/assets/beans_burst_transparent.png"
              alt="3D Coffee Bean Burst Centerpiece"
              className="orbit-center-img"
            />
            <div className="orbit-center-badge">
              <span>GRΣKΘ</span>
            </div>
          </div>

          {/* Revolving Items Container */}
          <div className="gallery-orbit-container">
            {moments.map((item, index) => {
              const isSelected = activeIndex === index;
              return (
                <div
                  key={item.id}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className={`gallery-orbit-item ${isSelected ? 'is-active-item' : ''}`}
                >
                  <div
                    className={`gallery-orbit-card ${isSelected ? 'is-card-selected' : ''}`}
                    onClick={() => {
                      setActiveIndex(index);
                      setSelectedMoment(item);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedMoment(item)}
                    aria-label={`Explore ${item.title}`}
                  >
                    <div className="orbit-card-img-wrap">
                      <img src={item.src} alt={item.title} loading="lazy" />
                      <div className="orbit-card-overlay">
                        <span className="orbit-card-tag">{item.tag}</span>
                        <h4 className="orbit-card-title">{item.title}</h4>
                        <span className="orbit-card-action">EXPLORE MOMENT →</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Creative 3D Coverflow Card Deck */}
        <div
          className="gallery-mobile-deck"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="deck-card-carousel">
            {moments.map((item, index) => {
              const position = (index - activeIndex + total) % total;
              let cardClass = 'deck-card-hidden';
              if (position === 0) cardClass = 'deck-card-active';
              else if (position === 1 || position === total - 1) cardClass = position === 1 ? 'deck-card-next' : 'deck-card-prev';

              return (
                <div
                  key={item.id}
                  className={`deck-card ${cardClass}`}
                  onClick={() => {
                    if (position === 0) setSelectedMoment(item);
                    else setActiveIndex(index);
                  }}
                >
                  <div className="deck-card-media">
                    <img src={item.src} alt={item.title} loading="lazy" />
                    <span className="deck-card-tag">{item.tag}</span>
                  </div>
                  <div className="deck-card-info">
                    <h4 className="deck-card-title">{item.title}</h4>
                    <p className="deck-card-desc">{item.desc}</p>
                    <div className="deck-card-cta">
                      <span>TAP TO VIEW TASTING NOTES</span>
                      <span className="deck-arrow">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls Bar (Works on Desktop & Mobile) */}
        <div className="gallery-nav-controls">
          <button
            className="gallery-arrow-btn"
            onClick={prevSlide}
            aria-label="Previous moment"
          >
            ←
          </button>

          <div className="gallery-pagination-pills">
            {moments.map((m, i) => (
              <button
                key={m.id}
                className={`gallery-page-dot ${activeIndex === i ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Jump to ${m.title}`}
              >
                <span>0{i + 1}</span>
              </button>
            ))}
          </div>

          <button
            className="gallery-arrow-btn"
            onClick={nextSlide}
            aria-label="Next moment"
          >
            →
          </button>
        </div>

        {/* Curved Bottom Arch Divider */}
        <div className="section-bottom-curve curve-to-white" />
      </div>

      {/* Interactive Lightbox / Detail Modal */}
      {selectedMoment && (
        <div
          className="luxury-modal-backdrop"
          onClick={() => setSelectedMoment(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="luxury-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedMoment(null)}
              aria-label="Close dialog"
            >
              ✕
            </button>

            <div className="modal-content-grid">
              <div className="modal-img-column">
                <img
                  src={selectedMoment.src}
                  alt={selectedMoment.title}
                  className="modal-primary-img"
                />
                <span className="modal-tag-pill">{selectedMoment.tag}</span>
              </div>

              <div className="modal-body-column">
                <div className="modal-header-meta">
                  <span className="modal-brand-label">GREKO ATMOSPHERE CHAPTER</span>
                  <h3 className="modal-title">{selectedMoment.title}</h3>
                </div>

                <p className="modal-desc">{selectedMoment.desc}</p>

                <div className="modal-spec-grid">
                  <div className="modal-spec-item">
                    <span className="spec-label">AMBIENT VIBE</span>
                    <span className="spec-value">{selectedMoment.vibe}</span>
                  </div>
                  <div className="modal-spec-item">
                    <span className="spec-label">ROAST PROFILE</span>
                    <span className="spec-value">{selectedMoment.roastHighlight}</span>
                  </div>
                  <div className="modal-spec-item">
                    <span className="spec-label">ACOUSTIC PROFILE</span>
                    <span className="spec-value">{selectedMoment.acoustics}</span>
                  </div>
                </div>

                <div className="modal-footer-cta">
                  <a
                    href="#menu"
                    className="btn-action"
                    onClick={() => setSelectedMoment(null)}
                  >
                    PAIR WITH A COFFEE
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
