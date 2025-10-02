import { useEffect, useState } from "react";
import { TrendingUp, Share2, Users } from "lucide-react";
import CountUp from "react-countup";

/** Hook: respects user's motion preferences */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/** Utility: parse a metric like "98%", "3.8x", "$1,200+", "1.5M", "€23.4k" */
function parseMetricValue(raw: string) {
  const value = (raw ?? "").toString().trim();
  const m = value.match(
    /^([^\d\-+]*?)\s*([\-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*([^\d\s]*)$/
  );
  if (!m) {
    return { prefix: "", end: 0, suffix: value, decimals: 0 };
  }
  const [, prefix, num, suffix] = m;
  const normalized = num.replace(/,/g, "");
  const end = parseFloat(normalized);
  const decimals = (normalized.split(".")[1]?.length ?? 0);
  return {
    prefix: prefix ?? "",
    end: isNaN(end) ? 0 : end,
    suffix: suffix ?? "",
    decimals,
  };
}

/** Small component: one animated metric */
function MetricStat({
  value,
  label,
  sub,
  duration = 1.6,
}: {
  value: string;
  label: string;
  sub?: string;
  duration?: number;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const { prefix, end, suffix, decimals } = parseMetricValue(value);

  return (
    <div className="flex flex-col gap-2 text-left p-6">
      <p
        className="text-2xl font-light text-foreground sm:text-4xl"
        aria-label={`${label} ${value}`}
      >
        {prefix}
        {reduceMotion ? (
          <span>
            {end.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })}
          </span>
        ) : (
          <CountUp
            end={end}
            decimals={decimals}
            duration={duration}
            separator=","
            enableScrollSpy
            scrollSpyOnce
          />
        )}
        {suffix}
      </p>
      <p className="font-normal text-foreground text-left">
        {label}
      </p>
      {sub ? (
        <p className="text-muted-foreground text-sm text-left font-light">{sub}</p>
      ) : null}
    </div>
  );
}

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      title: "Digital Marketing Transformation",
      quote:
        "Our partnership transformed our digital presence. Strategic campaigns delivered measurable ROI and positioned us as an industry leader in Jakarta's competitive market.",
      name: "Sarah Chen",
      role: "Marketing Director, BCA",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      icon: TrendingUp,
      metrics: [
        { value: "250%", label: "ROI Increase", sub: "First 6 months" },
        { value: "3.5x", label: "Lead Generation", sub: "Year over year" },
      ],
    },
    {
      id: 2,
      title: "Social Media Excellence",
      quote:
        "The team's creative approach to social media helped us connect authentically with our audience. Engagement rates soared and our brand voice finally resonated.",
      name: "Michael Tan",
      role: "Brand Manager, Kalbe",
      image:
        "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop",
      icon: Share2,
      metrics: [
        { value: "180%", label: "Engagement Growth", sub: "Across all platforms" },
        { value: "2.8M", label: "Reach Expansion", sub: "Monthly impressions" },
      ],
    },
    {
      id: 3,
      title: "KOL Marketing Success",
      quote:
        "Strategic influencer partnerships delivered authentic connections with our target audience. Campaign results exceeded expectations and drove significant conversions.",
      name: "Lisa Wong",
      role: "Digital Lead, ERHA",
      image:
        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop",
      icon: Users,
      metrics: [
        { value: "4.2x", label: "Conversion Rate", sub: "Campaign average" },
        { value: "95%", label: "Brand Sentiment", sub: "Positive reception" },
      ],
    },
  ];

  return (
    <section
      id="case-studies"
      className="py-20 px-6 border-t border-border"
      aria-labelledby="case-studies-heading"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            id="case-studies-heading"
            className="text-3xl md:text-4xl font-light mb-3 tracking-tight"
          >
            Case Studies
          </h2>
          <p className="text-sm text-muted-foreground font-light max-w-2xl mx-auto">
            Real results from partnerships with leading brands
          </p>
        </div>

        {/* Cases */}
        <div className="flex flex-col gap-20">
          {caseStudies.map((study, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div
                key={study.id}
                className="grid gap-12 lg:grid-cols-3 xl:gap-24 items-center border-b border-border pb-12 last:border-b-0"
              >
                {/* Left: Image + Quote */}
                <div
                  className={[
                    "flex flex-col sm:flex-row gap-10 lg:col-span-2 lg:border-r lg:pr-12 xl:pr-16 text-left",
                    reversed
                      ? "lg:order-2 lg:border-r-0 lg:border-l border-border lg:pl-12 xl:pl-16 lg:pr-0"
                      : "border-border",
                  ].join(" ")}
                >
                  <img
                    src={study.image}
                    alt={`${study.name} case study`}
                    className="aspect-[4/3] h-auto w-full max-w-xs rounded-lg object-cover ring-1 ring-border hover:scale-[1.02] transition-all duration-300"
                    loading="lazy"
                  />
                  <figure className="flex flex-col justify-between gap-8 text-left">
                    <blockquote className="text-base sm:text-lg text-foreground leading-relaxed text-left">
                      <h3 className="text-lg sm:text-xl font-normal text-foreground leading-relaxed text-left mb-4">
                        {study.title}
                      </h3>
                      <span className="block text-muted-foreground text-sm sm:text-base font-light">
                        "{study.quote}"
                      </span>
                    </blockquote>
                    <figcaption className="flex items-center gap-6 mt-4 text-left">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-normal text-foreground">
                          {study.name}
                        </span>
                        <span className="text-xs text-muted-foreground font-light">
                          {study.role}
                        </span>
                      </div>
                    </figcaption>
                  </figure>
                </div>

                {/* Right: Metrics */}
                <div
                  className={[
                    "grid grid-cols-1 gap-10 self-center text-left",
                    reversed ? "lg:order-1" : "",
                  ].join(" ")}
                >
                  {study.metrics.map((metric, i) => (
                    <MetricStat
                      key={`${study.id}-${i}`}
                      value={metric.value}
                      label={metric.label}
                      sub={metric.sub}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
