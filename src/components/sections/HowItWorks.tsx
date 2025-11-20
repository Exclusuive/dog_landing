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
      description:
        "AI 알고리즘이 비문 패턴을 분석해 256차원 특징 벡터로 변환합니다. 기존에 등록된 반려견과 매칭하거나, 새로운 고유 Nose ID를 생성합니다.",
      image: "/step2-ai.svg",
    },
    {
      number: "3",
      title: "안전한 저장",
      subtitle: "위·변조 불가능한 인증 기록",
      description:
        "Nose ID와 최소한의 메타데이터만 암호화/해시 처리하여 안전하게 저장합니다. 병원, 보험사, 관련 기관에서 Nose ID만으로 개체 인증 및 정보 공유가 가능합니다.",
      image: "/step3-secure.svg",
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-xl  font-bold mb-8 sm:mb-12 text-center text-gray-900">
          사진 한 장으로 생성되는 <br />
          <span className="text-2xl font-bold">반려견 고유 Nose ID</span>
        </h2>

        <div className="space-y-12 sm:space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4 sm:space-y-6"
            >
              {/* Step Number Badge */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg sm:text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  {step.subtitle}
                </h3>
              </div>

              {/* Image */}
              <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] aspect-square">
                <img
                  src={step.image}
                  alt={`${step.title} 단계`}
                  className="w-full h-full object-contain aspect-square"
                />
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
