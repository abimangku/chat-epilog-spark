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
    <section className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="bg-gradient-secondary bg-clip-text text-transparent">Industry Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From local startups to global brands, we've helped businesses of all sizes achieve their goals
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                {client.name}
              </h3>
              <p className="text-xs text-muted-foreground">{client.category}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            And <span className="font-semibold text-primary">many more</span> leading brands across Indonesia and beyond
          </p>
        </div>
      </div>
    </section>
  );
};

export default Clients;
