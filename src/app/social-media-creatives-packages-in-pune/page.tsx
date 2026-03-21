'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { Image as ImageIcon, Camera, Layout, Share2, TrendingUp, Presentation } from 'lucide-react';

export default function SocialMediaCreativesPage() {
  const offerings = [
    { title: "Custom Post Designs", desc: "Engaging, brand-aligned graphics for Facebook, Instagram, LinkedIn, and more.", icon: <ImageIcon size={24} /> },
    { title: "Video Content", desc: "Short-form video assets like Reels and Shorts to capture attention.", icon: <Camera size={24} /> },
    { title: "Carousel Posts", desc: "Informative swipeable content to tell your brand story effectively.", icon: <Layout size={24} /> },
    { title: "Campaign Assets", desc: "Cohesive visual sets for specific marketing pushes or product launches.", icon: <Presentation size={24} /> },
    { title: "Community Management", desc: "Consistent posting schedules optimized for your local audience.", icon: <Share2 size={24} /> },
    { title: "Performance Tracking", desc: "Data-driven insights on what creatives perform best for your market.", icon: <TrendingUp size={24} /> }
  ];

  return (
    <>
      <ThemeToggle />
      <Navbar />
      
      <main style={{ minHeight: '100vh', paddingTop: '72px', backgroundColor: 'var(--bg-white)', color: 'var(--text-primary)' }}>
        
        {/* Page Header */}
        <section style={{ backgroundColor: 'var(--section-light)', paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ color: '#FF6B00', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '14px', marginBottom: '16px' }}>
              Social Media Packages
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '24px', letterSpacing: '-0.5px' }}>
              Social Media <span className="gradient-text">Creatives Packages</span>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 18px)', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.6, maxWidth: '700px', margin: '0 auto', marginBottom: '24px' }}>
              Chilax, Focus on your business and leave the rest on us! Let our team handle your social media presence with stunning creatives.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
               <Link href="/contact_us" className="btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }}>
                 Contact Us
               </Link>
            </div>
          </div>
        </section>

        {/* Offerings Grid */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-white)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                What's Included in Our Packages
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
                Everything you need to maintain a vibrant, engaging social media presence.
              </p>
            </div>

            <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {offerings.map((item, index) => (
                <div key={index} className="card" style={{ padding: '32px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>
      
      <Footer />
      
      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
