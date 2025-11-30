export default function HowItWorks() {
  const features = [
    {
      title: "비싼 보험료는 이제 그만",
      description:
        "비문 기반 신원 인증은 부정 청구를 줄여 선량한 견주들에게 유리한 보험 환경을 만들어요.",
    },
    {
      title: "간편한 보험 청구",
      description:
        "정확한 신원 인증으로 보험사와 분쟁 없이 바로 정산되는 경험을 하게 돼요.",
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
