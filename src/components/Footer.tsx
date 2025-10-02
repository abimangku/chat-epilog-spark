import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Digital Presence?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how we can help you achieve your marketing goals
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group bg-gradient-primary hover:opacity-90 text-white border-0 px-8 py-6 text-lg font-semibold shadow-glow"
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Footer Info */}
        <div className="grid md:grid-cols-3 gap-8 pt-16 border-t border-border/30">
          <div>
            <h3 className="text-2xl font-bold mb-4">epilog.</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Story & Data Driven Digital Agency helping businesses grow through innovative marketing strategies.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Digital Marketing</li>
              <li>Video Production</li>
              <li>Corporate Training</li>
              <li>Digital Advertising</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>hello@epilogcreative.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Epilog Creative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
