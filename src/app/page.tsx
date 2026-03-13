import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
import StatsSection from '@/components/StatsSection';
import LocalVisibility from '@/components/LocalVisibility';
import WhySection from '@/components/WhySection';
import HowItWorks from '@/components/HowItWorks';
import ComparisonTable from '@/components/ComparisonTable';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <Navbar />
      <main>
        <HeroSlider />
        <StatsSection />
        <LocalVisibility />
        <WhySection />
        <HowItWorks />
        <ComparisonTable />
        <ServicesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
