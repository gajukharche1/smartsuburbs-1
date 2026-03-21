'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { Facebook, MonitorPlay, MousePointerClick } from 'lucide-react';
import Link from 'next/link';

export default function FacebookAdsPage() {
  return (
    <>
      <ThemeToggle />
      <Navbar />
      
      <main style={{ minHeight: '100vh', paddingTop: '72px', backgroundColor: 'var(--bg-white)', color: 'var(--text-primary)' }}>
        
        {/* Page Header */}
        <section style={{ backgroundColor: 'var(--section-light)', paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: '#1877F2', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(24, 119, 242, 0.4)' }}>
                <Facebook size={36} />
              </div>
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.5px' }}>
              Facebook Ads Management Packages In <span className="gradient-text">Pune</span>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 18px)', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.6, maxWidth: '700px', margin: '0 auto', marginBottom: '24px' }}>
              We offer a Facebook Ad Campaign service that takes care of the whole process from strategy to creative design to implementation. So Just Sit Back & Relax.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-white)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <div className="mission-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '80px' }}>
              <div className="card" style={{ padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MonitorPlay size={28} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>Creative Formats</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '16px' }}>
                  With a video & image carousel, you can show the customer your product in a unique way. You don’t have to speak for it every single time. The carousel allows for all sorts of creative and innovative ideas, which will grab their attention and make them buy it.
                </p>
              </div>

              <div className="card" style={{ padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MousePointerClick size={28} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>Unmatched Reach</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '16px' }}>
                  One of the most popular advertising platforms for marketers is Facebook, with more than 2.6 billion monthly active users. Facebook is the king of social media advertising, and many businesses use it to make huge returns on investment from marketing.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'var(--section-light)', borderRadius: '24px', border: '1px solid var(--border)' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                So Hurry up!! And Curate Your Facebook Ad Campaign with Us!!
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginBottom: '32px', lineHeight: 1.6 }}>
                Smart Suburbs offers Brand Monitoring and Competitor Analysis Service to boost social engagement and provide insights about your competitor's brand.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact_us" className="btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
                  Enroll Now
                </Link>
                <Link href="/contact_us" style={{ padding: '16px 32px', fontSize: '16px', borderRadius: '12px', border: '1px solid var(--primary)', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>
                  Contact Us
                </Link>
              </div>
            </div>

          </div>
        </section>

      </main>
      
      <Footer />

      <style>{`
        /* Responsive Overrides */
        @media (max-width: 900px) {
          .mission-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
