import ChatInterface from "./ChatInterface";
import { AnimatedTitle } from "./ui/animated-hero";
import { Sparkles } from "lucide-react";

const Hero = () => {
  const rotatingWords = ["story", "data", "strategy", "creativity", "impact"];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
          {/* Main Headline */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-light leading-tight tracking-tight">
              We are a
              <AnimatedTitle 
                titles={rotatingWords} 
                className="md:pb-4 md:pt-1"
              />
              driven digital agency.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Partnering with startups and global brands in Jakarta and beyond.
            </p>
          </div>

          {/* Chat Interface */}
          <div className="pt-8 space-y-6">
            <div className="text-center space-y-3 animate-fade-in">
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full shadow-sm">
                <Sparkles className="w-4 h-4 text-foreground" />
                <span className="text-sm font-medium text-foreground">AI Assistant</span>
              </div>
              <h2 className="text-xl md:text-2xl font-light text-foreground">
                Ask me anything
              </h2>
            </div>
            <ChatInterface />
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 text-center">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-8 font-light">Trusted by</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
              {["BCA", "BSI", "Kalbe", "JNE", "Allianz", "ERHA"].map((brand) => (
                <div key={brand} className="text-xl font-light tracking-wide text-foreground/60">
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
