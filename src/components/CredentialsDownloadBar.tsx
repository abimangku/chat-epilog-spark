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
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Large Headline */}
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            Download Our Full Credential
          </h2>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            See our full portfolio with video samples, campaign performance & case studies
          </p>

          {/* Download Button with Jiggle */}
          <div className="flex justify-center pt-4">
            <MovingBorderButton
              onClick={handleDownload}
              duration={3000}
              borderRadius="1.75rem"
              containerClassName="w-auto"
              className="bg-black text-white px-8 py-4 text-base font-medium whitespace-nowrap"
            >
              <Download className="w-5 h-5 mr-2 inline" />
              Download Credential
            </MovingBorderButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialsDownloadBar;
