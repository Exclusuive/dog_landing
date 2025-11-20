import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SurveyModal from "./SurveyModal";

interface UploadResultProps {
  resultType: "new" | "matched" | "error";
  onReset: () => void;
  onClose: () => void;
}

export default function UploadResult({
  resultType,
  onReset,
  onClose,
}: UploadResultProps) {
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);

  // 데모용 랜덤 Nose ID 생성
  const generateNoseID = () => {
    const chars = "0123456789ABCDEF";
    let id = "DOG-";
    for (let i = 0; i < 12; i++) {
      if (i > 0 && i % 4 === 0) id += "-";
      id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
  };

  const noseID = generateNoseID();
  const similarity = Math.floor(Math.random() * 30 + 70); // 70-100%

  const handleSurveyClick = () => {
    setIsSurveyOpen(true);
  };

  const handleResetWithSurvey = () => {
    setIsSurveyOpen(true);
  };

  const handleSurveyCloseAfterReset = () => {
    setIsSurveyOpen(false);
    onReset(); // 설문조사 모달이 닫힌 후 리셋
    onClose(); // 원래 모달도 닫기
  };

  const handleSurveyClose = () => {
    setIsSurveyOpen(false);
    onClose(); // 원래 모달도 닫기
  };

  if (resultType === "new") {
    return (
      <div className="p-4 sm:p-6 w-full max-w-full overflow-hidden">
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🎉</div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-2 break-words">
            새로운 Nose ID가 감지되었습니다
          </h3>
        </div>

        <Card className="mb-6 w-full">
          <CardContent className="p-4 sm:p-6">
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-3 sm:mb-4 leading-relaxed break-words">
              이 반려견의 비문 패턴은 현재 데모 데이터베이스에 없는 새로운
              패턴입니다.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed break-words">
              아래는 이 반려견을 구분하기 위한 예시 Nose ID 정보입니다.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 leading-relaxed break-words">
              정식 서비스에서는 이 ID를 기준으로 유실·보험·진료 기록 등과 연결할
              수 있습니다.
            </p>

            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mt-4 sm:mt-6 w-full overflow-hidden">
              <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">
                Nose ID 해시(예시):
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-mono font-bold text-gray-900 break-all">
                {noseID}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full">
          <Button
            onClick={handleResetWithSurvey}
            variant="outline"
            className="w-full sm:w-auto px-4 sm:px-6 py-3 text-sm sm:text-base"
          >
            다른 사진으로 다시 테스트하기
          </Button>
          <Button
            onClick={handleSurveyClick}
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 px-4 sm:px-6 py-3 text-sm sm:text-base"
          >
            문의하기 / 파트너십 제안하기
          </Button>
        </div>

        <SurveyModal
          isOpen={isSurveyOpen}
          onClose={handleSurveyCloseAfterReset}
        />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 w-full max-w-full overflow-hidden">
      <div className="text-center mb-6 sm:mb-8">
        <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-2 break-words">
          이미 등록된 Nose ID와 유사한 패턴입니다
        </h3>
      </div>

      <Card className="mb-6 w-full">
        <CardContent className="p-4 sm:p-6">
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-3 sm:mb-4 leading-relaxed break-words">
            업로드된 사진의 비문 패턴이 기존에 저장된 반려견과 높은 유사도를
            보입니다.
          </p>

          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg my-4 sm:my-6 w-full overflow-hidden">
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">
              유사도 점수:
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">
              {similarity}%
            </p>
          </div>

          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4 w-full overflow-hidden">
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">
              매칭된 Nose ID 예시:
            </p>
            <p className="text-base sm:text-lg md:text-xl font-mono font-bold text-gray-900 break-all">
              {noseID}
            </p>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-3 sm:mb-4 leading-relaxed break-words">
            데모 버전에서는 대략적인 유사도 점수(%)와 Nose ID 예시만 확인할 수
            있습니다.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed break-words">
            정식 서비스에서는 소유자 정보와의 연결, 보호자 연락, 유실견 신고
            처리 등이 이 Nose ID를 기준으로 이루어집니다.
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full">
        <Button
          onClick={handleResetWithSurvey}
          variant="outline"
          className="w-full sm:w-auto px-4 sm:px-6 py-3 text-sm sm:text-base"
        >
          다른 사진으로 다시 테스트하기
        </Button>
        <Button
          onClick={handleSurveyClick}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 px-4 sm:px-6 py-3 text-sm sm:text-base"
        >
          문의하기 / 파트너십 제안하기
        </Button>
      </div>

      <SurveyModal isOpen={isSurveyOpen} onClose={handleSurveyClose} />
    </div>
  );
}
