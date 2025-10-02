import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import CredentialsDownload from "@/components/CredentialsDownload";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Services />
      <CredentialsDownload />
      <CaseStudies />
      <Footer />
    </div>
  );
};

export default Index;
