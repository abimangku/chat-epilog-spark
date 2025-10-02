import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormInlineProps {
  reason?: string;
  onSuccess: () => void;
}

const ContactFormInline = ({ reason, onSuccess }: ContactFormInlineProps) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [message, setMessage] = useState(reason || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const serviceOptions = [
    "Social Media Marketing",
    "Content Creation",
    "Brand Strategy",
    "SEO & Analytics",
    "Creative Design",
  ];

  const handleServiceToggle = (service: string) => {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("submit-contact", {
        body: {
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          services,
          message: message.trim(),
        },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "We've received your message and will get back to you soon.",
      });

      // Reset form
      setName("");
      setCompany("");
      setEmail("");
      setServices([]);
      setMessage("");
      onSuccess();
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 glass rounded-2xl">
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">
          Let's get in touch! Fill in your details below:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          placeholder="Your Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="glass"
        />
        <Input
          placeholder="Your Email *"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="glass"
        />
      </div>

      <Input
        placeholder="Company (Optional)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="glass"
      />

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Services of Interest:</p>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => handleServiceToggle(service)}
              className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                services.includes(service)
                  ? "bg-foreground text-background"
                  : "glass hover:bg-background"
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      <Textarea
        placeholder="Your Message *"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="glass min-h-[100px]"
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-foreground hover:bg-foreground/90 text-background"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactFormInline;
