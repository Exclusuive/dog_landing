export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "촬영",
      subtitle: "강아지 코 사진 한 장",
      description:
        "휴대폰으로 강아지 코를 촬영하세요. 밝은 조명에서 정면을 향한 사진이 가장 좋습니다.",
      image: "/step1-camera.svg",
    },
    {
      number: "2",
      title: "AI 인식",
      subtitle: "비문 패턴 분석 및 ID 생성",
      description: "AI를 활용해 패턴을 분석 후 고유 ID를 생성합니다.",
      image: "/step2-ai.svg",
    },
    {
      number: "3",
      title: "안전한 저장",
      subtitle: "위·변조 불가능한 인증 기록",
      description:
        "반려견 정보를 블록체인에 안전하게 저장합니다. 병원, 보험사, 관련 기관에서 반려견 정보를 공유할 수 있습니다.",
      image: "/step3-secure.svg",
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-orange-50/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-8 sm:mb-12 text-center text-gray-900">
          사진 한 장으로 생성되는
          <br />
          <b>반려견 고유 Nose ID</b>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-3 sm:space-y-4"
            >
              {/* Step Number Badge */}
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold">
                  {step.number}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  {step.subtitle}
                </h3>
              </div>

              {/* Image */}
              <div className="w-full max-w-[180px] sm:max-w-[200px] aspect-square">
                <img
                  src={step.image}
                  alt={`${step.title} 단계`}
                  className="w-full h-full object-contain aspect-square"
                />
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed px-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
