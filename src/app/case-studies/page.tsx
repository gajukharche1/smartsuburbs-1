'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { Target, TrendingUp, Sparkles, MapPin, Search } from 'lucide-react';
import Link from 'next/link';

export default function CaseStudiesPage() {
  const category1 = [
    { title: "Best Quality Natural Fruit Ice Cream", business: "Froot Delight", link: "https://hadapsar.in/item/best-quality-natural-fruit-ice-cream-in-hadapsar-pune-froot-delight/", location: "Hadapsar", directory: "Hadapsar.in", impressions: "3.1k", clicks: "6 Clicks" },
    { title: "Best CBSE School Near Ravet", business: "Walnut School", link: "https://ravet.in/item/best-cbse-school-near-ravet-walnut-school/", location: "Ravet", directory: "Ravet.in", impressions: "304", clicks: "12 Clicks" },
    { title: "Best Multispeciality Hospital in Aundh", business: "Saishree VitaLife Hospital", link: "https://aundh.in/item/best-multispeciality-hospital-in-aundh-pune-saishree-vitalife-hospital/", location: "Aundh", directory: "Aundh.in", impressions: "478", clicks: "3 Clicks" },
    { title: "Best NLP Coach & Meditation Coach", business: "Life Coach", link: "https://kalyaninagar.in/item/best-nlp-coach-life-coach-best-mind-coach-meditation-coach-kalyani-nagar-pune/", location: "Kalyani Nagar", directory: "Kalyaninagar.in", impressions: "3.1k", clicks: "6 Clicks" },
    { title: "Buy Commercial Property for sale", business: "Kawal Arcade", link: "https://punepeth.in/item/buy-commercial-property-for-sale-outright-purchase-kawal-arcade/", location: "Punepeth", directory: "Punepeth.in", impressions: "294", clicks: "18 Clicks" },
  ];

  const category2 = [
    { title: "Handicraft Handloom Home Decor", business: "Jagg Hastakala", link: "https://kothrud.com/item/handicraft-handloom-home-decor-gifting-store-shop-in-kothrud-silk-sarees-store-jagg-hastakala/", location: "Kothrud", directory: "Kothrud.com" },
    { title: "High-Quality Aluminium Sliding Doors", business: "Satyam Enterprises", link: "https://pimplesaudagar.in/item/high-quality-aluminium-sliding-door-glass-doors-services-in-pimple-saudagar-satyam-enterprise/", location: "Pimple Saudagar", directory: "PimpleSaudagar.in" },
    { title: "Best CBSE, ICSE, JEE, NEET Coaching", business: "Coaching Institute", link: "https://charniroad.com/item/best-cbse-icse-jee-neet-mht-cet-coaching-in-charni-road-mumbai/", location: "Charni Road", directory: "charniroad.com" },
  ];

  const category3 = [
    { title: "IPhone & Google Pixel Mobile Repair", business: "Screen Repair", link: "https://wakad.in/item/iphone-google-pixel-mobile-repair-screen-display-damage-in-wakad/", location: "Wakad", directory: "Wakad.in", impressions: "1.58k", clicks: "10" },
    { title: "Airtel Xstream Fiber Broadband", business: "Internet Service Provider", link: "https://banerbalewadi.com/item/broadband-airtel-xstream-fiber-broadband-internet-service-provider-in-baner/", location: "Baner", directory: "BanerBalewadi.com", impressions: "304", clicks: "12 Clicks" },
    { title: "Corporate Gifting & Sweet Shop", business: "Wow Laddus", link: "https://vimannagar.in/item/corporate-gifting-sweet-shop-in-viman-nagar-pune-wow-laddus/", location: "Vimannagar", directory: "Vimannagar.in", impressions: "478", clicks: "13 Clicks" },
    { title: "Best Laptop Repair Shop", business: "Laptop Repair", link: "https://borivli.in/item/best-laptop-repair-shop-in-borivali-mumbai/", location: "Borivali East", directory: "Borivli.in", impressions: "589", clicks: "26 Clicks" },
  ];

  const CaseCard = ({ item }: { item: any }) => (
    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <div className="card case-card" style={{ padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
          {item.title}
          {item.business && <span style={{ display: 'block', color: 'var(--primary)', fontSize: '14px', marginTop: '4px' }}>{item.business}</span>}
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <MapPin size={14} color="var(--primary)" />
            <span>{item.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <Search size={14} color="var(--primary)" />
            <span>{item.directory}</span>
          </div>
          {item.impressions && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '13px' }}>
              <Sparkles size={14} color="var(--primary)" />
              <span>{item.impressions} Views</span>
            </div>
          )}
          {item.clicks && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '13px' }}>
              <TrendingUp size={14} color="var(--primary)" />
              <span>{item.clicks}</span>
            </div>
          )}
        </div>
      </div>
    </a>
  );

  return (
    <>
      <ThemeToggle />
      <Navbar />
      
      <main style={{ minHeight: '100vh', paddingTop: '72px', backgroundColor: 'var(--bg-white)', color: 'var(--text-primary)' }}>
        
        {/* Page Header */}
        <section style={{ backgroundColor: 'var(--section-light)', paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ color: '#FF6B00', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Target size={16} /> Case Studies
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '24px', letterSpacing: '-0.5px' }}>
              Local Businesses <span className="gradient-text">Growing Faster</span>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 18px)', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.6, maxWidth: '700px', margin: '0 auto', marginBottom: '32px' }}>
              Explore real success stories of Pune & Mumbai businesses growing with Smart Suburbs' hyperlocal listings, branding, SEO, and digital visibility solutions.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
               <Link href="/contact_us" className="btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }}>
                 Start Your Growth Story
               </Link>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-white)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '40px', borderLeft: '4px solid var(--primary)', paddingLeft: '16px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Smart Suburbs Listing Everywhere Perfectly Optimized
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '8px' }}>
                Businesses enjoying 1st Page Google presence with impressions in just the last 3 months.
              </p>
            </div>
            <div className="cases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {category1.map((item, index) => <CaseCard key={index} item={item} />)}
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--section-light)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '40px', borderLeft: '4px solid #0066FF', paddingLeft: '16px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Dominating AI Search Results
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '8px' }}>
                Cited directly by Google's new AI Overview experience.
              </p>
            </div>
            <div className="cases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {category2.map((item, index) => <CaseCard key={index} item={item} />)}
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-white)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '40px', borderLeft: '4px solid var(--primary)', paddingLeft: '16px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Client Success Stories
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '8px' }}>
                More businesses winning local traffic across directories in Pune and Mumbai.
              </p>
            </div>
            <div className="cases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {category3.map((item, index) => <CaseCard key={index} item={item} />)}
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
      
      <style>{`
        .case-card:hover { border-color: var(--primary) !important; transform: translateY(-4px); box-shadow: 0 10px 40px rgba(255,107,0,0.1); }
        @media (max-width: 600px) {
          .cases-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
