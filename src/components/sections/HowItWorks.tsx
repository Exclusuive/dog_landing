import { useLanguage } from "@/context/LanguageContext";

export default function HowItWorks() {
  const { t } = useLanguage();
  const content = t<Record<string, any>>("howItWorks");
  const features = content.features as Array<{ title: string; description: string, image: string }>;

  return (
    <section
      id="how-it-works"
      className="py-10 sm:py-16 px-6 lg:px-8 bg-orange-50/30 pt-16"
    >
      <div className="container mx-auto max-w-6xl">
        <h2
          className="text-2xl sm:text-2xl lg:text-3xl font-bold mb-8 sm:mb-12 text-center"
          style={{ color: "#505050" }}
        >
          {content.title}
        </h2>
        <p className="text-base sm:text-lg text-[#111111] font-medium mb-12 text-center max-w-3xl mx-auto leading-relaxed break-keep">
          {content.subtitle}
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img className="w-full border rounded-2xl mb-6" src={feature.image} alt="" />
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
