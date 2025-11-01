import { Divider } from "@heroui/divider";

import { HeroSection } from "@/components/Landing/HeroSection";
import { AboutUsSection } from "@/components/Landing/AboutUsSection";
import { FrequentlyAskedQuestions } from "@/components/Landing/FrequentlyAskedQuestions";
import { ContactSection } from "@/components/Landing/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />

      <Divider className="max-w-6xl mx-auto" />

      <AboutUsSection />

      <Divider className="max-w-6xl mx-auto" />

      <ContactSection />

      <Divider className="max-w-6xl mx-auto" />
      <FrequentlyAskedQuestions />
    </div>
  );
}
