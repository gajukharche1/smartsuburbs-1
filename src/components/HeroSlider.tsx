'use client';
import { useState, useEffect } from 'react';
import { ArrowRight, Play, Star, MapPin, TrendingUp, Users, Eye } from 'lucide-react';

const slides = [
  {
    badge: '🏆 Most Affordable Plan',
    headline: 'Gold Plan',
    subheadline: "Rank on Google's 1st Page — Assured",
    description: 'Our directories appear in real search results & AI Overview boxes, pushing your business to the top for hyperlocal terms.',
    features: ['Google 1st Page Guarantee', '16 Local Social Media Posts', 'Featured Article + Lead Form', 'WhatsApp Button + 20 Photo Gallery'],
    primaryCta: { text: 'Get Listed Today →', href: 'https://sspaidlisting.smartsuburbs.in/' },
    secondaryCta: { text: 'View Our Work', href: 'https://smartsuburbs.in/case-studies/' },
    highlight: '₹19/Day',
    highlightLabel: 'Starting from',
    theme: 'gold',
  },
  {
    badge: '📍 Pune Directory Network',
    headline: 'Grow Faster in Your Neighbourhood.',
    subheadline: 'India\'s Largest Hyperlocal Network',
    description: 'Smart Suburbs is India\'s largest network of area-specific business directories — Builds your local ranking & neighbourhood visibility across Pune.',
    features: ['Wakad.in', 'BanerBalewadi.com', 'Kothrud.com', 'Hinjewadi.in & 20+ more'],
    primaryCta: { text: 'Explore Pune Directories →', href: 'https://sspaidlisting.smartsuburbs.in/' },
    secondaryCta: { text: 'See Case Studies', href: 'https://smartsuburbs.in/case-studies/' },
    highlight: '30+',
    highlightLabel: 'Pune Directories',
    theme: 'pune',
  },
  {
    badge: '🌆 Mumbai Directory Network',
    headline: 'Dominate Mumbai\'s Local Search',
    subheadline: 'The 360° Hyperlocal Platform',
    description: 'Get your business listed on Smart Suburbs Directories and seen where generic directories fall short — covering Borivli, Dadar, Charni Road & more.',
    features: ['Borivli.in', 'DadarWest.in', 'CharniRoad.com', 'Expanding to 60+ directories'],
    primaryCta: { text: 'Explore Mumbai Directories →', href: 'https://sspaidlisting.smartsuburbs.in/' },
    secondaryCta: { text: 'See Success Stories', href: 'https://smartsuburbs.in/go/Smart-suburbs-case-study-button' },
    highlight: '60+',
    highlightLabel: 'Total Directories',
    theme: 'mumbai',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [current]);

  const goToSlide = (idx: number) => {
    if (isAnimating || idx === current) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsAnimating(false);
    }, 350);
  };

  const goToNext = () => goToSlide((current + 1) % slides.length);
  const goToPrev = () => goToSlide((current - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <section style={{
        minHeight: '100vh',
        paddingTop: '72px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1A1A2E',
        backgroundImage: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)',
      }} suppressHydrationWarning>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '15%', right: '8%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', animation: 'float 6s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '5%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,184,0,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', animation: 'float 8s ease-in-out infinite reverse' }} />

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateY(20px)' : 'translateY(0)',
            transition: 'all 0.4s ease',
          }}
          className="hero-grid"
        >
          {/* Left Content */}
          <div>
            <div className="badge badge-orange" style={{ marginBottom: '20px', background: 'rgba(255,107,0,0.15)', borderColor: 'rgba(255,107,0,0.3)', color: '#FF8C35' }}>
              {slide.badge}
            </div>

            <h1 style={{ fontSize: 'clamp(32px,5vw,58px)', fontWeight: 900, color: 'white', lineHeight: '1.1', marginBottom: '16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {slide.headline}
              {slide.theme === 'gold' && (
                <span style={{ display: 'block', background: 'linear-gradient(135deg, #FFB800, #FF6B00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Rank on Google's 1st Page — Assured
                </span>
              )}
            </h1>

            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.7)', marginBottom: '28px', lineHeight: '1.65' }}>
              {slide.description}
            </p>

            {/* Features */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '36px' }}>
              {slide.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: 500 }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(0,200,81,0.15)', border: '1.5px solid #00C851', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="#00C851" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  {f}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a href={slide.primaryCta.href} className="btn-primary">
                {slide.primaryCta.text}
              </a>
              <a href={slide.secondaryCta.href} className="btn-secondary">
                <Play size={14} fill="white" /> {slide.secondaryCta.text}
              </a>
            </div>
          </div>

          {/* Right Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '28px',
              padding: '40px',
              width: '100%',
              maxWidth: '420px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Glow */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,107,0,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Highlight stat */}
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '64px', fontWeight: 900, background: 'linear-gradient(135deg, #FFB800, #FF6B00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {slide.highlight}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '6px' }}>
                  {slide.highlightLabel}
                </div>
              </div>

              {/* Mini stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {[
                  { icon: <Users size={16} />, label: '35,000+', sublabel: 'Businesses Listed' },
                  { icon: <Eye size={16} />, label: 'Million+', sublabel: 'Monthly Impressions' },
                  { icon: <MapPin size={16} />, label: '60+', sublabel: 'Local Directories' },
                  { icon: <TrendingUp size={16} />, label: '30 Days', sublabel: 'Google 1st Page' },
                ].map((stat, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ color: '#FF6B00', marginBottom: '6px' }}>{stat.icon}</div>
                    <div style={{ color: 'white', fontWeight: 800, fontSize: '20px' }}>{stat.label}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 500 }}>{stat.sublabel}</div>
                  </div>
                ))}
              </div>

              {/* Trust badge */}
              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: 'rgba(0,200,81,0.1)', borderRadius: '10px', border: '1px solid rgba(0,200,81,0.2)' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#FFB800" color="#FFB800" />)}
                </div>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 500 }}>Trusted by 35,000+ Pune & Mumbai Businesses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '48px' }}>
          <button onClick={goToPrev} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', backdropFilter: 'blur(8px)' }}>
            ←
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                style={{
                  width: i === current ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === current ? '#FF6B00' : 'rgba(255,255,255,0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
          <button onClick={goToNext} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', backdropFilter: 'blur(8px)' }}>
            →
          </button>
        </div>
      </div>

      {/* Bottom wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '60px' }}>
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white"/>
        </svg>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
