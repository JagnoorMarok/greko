import React, { useState, useEffect } from 'react';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedDrink, setSelectedDrink] = useState(null);

  const categories = [
    { id: 'ALL', label: 'ALL CREATIONS' },
    { id: 'HOT', label: 'HOT COFFEE' },
    { id: 'COLD', label: 'COLD BREWS' },
    { id: 'SIGNATURE', label: 'SIGNATURES' }
  ];

  const menuItems = [
    {
      id: 1,
      name: "CLASSIC LATTE",
      category: "HOT",
      price: "$5.80",
      image: "/assets/drink_latte_transparent.png",
      origin: "Sidama, Ethiopia",
      roast: "Medium Light",
      roastLevel: 55,
      sweetness: 60,
      acidity: 30,
      notes: ["Silky Micro-foam", "Toasted Almond", "Vanilla Blossom"],
      desc: "Double shot of espresso balanced with steam-textured whole milk and a delicate velvety finish.",
      delay: "delay-100"
    },
    {
      id: 2,
      name: "SIGNATURE ESPRESSO",
      category: "HOT",
      price: "$3.90",
      image: "/assets/drink_espresso_transparent.png",
      origin: "Antioquia, Colombia",
      roast: "Medium Dark",
      roastLevel: 80,
      sweetness: 25,
      acidity: 75,
      notes: ["Dark Cocoa", "Red Cherry", "Caramel Crema"],
      desc: "Extracted under 9.2 bars of precision thermal pressure for maximum crema density and lingering cocoa notes.",
      delay: "delay-200"
    },
    {
      id: 3,
      name: "CARAMEL MACCHIATO",
      category: "SIGNATURE",
      price: "$6.70",
      image: "/assets/drink_macchiato_transparent.png",
      origin: "Huehuetenango, Guatemala",
      roast: "Medium",
      roastLevel: 65,
      sweetness: 85,
      acidity: 20,
      notes: ["House Salted Caramel", "Bourbon Vanilla", "Steamed Froth"],
      desc: "Vanilla-infused steamed milk marked with rich espresso shots and drizzled with artisan caramelized cane sugar.",
      delay: "delay-300"
    },
    {
      id: 4,
      name: "VANILLA COLD BREW",
      category: "COLD",
      price: "$6.50",
      image: "/assets/drink_cold_brew_transparent.png",
      origin: "Yirgacheffe & Tarrazú Blend",
      roast: "Light-Medium",
      roastLevel: 45,
      sweetness: 65,
      acidity: 40,
      notes: ["20-Hour Steep", "Madagascar Vanilla", "Subtle Maple"],
      desc: "Slow-steeped in cold mountain spring water for 20 hours to eliminate bitterness, paired with pure vanilla cream.",
      delay: "delay-100"
    },
    {
      id: 5,
      name: "VELVET MOCHA",
      category: "SIGNATURE",
      price: "$7.20",
      image: "/assets/drink_mocha_transparent.png",
      origin: "Single-Estate Java & Valrhona Chocolate",
      roast: "Dark Roast",
      roastLevel: 85,
      sweetness: 80,
      acidity: 25,
      notes: ["70% Dark Chocolate", "Espresso Crema", "Cacao Dust"],
      desc: "Pure Belgian dark chocolate ganache melted directly into hot espresso, crowned with whipped cocoa cream.",
      delay: "delay-200"
    },
    {
      id: 6,
      name: "HAZELNUT CAPPUCCINO",
      category: "HOT",
      price: "$6.30",
      image: "/assets/drink_hazelnut_transparent.png",
      origin: "Minas Gerais, Brazil",
      roast: "Medium",
      roastLevel: 60,
      sweetness: 55,
      acidity: 35,
      notes: ["Piedmont Hazelnut", "Dense Foam Dome", "Nutmeg Sprinkle"],
      desc: "Equal parts espresso, hot milk, and voluminous foam infused with naturally roasted Piedmont hazelnut reduction.",
      delay: "delay-300"
    }
  ];

  // Filtered list
  const filteredItems = activeCategory === 'ALL' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedDrink(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="menu-section" id="menu">
      <div className="section-pill-badge reveal-up" style={{ margin: '0 auto 16px' }}>
        <span>GREKO SIGNATURE CREATIONS</span>
      </div>
      <h2 className="heading-section reveal-up">
        FIND YOUR<br />PERFECT BREW
      </h2>

      {/* Interactive Category Filter Pills */}
      <div className="menu-filter-pills reveal-up delay-100">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`menu-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="menu-grid">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className={`menu-card reveal-up ${item.delay}`}
            onClick={() => setSelectedDrink(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedDrink(item)}
          >
            <div className="menu-card-image-wrap">
              <span className="menu-card-tag">{item.category}</span>
              <img 
                src={item.image} 
                alt={item.name} 
                className="menu-card-img" 
                loading="lazy"
                style={{ mixBlendMode: 'multiply' }}
              />
              <div className="menu-card-quick-view">
                <span>VIEW PROFILE & NOTES →</span>
              </div>
            </div>
            <div className="menu-card-details">
              <div className="menu-card-info">
                <span className="menu-card-name">{item.name}</span>
                <span className="menu-card-origin">{item.origin}</span>
              </div>
              <span className="menu-card-price">{item.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="menu-cta-wrap reveal-up delay-200">
        <a href="#contact" className="btn-yellow">
          RESERVE TASTING FLIGHT
        </a>
      </div>

      {/* Curved Bottom Arch Divider */}
      <div className="section-bottom-curve curve-to-light" />

      {/* Drink Details & Tasting Notes Modal */}
      {selectedDrink && (
        <div 
          className="luxury-modal-backdrop" 
          onClick={() => setSelectedDrink(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="luxury-modal-card menu-detail-modal" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close-btn"
              onClick={() => setSelectedDrink(null)}
              aria-label="Close dialog"
            >
              ✕
            </button>

            <div className="modal-content-grid">
              <div className="modal-img-column modal-drink-column">
                <img 
                  src={selectedDrink.image} 
                  alt={selectedDrink.name} 
                  className="modal-drink-img"
                  style={{ mixBlendMode: 'multiply' }}
                />
                <span className="modal-tag-pill">{selectedDrink.category}</span>
              </div>

              <div className="modal-body-column">
                <div className="modal-header-meta">
                  <div className="modal-price-tag">{selectedDrink.price}</div>
                  <h3 className="modal-title">{selectedDrink.name}</h3>
                  <span className="modal-subtitle">Single-Origin • {selectedDrink.origin}</span>
                </div>

                <p className="modal-desc">{selectedDrink.desc}</p>

                {/* Flavor Notes Pills */}
                <div className="modal-notes-wrap">
                  <span className="spec-label">TASTING NOTES</span>
                  <div className="modal-notes-pills">
                    {selectedDrink.notes.map((note, i) => (
                      <span key={i} className="note-pill">{note}</span>
                    ))}
                  </div>
                </div>

                {/* Flavor Profile Meters */}
                <div className="flavor-meters-wrap">
                  <div className="meter-row">
                    <div className="meter-label-wrap">
                      <span>ROAST PROFILE</span>
                      <span>{selectedDrink.roast}</span>
                    </div>
                    <div className="meter-bar-track">
                      <div className="meter-bar-fill" style={{ width: `${selectedDrink.roastLevel}%` }} />
                    </div>
                  </div>

                  <div className="meter-row">
                    <div className="meter-label-wrap">
                      <span>SWEETNESS</span>
                      <span>{selectedDrink.sweetness}%</span>
                    </div>
                    <div className="meter-bar-track">
                      <div className="meter-bar-fill" style={{ width: `${selectedDrink.sweetness}%` }} />
                    </div>
                  </div>

                  <div className="meter-row">
                    <div className="meter-label-wrap">
                      <span>BRIGHT ACIDITY</span>
                      <span>{selectedDrink.acidity}%</span>
                    </div>
                    <div className="meter-bar-track">
                      <div className="meter-bar-fill" style={{ width: `${selectedDrink.acidity}%` }} />
                    </div>
                  </div>
                </div>

                <div className="modal-footer-cta">
                  <button 
                    className="btn-action"
                    onClick={() => {
                      alert(`Added ${selectedDrink.name} to your ritual order!`);
                      setSelectedDrink(null);
                    }}
                  >
                    ADD TO RITUAL ORDER ({selectedDrink.price})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
