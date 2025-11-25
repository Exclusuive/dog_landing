import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SurveyModal from "./SurveyModal";
import { trackRegistrationButtonClick } from "@/utils/analytics";

interface UploadResultProps {
  imageUrl: string;
  onReset: () => void;
  onClose: () => void;
}

export default function UploadResult({
  imageUrl,
  onReset,
  onClose,
}: UploadResultProps) {
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [noseID, setNoseID] = useState<string>("");
  const [issueDate, setIssueDate] = useState<string>("");

  // 고유 Nose ID 생성 (localStorage에서 가져오거나 새로 생성)
  useEffect(() => {
    const storedID = localStorage.getItem("dogNoseID");
    const storedDate = localStorage.getItem("dogNoseIssueDate");

    if (storedID && storedDate) {
      setNoseID(storedID);
      setIssueDate(storedDate);
    } else {
      // 새 ID 생성
      const generateNoseID = () => {
        const chars = "0123456789ABCDEF";
        let id = "DOG-";
        for (let i = 0; i < 12; i++) {
          if (i > 0 && i % 4 === 0) id += "-";
          id += chars[Math.floor(Math.random() * chars.length)];
        }
        return id;
      };

      const newID = generateNoseID();
      const newDate = new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      setNoseID(newID);
      setIssueDate(newDate);
      localStorage.setItem("dogNoseID", newID);
      localStorage.setItem("dogNoseIssueDate", newDate);
    }
  }, []);

  const handleSurveyClick = () => {
    trackRegistrationButtonClick();
    setIsSurveyOpen(true);
  };

  const handleSurveyCloseAfterReset = () => {
    setIsSurveyOpen(false);
    onReset();
    onClose();
  };

  return (
    <div className="p-4 sm:p-6 w-full max-w-full overflow-y-auto h-full">
      {/* 주민등록증 형식 카드 */}
      <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden mb-6">
        {/* 제목 영역 */}
        <div className="bg-gray-50 border-b border-gray-300 px-4 sm:px-6 py-3">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center">
            반려견 Puddy ID 카드
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row">
          {/* 사진 영역 */}
          <div className="w-full sm:w-1/3 bg-gray-100 flex items-center justify-center p-4 sm:p-6 border-b sm:border-b-0 sm:border-r border-gray-300">
            {imageUrl ? (
              <div className="relative w-full aspect-square max-w-[200px] mx-auto">
                <img
                  src={imageUrl}
                  alt="반려견 코 사진"
                  className="w-full h-full object-cover rounded-lg border-2 border-gray-300 shadow-md"
                />
              </div>
            ) : (
              <div className="w-full aspect-square max-w-[200px] mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
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
              </div>
            )}
          </div>

          {/* 정보 영역 */}
          <div className="w-full sm:w-2/3 p-4 sm:p-6 flex flex-col justify-center">
            <div className="space-y-4">
              {/* Puddy ID */}
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Puddy ID
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-mono font-bold text-gray-900 break-all">
                  {noseID}
                </p>
              </div>

              {/* 구분선 */}
              <div className="border-t border-gray-300"></div>

              {/* 발급 정보 */}
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  발급일자
                </p>
                <p className="text-sm sm:text-base text-gray-900">
                  {issueDate}
                </p>
              </div>

              {/* 상태 */}
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  상태
                </p>
                <p className="text-sm sm:text-base text-gray-900">등록 완료</p>
              </div>

              {/* 안내 문구 */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 leading-relaxed">
                  이 Puddy ID는 반려견의 고유 식별번호입니다. 유실·보험·진료
                  기록 등과 연결하여 사용할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full">
        <Button
          onClick={handleSurveyClick}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 px-4 sm:px-6 py-3 text-sm sm:text-base"
        >
          정식 등록하기
        </Button>
      </div>

      <SurveyModal
        isOpen={isSurveyOpen}
        onClose={handleSurveyCloseAfterReset}
      />
    </div>
  );
}
