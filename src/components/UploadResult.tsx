import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  sendRegistrationToMake,
  getStoredPhotoData,
  getStoredNoseID,
} from "@/utils/makeWebhook";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t, language } = useLanguage();
  const copy = t<Record<string, any>>("uploadResult");
  const [noseID, setNoseID] = useState<string>("");
  const [issueDate, setIssueDate] = useState<string>("");
  const [emailPrefix, setEmailPrefix] = useState<string>("");
  const [emailDomain, setEmailDomain] = useState<string>("gmail.com");
  const [useCustomDomain, setUseCustomDomain] = useState<boolean>(false);
  const [customDomain, setCustomDomain] = useState<string>("");
  const [wantsNotification, setWantsNotification] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailDomains = [
    "gmail.com",
    "naver.com",
    "daum.net",
    "kakao.com",
    "hanmail.net",
    "yahoo.com",
    "outlook.com",
  ];

  const formatIssueDate = (isoString: string) => {
    const locale = language === "ko" ? "ko-KR" : "en-US";
    const date = new Date(isoString);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const storedID = localStorage.getItem("dogNoseID");
    const storedISO = localStorage.getItem("dogNoseIssueDateISO");
    const legacyStoredDate = localStorage.getItem("dogNoseIssueDate");

    if (storedID) {
      setNoseID(storedID);
    } else {
      const generateNoseID = () => {
        const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
        return `001-001-${randomSixDigits}`;
      };

      const newID = generateNoseID();
      setNoseID(newID);
      localStorage.setItem("dogNoseID", newID);
    }

    const isoDate =
      storedISO ||
      (legacyStoredDate ? new Date(legacyStoredDate).toISOString() : undefined) ||
      new Date().toISOString();

    setIssueDate(formatIssueDate(isoDate));
    localStorage.setItem("dogNoseIssueDateISO", isoDate);
  }, [language]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const domain = useCustomDomain ? customDomain.trim() : emailDomain.trim();
    const fullEmail =
      emailPrefix.trim() && domain ? `${emailPrefix.trim()}@${domain}` : "";

    if (fullEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(fullEmail)) {
        alert(copy.invalidEmail);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (fullEmail) {
        localStorage.setItem("waitlistEmail", fullEmail);
      }

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

      const makeSuccess = await sendRegistrationToMake({
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

      if (makeSuccess) {
        alert(copy.successAlert);
      } else {
        alert(copy.successAlert);
      }

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
      <div className="py-2 sm:py-3">
        <h2
          className="text-base sm:text-xl md:text-2xl font-extrabold text-center mb-1"
          style={{ color: "#111111", letterSpacing: "0.3px" }}
        >
          {copy.title}
        </h2>
      </div>

      <div
        className="rounded-lg overflow-hidden border flex-1 flex flex-col shadow-lg"
        style={{
          backgroundColor: "#F9FDFE",
          borderColor: "#D0E8F0",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div
          className="pt-2 sm:pt-3 px-2 sm:px-4 flex items-center justify-center"
          style={{ backgroundColor: "#F9FDFE" }}
        >
          <p
            className="text-sm sm:text-base md:text-lg font-black text-center break-all"
            style={{ color: "#111111", letterSpacing: "0.5px" }}
          >
            {noseID}
          </p>
        </div>

        <div
          className="flex flex-row px-2 sm:px-4 py-2 sm:py-3 items-start flex-1"
          style={{
            backgroundColor: "#F9FDFE",
            minHeight: "140px",
            height: "auto",
          }}
        >
          <div className="mr-2 sm:mr-5 flex items-center justify-start flex-col flex-shrink-0">
            <div
              className="w-[80px] h-[96px] sm:w-[110px] sm:h-[132px] rounded flex items-center justify-center overflow-hidden border shadow-sm"
              style={{
                backgroundColor: "#E3F2FD",
                borderColor: "#BBDEFB",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="반려견 코 사진"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 sm:w-12 sm:h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: "#767676" }}
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
            <div className="mt-3 sm:mt-4 flex items-center justify-center">
              <div
                className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded border"
                style={{
                  backgroundColor: "#E8F5E9",
                  borderColor: "#4CAF50",
                }}
              >
                <p
                  className="text-[9px] sm:text-[11px] font-semibold"
                  style={{ color: "#2E7D32" }}
                >
                  {copy.registered}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-start min-w-0">
            <div className="flex flex-row items-center justify-between py-1 sm:py-1.5 flex-wrap pt-1 sm:pt-2">
              <p
                className="text-xs sm:text-sm font-semibold flex-shrink-0"
                style={{ color: "#505050" }}
              >
                {copy.registrationNumber}
              </p>
              <p
                className="text-xs sm:text-sm font-semibold min-w-0 break-all"
                style={{ color: "#111111", filter: "blur(3px)" }}
              >
                159229529
              </p>
            </div>

            <div
              className="h-px my-0.5 sm:my-1"
              style={{ backgroundColor: "#BBDEFB" }}
            ></div>

            <div className="flex flex-row items-center justify-between py-1 sm:py-1.5 flex-wrap">
              <p
                className="text-xs sm:text-sm font-semibold flex-shrink-0"
                style={{ color: "#505050" }}
              >
                {copy.name}
              </p>
              <div className="flex items-center gap-1">
                <p
                  className="text-base sm:text-lg md:text-xl font-bold flex-shrink-0"
                  style={{
                    color: "#111111",
                    letterSpacing: "0.3px",
                    filter: "blur(3px)",
                  }}
                >
                  콩순이
                </p>
                <span
                  className="text-xs sm:text-sm mx-0.5 sm:mx-1 font-normal flex-shrink-0"
                  style={{ color: "#64B5F6" }}
                >
                  /
                </span>
                <p
                  className="text-xs sm:text-sm font-semibold min-w-0"
                  style={{ color: "#111111", filter: "blur(3px)" }}
                >
                  {copy.genderMale}
                </p>
              </div>
            </div>

            <div
              className="h-px my-0.5 sm:my-1"
              style={{ backgroundColor: "#BBDEFB" }}
            ></div>

            <div className="flex flex-row items-center justify-between py-1 sm:py-1.5 flex-wrap">
              <p
                className="text-xs sm:text-sm font-semibold flex-shrink-0"
                style={{ color: "#505050" }}
              >
                {copy.birth}
              </p>
              <p
                className="text-xs sm:text-sm font-semibold min-w-0 break-words"
                style={{ color: "#111111", filter: "blur(3px)" }}
              >
                2020.01.15 (4)
              </p>
            </div>

            <div
              className="h-px my-0.5 sm:my-1"
              style={{ backgroundColor: "#BBDEFB" }}
            ></div>

            <div className="flex flex-row items-center justify-between py-1 sm:py-1.5 flex-wrap">
              <p
                className="text-xs sm:text-sm font-semibold flex-shrink-0"
                style={{ color: "#505050" }}
              >
                {copy.issuedDate}
              </p>
              <p
                className="text-xs sm:text-sm font-semibold min-w-0 break-words"
                style={{ color: "#111111" }}
              >
                {issueDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 w-full max-w-md mx-auto">
        <label className="flex items-center gap-2 mb-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={wantsNotification}
            onChange={(e) => {
              const checked = e.target.checked;
              setWantsNotification(checked);
              if (!checked) {
                setEmailPrefix("");
                setUseCustomDomain(false);
                setCustomDomain("");
              }
            }}
            className="w-4 h-4 accent-[#FF6842]"
            disabled={isSubmitting}
          />
          <span
            className="text-xs sm:text-sm"
            style={{ color: "#9E9E9E", opacity: 0.9 }}
          >
            {copy.notificationLabel}
          </span>
        </label>

        <form
          onSubmit={handleEmailSubmit}
          className="flex flex-col gap-2 sm:gap-3"
        >
          {wantsNotification && (
            <div className="flex items-center gap-1 sm:gap-2 w-full">
              <input
                type="text"
                value={emailPrefix}
                onChange={(e) => setEmailPrefix(e.target.value)}
                placeholder={copy.emailPlaceholder}
                className="flex-[3] min-w-0 px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all text-xs sm:text-sm"
                style={{
                  color: emailPrefix ? "#111111" : "#767676",
                  backgroundColor: emailPrefix ? "#FFFFFF" : "#FAFAFA",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FF6842";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 2px rgba(255, 104, 66, 0.2)";
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.color = "#111111";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                  if (!e.currentTarget.value) {
                    e.currentTarget.style.backgroundColor = "#FAFAFA";
                    e.currentTarget.style.color = "#767676";
                  }
                }}
                disabled={isSubmitting}
              />

              <span
                className="flex items-center justify-center text-xs sm:text-sm px-1"
                style={{ color: "#767676" }}
              >
                @
              </span>

              {useCustomDomain ? (
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder={copy.domainPlaceholder}
                  className="flex-[2] min-w-0 px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all text-xs sm:text-sm"
                  style={{
                    color: customDomain ? "#111111" : "#767676",
                    backgroundColor: customDomain ? "#FFFFFF" : "#FAFAFA",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FF6842";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 2px rgba(255, 104, 66, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                  disabled={isSubmitting}
                />
              ) : (
                <select
                  value={emailDomain}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "custom") {
                      setUseCustomDomain(true);
                    } else {
                      setUseCustomDomain(false);
                      setEmailDomain(value);
                    }
                  }}
                  className="flex-[2] min-w-0 px-3 sm:px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all text-xs sm:text-sm bg-white"
                  style={{
                    color: "#111111",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FF6842";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 2px rgba(255, 104, 66, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                  disabled={isSubmitting}
                >
                  {emailDomains.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                  <option value="custom">{copy.customDomain}</option>
                </select>
              )}
            </div>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white px-6 sm:px-8 py-2.5 text-sm sm:text-base whitespace-nowrap"
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
      </div>
    </div>
  );
}
