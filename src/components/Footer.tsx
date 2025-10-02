import { Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-border">
      <div className="container mx-auto">
        {/* CTA Section */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">
            Let's work together
          </h2>
          <p className="text-sm text-muted-foreground font-light mb-8">
            Ready to elevate your digital presence?
          </p>
        </div>

        {/* Footer Info */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-normal mb-3">Epilog Creative</h3>
            <p className="text-muted-foreground text-sm font-light leading-relaxed">
              A story & data driven digital agency based in Jakarta.
            </p>
          </div>

          <div>
            <h4 className="font-normal mb-4 text-sm">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-light">
              <li>Digital Marketing</li>
              <li>Video Production</li>
              <li>Corporate Training</li>
              <li>Digital Advertising</li>
            </ul>
          </div>

          <div>
            <h4 className="font-normal mb-4 text-sm">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground font-light">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground font-light">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>hello@epilogcreative.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-xs text-muted-foreground font-light">
          <p>© 2025 Epilog Creative</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
