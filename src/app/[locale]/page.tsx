import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { StructuredData } from '@/components/shared/StructuredData';

// Availability state — toggle this to "booking" when needed
const AVAILABILITY_STATE: 'available' | 'booking' = 'available';

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main id="main-content">
        <HeroSection availability={AVAILABILITY_STATE} />
        <AboutSection availability={AVAILABILITY_STATE} />
        <TrustBar />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
