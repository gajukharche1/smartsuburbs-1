'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { MonitorPlay, MousePointerClick, Layout, Mail, Megaphone, Video } from 'lucide-react';

export default function DigitalMarketingPackagesPage() {
  const packages = [
    {
      title: "Organic Facebook Marketing",
      description: "Boost your organic reach with engaging posts, community building, and strategic content planning on Facebook without spending on ads.",
      icon: <Megaphone size={24} />,
      link: "#"
    },
    {
      title: "Video Marketing",
      description: "Connect with your audience through compelling video content. From script to screen, we handle your entire video marketing strategy.",
      icon: <Video size={24} />,
      link: "https://Marketingvideos.smartsuburbs.in"
    },
    {
      title: "Google Ad Marketing",
      description: "Drive high-intent traffic to your website with targeted Google Ads campaigns that secure first-page visibility and maximize ROI.",
      icon: <MousePointerClick size={24} />,
      link: "/google-ad-packages"
    },
    {
      title: "Facebook Ad Marketing",
      description: "Reach your ideal customers with precision-targeted Facebook and Instagram ad campaigns designed for conversion and growth.",
      icon: <MonitorPlay size={24} />,
      link: "/facebook-ads-management-packages"
    },
    {
      title: "Website Development",
      description: "Get a fast, responsive, and conversion-optimized website that acts as your 24/7 digital salesperson and brand ambassador.",
      icon: <Layout size={24} />,
      link: "/website-packages-in-pune"
    },
    {
      title: "Email Marketing",
      description: "Nurture leads and retain customers with personalized, automated email campaigns that deliver the right message at the right time.",
      icon: <Mail size={24} />,
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
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '24px', letterSpacing: '-0.5px' }}>
              Digital <span className="gradient-text">Marketing Packages</span>
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '800px', margin: '0 auto', marginBottom: '16px', textAlign: 'left' }}>
              In today's fast-paced digital world, businesses are always looking for new ways to connect with their audience and stay ahead of the competition. One of the most effective ways to do this is by using our digital marketing packages. These packages offer a range of flexible and all-in-one solutions designed to meet the unique needs of modern businesses. From web development and email marketing to Facebook Ads, Google Ads, video marketing, and organic social media strategies, these packages bring together everything you need to thrive in the digital space.
            </p>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '800px', margin: '0 auto', marginBottom: '16px', textAlign: 'left' }}>
              What makes digital marketing packages so valuable is how they simplify the process. They bring all the tools and techniques your business needs under one roof, ensuring that everything works together seamlessly. This not only saves time and effort but also helps build a strong, consistent brand presence across multiple platforms. Whether your goal is to drive more traffic to your website, boost engagement on social media, or generate leads through targeted ads, these packages provide the right mix of services and expertise to get the job done.
            </p>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '800px', margin: '0 auto', marginBottom: '16px', textAlign: 'left' }}>
              But digital marketing packages are about more than just convenience—they're about getting real, measurable results. With a well-thought-out strategy, you can track your performance across platforms and fine-tune your efforts to maximize your return on investment (ROI).
            </p>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
              In today's competitive digital marketplace, relying on a single marketing tactic simply isn't enough. To stand out and make a lasting impact, businesses need a comprehensive approach that covers all bases. Digital marketing packages give you the tools and strategies to adapt to ever-changing trends, connect with your audience, and build a thriving online presence.
            </p>
          </div>
        </section>

        {/* Packages Grid Section */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-white)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Explore Our Packages
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
                Whether you're just starting out or looking to scale up, these packages can open up new opportunities and take your brand to the next level.
              </p>
            </div>

            <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {packages.map((pkg, index) => (
                <Link href={pkg.link} key={index} style={{ textDecoration: 'none' }}>
                  <div className="card service-card" style={{ padding: '32px', borderRadius: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'all 0.3s ease', cursor: 'pointer' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255, 107, 0, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }} className="service-icon-wrapper">
                      {pkg.icon}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{pkg.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                      {pkg.description}
                    </p>
                    <div style={{ marginTop: 'auto', paddingTop: '16px', color: 'var(--primary)', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }} className="service-link-text">
                      Know More →
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
