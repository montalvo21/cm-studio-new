import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhySection } from '@/components/sections/WhySection';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';

export default function WhyCMStudioPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <WhySection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}