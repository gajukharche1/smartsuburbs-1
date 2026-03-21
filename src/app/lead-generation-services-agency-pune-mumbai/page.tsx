'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { Target, TrendingUp, CheckCircle, BarChart } from 'lucide-react';

export default function LeadGenerationPage() {
  return (
    <>
      <ThemeToggle />
      <Navbar />
      
      <main style={{ minHeight: '100vh', paddingTop: '72px', backgroundColor: 'var(--bg-white)', color: 'var(--text-primary)' }}>
        
        {/* Page Header */}
        <section style={{ backgroundColor: 'var(--section-light)', paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.5px' }}>
              Lead Generation Services In <span className="gradient-text">Pune & Mumbai</span>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 18px)', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.6, maxWidth: '700px', margin: '0 auto', marginBottom: '24px' }}>
              Are you worried about lead generation? Not even getting prospect leads? Don't worry, you have landed on the right place!
            </p>
          </div>
        </section>

        {/* What is Lead Generation Section */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-white)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                What is Lead Generation?
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
                Lead generation is a process that captures the interest of potential customers and converts them into real-time sales. Multiple digital channels can be used to generate leads for your business. Lead Generation is a crucial part of any company when it comes to the sales process. We are one of the best lead generation companies in Pune with outstanding deliverables.
              </p>
            </div>
            
            <div style={{ marginTop: '80px', textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Why your Business needs Lead generation?
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
                The answer is simple – Why should you wait for customers to come to you when you can go out and get them digitally? Our Lead generation service in Pune is here to help you out.
              </p>
            </div>

            <div className="mission-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '60px' }}>
              <div className="card" style={{ padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={28} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>The Fuel that Runs Business</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '16px' }}>
                  Lead generation is the fuel that keeps your business running. It is a powerful tool that helps you convert potential customers to loyal customers, which in return helps generate huge profits. Thus, the conversion rates & traffic of your business get higher.
                </p>
              </div>

              <div className="card" style={{ padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BarChart size={28} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>Consistent Growth Engine</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '16px' }}>
                  Generating leads through the traditional method can be expensive and resource-heavy. Being a business owner, you need to drive growth with a consistent and steady flow of business leads. With a decade of experience, we are the best lead generation company in Pune.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Why Choose Us Section */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--section-light)', borderTop: '1px solid var(--border)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Why choose us?
              </h2>
            </div>
            
            <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {[
                "We improve visibility of your brand",
                "We increase your conversion rate",
                "We deliver strategic and goal driven plans",
                "We have years of experience in lead generation"
              ].map((text, i) => (
                <div key={i} className="card service-card" style={{ padding: '24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '16px', transition: 'all 0.3s ease' }}>
                  <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle size={24} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                    {text}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      
      <Footer />

      <style>{`
        /* Responsive Overrides */
        @media (max-width: 900px) {
          .mission-grid { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
        }

        /* Interactive Card States */
        .service-card:hover { border-color: var(--primary) !important; transform: translateY(-4px); }
      `}</style>
    </>
  );
}
