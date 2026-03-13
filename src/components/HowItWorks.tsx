'use client';
import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    num: '01',
    title: 'Simple Payment',
    desc: 'Annual subscription of ₹7000 (no hidden fees).',
    color: '#FF6B00',
    icon: '💳',
  },
  {
    num: '02',
    title: 'WhatsApp Onboarding',
    desc: 'Join our dedicated WhatsApp group for quick communication.',
    color: '#25D366',
    icon: '💬',
  },
  {
    num: '03',
    title: 'Share Details',
    desc: 'Send photos, services, business info via WhatsApp.',
    color: '#4A90D9',
    icon: '📸',
  },
  {
    num: '04',
    title: '7 Days Listing Live',
    desc: 'Your directory listing is professionally published within 7 days.',
    color: '#8B5CF6',
    icon: '🚀',
  },
  {
    num: '05',
    title: 'Google 1st Page Assured',
    desc: 'Our AI-powered SEO gives you top ranking within 30 days.',
    color: '#00C851',
    icon: '🏆',
  },
];

export default function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" style={{ background: 'var(--section-white)', paddingTop: '100px', paddingBottom: '100px', transition: 'background 0.3s ease' }} ref={ref}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="badge badge-orange" style={{ marginBottom: '14px' }}>📋 How It Works</div>
          <h2 className="section-title" style={{ marginBottom: '14px' }}>
            How Smart Suburbs Paid Listing Works
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Get your business live on Google's 1st Page in just 5 simple steps.
          </p>
        </div>

        {/* Timeline steps */}
        <div style={{ position: 'relative' }}>
          {/* Connector line */}
          <div style={{ position: 'absolute', top: '44px', left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 80px)', height: '2px', background: 'linear-gradient(90deg, #FF6B00, #8B5CF6)', opacity: 0.25, display: 'none' }} className="timeline-line" />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }} className="steps-grid">
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.6s ease ${i * 0.12}s`,
                  textAlign: 'center',
                }}
              >
                {/* Icon Circle */}
                <div style={{ position: 'relative', display: 'inline-flex', marginBottom: '20px' }}>
                  <div style={{
                    width: '88px',
                    height: '88px',
                    borderRadius: '50%',
                    background: `${step.color}12`,
                    border: `2px solid ${step.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    transition: 'all 0.3s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = `${step.color}20`;
                    el.style.borderColor = step.color;
                    el.style.transform = 'scale(1.04)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = `${step.color}12`;
                    el.style.borderColor = `${step.color}30`;
                    el.style.transform = 'scale(1)';
                  }}
                  >
                    {step.icon}
                  </div>
                  <div style={{ position: 'absolute', top: '-6px', right: '-6px', width: '26px', height: '26px', borderRadius: '50%', background: step.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800 }}>
                    {step.num}
                  </div>
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>{step.title}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.55' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <a href="https://sspaidlisting.smartsuburbs.in/" className="btn-primary" style={{ fontSize: '16px', padding: '16px 36px' }}>
            🚀 Pune + Mumbai Directories Network
          </a>
          <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--text-muted)' }}>Annual plan at ₹7,000 only. No hidden fees.</p>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .steps-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .steps-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
