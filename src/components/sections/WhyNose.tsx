export default function WhyNose() {
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
            강아지 코에 숨겨진 신분증
          </h2>
        </div>
        {/* 이미지 */}
        <div className="text-center mb-8 sm:mb-12">
          <img
            src="nose.png"
            alt="강아지 코의 비문 패턴"
            className="w-full max-w-md mx-auto rounded-lg"
          />
        </div>
        {/* 설명 */}
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#767676" }}
          >
            강아지의 코를 자세히 보면, 작고 섬세한 주름이 보입니다.
            <br className="hidden sm:block" /> 이 주름을{" "}
            <strong>비문(鼻紋)</strong>이라고 해요.
            <br className="hidden sm:block" /> 사람에게 지문이 있다면,
            반려견에게는 바로 이 비문이 있습니다.
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
                세상에 하나뿐인 코 패턴
              </h4>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "#767676" }}
              >
                사람의 지문처럼 각 강아지마다 코 주름이 다르게 생겨서 코만 봐도
                누구의 강아지인지 바로 알 수 있어요.
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
                한 번 생기면 평생 그대로
              </h4>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "#767676" }}
              >
                비문은 강아지가 태어난 지 약 2개월 정도 되면 생기는데, 그
                이후로는 평생 모양이 변하지 않아요.
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
                사진 한 장이면 끝!
              </h4>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "#767676" }}
              >
                칩을 넣거나 목걸이를 달 필요 없이 강아지 코 사진만 찍으면 바로
                등록할 수 있어요.
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
