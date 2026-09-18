import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Statement from './components/Statement';
import Menu from './components/Menu';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Branches from './components/Branches';
import Testimonial from './components/Testimonial';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import Footer from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  useScrollReveal();

  return (
    <div className="app-root">
      <Header />
      <main>
        <Hero />
        <Statement />
        <Menu />
        <Features />
        <Gallery />
        <Branches />
        <Testimonial />
        <FAQ />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
