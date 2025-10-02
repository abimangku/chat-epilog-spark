import { Mail, MapPin, Instagram, Linkedin, Twitter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  company: z.string().min(1, "Company is required").max(100),
  services: z.string().min(1, "Please select at least one service"),
  message: z.string().min(1, "Message is required").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Footer = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form submitted:", data);
    toast({
      title: "Message sent!",
      description: "We'll get back to you soon.",
    });
    reset();
  };

  return (
    <footer id="contact" className="relative border-t border-border/50 bg-background">
      <div className="container mx-auto px-6 py-16 md:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Contact Form Section */}
          <div className="relative lg:col-span-2">
            <h2 className="mb-4 text-2xl md:text-3xl font-light tracking-tight">
              Be in Touch with Us
            </h2>
            <p className="mb-6 text-muted-foreground text-sm">
              Let's discuss how we can help grow your business.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-light">Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your name"
                    className="glass"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-light">Company</Label>
                  <Input
                    id="company"
                    {...register("company")}
                    placeholder="Your company"
                    className="glass"
                  />
                  {errors.company && (
                    <p className="text-xs text-destructive">{errors.company.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="services" className="text-sm font-light">Services of Interest</Label>
                <Input
                  id="services"
                  {...register("services")}
                  placeholder="e.g., Digital Marketing, Social Media"
                  className="glass"
                />
                {errors.services && (
                  <p className="text-xs text-destructive">{errors.services.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-light">Message</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Tell us about your project..."
                  className="glass min-h-[100px]"
                />
                {errors.message && (
                  <p className="text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-foreground hover:bg-foreground/90 text-background transition-all hover:scale-105"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
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
