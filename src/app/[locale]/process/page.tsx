import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';

export default function ProcessPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <ProcessSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}