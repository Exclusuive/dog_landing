import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "ko" | "en";

type TranslationValue =
  | string
  | number
  | boolean
  | TranslationValue[]
  | { [key: string]: TranslationValue };

type TranslationMap = Record<Language, Record<string, TranslationValue>>;

const translations: TranslationMap = {
  ko: {
    common: {
      languageKo: "KR",
      languageEn: "EN",
    },
    layout: {
      menuMain: "메인",
      menuWhyNose: "강아지 코에 숨겨진 신분증",
      menuHowItWorks: "등록하면 어떤 점이 좋나요?",
      menuTryIt: "지금 바로 체험해보세요!",
      openMenu: "메뉴 열기",
    },
    hero: {
      imageAlt: "강아지 이미지",
      headlinePrefix: "한번의",
      headlineHighlight: "코 사진",
      headlineSuffix: "으로",
      headlineLine2: "영원한 가족을 지켜주세요.",
      bullet1Prefix: "강아지를 잃어버리더라도",
      bullet1Highlight: "쉽게 찾을 수 있게",
      bullet2Prefix: "칩 없이도, 코 사진만으로",
      bullet2Highlight: "간편한 등록",
      bullet3Prefix: "",
      bullet3Highlight: "보험, 진료 기록",
      bullet3Suffix: "까지 한번에 확인",
      cta: "코 사진 등록하러 가기",
    },
    howItWorks: {
      title: "등록하면 어떤 점이 좋나요?",
      features: [
        {
          title: "잃어버릴 걱정 없이",
          description:
            "비문 인식만으로 신원 확인 가능해 분실 시 신속하게 찾을 수 있어요. 칩이나 목걸이가 없어도 걱정 없어요.",
        },
        {
          title: "보험료 할인 혜택",
          description:
            "정확한 신원 인증으로 보험 청구 신뢰도가 높아져, 더 낮은 보험료를 적용받을 수 있어요.",
        },
        {
          title: "건강 기록 통합 관리",
          description:
            "예방접종부터 진료 이력까지 반려견의 건강 정보를 한곳에서 손쉽게 관리할 수 있어요.",
        },
      ],
    },
    whyNose: {
      title: "강아지 코에 숨겨진 신분증",
      imageAlt: "강아지 코의 비문 패턴",
      descriptionLine1:
        "강아지의 코를 자세히 보면, 작고 섬세한 주름이 보입니다.",
      descriptionLine2Prefix: "이 주름을 ",
      descriptionLine2Strong: "비문(鼻紋)",
      descriptionLine3:
        "사람에게 지문이 있다면, 반려견에게는 바로 이 비문이 있습니다.",
      points: [
        {
          title: "세상에 하나뿐인 코 패턴",
          description:
            "사람의 지문처럼 각 강아지마다 코 주름이 다르게 생겨서 코만 봐도 누구의 강아지인지 바로 알 수 있어요.",
        },
        {
          title: "한 번 생기면 평생 그대로",
          description:
            "비문은 강아지가 태어난 지 약 2개월 정도 되면 생기는데, 그 이후로는 평생 모양이 변하지 않아요.",
        },
        {
          title: "사진 한 장이면 끝!",
          description:
            "칩을 넣거나 목걸이를 달 필요 없이 강아지 코 사진만 찍으면 바로 등록할 수 있어요.",
        },
      ],
    },
    tryItNow: {
      title: "지금 바로 체험해보세요!",
      steps: [
        "코 사진 등록하러 가기 버튼 클릭",
        "강아지 코 사진을 업로드 해주세요.",
        "정식 등록하기 버튼을 누른 후, 강아지 정보를 입력해주세요!",
      ],
      cta: "체험해보기",
      note: "※ 데모용으로 업로드된 사진은 연구/개발용으로만 사용됩니다.",
    },
    floatingButton: {
      cta: "코 사진 등록하러 가기",
    },
    photoUploadModal: {
      title: "반려견의 코 사진을 업로드해주세요",
      cameraError: "카메라에 접근할 수 없습니다. 브라우저 권한을 확인해주세요.",
      chooseFromFile: "파일에서 선택하기",
      loadingCamera: "카메라를 불러오는 중...",
      capture: "사진 촬영하기",
      tip: "밝은 조명에서 정면을 향한 사진이 가장 좋습니다.",
      previewTitle: "코 부분을 확인해주세요",
      retake: "다시 촬영하기",
      complete: "완료하기",
      proceedWithThis: "이 사진으로 진행하기",
      uploadingTitle: "반려견의 비문을 분석하고 있어요…",
      uploadingSubtitle: "네트워크에 따라 15~30초 정도 소요됩니다.",
      errorTitle: "인식 실패",
      retry: "다시 시도하기",
      close: "닫기",
      invalidFile: "JPG, PNG 형식의 이미지 파일만 업로드할 수 있습니다.",
      uploadFailed: "이미지 업로드에 실패했습니다. 다시 시도해주세요.",
      processingError:
        "잠시 인식 서버에 문제가 발생했어요. 몇 분 뒤 다시 시도해주시겠어요?",
      loadingAlt: "분석 중",
    },
    uploadResult: {
      title: "반려견 신분증이 완성되었습니다!",
      registered: "등록 완료",
      registrationNumber: "동물등록번호",
      name: "이름",
      genderMale: "수컷",
      genderFemale: "암컷",
      birth: "생년월일",
      issuedDate: "발급일자",
      notificationLabel: "(선택) 이메일 입력하고 서비스 시작 알림 받기",
      emailPlaceholder: "이메일 (선택사항)",
      domainPlaceholder: "도메인 (예: gmail.com)",
      customDomain: "직접 입력",
      submit: "등록하기",
      submitting: "등록 중...",
      successAlert: "신청이 완료되었습니다!",
      invalidEmail: "올바른 이메일 형식을 입력해주세요.",
      errorAlert: "오류가 발생했습니다. 다시 시도해주세요.",
    },
    surveyModal: {
      title: "반려견 정보 등록",
      dogNameLabel: "반려견 이름",
      dogNamePlaceholder: "예: 뽀삐",
      breedLabel: "견종",
      breedPlaceholder: "예: 골든 리트리버",
      ageLabel: "나이",
      agePlaceholder: "예: 3",
      genderLabel: "성별",
      genderPlaceholder: "선택해주세요",
      genderMale: "수컷",
      genderFemale: "암컷",
      emailLabel: "이메일",
      emailHelper: "정식 서비스가 시작되면 이메일로 안내드릴게요.",
      submit: "등록하기",
      submitting: "등록 중...",
      cancel: "취소",
      success: "반려견 정보가 성공적으로 등록되었습니다!",
      successFallback: "반려견 정보가 등록되었습니다!",
      error: "등록 중 오류가 발생했습니다. 다시 시도해주세요.",
      requiredMark: "*",
    },
    pages: {
      aboutTitle: "About Us",
      aboutBody: "This is the about page of the landing page.",
      contactTitle: "Contact Us",
      contactBody: "This is the contact page of the landing page.",
    },
  },
  en: {
    common: {
      languageKo: "KR",
      languageEn: "EN",
    },
    layout: {
      menuMain: "Home",
      menuWhyNose: "ID hidden in a dog’s nose",
      menuHowItWorks: "Why register?",
      menuTryIt: "Try it now!",
      openMenu: "Open menu",
    },
    hero: {
      imageAlt: "Dog image",
      headlinePrefix: "A single",
      headlineHighlight: "nose photo",
      headlineSuffix: "",
      headlineLine2: "can keep your family together forever.",
      bullet1Prefix: "",
      bullet1Highlight: "Find your dog easily",
      bullet1Suffix: " even if they go missing",
      bullet2Prefix: "",
      bullet2Highlight: "Register easily",
      bullet2Suffix: " with only a nose photo, no chip needed",
      bullet3Prefix: "Check",
      bullet3Highlight: "insurance and medical records",
      bullet3Suffix: " in one place",
      cta: "Start with a nose photo",
    },
    howItWorks: {
      title: "Why register?",
      features: [
        {
          title: "No more losing your dog",
          description:
            "Nose-print identification lets you prove identity quickly if they’re lost. No chip or tag required.",
        },
        {
          title: "Lower insurance premiums",
          description:
            "Reliable identity verification reduces fraud risk, unlocking better insurance rates.",
        },
        {
          title: "Unified health records",
          description:
            "Manage vaccinations and clinic history for your pet in one place with less hassle.",
        },
      ],
    },
    whyNose: {
      title: "ID hidden in a dog’s nose",
      imageAlt: "Nose print pattern of a dog",
      descriptionLine1:
        "Look closely at a dog’s nose and you’ll see tiny, detailed wrinkles.",
      descriptionLine2Prefix: "This pattern is called a ",
      descriptionLine2Strong: "nose print",
      descriptionLine3:
        "Like fingerprints for humans, dogs have unique nose prints.",
      points: [
        {
          title: "A one-and-only nose pattern",
          description:
            "Every dog’s nose wrinkles are different, so a nose photo can prove exactly which dog it is.",
        },
        {
          title: "Unchanged for life",
          description:
            "Nose prints form around two months old and stay the same for life.",
        },
        {
          title: "Just one photo",
          description:
            "No chips or collars required—just snap a nose photo to register.",
        },
      ],
    },
    tryItNow: {
      title: "Try it right now!",
      steps: [
        "Tap the “Start with a nose photo” button",
        "Upload a photo of your dog’s nose",
        "Tap “Complete registration” and enter your dog’s info",
      ],
      cta: "Try it",
      note: "Demo photos are used only for research and development purposes.",
    },
    floatingButton: {
      cta: "Start with a nose photo",
    },
    photoUploadModal: {
      title: "Upload your dog’s nose photo",
      cameraError:
        "Cannot access the camera. Please check your browser permissions.",
      chooseFromFile: "Choose from files",
      loadingCamera: "Loading camera...",
      capture: "Take a photo",
      tip: "Bright, front-facing photos work best.",
      previewTitle: "Check the nose area",
      retake: "Retake",
      complete: "Finish",
      proceedWithThis: "Use this photo",
      uploadingTitle: "Analyzing your dog’s nose print…",
      uploadingSubtitle: "This may take 15–30 seconds depending on network.",
      errorTitle: "Recognition failed",
      retry: "Try again",
      close: "Close",
      invalidFile: "Only JPG and PNG images can be uploaded.",
      uploadFailed: "Failed to upload the image. Please try again.",
      processingError:
        "Our recognition server is having trouble. Please try again in a few minutes.",
      loadingAlt: "Analyzing",
    },
    uploadResult: {
      title: "Your dog ID card is ready!",
      registered: "Registered",
      registrationNumber: "Registration No.",
      name: "Name",
      genderMale: "Male",
      genderFemale: "Female",
      birth: "Birthdate",
      issuedDate: "Issued on",
      notificationLabel:
        "Optional) Enter email to get notified when the service launches",
      emailPlaceholder: "Email (optional)",
      domainPlaceholder: "Domain (e.g., gmail.com)",
      customDomain: "Custom",
      submit: "Submit",
      submitting: "Submitting...",
      successAlert: "Your request has been received!",
      invalidEmail: "Please enter a valid email address.",
      errorAlert: "Something went wrong. Please try again.",
    },
    surveyModal: {
      title: "Register dog information",
      dogNameLabel: "Dog name",
      dogNamePlaceholder: "e.g. Poppy",
      breedLabel: "Breed",
      breedPlaceholder: "e.g. Golden Retriever",
      ageLabel: "Age",
      agePlaceholder: "e.g. 3",
      genderLabel: "Gender",
      genderPlaceholder: "Select one",
      genderMale: "Male",
      genderFemale: "Female",
      emailLabel: "Email",
      emailHelper: "We’ll notify you by email when the service launches.",
      submit: "Submit",
      submitting: "Submitting...",
      cancel: "Cancel",
      success: "Your dog information was registered successfully!",
      successFallback: "Dog information has been saved!",
      error: "An error occurred. Please try again.",
      requiredMark: "*",
    },
    pages: {
      aboutTitle: "About Us",
      aboutBody: "This is the about page of the landing page.",
      contactTitle: "Contact Us",
      contactBody: "This is the contact page of the landing page.",
    },
  },
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <T = string>(key: string, fallback?: T) => T;
} | null>(null);

function getNestedValue(
  obj: Record<string, TranslationValue>,
  key: string
): TranslationValue | undefined {
  return key.split(".").reduce<TranslationValue | undefined>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, TranslationValue>)[part];
    }
    return undefined;
  }, obj);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ko");

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") as Language | null;
    if (saved === "ko" || saved === "en") {
      setLanguageState(saved);
      return;
    }

    const browserLang =
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      "";
    const normalized = browserLang.toLowerCase();
    const detected =
      normalized.includes("ko") || normalized.includes("kr") ? "ko" : "en";
    setLanguageState(detected);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferredLanguage", lang);
  }, []);

  const t = useCallback(
    <T = string,>(key: string, fallback?: T): T => {
      const value = getNestedValue(translations[language], key);
      if (value === undefined) {
        return (fallback ?? (key as unknown as T)) as T;
      }
      return value as T;
    },
    [language]
  );

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
