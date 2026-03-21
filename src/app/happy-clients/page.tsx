'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { Target, MapPin, Phone, Mail, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function HappyClientsPage() {
  const reviews = [
    {
      name: "Satwashil Mohite",
      initial: "S",
      color: "#009688",
      text: "Smart Suburbs directories of aundh, wakad, pimple saudagar i see are the best way for any local area business to get extremely cost effective way to get onto google 1st page plus also receive bonus local area social media postings and featured article. Pretty cost effective and reliable. Digital Biz visibility has now become pretty vital and i would strongly recommend every local area biz to consider that."
    },
    {
      name: "Kiran Salunke",
      initial: "K",
      color: "#F57C00",
      text: "In our journey from an offline to a digital presence, Smart Suburbs team skillfully guided our bike renting company with services like domain name selection, logo creation, website content, and video-driven Facebook ads for generating leads. Their unique design approach created a user-friendly website that boosted customer engagement significantly. We are incredibly grateful to the Smart Suburbs team for their pivotal role in our successful digital transition."
    },
    {
      name: "Tanishq Joshi",
      initial: "T",
      color: "#0288D1",
      text: "Best ROI ever! I didn't want to spend on Google Ads, so their organic SEO strategy made a huge difference. My listing appears in the top 3 for my category. I also got clients from nearby suburbs, which was unexpected!"
    },
    {
      name: "Poonam Saglani",
      initial: "P",
      color: "#9C27B0",
      text: "I am glad to have approached SmartSuburbs.in (SS) for my Homoeopathy clinics local digital marketing covering directory listing at Baner Balewadi Biz Directory, Marketing Video creation used for my facebook ad, Google My Business & facebook page optimisation. This has helped my digital foot print and visibility nicely. Thank you SS team."
    },
    {
      name: "Anupamma Mishra",
      initial: "A",
      color: "#E91E63",
      text: "Mr parag and his team helped very well in establishing my Life Coaching and NLP Training services across the pune, they are very helping and genuine.."
    },
    {
      name: "Aryanshi Barua",
      initial: "A",
      color: "#00796B",
      text: "I was skeptical at first, but their ₹5000/year plan actually worked! I saw results in less than a month. My business is now getting noticed thanks to SmartSuburbs' local business SEO strategy."
    }
  ];

  const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
    <div className="card review-card" style={{ borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '24px', breakInside: 'avoid', transition: 'all 0.3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: review.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 600, flexShrink: 0 }}>
          {review.initial}
        </div>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>{review.name}</h3>
          <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#FFB800" color="#FFB800" />
            ))}
          </div>
        </div>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '20px' }}>
        "{review.text}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        { /* Placeholder for Google Review Icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>Google review</span>
      </div>
    </div>
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
              <Target size={16} /> Happy Clients
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '24px', letterSpacing: '-0.5px' }}>
              Our <span className="gradient-text">Happy Clients</span>
            </h1>
          </div>
        </section>

        {/* Reviews Section */}
        <section style={{ padding: '60px 0', backgroundColor: 'var(--bg-white)', borderBottom: '1px solid var(--border)' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="masonry-grid">
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
              <Link href="/case-studies" className="btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }}>
                Read Success Stories
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .masonry-grid {
          column-count: 3;
          column-gap: 24px;
        }

        .review-card { padding: 32px; }
        .card:hover { border-color: var(--primary) !important; transform: translateY(-4px); box-shadow: 0 10px 40px rgba(255,107,0,0.1); }
        
        @media (max-width: 1024px) {
          .masonry-grid { column-count: 2; }
        }
        
        @media (max-width: 640px) {
          .masonry-grid { column-count: 1; }
          .review-card { padding: 24px; }
        }
      `}</style>
    </>
  );
}
