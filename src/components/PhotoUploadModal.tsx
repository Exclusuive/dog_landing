import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UploadResult from "./UploadResult";

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";
type ResultType = "new" | "matched" | "error";

export default function PhotoUploadModal({
  isOpen,
  onClose,
}: PhotoUploadModalProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [resultType, setResultType] = useState<ResultType>("new");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 형식 검증
    if (!file.type.match(/^image\/(jpeg|jpg|png)$/i)) {
      setStatus("error");
      setResultType("error");
      setErrorMessage("JPG, PNG 형식의 이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    setStatus("uploading");

    // 실제 API 호출 대신 시뮬레이션
    try {
      // 3-5초 시뮬레이션
      await new Promise((resolve) =>
        setTimeout(resolve, 3000 + Math.random() * 2000)
      );

      // 랜덤하게 결과 타입 결정 (데모용)
      // 10% 확률로 코 인식 실패 시뮬레이션
      const randomResult = Math.random();
      if (randomResult < 0.1) {
        setStatus("error");
        setResultType("error");
        setErrorMessage(
          "코 영역이 정확히 보이지 않아 인식에 실패했어요. 조금 더 가까이, 얼굴 정면이 나오도록 촬영해 다시 시도해주세요."
        );
      } else if (randomResult < 0.4) {
        setResultType("matched");
        setStatus("success");
      } else {
        setResultType("new");
        setStatus("success");
      }
    } catch (error) {
      setStatus("error");
      setResultType("error");
      setErrorMessage(
        "잠시 인식 서버에 문제가 발생했어요. 몇 분 뒤 다시 시도해주시겠어요?"
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setResultType("new");
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[90%] sm:w-3/4 max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {status === "idle" && (
          <div className="p-6 sm:p-8">
            <DialogHeader className="mb-6">
              <DialogDescription>
                <p className="text-lg sm:text-xl text-center font-bold text-black">
                  반려견의 코 사진을 업로드해주세요
                </p>
              </DialogDescription>
            </DialogHeader>

            {/* Example Image */}
            <div className=" rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
              <img
                src="/hero-dog.jpg"
                alt="강아지 코 사진 예시"
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed text-center mt-2 mb-4">
              밝은 조명에서 정면을 향한 사진이 가장 좋습니다.
            </p>

            {/* Upload Button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileSelect}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload">
                <Button
                  asChild
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm sm:text-base py-4 h-auto font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    사진 선택하기
                  </span>
                </Button>
              </label>
            </div>
          </div>
        )}

        {status === "uploading" && (
          <div className="py-16 sm:py-20 text-center px-6">
            <div className="relative inline-block mb-6">
              <div className="text-6xl sm:text-7xl mb-4 animate-bounce">🐶</div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 rounded-full animate-ping"></div>
            </div>
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              반려견의 비문을 분석하고 있어요…
            </p>
            <p className="text-sm sm:text-base text-gray-500">
              약 3~5초 소요됩니다
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {status === "success" && (
          <UploadResult
            resultType={resultType}
            onReset={handleReset}
            onClose={handleClose}
          />
        )}

        {status === "error" && resultType === "error" && (
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                인식 실패
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-md mx-auto">
                {errorMessage}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full sm:w-auto px-6 py-3"
              >
                다시 시도하기
              </Button>
              <Button
                onClick={handleClose}
                className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-6 py-3"
              >
                닫기
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
