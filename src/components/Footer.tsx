import { Mail, MapPin, Instagram, Linkedin, Twitter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer id="contact" className="relative border-t border-border/50 bg-background">
      <div className="container mx-auto px-6 py-16 md:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter Section */}
          <div className="relative lg:col-span-2">
            <h2 className="mb-4 text-2xl md:text-3xl font-light tracking-tight">
              Stay Connected
            </h2>
            <p className="mb-6 text-muted-foreground text-sm">
              Get the latest insights on digital marketing, creative strategies, and industry trends.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="glass pr-12 h-12 rounded-full"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-10 w-10 rounded-full bg-foreground hover:bg-foreground/90 text-background transition-all hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-medium tracking-wide uppercase">Quick Links</h3>
            <nav className="space-y-3 text-sm">
              <a 
                href="#hero" 
                className="block text-muted-foreground transition-colors hover:text-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Home
              </a>
              <a 
                href="#services" 
                className="block text-muted-foreground transition-colors hover:text-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Services
              </a>
              <a 
                href="#clients" 
                className="block text-muted-foreground transition-colors hover:text-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#clients")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Clients
              </a>
              <a 
                href="#contact" 
                className="block text-muted-foreground transition-colors hover:text-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-medium tracking-wide uppercase">Contact</h3>
            <address className="space-y-3 text-sm not-italic text-muted-foreground">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Jakarta, Indonesia
              </p>
              <p className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                hello@epilogcreative.com
              </p>
            </address>
            
            {/* Social Links */}
            <div className="mt-6 flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="glass rounded-full h-9 w-9 border-border/50 hover:scale-105 transition-all"
                asChild
              >
                <a href="https://instagram.com/epilogcreative" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="glass rounded-full h-9 w-9 border-border/50 hover:scale-105 transition-all"
                asChild
              >
                <a href="https://linkedin.com/company/epilogcreative" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="glass rounded-full h-9 w-9 border-border/50 hover:scale-105 transition-all"
                asChild
              >
                <a href="https://twitter.com/epilogcreative" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 text-center md:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2025 Epilog Creative. All rights reserved.
          </p>
          <nav className="flex gap-6 text-xs">
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Terms of Service
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
