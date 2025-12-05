import { useState } from "react";
import { Button } from "@/components/ui/button";
import PhotoUploadModal from "@/components/PhotoUploadModal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TryItNow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <section
        id="try-it"
        className="py-16 sm:py-20 px-8 bg-orange-50/60 pt-16"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2
            className="text-2xl md:text-5xl font-bold mb-6"
            style={{ color: "#111111" }}
          >
            {t("tryItNow.title")}
          </h2>

          <div className="mb-10 sm:mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-100">
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: "rgba(255, 104, 66, 0.1)" }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "#FF6842" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: "#767676" }}
                  >
                    {t("tryItNow.step1")}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: "rgba(255, 104, 66, 0.1)" }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "#FF6842" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: "#767676" }}
                  >
                    {t("tryItNow.step2")}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: "rgba(255, 104, 66, 0.1)" }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "#FF6842" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p
                    className="text-sm sm:text-base leading-relaxed text-start"
                    style={{ color: "#767676" }}
                  >
                    {t("tryItNow.step3")}
                  </p>
                </div>
                {/* 데스크톱에서만 표시 */}
                <div className="hidden md:block space-y-2">
                  <Button
                    className="w-full text-white text-base px-6 py-3 h-auto font-semibold"
                    style={{ backgroundColor: "#FF6842" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#E55A32";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#FF6842";
                    }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    {t("tryItNow.button")}
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p
                  className="text-xs sm:text-sm text-center leading-relaxed"
                  style={{ color: "#767676" }}
                >
                  {t("tryItNow.disclaimer")}
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
