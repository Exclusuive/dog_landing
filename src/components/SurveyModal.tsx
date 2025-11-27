import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { trackRegistrationComplete } from "@/utils/analytics";
import {
  sendRegistrationToMake,
  getStoredPhotoData,
  getStoredNoseID,
} from "@/utils/makeWebhook";

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SurveyModal({ isOpen, onClose }: SurveyModalProps) {
  const [dogName, setDogName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 반려견 정보 객체 생성
      const dogInfo = {
        name: dogName,
        breed,
        age,
        gender,
        phone,
      };

      // localStorage에 저장
      localStorage.setItem("dogInfo", JSON.stringify(dogInfo));

      // 저장된 사진 URL과 Puddy ID 가져오기
      const photoData = getStoredPhotoData();
      const noseID = getStoredNoseID();

      // Make.com 웹훅에 데이터 전송
      const makeSuccess = await sendRegistrationToMake({
        dogName,
        breed,
        age,
        gender,
        phone,
        noseID: noseID || undefined,
        photoUrl: photoData?.url,
        photoPath: photoData?.path,
        photoTimestamp: photoData?.timestamp,
      });

      // 정식 등록 완료 추적
      trackRegistrationComplete(dogInfo);

      if (makeSuccess) {
        alert("반려견 정보가 성공적으로 등록되었습니다!");
      } else {
        // 웹훅 실패해도 로컬 저장은 완료되었으므로 성공 메시지 표시
        alert("반려견 정보가 등록되었습니다!");
      }
    } catch (error) {
      console.error("등록 처리 중 오류:", error);
      alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
      handleClose();
    }
  };

  const handleClose = () => {
    setDogName("");
    setBreed("");
    setAge("");
    setGender("");
    setPhone("");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[90%] sm:w-3/4 max-w-lg p-0 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto">
          <DialogHeader className="mb-4">
            <DialogTitle
              className="text-xl sm:text-2xl font-bold mb-1"
              style={{ color: "#111111" }}
            >
              반려견 정보 등록
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 반려견 이름 */}
            <div>
              <label
                htmlFor="dogName"
                className="block text-xs sm:text-sm font-semibold mb-1.5"
                style={{ color: "#505050" }}
              >
                반려견 이름 <span className="text-red-500">*</span>
              </label>
              <input
                id="dogName"
                type="text"
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
                required
                placeholder="예: 뽀삐"
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                style={{ color: "#111111" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FF6842";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 2px rgba(255, 104, 66, 0.2)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              />
            </div>

            {/* 견종 */}
            <div>
              <label
                htmlFor="breed"
                className="block text-xs sm:text-sm font-semibold mb-1.5"
                style={{ color: "#505050" }}
              >
                견종 <span className="text-red-500">*</span>
              </label>
              <input
                id="breed"
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
                placeholder="예: 골든 리트리버"
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg focus:border-transparent outline-none transition-all text-sm sm:text-base"
                style={{ color: "#111111" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FF6842";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 2px rgba(255, 104, 66, 0.2)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              />
            </div>

            {/* 나이 */}
            <div>
              <label
                htmlFor="age"
                className="block text-xs sm:text-sm font-semibold mb-1.5"
                style={{ color: "#505050" }}
              >
                나이 <span className="text-red-500">*</span>
              </label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min="0"
                max="30"
                placeholder="예: 3"
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg focus:border-transparent outline-none transition-all text-sm sm:text-base"
                style={{ color: "#111111" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FF6842";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 2px rgba(255, 104, 66, 0.2)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              />
            </div>

            {/* 성별 */}
            <div>
              <label
                htmlFor="gender"
                className="block text-xs sm:text-sm font-semibold mb-1.5"
                style={{ color: "#505050" }}
              >
                성별 <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg focus:border-transparent outline-none transition-all text-sm sm:text-base bg-white"
                style={{ color: "#111111" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FF6842";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 2px rgba(255, 104, 66, 0.2)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <option value="">선택해주세요</option>
                <option value="male">수컷</option>
                <option value="female">암컷</option>
              </select>
            </div>

            {/* 전화번호 */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs sm:text-sm font-semibold mb-1.5"
                style={{ color: "#505050" }}
              >
                전화번호
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-1234-5678"
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg focus:border-transparent outline-none transition-all text-sm sm:text-base"
                style={{ color: "#111111" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FF6842";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 2px rgba(255, 104, 66, 0.2)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
              <Button
                type="submit"
                className="w-full sm:w-auto text-white px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm"
                style={{ backgroundColor: "#FF6842" }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = "#E55A32";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = "#FF6842";
                  }
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "등록 중..." : "등록하기"}
              </Button>
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm"
                style={{ color: "#111111" }}
                disabled={isSubmitting}
              >
                취소
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
