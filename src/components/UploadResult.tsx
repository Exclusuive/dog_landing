import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  sendRegistrationToMake,
  getStoredPhotoData,
  getStoredNoseID,
} from "@/utils/makeWebhook";
import { useLanguage } from "@/context/LanguageContext";
import { logEvent } from "@/utils/analytics";

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
  const { t } = useLanguage();
  const copy = t<Record<string, any>>("uploadResult");
  const [email, setEmail] = useState<string>("");
  const [wantsNotification, setWantsNotification] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullEmail = email.trim();

    if (!fullEmail) {
        alert(copy.invalidEmail);
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fullEmail)) {
        alert(copy.invalidEmail);
        return;
    }

    setIsSubmitting(true);

    try {
      localStorage.setItem("waitlistEmail", fullEmail);

      const storedDogInfo = localStorage.getItem("dogInfo");
      let dogInfo: {
        name?: string;
        breed?: string;
        age?: string;
        gender?: string;
      } = {};

      if (storedDogInfo) {
        try {
          dogInfo = JSON.parse(storedDogInfo);
        } catch (e) {
          console.error("dogInfo 파싱 오류:", e);
        }
      }

      const photoData = getStoredPhotoData();
      const storedNoseID = getStoredNoseID();

      await sendRegistrationToMake({
        dogName: dogInfo.name || "",
        breed: dogInfo.breed || "",
        age: dogInfo.age || "",
        gender: dogInfo.gender || "",
        email: fullEmail || "",
        noseID: storedNoseID || undefined,
        photoUrl: photoData?.url,
        photoPath: photoData?.path,
        photoTimestamp: photoData?.timestamp,
      });

      alert(copy.successAlert);
      logEvent("Complete"); // Triggers Aged_Dog_Complete
      
      onReset();
      onClose();
    } catch (error) {
      console.error("제출 중 오류:", error);
      alert(copy.errorAlert);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="p-3 sm:p-6 w-full max-w-full flex flex-col justify-center mb-3">


      <div className="relative">
        <div
            className="rounded-xl overflow-hidden border shadow-lg relative bg-white"
            style={{
            borderColor: "#D0E8F0",
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
            }}
        >
            {/* Header / Top Section */}
            <div className="bg-[#F2F9FC] border-b border-[#E1F0F5] p-3 sm:p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                        {imageUrl ? (
                            <img src={imageUrl} alt="Dog" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-200" />
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900">{copy.reportTitle}</p>
                    </div>
                </div>
                         <div className="flex flex-col items-end min-w-[60px]">
                            <div className="flex items-end gap-1  select-none">
                                <span className="text-sm font-semibold text-gray-500 mb-1">{copy.ageTitle}</span>
                                <span className="text-md filter blur-[4px] font-extrabold text-[#FF6842]">4.5</span>
                                <span className="text-md font-medium text-gray-600">{copy.ageUnit}</span>
                            </div>
                         </div>
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-5 relative">
                 {/* Breed & Age Analysis */}
                 <div className="mb-4">
                    <h3 className="text-sm font-bold text-gray-800 mb-2">{copy.breedAnalysisTitle}</h3>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center justify-between">
                         <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-500 mb-0.5">{copy.breed}</span>
                            <div className="grid grid-cols-2 items-center gap-1.5">
                                <div className="w-full">
                                  <span className="text-sm font-bold text-gray-900">시츄</span>
                                  <span className="text-xs font-medium ml-1 text-white bg-gray-400 px-1.5 py-0.5 rounded-full filter blur-[2px]">43%</span>
                                </div>  
                                <div className="w-full text-end">
                                  <span className="text-sm font-bold text-gray-900">푸들</span>
                                  <span className="text-xs font-medium ml-1 text-white bg-gray-400 px-1.5 py-0.5 rounded-full filter blur-[2px]">13%</span>
                                </div>
                                <div className="w-full">
                                  <span className="text-sm font-bold text-gray-900">말티즈</span>
                                  <span className="text-xs font-medium ml-1 text-white bg-gray-400 px-1.5 py-0.5 rounded-full filter blur-[2px]">13%</span>
                                </div>
                                <div className="w-full text-end">
                                  <span className="text-sm font-bold text-gray-900">포메라니안</span>
                                  <span className="text-xs font-medium ml-1 text-white bg-gray-400 px-1.5 py-0.5 rounded-full filter blur-[2px]">13%</span>
                                </div>
                            </div>
                         </div>
                    </div>
                 </div>

                 {/* Simple Report */}
                 <div className="mb-4">
                    <h3 className="text-sm font-bold text-gray-800 mb-2">{copy.simpleReportTitle}</h3>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                         <p className="text-xs leading-relaxed text-gray-600 filter blur-[3px] select-none whitespace-pre-line">
                            {copy.simpleReportContent}
                         </p>
                    </div>
                 </div>
                 
                 {/* Footer Note */}
                 <div className="mt-2 text-center">
                     <p className="text-[10px] text-gray-400">
                        {copy.predictionNote}
                     </p>
                 </div>
                 
                 {/* Available in App Note - Moved closer to bottom */}
                 <div className="mt-4 text-center">
                    <p className="text-xs font-bold text-gray-900 flex items-center justify-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-[#FF6842]"></span>
                         {copy.reportOverlay}
                     </p>
                 </div>
            </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-6 w-full max-w-md mx-auto">
        <label className="flex items-center gap-2 mb-3 cursor-pointer select-none justify-start w-full">
          <input
            type="checkbox"
            checked={wantsNotification}
            onChange={(e) => {
                setWantsNotification(e.target.checked);
            }}
            className="w-4 h-4 accent-[#FF6842] flex-shrink-0"
            disabled={isSubmitting}
          />
          <span
            className="text-xs sm:text-sm font-medium text-left"
            style={{ color: "#555" }}
          >
            {copy.emailLabel ? copy.emailLabel : "정식 서비스 오픈 알림받기"}
          </span>
        </label>

        {wantsNotification && (
            <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col gap-2 sm:gap-3 fade-in"
            style={{ animation: "fadeIn 0.3s ease-out" }}
            >
            <div className="flex gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={copy.emailPlaceholder}
                    className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6842] focus:border-transparent outline-none transition-all text-sm"
                    disabled={isSubmitting}
                    autoFocus
                />
            </div>
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white px-6 py-3 text-sm sm:text-base font-bold rounded-lg shadow-md transition-transform active:scale-[0.98]"
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
            >
                {isSubmitting ? copy.submitting : copy.submit}
            </Button>
            </form>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
