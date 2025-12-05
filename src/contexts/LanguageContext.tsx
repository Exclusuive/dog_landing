import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";

type Language = "ko" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// 번역 데이터
const translations: Record<Language, Record<string, string>> = {
  ko: {
    // Layout
    "menu.main": "메인",
    "menu.whyNose": "강아지 코에 숨겨진 신분증",
    "menu.howItWorks": "등록하면 어떤 점이 좋나요?",
    "menu.tryIt": "지금 바로 체험해보세요!",

    // Hero
    "hero.title": "사진 한 장으로",
    "hero.titleHighlight": "더 커지는 혜택",
    "hero.point1.pre": "일부 부정 보험 청구 때문에 선량한 견주도 ",
    "hero.point1.hl": "보험료 인상 및 청구 지연",
    "hero.point1.post": "의 피해를 보고 있어요.",
    "hero.point2.pre": "비문 인증은 ",
    "hero.point2.hl": "'우리 아이'의 신원을 정확히 증명",
    "hero.point2.post": "해 빠르고 공정한 보험 혜택을 받도록 도와줘요.",
    "hero.point3.pre": "",
    "hero.point3.hl": "칩 없어도 코 사진만으로",
    "hero.point3.post": " 간편하게 등록 가능!",
    "hero.button": "코 사진 등록하러 가기",

    // WhyNose
    "whyNose.title": "강아지 코에 숨겨진 신분증",
    "whyNose.description":
      "강아지의 코를 자세히 보면, 작고 섬세한 주름이 보입니다. 이 주름을 비문(鼻紋)이라고 해요. 사람에게 지문이 있다면, 반려견에게는 바로 이 비문이 있습니다.",
    "whyNose.point1.title": "세상에 하나뿐인 코 패턴",
    "whyNose.point1.description":
      "사람의 지문처럼 각 강아지마다 코 주름이 다르게 생겨서 코만 봐도 누구의 강아지인지 바로 알 수 있어요.",
    "whyNose.point2.title": "한 번 생기면 평생 그대로",
    "whyNose.point2.description":
      "비문은 강아지가 태어난 지 약 2개월 정도 되면 생기는데, 그 이후로는 평생 모양이 변하지 않아요.",
    "whyNose.point3.title": "사진 한 장이면 끝!",
    "whyNose.point3.description":
      "칩을 넣거나 목걸이를 달 필요 없이 강아지 코 사진만 찍으면 바로 등록할 수 있어요.",

    // HowItWorks
    "howItWorks.title": "등록하면 어떤 점이 좋나요?",
    "howItWorks.feature1.title": "비싼 보험료는 이제 그만",
    "howItWorks.feature1.description":
      "비문 기반 신원 인증은 부정 청구를 줄여 선량한 견주들에게 유리한 보험 환경을 만들어요.",
    "howItWorks.feature2.title": "간편한 보험 청구",
    "howItWorks.feature2.description":
      "정확한 신원 인증으로 보험사와 분쟁 없이 바로 정산되는 경험을 하게 돼요.",
    "howItWorks.feature3.title": "건강 기록 통합 관리",
    "howItWorks.feature3.description":
      "예방접종부터 진료 이력까지 반려견의 건강 정보를 한곳에서 손쉽게 관리할 수 있어요.",

    // TryItNow
    "tryItNow.title": "지금 바로 체험해보세요!",
    "tryItNow.step1": "코 사진 등록하러 가기 버튼 클릭",
    "tryItNow.step2": "강아지 코 사진을 업로드 해주세요.",
    "tryItNow.step3": "등록하기 버튼을 누른 후, 강아지 정보를 입력해주세요!",
    "tryItNow.button": "체험해보기",
    "tryItNow.disclaimer":
      "※ 데모용으로 업로드된 사진은 연구/개발용으로만 사용됩니다.",

    // PhotoUploadModal
    "modal.uploadTitle": "반려견의 코 사진을 업로드해주세요",
    "modal.cameraError":
      "카메라에 접근할 수 없습니다. 브라우저 권한을 확인해주세요.",
    "modal.loadingCamera": "카메라를 불러오는 중...",
    "modal.tip": "밝은 조명에서 정면을 향한 사진이 가장 좋습니다.",
    "modal.capture": "사진 촬영하기",
    "modal.selectFile": "파일에서 선택하기",
    "modal.previewTitle": "코 부분을 확인해주세요",
    "modal.retake": "다시 촬영하기",
    "modal.complete": "완료하기",
    "modal.proceed": "이 사진으로 진행하기",
    "modal.analyzing": "반려견의 비문을 분석하고 있어요…",
    "modal.analyzingTime": "네트워크에 따라 15~30초 정도 소요됩니다.",
    "modal.errorTitle": "인식 실패",
    "modal.errorFormat": "JPG, PNG 형식의 이미지 파일만 업로드할 수 있습니다.",
    "modal.errorUpload": "이미지 업로드에 실패했습니다. 다시 시도해주세요.",
    "modal.errorServer":
      "잠시 인식 서버에 문제가 발생했어요. 몇 분 뒤 다시 시도해주시겠어요?",
    "modal.retry": "다시 시도하기",
    "modal.close": "닫기",

    // FloatingButton
    "floating.button": "코 사진 등록하러 가기",

    // SurveyModal
    "survey.title": "반려견 정보 등록",
    "survey.dogName.label": "반려견 이름",
    "survey.dogName.placeholder": "예: 뽀삐",
    "survey.breed.label": "견종",
    "survey.breed.placeholder": "예: 골든 리트리버",
    "survey.age.label": "나이",
    "survey.age.placeholder": "예: 3",
    "survey.gender.label": "성별",
    "survey.gender.placeholder": "선택해주세요",
    "survey.gender.male": "수컷",
    "survey.gender.female": "암컷",
    "survey.email.label": "이메일",
    "survey.email.help": "정식 서비스가 시작되면 이메일로 안내드릴게요.",
    "survey.submit": "등록하기",
    "survey.submitting": "등록 중...",
    "survey.cancel": "취소",
    "survey.success": "반려견 정보가 성공적으로 등록되었습니다!",
    "survey.successFallback": "반려견 정보가 등록되었습니다!",
    "survey.error": "등록 중 오류가 발생했습니다. 다시 시도해주세요.",

    // UploadResult
    "uploadResult.title": "반려견 신분증이 완성되었습니다!",
    "uploadResult.status": "등록 완료",
    "uploadResult.regNumber": "동물등록번호",
    "uploadResult.name": "이름",
    "uploadResult.genderDivider": "/",
    "uploadResult.birth": "생년월일",
    "uploadResult.issueDate": "발급일자",
    "uploadResult.notifyLabel": "(선택) 이메일 입력하고 서비스 시작 알림 받기",
    "uploadResult.emailPlaceholder": "이메일 (선택사항)",
    "uploadResult.domainPlaceholder": "도메인 (예: gmail.com)",
    "uploadResult.domainCustom": "직접 입력",
    "uploadResult.submit": "등록하기",
    "uploadResult.submitting": "등록 중...",
    "uploadResult.emailInvalid": "올바른 이메일 형식을 입력해주세요.",
    "uploadResult.submitSuccess": "신청이 완료되었습니다!",
    "uploadResult.submitError": "오류가 발생했습니다. 다시 시도해주세요.",
    "uploadResult.imageAlt": "반려견 코 사진",
  },
  en: {
    // Layout
    "menu.main": "Main",
    "menu.whyNose": "The Hidden ID in Your Dog's Nose",
    "menu.howItWorks": "What are the benefits of registration?",
    "menu.tryIt": "Try it now!",

    // Hero
    "hero.title": "Bigger benefits",
    "hero.titleHighlight": "with just one photo",
    "hero.point1.pre":
      "Due to fraudulent insurance claims, even honest pet owners face ",
    "hero.point1.hl": "premium increases and claim delays",
    "hero.point1.post": ".",
    "hero.point2.pre": "Nose print authentication ",
    "hero.point2.hl": "accurately proves your pet's identity",
    "hero.point2.post":
      ", helping you receive fast and fair insurance benefits.",
    "hero.point3.pre": "",
    "hero.point3.hl": "Easy registration with just a nose photo",
    "hero.point3.post": " — no chip needed!",
    "hero.button": "Register Nose Photo",

    // WhyNose
    "whyNose.title": "The Hidden ID in Your Dog's Nose",
    "whyNose.description":
      "If you look closely at a dog's nose, you'll see small, delicate wrinkles. These wrinkles are called nose prints. Just as humans have fingerprints, dogs have nose prints.",
    "whyNose.point1.title": "One-of-a-kind nose pattern",
    "whyNose.point1.description":
      "Like human fingerprints, each dog's nose wrinkles are unique, so you can identify whose dog it is just by looking at the nose.",
    "whyNose.point2.title": "Lifelong consistency",
    "whyNose.point2.description":
      "Nose prints develop when a dog is about 2 months old, and after that, the pattern never changes throughout their life.",
    "whyNose.point3.title": "Just one photo!",
    "whyNose.point3.description":
      "You can register your dog simply by taking a photo of their nose - no chip or collar needed.",

    // HowItWorks
    "howItWorks.title": "What are the benefits of registration?",
    "howItWorks.feature1.title": "No more expensive premiums",
    "howItWorks.feature1.description":
      "Nose print-based identity authentication reduces fraudulent claims, creating a favorable insurance environment for honest pet owners.",
    "howItWorks.feature2.title": "Easy insurance claims",
    "howItWorks.feature2.description":
      "With accurate identity authentication, you'll experience smooth settlements without disputes with insurance companies.",
    "howItWorks.feature3.title": "Integrated health record management",
    "howItWorks.feature3.description":
      "Manage all your pet's health information in one place, from vaccinations to medical history.",

    // TryItNow
    "tryItNow.title": "Try it now!",
    "tryItNow.step1": "Click the 'Register Nose Photo' button",
    "tryItNow.step2": "Upload a photo of your dog's nose.",
    "tryItNow.step3": "Click 'Register' and enter your dog's information!",
    "tryItNow.button": "Try it now",
    "tryItNow.disclaimer":
      "※ Photos uploaded for demo purposes are used only for research and development.",

    // PhotoUploadModal
    "modal.uploadTitle": "Upload your pet's nose photo",
    "modal.cameraError":
      "Cannot access camera. Please check your browser permissions.",
    "modal.loadingCamera": "Loading camera...",
    "modal.tip": "Photos taken in bright lighting facing forward work best.",
    "modal.capture": "Take Photo",
    "modal.selectFile": "Select from File",
    "modal.previewTitle": "Please check the nose area",
    "modal.retake": "Retake",
    "modal.complete": "Complete",
    "modal.proceed": "Proceed with this photo",
    "modal.analyzing": "Analyzing your pet's nose print…",
    "modal.analyzingTime":
      "This may take 15-30 seconds depending on your network.",
    "modal.errorTitle": "Recognition Failed",
    "modal.errorFormat": "Only JPG and PNG image files can be uploaded.",
    "modal.errorUpload": "Image upload failed. Please try again.",
    "modal.errorServer":
      "There was a problem with the recognition server. Please try again in a few minutes.",
    "modal.retry": "Try Again",
    "modal.close": "Close",

    // FloatingButton
    "floating.button": "Register Nose Photo",

    // SurveyModal
    "survey.title": "Register Your Dog",
    "survey.dogName.label": "Dog Name",
    "survey.dogName.placeholder": "e.g., Poppy",
    "survey.breed.label": "Breed",
    "survey.breed.placeholder": "e.g., Golden Retriever",
    "survey.age.label": "Age",
    "survey.age.placeholder": "e.g., 3",
    "survey.gender.label": "Gender",
    "survey.gender.placeholder": "Select",
    "survey.gender.male": "Male",
    "survey.gender.female": "Female",
    "survey.email.label": "Email",
    "survey.email.help": "We'll notify you by email when the service launches.",
    "survey.submit": "Submit",
    "survey.submitting": "Submitting...",
    "survey.cancel": "Cancel",
    "survey.success": "Your dog's info has been registered successfully!",
    "survey.successFallback": "Your dog's info has been registered!",
    "survey.error": "An error occurred while submitting. Please try again.",

    // UploadResult
    "uploadResult.title": "Your dog's ID card is ready!",
    "uploadResult.status": "Registered",
    "uploadResult.regNumber": "Registration No.",
    "uploadResult.name": "Name",
    "uploadResult.genderDivider": "/",
    "uploadResult.birth": "Birthdate",
    "uploadResult.issueDate": "Issued On",
    "uploadResult.notifyLabel":
      "(Optional) Enter email to receive service launch updates",
    "uploadResult.emailPlaceholder": "Email (optional)",
    "uploadResult.domainPlaceholder": "Domain (e.g., gmail.com)",
    "uploadResult.domainCustom": "Custom",
    "uploadResult.submit": "Submit",
    "uploadResult.submitting": "Submitting...",
    "uploadResult.emailInvalid": "Please enter a valid email address.",
    "uploadResult.submitSuccess": "Request completed!",
    "uploadResult.submitError": "An error occurred. Please try again.",
    "uploadResult.imageAlt": "Dog nose photo",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // URL 파라미터 확인
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get("lang");
      if (langParam === "en" || langParam === "ko") {
        return langParam;
      }

      // localStorage 확인
      const savedLang = localStorage.getItem("language");
      if (savedLang === "en" || savedLang === "ko") {
        return savedLang;
      }

      // 브라우저 언어 확인
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("en")) {
        return "en";
      }
      if (browserLang.startsWith("ko")) {
        return "ko";
      }
    }

    // 기본값은 한국어
    return "ko";
  });

  useEffect(() => {
    // 언어를 localStorage에 저장
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // URL 파라미터 업데이트 (페이지 새로고침 없이)
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.pushState({}, "", url);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
