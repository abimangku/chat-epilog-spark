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
    <section className="py-20 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-3 tracking-tight">
            Our clients
          </h2>
          <p className="text-sm text-muted-foreground font-light max-w-2xl mx-auto">
            Partnering with 100+ brands across Indonesia and Southeast Asia
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group text-center py-6"
            >
              <h3 className="text-base font-light mb-1 text-foreground/40 group-hover:text-foreground/70 transition-colors">
                {client.name}
              </h3>
              <p className="text-xs text-muted-foreground font-light">{client.category}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground font-light">
            And many more leading brands
          </p>
        </div>
      </div>
    </section>
  );
};

export default Clients;
