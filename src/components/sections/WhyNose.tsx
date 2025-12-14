import { useLanguage } from "@/context/LanguageContext";

export default function WhyNose() {
  const { t } = useLanguage();
  const content = t<Record<string, any>>("whyNose");
  const points = content.points as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section
      id="why-nose"
      className="px-6 sm:px-8 py-10 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-orange-50/30 pt-16"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-6 sm:mb-8">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: "#111111" }}
          >
            {content.title}
          </h2>
        </div>

        <div className="text-center mb-12 sm:mb-16">
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#767676" }}
          >
            {content.descriptionLine1}
            <br className="hidden sm:block" /> {content.descriptionLine2Prefix}
            <strong>{content.descriptionLine2Strong}</strong>
            <br className="hidden sm:block" /> {content.descriptionLine3}
            <br className="hidden sm:block" /> {content.descriptionLine4}
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {points.map((point, index) => (
            <div key={point.title} className="flex items-start gap-4 sm:gap-6">
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold flex-shrink-0"
                style={{ backgroundColor: "#FF6842" }}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <h4
                  className="text-xl sm:text-2xl font-bold mb-2"
                  style={{ color: "#505050" }}
                >
                  {point.title}
                </h4>
                <p
                  className="text-base sm:text-lg leading-relaxed"
                  style={{ color: "#767676" }}
                >
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
