export default function WhyNose() {
  return (
    <section className="px-4 sm:px-8 py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-orange-50/30">
      <div className="container mx-auto max-w-6xl">
        {/* 메인 질문 */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            동물 등록, 잘 하고 계신가요?
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600 mb-6">
            이제 비문등록을 통해 진짜 등록 해보세요!
          </p>
        </div>

        {/* 메인 카드 */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-6xl sm:text-7xl mb-6">🐕</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                칩에 대한 두려움 없이 강아지를 등록하세요!
              </h3>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* 첫 번째 포인트 */}
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="text-3xl sm:text-4xl flex-shrink-0">🔍</div>
                <div className="flex-1">
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    혹시 잃어버리더라도 바로 찾을 수 있어요
                  </h4>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    코 사진만으로 빠르게 반려견을 찾을 수 있습니다.
                    <br />
                    분실 시 즉시 확인 가능한 안전한 등록 시스템입니다.
                  </p>
                </div>
              </div>

              {/* 두 번째 포인트 */}
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="text-3xl sm:text-4xl flex-shrink-0">✨</div>
                <div className="flex-1">
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    외장형처럼 번거롭게 가지고 다닐 필요 없이!
                  </h4>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    목걸이나 외장형 태그 없이도
                    <br />
                    스마트폰으로 언제 어디서나 확인할 수 있습니다.
                  </p>
                </div>
              </div>

              {/* 세 번째 포인트 */}
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="text-3xl sm:text-4xl flex-shrink-0">💚</div>
                <div className="flex-1">
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    칩 없이도 안전하게 등록
                  </h4>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    칩 삽입의 부담 없이 사진 한 장으로
                    <br />
                    강아지의 고유 ID를 생성하고 안전하게 보관합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 강조 메시지 */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-lg sm:text-xl text-gray-700 font-semibold">
            <span className="text-orange-600">비문등록</span>으로
            <br className="block sm:hidden" />
            <span className="hidden sm:inline"> </span>더 쉽고 안전하게 반려견을
            보호하세요
          </p>
        </div>
      </div>
    </section>
  );
}
