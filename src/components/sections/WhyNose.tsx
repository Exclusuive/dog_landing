import { useLanguage } from "@/contexts/LanguageContext";

export default function WhyNose() {
  const { t } = useLanguage();
  
  return (
    <section
      id="why-nose"
      className="px-6 sm:px-8 py-10 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-orange-50/30 pt-16"
    >
      <div className="container mx-auto max-w-6xl">
        {/* 제목 */}
        <div className="text-center mb-6 sm:mb-8">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: "#111111" }}
          >
            {t("whyNose.title")}
          </h2>
        </div>
        {/* 이미지 */}
        <div className="text-center mb-8 sm:mb-12">
          <img
            src="nose2.png"
            alt={t("whyNose.title")}
            className="w-full max-w-md mx-auto rounded-lg"
          />
        </div>
        {/* 설명 */}
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#767676" }}
          >
            {t("whyNose.description")}
          </p>
        </div>
        {/* 포인트들 */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* 첫 번째 포인트 */}
          <div className="flex items-start gap-4 sm:gap-6">
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold flex-shrink-0"
              style={{ backgroundColor: "#FF6842" }}
            >
              1
            </div>
            <div className="flex-1">
              <h4
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: "#505050" }}
              >
                {t("whyNose.point1.title")}
              </h4>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "#767676" }}
              >
                {t("whyNose.point1.description")}
              </p>
            </div>
          </div>

          {/* 두 번째 포인트 */}
          <div className="flex items-start gap-4 sm:gap-6">
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold flex-shrink-0"
              style={{ backgroundColor: "#FF6842" }}
            >
              2
            </div>
            <div className="flex-1">
              <h4
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: "#505050" }}
              >
                {t("whyNose.point2.title")}
              </h4>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "#767676" }}
              >
                {t("whyNose.point2.description")}
              </p>
            </div>
          </div>

          {/* 세 번째 포인트 */}
          <div className="flex items-start gap-4 sm:gap-6">
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold flex-shrink-0"
              style={{ backgroundColor: "#FF6842" }}
            >
              3
            </div>
            <div className="flex-1">
              <h4
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: "#505050" }}
              >
                {t("whyNose.point3.title")}
              </h4>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "#767676" }}
              >
                {t("whyNose.point3.description")}
              </p>
            </div>
          </div>
        </div>
        {/* 하단 강조 메시지
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-lg sm:text-xl text-gray-700 font-semibold">
            <span className="text-orange-600">비문</span>은 강아지에게 이미 있는
            자연스러운 표시예요.
            <br className="block sm:hidden" />
            <span className="hidden sm:inline"> </span>
            칩이나 목걸이 없이도 더 안전하고 편하게 강아지를 등록할 수 있어요
          </p>
        </div> */}
      </div>
    </section>
  );
}
