'use client';
import { useEffect, useRef, useState } from 'react';
import { Building, Eye, MapPin, Zap } from 'lucide-react';

const stats = [
  { icon: <Building size={24} />, value: '35,000+', label: 'Local Businesses Listed', sublabel: 'Neighbourhood-first businesses across Pune & Mumbai' },
  { icon: <Eye size={24} />, value: 'Million+', label: 'Impressions Delivered', sublabel: 'High-intent local searches & social reach' },
  { icon: <MapPin size={24} />, value: '60+', label: 'Local Directories', sublabel: 'Covering major suburbs in Pune & Mumbai' },
  { icon: <Zap size={24} />, value: '30 Days', label: 'Google 1st Page Assured', sublabel: 'AI-powered SEO delivers results fast' },
];

export default function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="directories" style={{ background: 'var(--section-white)', paddingTop: '80px', paddingBottom: '80px', transition: 'background 0.3s ease' }}>
      <div className="container" ref={ref}>
        {/* Intro */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="badge badge-orange" style={{ marginBottom: '14px' }}>
            📊 By The Numbers
          </div>
          <h2 className="section-title" style={{ marginBottom: '12px' }}>
            We're on a mission to make every<br />
            <span className="gradient-text">local business digitally visible.</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Smart Suburbs partners with neighbourhood businesses across Pune and Mumbai to build deep, hyperlocal digital visibility. From local directories and Google 1st-page presence to community-led campaigns.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="stats-grid">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: '32px 24px',
                textAlign: 'center',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s ease ${i * 0.12}s`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '3px', background: 'linear-gradient(90deg, #FF6B00, #FF8C35)', borderRadius: '0 0 4px 4px' }} />
              
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <div style={{ width: '52px', height: '52px', background: 'rgba(255,107,0,0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF6B00' }}>
                  {stat.icon}
                </div>
              </div>
              <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)', lineHeight: '1', marginBottom: '6px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* Ticker */}
        <div style={{ marginTop: '56px', background: 'linear-gradient(135deg, #1A1A2E, #0F3460)', borderRadius: '16px', padding: '20px 0', overflow: 'hidden', position: 'relative' }}>
          <div className="ticker-wrap">
            <div className="ticker">
              {[...Array(2)].map((_, ri) => (
                ['Wakad.in', 'BanerBalewadi.com', 'Kothrud.com', 'Hinjewadi.in', 'DadarWest.in', 'Borivli.in', 'CharniRoad.com', 'Aundh.in', 'Shivaji-Nagar.com', 'Wakad.in', 'BanerBalewadi.com', 'Kothrud.com'].map((d, i) => (
                  <div key={`${ri}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap', color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 500 }}>
                    <span style={{ color: '#FF6B00', fontSize: '16px' }}>●</span>
                    {d}
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
