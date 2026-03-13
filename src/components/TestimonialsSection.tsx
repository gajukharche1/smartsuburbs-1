'use client';
import { Quote, Star } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #0F3460 100%)', paddingTop: '100px', paddingBottom: '100px', position: 'relative', overflow: 'hidden' }}>
      {/* Background blobs */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="badge" style={{ marginBottom: '14px', background: 'rgba(255,107,0,0.15)', color: '#FF8C35', border: '1px solid rgba(255,107,0,0.25)' }}>
            💬 Real Results, Real Trust
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, color: 'white', marginBottom: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            From 1 area Listing to 9 area Listings.
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.65' }}>
            This testimonial is a powerful example of what happens when a local business taps into the Smart Suburbs ecosystem — hyperlocal visibility, steady leads, and faster expansion across multiple suburbs.
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div style={{ maxWidth: '760px', margin: '0 auto 40px' }}>
          <div style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '28px', padding: '48px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '32px', left: '36px', color: 'rgba(255,107,0,0.3)', fontSize: '80px', lineHeight: '1', fontFamily: 'Georgia, serif' }}>"</div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', justifyContent: 'center' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#FFB800" color="#FFB800" />)}
            </div>
            <p style={{ color: 'white', fontSize: '18px', lineHeight: '1.7', textAlign: 'center', fontStyle: 'italic', marginBottom: '28px' }}>
              "Smart Suburbs transformed our local presence completely. We started with just 1 directory listing in Wakad and within 6 months, we expanded to 9 area listings. Our leads increased 3x and we're now getting inquiries from customers within 3-5 km radius consistently. The Google 1st page results were evident within 30 days — exactly as promised!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B00, #FF8C35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: '18px' }}>RS</div>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '16px' }}>Rajesh S.</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>Local Business Owner, Wakad · Pune</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mini testimonials */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="mini-testimonials">
          {[
            { initial: 'PM', name: 'Priya M.', area: 'Baner, Pune', text: 'Got featured on Google 1st page within 25 days. Quality leads have improved drastically.' },
            { initial: 'AS', name: 'Anand S.', area: 'Borivli, Mumbai', text: 'Affordable compared to JustDial and the leads are truly hyperlocal. Worth every rupee!' },
            { initial: 'KD', name: 'Komal D.', area: 'Kothrud, Pune', text: 'The WhatsApp onboarding was super smooth and my listing went live in just 5 days!' },
          ].map((t, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="#FFB800" color="#FFB800" />)}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,107,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF6B00', fontWeight: 700, fontSize: '13px' }}>{t.initial}</div>
                <div>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: '13px' }}>{t.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>{t.area}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="https://smartsuburbs.in/go/Smart-suburbs-case-study-button" className="btn-primary">
            Check Our Work →
          </a>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .mini-testimonials { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
