import { Sparkles } from "lucide-react";
import ChatInterface from "./ChatInterface";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Story & Data Driven Digital Agency</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Transform Your Brand
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              With AI-Powered Strategy
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Jakarta's premier digital agency partnering with startups and global brands.
          </p>

          {/* Chat Interface */}
          <div className="pt-8">
            <ChatInterface />
          </div>

          {/* Trust Indicators */}
          <div className="pt-16">
            <p className="text-sm text-muted-foreground mb-6">Trusted by leading brands</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {["BCA", "BSI", "Kalbe", "JNE", "Allianz", "ERHA"].map((brand) => (
                <div key={brand} className="text-2xl font-bold tracking-wider">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
