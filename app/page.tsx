import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VisitTracker } from "@/components/VisitTracker";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhatIDoSection } from "@/components/sections/WhatIDoSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { StackSection } from "@/components/sections/StackSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Page() {
  return (
    <>
      <VisitTracker />
      <Header />
      <main>
        <HeroSection />
        <WhatIDoSection />
        <StatsSection />
        <StackSection />
        <ExperienceSection />
        <ValuesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
