import { InfiniteSlider } from "@/components/ui/infinite-slider";

const clients = [
  { name: "BCA", category: "Banking" },
  { name: "Commonwealth Bank", category: "Banking" },
  { name: "BSI", category: "Banking" },
  { name: "OCBC NISP", category: "Banking" },
  { name: "Kalbe Nutritionals", category: "Healthcare" },
  { name: "ERHA", category: "Healthcare" },
  { name: "Angkasa Pura", category: "Aviation" },
  { name: "JNE", category: "Logistics" },
  { name: "Erajaya", category: "Retail" },
  { name: "Allianz", category: "Insurance" },
];

const Clients = () => {
  return (
    <section id="clients" className="py-20 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-3 tracking-tight">
            Our clients
          </h2>
          <p className="text-sm text-muted-foreground font-light max-w-2xl mx-auto">
            Partnering with 100+ brands across Indonesia, Southeast Asia, and Europe
          </p>
        </div>

        <InfiniteSlider gap={64} duration={45} durationOnHover={80} className="mb-12">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group inline-flex flex-col items-center px-8 py-6"
            >
              <h3 className="text-base font-light mb-1 text-foreground/40 group-hover:text-foreground/70 transition-colors whitespace-nowrap">
                {client.name}
              </h3>
              <p className="text-xs text-muted-foreground font-light whitespace-nowrap">{client.category}</p>
            </div>
          ))}
        </InfiniteSlider>

        <div className="text-center">
          <p className="text-sm text-muted-foreground font-light">
            And many more leading brands
          </p>
        </div>
      </div>
    </section>
  );
};

export default Clients;
