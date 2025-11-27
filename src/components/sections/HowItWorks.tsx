export default function HowItWorks() {
  const features = [
    {
      title: "잃어버릴 걱정 없이",
      description:
        "비문 인식만으로 신원 확인 가능해 분실 시 신속하게 찾을 수 있어요. 칩이나 목걸이가 없어도 걱정 없어요.",
    },
    {
      title: "보험료 할인 혜택",
      description:
        "정확한 신원 인증으로 보험 청구 신뢰도가 높아져, 더 낮은 보험료를 적용받을 수 있어요.",
    },
    {
      title: "건강 기록 통합 관리",
      description:
        "예방접종부터 진료 이력까지 반려견의 건강 정보를 한곳에서 손쉽게 관리할 수 있어요.",
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
          등록하면 어떤 점이 좋나요?
        </h2>

        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 sm:gap-6">
              {/* Number Badge */}
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold flex-shrink-0"
                style={{ backgroundColor: "#FF6842" }}
              >
                {index + 1}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className="text-xl sm:text-2xl font-bold mb-2"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
