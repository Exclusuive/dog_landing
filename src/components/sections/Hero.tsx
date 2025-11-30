import { useState } from "react";
import { Button } from "@/components/ui/button";
import PhotoUploadModal from "@/components/PhotoUploadModal";
import { Camera } from "lucide-react";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="main" className="min-h-auto bg-orange-50 pt-16">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 items-center lg:px-16">
            {/* Image Section - Mobile First (위에 표시) */}
            <div className="relative w-full aspect-[3/2] overflow-hidden order-1 lg:order-2 bg-orange-50">
              <img
                src="image 144.png"
                alt="강아지 이미지"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Content - Mobile First (아래에 표시) */}
            <div className="w-full px-6 flex flex-col justify-center space-y-6 sm:space-y-8 order-2 lg:order-1  py-8 lg:py-20">
              {/* Top Tag */}
              {/* <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full w-fit text-xs sm:text-sm font-medium">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Blockchain-Secured Pet Identity
              </div> */}
              {/* Headline */}
              <h1 className="text-2xl sm:text-4xl font-bold leading-[1.4] text-[#111111] font-semibold sm:leading-[1.4]">
                사진 한 장으로
                <span className="sm:text-5xl text-[#FF6842] text-3xl">
                  {" "}
                  더 커지는 혜택
                </span>
              </h1>
              {/* Key Points */}
              <div className="sm:space-y-4 space-y-2 text-[#505050]">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-600 rounded-full mt-2.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-base sm:text-lg ">
                    일부 부정 보험 청구 때문에 선량한 견주도 보험료 인상 및 청구
                    지연의 피해를 보고 있어요.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-600 rounded-full mt-2.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-base sm:text-lg ">
                    비문 인증은 ‘우리 아이’의 신원을 정확히 증명해 빠르고 공정한
                    보험 혜택을 받도록 도와줘요.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-600 rounded-full mt-2.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-base sm:text-lg ">
                    칩 없어도 코 사진만으로 간편하게 등록 가능!
                  </p>
                </div>
              </div>
              {/* Sub-headline
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Puddy는 <b>강아지 코 사진 한 장</b>만으로
                <br className="hidden sm:block" />
                바로 내 반려견만의 고유한 ID를 만들어줍니다.
                <br className="hidden sm:block" />
                <span className="">
                  <b> 강아지를 잃어버렸을 때</b>, <b>예방접종 확인서</b>,{" "}
                  <b>보험료 할인</b> 등 다양한 상황에서 Puddy를 활용할 수
                  있습니다.
                </span>
              </p> */}
              {/* CTA Button - 데스크톱에서만 표시 */}
              <div className="hidden md:block space-y-2 sm:space-y-3 pt-2 sm:pt-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-6 h-14 rounded-xl bg-orange-600 hover:bg-orange-600 text-white text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Camera className="w-10 h-10 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-[18px] tracking-[-0.4px]">
                    코 사진 등록하러 가기
                  </span>
                </Button>
              </div>
            </div>
          </div>
          <div className="h-20 bg-gradient-to-b from-orange-50 to-white"></div>
        </div>
      </section>

      <PhotoUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
