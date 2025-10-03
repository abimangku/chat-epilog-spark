import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CredentialsDownloadBar from "@/components/CredentialsDownloadBar";
import CaseStudies from "@/components/CaseStudies";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import FloatingChatWidget from "@/components/FloatingChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Services />
      <CredentialsDownloadBar />
      <CaseStudies />
      <Footer />
      <FloatingChatWidget />
    </div>
  );
};

export default Index;
