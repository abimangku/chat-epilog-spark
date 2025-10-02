import { TrendingUp, UserPlus, GraduationCap } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Data-driven strategies that deliver measurable results and sustainable growth.",
  },
  {
    icon: UserPlus,
    title: "Social Media KOL Marketing",
    description: "Connect with your audience through strategic influencer partnerships and authentic storytelling.",
  },
  {
    icon: GraduationCap,
    title: "Corporate Training",
    description: "Elevate your team's digital marketing capabilities with expert-led training programs.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-3 tracking-tight">
            What we do
          </h2>
          <p className="text-sm text-muted-foreground font-light max-w-2xl mx-auto">
            Comprehensive digital solutions that drive growth
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
