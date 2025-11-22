import { useState } from "react";
import { Button } from "@/components/ui/button";
import PhotoUploadModal from "@/components/PhotoUploadModal";

export default function TryItNow() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 sm:py-20 px-8 bg-orange-50/60">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            비문인식, 정말 잘 되나요?
          </h2>

          <div className="mb-10 sm:mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-100">
              <p className="text-base sm:text-lg text-gray-600 mb-6 text-center">
                지금 바로 체험해보세요!
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg
                      className="w-4 h-4 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    코 패턴을 인식해 이미 등록된 개체인지 확인합니다.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg
                      className="w-4 h-4 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    신규 등록이면 고유 ID를 발급합니다.
                  </p>
                </div>
                {/* 데스크톱에서만 표시 */}
                <div className="hidden md:block space-y-2">
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white text-base px-6 py-3 h-auto font-semibold"
                    onClick={() => setIsModalOpen(true)}
                  >
                    체험해보기
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-500 text-center leading-relaxed">
                  ※ 데모용으로 업로드된 사진은 연구/개발용으로만 사용되며,
                  <br className="hidden sm:block" />
                  식별 가능한 보호자 정보는 저장하지 않습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PhotoUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
