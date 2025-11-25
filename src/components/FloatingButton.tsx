import { useState } from "react";
import { Button } from "@/components/ui/button";
import PhotoUploadModal from "@/components/PhotoUploadModal";

export default function FloatingButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* 모바일에서만 표시되는 플로팅 버튼 */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full md:hidden mx-auto">
        <Button
          size="lg"
          className="w-[calc(100%-40px)] mx-auto px-6 h-14 rounded-xl bg-orange-600 hover:bg-orange-600 text-white text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3"
          onClick={() => setIsModalOpen(true)}
        >
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="font-semibold text-[18px] tracking-[-0.4px]">
            코 사진 등록하기
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
