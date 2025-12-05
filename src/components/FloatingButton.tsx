import { useState } from "react";
import { Button } from "@/components/ui/button";
import PhotoUploadModal from "@/components/PhotoUploadModal";
import { trackPhotoUploadButtonClick } from "@/utils/analytics";
import { Camera } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FloatingButton() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    trackPhotoUploadButtonClick();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full md:hidden mx-auto">
        <Button
          size="lg"
          className="w-[calc(100%-40px)] mx-auto px-6 h-14 rounded-xl bg-orange-600 hover:bg-orange-600 text-white text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3"
          onClick={handleButtonClick}
        >
          <Camera className="w-10 h-10 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-[18px] tracking-[-0.4px]">
            {t("floatingButton.cta")}
          </span>
        </Button>
      </div>

      <PhotoUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
