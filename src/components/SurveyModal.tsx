import { useState } from "react";
import {
  Dialog,
  DialogContent,
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
import { useLanguage } from "@/context/LanguageContext";

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SurveyModal({ isOpen, onClose }: SurveyModalProps) {
  const { t } = useLanguage();
  const copy = t<Record<string, any>>("surveyModal");
  const [dogName, setDogName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dogInfo = {
        name: dogName,
        breed,
        age,
        gender,
        email,
      };

      localStorage.setItem("dogInfo", JSON.stringify(dogInfo));

      const photoData = getStoredPhotoData();
      const noseID = getStoredNoseID();

      const makeSuccess = await sendRegistrationToMake({
        dogName,
        breed,
        age,
        gender,
        email,
        noseID: noseID || undefined,
        photoUrl: photoData?.url,
        photoPath: photoData?.path,
        photoTimestamp: photoData?.timestamp,
      });

      trackRegistrationComplete(dogInfo);

      if (makeSuccess) {
        alert(copy.success);
      } else {
        alert(copy.successFallback);
      }
    } catch (error) {
      console.error("등록 처리 중 오류:", error);
      alert(copy.error);
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
    setEmail("");
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
              {copy.title}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="dogName"
                className="block text-xs sm:text-sm font-semibold mb-1.5"
                style={{ color: "#505050" }}
              >
                {copy.dogNameLabel} <span className="text-red-500">{copy.requiredMark}</span>
              </label>
              <input
                id="dogName"
                type="text"
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
                required
                placeholder={copy.dogNamePlaceholder}
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

            <div>
              <label
                htmlFor="breed"
                className="block text-xs sm:text-sm font-semibold mb-1.5"
                style={{ color: "#505050" }}
              >
                {copy.breedLabel} <span className="text-red-500">{copy.requiredMark}</span>
              </label>
              <input
                id="breed"
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
                placeholder={copy.breedPlaceholder}
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

            <div>
              <label
                htmlFor="age"
                className="block text-xs sm:text-sm font-semibold mb-1.5"
                style={{ color: "#505050" }}
              >
                {copy.ageLabel} <span className="text-red-500">{copy.requiredMark}</span>
              </label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min="0"
                max="30"
                placeholder={copy.agePlaceholder}
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

            <div>
              <label
                htmlFor="gender"
                className="block text-xs sm:text-sm font-semibold mb-1.5"
                style={{ color: "#505050" }}
              >
                {copy.genderLabel} <span className="text-red-500">{copy.requiredMark}</span>
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
                <option value="">{copy.genderPlaceholder}</option>
                <option value="male">{copy.genderMale}</option>
                <option value="female">{copy.genderFemale}</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-semibold mb-1.5"
                style={{ color: "#505050" }}
              >
                {copy.emailLabel}
              </label>
              <p
                className="text-xs sm:text-sm mb-1.5 pl-1"
                style={{ color: "#767676" }}
              >
                {copy.emailHelper}
              </p>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
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
                {isSubmitting ? copy.submitting : copy.submit}
              </Button>
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm"
                style={{ color: "#111111" }}
                disabled={isSubmitting}
              >
                {copy.cancel}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
