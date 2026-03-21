'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { Target, TrendingUp, Users, MousePointerClick, MessageCircle } from 'lucide-react';

export default function ContentMarketingPage() {
  const features = [
    {
      title: "Know How Content Marketing Works!",
      description: "Content Marketing is an essential part in building an effective marketing strategy. Rich content often attracts new and potential customers along with already existing ones. We use content effectively for local audiences to boost your posts and increase visibility.",
      icon: <Target size={24} />
    },
    {
      title: "Unleash your brand to attract potential customers",
      description: "Targeting the right set of audience not only helps in effective marketing of your products and services but also leads to higher lead generation. People who are genuinely interested in your products or services will willingly share the content related to your brand, thus eventually increasing brand reach.",
      icon: <TrendingUp size={24} />
    },
    {
      title: "Ultimate guide for managing multiple social media accounts",
      description: "Smart-suburbs offers a solution that helps businesses manage all their social media platforms from one account, saving the hassle of monitoring different posts from different accounts. The smart AI system also helps in suggesting efficient time slots for posting content based on a particular topic.",
      icon: <MousePointerClick size={24} />
    },
    {
      title: "Connecting with local audiences made easy",
      description: "Content curation service helps a business to connect effectively to its local audience and cater to their needs and requirements. This not only helps in building a strong customer base locally, but also helps in increasing customer satisfaction. It bridges the gap between your brand and local consumers.",
      icon: <Users size={24} />
    },
    {
      title: "Using Rich Content to influence customers",
      description: "A business is successful only if its products and services are successful in the market. Most businesses are not aware of the crucial role played by 'content' in grabbing the customer's attention. We ensure you use the right content, for the right people, at the right time.",
      icon: <MessageCircle size={24} />
    }
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
              Content Marketing
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '24px', letterSpacing: '-0.5px' }}>
              How to Attract New Leads Through <span className="gradient-text">Rich Content?</span>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 18px)', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.6, maxWidth: '750px', margin: '0 auto', marginBottom: '24px' }}>
              Content marketing is not a luxury, it's a necessity. Content plays a very vital role in aligning qualities like trust, authenticity, and uniqueness with your brand. 
            </p>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
              Smart-Suburbs offers an excellent service of content curation to all the small and local businesses in Pune and Mumbai. With the help of an expert team at Smart-suburbs, you can use the content effectively for local audiences to boost your posts and increase visibility. Rich Content Curation helps you to attract & engage more users on your website and social media platforms.
            </p>
          </div>
        </section>

        {/* Features Content Section */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-white)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {features.map((feature, index) => (
                <div key={index} className="card feature-row" style={{ padding: '32px', borderRadius: '24px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
                      {feature.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div style={{ marginTop: '60px', textAlign: 'center', padding: '60px', backgroundColor: 'var(--section-light)', borderRadius: '24px', border: '1px solid var(--border)' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>Ready to Start Now?</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 32px auto' }}>
                We provide the best Digital Marketing Services for Small and Local Businesses in Pune. Let us write your success story with rich content.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <a href="/contact_us" className="btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }}>
                  Contact Us
                </a>
                <a href="/marketing-packagedigital-marketing-packages-pune-mumbai" className="btn-secondary" style={{ padding: '14px 28px', fontSize: '16px', backgroundColor: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: '12px', textDecoration: 'none', fontWeight: 600 }}>
                  View Packages
                </a>
              </div>
            </div>

          </div>
        </section>

      </main>
      
      <Footer />

      <style>{`
        /* Responsive Overrides */
        @media (max-width: 768px) {
          .feature-row { flex-direction: column !important; align-items: flex-start !important; }
        }

        .btn-secondary:hover { background-color: var(--border) !important; }
      `}</style>
    </>
  );
}
