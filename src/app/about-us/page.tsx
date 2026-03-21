'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { Target, Eye, Store, Layout, MonitorPlay, Users, MousePointerClick, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AboutUsPage() {
  const services = [
    {
      title: "Hyperlocal Business Directory Platform",
      description: "Our comprehensive platform connects local businesses with their local buyers, creating a vibrant digital marketplace in every suburb.",
      icon: <Store size={24} />,
      link: "https://sspaidlisting.smartsuburbs.in/"
    },
    {
      title: "Social Media Optimisation",
      description: "Engage your community and build brand loyalty on platforms like Facebook, Instagram, and LinkedIn with targeted local strategies.",
      icon: <Users size={24} />,
      link: "/social-media-optimization/"
    },
    {
      title: "Website Development",
      description: "Spontaneous, highly conversion-oriented & user-friendly websites at affordable prices. We build sites that turn visitors into customers.",
      icon: <Layout size={24} />,
      link: "https://wpenabled.com/"
    },
    {
      title: "Video Marketing",
      description: "Tell your brand's story through compelling video content that grabs attention and drives engagement across all digital channels.",
      icon: <MonitorPlay size={24} />,
      link: "#"
    },
    {
      title: "Lead Generation",
      description: "Data-driven strategies designed to funnel high-quality local leads directly to your business, maximizing your return on investment.",
      icon: <TrendingUp size={24} />,
      link: "/lead-generation-services-agency-pune-mumbai/"
    },
    {
      title: "Google Ads / Meta Ads",
      description: "Dominate the first page of search results and social feeds with precisely managed, high-ROI paid advertising campaigns.",
      icon: <MousePointerClick size={24} />,
      link: "#"
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
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.5px' }}>
              About <span className="gradient-text">Smart Suburbs®</span>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 18px)', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.6, maxWidth: '700px', margin: '0 auto', marginBottom: '24px' }}>
              Hyperlocal Business Directories Network & Digital Marketing Agency tailored for local businesses in Pune & Mumbai.
            </p>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '800px', margin: '0 auto', marginBottom: '16px', textAlign: 'left' }}>
              Smart Suburbs® is a hyperlocal business directories network and digital marketing agency built in Pune for suburban local businesses. We run multiple suburb-wise directories across Pune and Mumbai that help small and mid-sized businesses get discovered in their own neighborhoods—on Google, social media, and AI-powered platforms.
            </p>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
              Our team studies your offline presence in suburbs like Baner, Wakad, Aundh, Hinjawadi, Pimple Saudagar, Kothrud, Hadapsar, Viman Nagar, Kalyani Nagar, Pune Peth, Bavdhan, Chinchwad and more. Then we design a local digital marketing strategy that pushes your business towards local digital dominance —not just generic city-level visibility.
            </p>
          </div>
        </section>

        {/* Truly Local / Mission & Vision Section */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-white)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                When we say "TRULY LOCAL", we mean it.
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
                Our team studies your offline presence in suburbs like Baner, Wakad, Aundh, Kothrud, and more. Then we design a digital marketing strategy that pushes your business towards local digital dominance.
              </p>
            </div>

            <div className="mission-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              
              {/* Mission Card */}
              <div className="card" style={{ padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Target size={28} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>Our Mission</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '16px' }}>
                  To bridge the Hyperlocal gap between local businesses and local buyers by providing a comprehensive hyperlocal directory platform. We engage and bond the local community with Local Events, Online Contests, Surveys, and more engagements. <strong>A Truly Local Connectivity Platform.</strong>
                </p>
              </div>

              {/* Vision Card */}
              <div className="card" style={{ padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Eye size={28} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>Our Vision</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '16px' }}>
                  To become India's most trusted hyperlocal connectivity platform, where every suburb has its own vibrant digital marketplace. We make it easy for people to find what they need right around the corner while helping businesses get the visibility they deserve.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Services Section */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--section-light)', borderTop: '1px solid var(--border)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Our Services
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
                Comprehensive digital solutions to build and scale your hyperlocal presence.
              </p>
            </div>

            <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {services.map((service, index) => (
                <Link href={service.link} key={index} style={{ textDecoration: 'none' }}>
                  <div className="card service-card" style={{ padding: '32px', borderRadius: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'all 0.3s ease', cursor: 'pointer' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }} className="service-icon-wrapper">
                      {service.icon}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{service.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                      {service.description}
                    </p>
                    <div style={{ marginTop: 'auto', paddingTop: '16px', color: 'var(--primary)', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }} className="service-link-text">
                      Learn more →
                    </div>
                  </div>
                </Link>
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
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
           .services-grid { grid-template-columns: 1fr !important; }
        }

        /* Interactive Card States */
        .service-card:hover { border-color: var(--primary) !important; transform: translateY(-4px); }
        .service-card:hover .service-icon-wrapper { background-color: var(--primary) !important; color: white !important; }
        .service-link-text { opacity: 0.8; transition: opacity 0.2s; }
        .service-card:hover .service-link-text { opacity: 1; }
      `}</style>
    </>
  );
}
