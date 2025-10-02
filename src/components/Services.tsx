import { Megaphone, Video, TrendingUp, Users } from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Data-driven strategies with measurable ROI.",
  },
  {
    icon: Video,
    title: "Video Production",
    description: "Professional content that captures attention.",
  },
  {
    icon: TrendingUp,
    title: "Digital Advertising",
    description: "Performance-optimized paid campaigns.",
  },
  {
    icon: Users,
    title: "Corporate Training",
    description: "Elevate your team's marketing skills.",
  },
];

const Services = () => {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-3 tracking-tight">
            What we do
          </h2>
          <p className="text-sm text-muted-foreground font-light max-w-2xl mx-auto">
            Comprehensive digital solutions that drive growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group text-center"
            >
              <service.icon className="w-8 h-8 mb-4 mx-auto text-foreground/60" />
              <h3 className="text-lg font-normal mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
