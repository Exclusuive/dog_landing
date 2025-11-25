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

    // 실제 API 호출 대신 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 여기서 실제로는 API에 데이터를 전송
    const dogInfo = {
      name: dogName,
      breed,
      age,
      gender,
      phone,
    };
    console.log(dogInfo);

    // localStorage에 저장
    localStorage.setItem("dogInfo", JSON.stringify(dogInfo));

    // 정식 등록 완료 추적
    trackRegistrationComplete(dogInfo);

    setIsSubmitting(false);
    alert("반려견 정보가 등록되었습니다!");
    handleClose();
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
            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              반려견 정보 등록
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-gray-600">
              반려견의 정보를 입력해주세요.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 반려견 이름 */}
            <div>
              <label
                htmlFor="dogName"
                className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5"
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
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
              />
            </div>

            {/* 견종 */}
            <div>
              <label
                htmlFor="breed"
                className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5"
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
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
              />
            </div>

            {/* 나이 */}
            <div>
              <label
                htmlFor="age"
                className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5"
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
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
              />
            </div>

            {/* 성별 */}
            <div>
              <label
                htmlFor="gender"
                className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5"
              >
                성별 <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base bg-white"
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
                className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5"
              >
                전화번호 <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="010-1234-5678"
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
              <Button
                type="submit"
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? "등록 중..." : "등록하기"}
              </Button>
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm"
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
