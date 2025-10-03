import { Download } from "lucide-react";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";

const CredentialsDownloadBar = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/EPILOG_Credentials_2025.pdf';
    link.download = 'EPILOG_Credentials_2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Prominent Headline */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Download Our Full Credential
            </h2>
          </div>

          {/* Glassmorphic Bar */}
          <div className="bg-background/80 backdrop-blur-lg border border-border rounded-full shadow-lg px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              <Download className="w-6 h-6 text-foreground/60 flex-shrink-0" />
              <p className="text-sm text-foreground/70 font-light text-center md:text-left">
                See our full portfolio with video samples, campaign performance & case studies
              </p>
            </div>
            
            <MovingBorderButton
              onClick={handleDownload}
              duration={3000}
              borderRadius="1.75rem"
              containerClassName="w-auto"
              className="bg-background/90 backdrop-blur-xl px-6 py-3 text-sm font-medium whitespace-nowrap"
            >
              <Download className="w-4 h-4 mr-2 inline" />
              Download Credential
            </MovingBorderButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialsDownloadBar;
