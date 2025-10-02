import { FileText, Download } from "lucide-react";
import { Button } from "./ui/button";

const CredentialsDownload = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Icon/Visual */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <FileText className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Download Our Agency Credentials
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Get the complete overview of our services, case studies, and portfolio. 50+ pages featuring detailed insights into our work with 100+ brands, video samples, and metrics-driven results.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <a 
                    href="/EPILOG_Credentials_2025.pdf" 
                    download="EPILOG_Credentials_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      size="lg" 
                      className="group flex items-center gap-2"
                    >
                      <Download className="w-5 h-5 group-hover:animate-bounce" />
                      Download Full Credentials (PDF)
                    </Button>
                  </a>
                  <span className="text-sm text-muted-foreground">
                    PDF • 2.5 MB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialsDownload;
