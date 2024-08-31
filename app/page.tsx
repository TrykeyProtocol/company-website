import AboutUsSection from "@/library/components/organisms/about-us";
import Footer from "@/library/components/organisms/footer";
import HowItWorksSection from "@/library/components/organisms/how-it-works";
import LandingSection from "@/library/components/organisms/landing-hero";
import Navbar from "@/library/components/organisms/navbar";
import NewsLetterSection from "@/library/components/organisms/news-letter";
import UniquePropositionSection from "@/library/components/organisms/unique-proposition";
import UseCasesSection from "@/library/components/organisms/use-case";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="pt-16 lg:pt-20"> 
        <LandingSection />
        <UseCasesSection />
        <div id="features">
          <UniquePropositionSection />
        </div>
        <div id="about-us">
          <AboutUsSection />
        </div>
        <HowItWorksSection />
        <NewsLetterSection />
        <Footer />
      </div>
    </div>
  );
}