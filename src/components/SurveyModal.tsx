import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SurveyModal({ isOpen, onClose }: SurveyModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 실제 API 호출 대신 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 여기서 실제로는 API에 데이터를 전송
    console.log({ email, phone, feedback });

    setIsSubmitting(false);
    alert("설문조사가 제출되었습니다. 감사합니다!");
    handleClose();
  };

  const handleClose = () => {
    setEmail("");
    setPhone("");
    setFeedback("");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[90%] sm:w-3/4 max-w-lg p-0 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              설문조사
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-gray-600">
              Puddy 서비스를 이용해보신 소감을 들려주세요.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5"
              >
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
              />
            </div>

            {/* Phone Input */}
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

            {/* Feedback Input */}
            <div>
              <label
                htmlFor="feedback"
                className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5"
              >
                서비스 이용 소감 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                rows={3}
                placeholder="Puddy 서비스를 이용해보신 소감이나 개선사항을 자유롭게 작성해주세요."
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-sm sm:text-base"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm"
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? "제출 중..." : "제출하기"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
