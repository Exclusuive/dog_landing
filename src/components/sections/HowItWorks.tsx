import { useLanguage } from "@/contexts/LanguageContext";

export default function HowItWorks() {
  const { t } = useLanguage();
  
  const features = [
    {
      title: t("howItWorks.feature1.title"),
      description: t("howItWorks.feature1.description"),
    },
    {
      title: t("howItWorks.feature2.title"),
      description: t("howItWorks.feature2.description"),
    },
    {
      title: t("howItWorks.feature3.title"),
      description: t("howItWorks.feature3.description"),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-10 sm:py-16 px-6 lg:px-8 bg-orange-50/30 pt-16"
    >
      <div className="container mx-auto max-w-6xl">
        <h2
          className="text-2xl sm:text-2xl lg:text-3xl font-bold mb-8 sm:mb-12 text-center"
          style={{ color: "#111111" }}
        >
          {t("howItWorks.title")}
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3
                className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4"
                style={{ color: "#505050" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "#767676" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
