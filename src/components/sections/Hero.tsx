import { useState } from "react";
import { Button } from "@/components/ui/button";
import PhotoUploadModal from "@/components/PhotoUploadModal";
import { Camera } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const heroText = t<Record<string, any>>("hero");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="main" className="min-h-auto bg-orange-50 pt-16">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 items-center lg:px-16">
            <div className="relative w-full aspect-[3/2] overflow-hidden order-1 lg:order-2 bg-orange-50">
              <img
                src="image 144.png"
                alt={heroText.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full px-6 flex flex-col justify-center space-y-6 sm:space-y-8 order-2 lg:order-1  py-8 lg:py-20">
              <h1 className="text-3xl sm:text-4xl font-bold leading-[1.35] text-[#111111] font-semibold sm:leading-[1.35]">
                <span className="block md:whitespace-nowrap whitespace-normal">
                  {heroText.headlinePrefix}{" "}
                  <span className="text-[#FF6842] font-bold">
                    {heroText.headlineHighlight}
                  </span>
                  {heroText.headlineSuffix && (
                    <span className="text-[#111111]">
                      {" "}
                      {heroText.headlineSuffix}
                    </span>
                  )}
                </span>
                <span className="block">{heroText.headlineLine2}</span>
              </h1>

              <div className="sm:space-y-4 space-y-2 text-[#505050]">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-600 rounded-full mt-2.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-base sm:text-lg ">
                    {heroText.bullet1Prefix && (
                      <span>{heroText.bullet1Prefix} </span>
                    )}
                    <span className="font-semibold text-[#FF6842]">
                      {heroText.bullet1Highlight}
                    </span>
                    {heroText.bullet1Suffix && (
                      <span>{heroText.bullet1Suffix}</span>
                    )}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-600 rounded-full mt-2.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-base sm:text-lg ">
                    {heroText.bullet2Prefix && (
                      <span>{heroText.bullet2Prefix} </span>
                    )}
                    <span className="font-semibold text-[#FF6842]">
                      {heroText.bullet2Highlight}
                    </span>
                    {heroText.bullet2Suffix && (
                      <span>{heroText.bullet2Suffix}</span>
                    )}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-600 rounded-full mt-2.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-base sm:text-lg ">
                    {heroText.bullet3Prefix && (
                      <span>{heroText.bullet3Prefix} </span>
                    )}
                    <span className="font-semibold text-[#FF6842]">
                      {heroText.bullet3Highlight}
                    </span>
                    {heroText.bullet3Suffix && (
                      <span> {heroText.bullet3Suffix}</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="hidden md:block space-y-2 sm:space-y-3 pt-2 sm:pt-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-6 h-14 rounded-xl bg-orange-600 hover:bg-orange-600 text-white text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Camera className="w-10 h-10 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-[18px] tracking-[-0.4px]">
                    {heroText.cta}
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
