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
      menuWhyNose: "왜 퍼디인가요?",
      menuHowItWorks: "주요 기능",
      menuTryIt: "시작하기",
      openMenu: "메뉴 열기",
    },
    hero: {
      imageAlt: "노령견 이미지",
      headlinePrefix: "",
      headlineHighlight: "더 오래, 더 건강하게.",
      headlineSuffix: "",
      headlineLine2: "이제 우리 같이 준비해요.",
      bullet1Prefix: "우리 아이의 ",
      bullet1Highlight: "건강 정보",
      bullet1Suffix: "를 한곳에서 확인해요.",
      bullet2Prefix: "동물병원 별로",
      bullet2Highlight: "비용과 후기",
      bullet2Suffix: "를 비교해요.",
      bullet3Prefix: "비슷한 고민을 가진 보호자들과",
      bullet3Highlight: "고민을 나눠요.",
      bullet3Suffix: "",
      cta: "내 아이 맞춤 케어 추천 받기",
    },
    howItWorks: {
      title:
        "어느 병원으로 가지?\n치료비는 얼마나 나올까?\n누구에게 물어봐야하지?",
      subtitle:
        "보호자의 걱정을 가장 잘 아는 곳에서, Puddy와 함께 아이의 건강을 위한 새로운 여정을 함께 시작해요.",
      features: [
        {
          title: "흩어진 병원 기록 통합",
          description:
            "여기저기 흩어진 진료 기록과 예방접종 내역을 하나로 모아 관리하세요. 응급 상황에도 바로 대처할 수 있습니다.",
          image: "HealthRecords.png",
        },
        {
          title: "병원비 예측 및 비교",
          description:
            "우리 아이 예상 치료비는 얼마일까요? 근처 병원 가격 비교와 견적을 미리 확인하고 똑똑하게 대비하세요.",
          image: "MedicalCare.png",
        },
        {
          title: "비슷한 고민을 가진 사람들과 이야기해요.",
          description:
            "증상, 치료 과정, 비용 등 실제 경험에서 나온 노하우를 공유하며 더 나은 돌봄 방법을 찾을 수 있어요.",
          image: "Community.png",
        },
      ],
    },
    whyNose: {
      title: "왜 퍼디가 필요한가요?",
      imageAlt: "건강한 노령견",
      descriptionLine1:
        "반려견이 9-10살이 넘어가면 병원비 걱정과 건강 불안이 급증합니다.",
      descriptionLine2Prefix: "하지만 ",
      descriptionLine2Strong: "정확한 데이터와 기록",
      descriptionLine3:
        "이 있다면 막막한 노후 케어도 체계적으로 준비할 수 있습니다.",
      points: [
        {
          title: "강아지 코로 인증해요.",
          description:
            "칩이 없어도 괜찮아요. 코 사진만으로 아이를 정확하게 식별하고 건강 기록을 남길 수 있어요.",
        },
        {
          title: "안전하게 건강 정보를 관리해요.",
          description:
            "블록체인 기술로 아이의 건강 정보를 안전하게 보관해, 언제든 믿고 확인할 수 있어요.",
        },
        {
          title: "맞춤형 건강 솔루션을 제공해요.",
          description:
            "나이와 건강 상태에 맞춰 식단, 영양제, 산책 루틴까지 아이에게 필요한 케어를 제공해줘요.",
        },
      ],
    },
    targetAudience: {
      title: "퍼디, 이런 분들에게 꼭 필요해요",
      targets: [
        {
          icon: "🐕",
          title: "10세 이상 노견 보호자",
          description:
            "병원비 지출이 늘고 아픈 곳이 많아져 기록 관리가 절실한 분",
        },
        {
          icon: "🏥",
          title: "7~9세 중견 보호자",
          description:
            "다가올 노후를 미리 준비하고 남은 시간을 더 건강하게 지켜주고 싶은 분",
        },
        {
          icon: "👩‍⚕️",
          title: "체계적인 관리가 필요한 분",
          description:
            "수첩에 적는 건 이제 그만! 병원 방문, 투약 기록을 앱으로 똑똑하게 관리하고 싶은 분",
        },
      ],
    },
    tryItNow: {
      title: "우리 아이 건강 관리, 지금 시작하세요",
      steps: [
        "화면 하단에 버튼 클릭",
        "반려견 비문(코) 사진으로 신원 등록",
        "기존 병원 기록 불러오고 건강 관리 시작",
      ],
      cta: "내 아이 맞춤 케어 추천 받기",
      note: "※ 지금 등록 시 맞춤형 건강 리포트를 무료로 제공해드립니다.",
    },
    floatingButton: {
      cta: "내 아이 맞춤 케어 추천 받기",
    },
    photoUploadModal: {
      title: "강아지 코 사진을 업로드해주세요",
      cameraError: "카메라에 접근할 수 없습니다. 브라우저 권한을 확인해주세요.",
      chooseFromFile: "파일에서 선택하기",
      loadingCamera: "카메라를 불러오는 중...",
      capture: "사진 촬영하기",
      tip: "지금 등록시 맞춤형 건강 리포트를 무료로 제공해드립니다.",
      previewTitle: "코 부분을 확인해주세요",
      retake: "다시 촬영하기",
      complete: "완료하기",
      proceedWithThis: "이 사진으로 진행하기",
      uploadingTitle: "비문을 분석하고 있어요…",
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
      title: "맞춤형 건강 리포트가 완성되었습니다!",
      registered: "분석 완료",
      reportTitle: "종합 건강 리포트",
      reportOverlay: "앱 서비스 오픈 시에 확인할 수 있습니다.",
      breedAnalysisTitle: "품종 분석",
      breed: "견종",
      breedMix: "믹스",
      ageTitle: "추정 나이",
      ageUnit: "살",
      simpleReportTitle: "간단 리포트",
      simpleReportContent:
        "아이의 피부 상태는 전반적으로 양호하나, 지속적인 관리가 필요합니다. \n눈 건강은 매우 양호하며, 정기적인 검진만으로 충분할 것으로 보입니다.",
      predictionNote: "※ 위 결과는 비문 & 얼굴 분석을 통해 예측한 수치입니다.",
      items: {
        dental: "구강 상태",
        weight: "체중 관리",
        joint: "관절 상태",
        skin: "피부 상태",
        eye: "눈 건강",
        heart: "심장 건강",
      },
      dummyValues: {
        good: "양호",
        caution: "주의",
        check: "검사 필요",
      },
      emailLabel: "정식 서비스 오픈 알림받기",
      emailPlaceholder: "이메일 입력",
      submit: "알림 받기",
      submitting: "등록 중...",
      successAlert: "알림 신청이 완료되었습니다!",
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
      menuWhyNose: "Why Puddy?",
      menuHowItWorks: "Features",
      menuTryIt: "Try it now",
      openMenu: "Open menu",
    },
    hero: {
      imageAlt: "Senior dog image",
      headlinePrefix: "When your dog turns",
      headlineHighlight: "10 years old,",
      headlineSuffix: " you need Puddy.",
      headlineLine2: "Start managing your senior dog's health.",
      bullet1Prefix: "Consolidate",
      bullet1Highlight: "medical records",
      bullet1Suffix: " in one place",
      bullet2Prefix: "Prepare for",
      bullet2Highlight: "unexpected costs",
      bullet2Suffix: " and elderly care",
      bullet3Prefix: "Community with",
      bullet3Highlight: "senior dog owners",
      bullet3Suffix: " sharing concerns",
      cta: "Start Managing Health",
    },
    howItWorks: {
      title: "Problems senior dog owners face, Puddy solves them.",
      features: [
        {
          title: "Unified Medical Records",
          description:
            "Gather scattered medical records and vaccination history in one place. Be ready for emergencies.",
        },
        {
          title: "Cost Prediction & Comparison",
          description:
            "Estimate treatment costs and compare prices of nearby hospitals to prepare smartly.",
        },
        {
          title: "Reliable Senior Care",
          description:
            "Supplements, diet, and exercise guides tailored for senior dogs.",
        },
      ],
    },
    whyNose: {
      title: "Why do you need Puddy?",
      imageAlt: "Healthy senior dog",
      descriptionLine1:
        "When a dog passes 9-10 years old, concerns about hospital bills and health surge.",
      descriptionLine2Prefix: "However, with ",
      descriptionLine2Strong: "accurate data and records",
      descriptionLine3:
        ", you can systematically prepare for their elderly care.",
      points: [
        {
          title: "Identity-based Health Data",
          description:
            "Not just records. We permanently preserve your dog's medical history through accurate nose-print identity verification.",
        },
        {
          title: "Medical Info Community",
          description:
            "Share 'real' information with owners visiting similar hospitals or facing similar symptoms. Clean reviews, no ads.",
        },
        {
          title: "Tailored Senior Solutions",
          description:
            "From supplements to walking routines, we provide healthcare functions specifically for the age and health status.",
        },
      ],
    },
    targetAudience: {
      title: "Puddy is essential for...",
      targets: [
        {
          icon: "🐕",
          title: "Owners of dogs 10+ years old",
          description:
            "Those who need record management due to increasing hospital visits and illnesses.",
        },
        {
          icon: "🏥",
          title: "Owners of dogs 7-9 years old",
          description:
            "Those who want to prepare for their dog's old age in advance.",
        },
        {
          icon: "👩‍⚕️",
          title: "Those needing systematic care",
          description:
            "Stop writing in notebooks! Smartly manage hospital visits and medication logs with the app.",
        },
      ],
    },
    tryItNow: {
      title: "Start preparing for your dog's future now.",
      steps: [
        "Install Puddy and Sign up",
        "Register identity with a nose photo",
        "Load medical records and start health management!",
      ],
      cta: "Try for Free",
      note: "※ We provide a free customized health report upon initial registration.",
    },
    floatingButton: {
      cta: "Start Puddy",
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
      title: "Customized Health Report is Ready!",
      registered: "Analysis Complete",
      reportTitle: "Comprehensive Health Report",
      reportOverlay: "Available upon app launch",
      breedAnalysisTitle: "Breed & Age Analysis",
      breed: "Breed",
      breedMix: "Mix",
      ageTitle: "Estimated Age",
      ageUnit: "years",
      simpleReportTitle: "Summary",
      simpleReportContent:
        "Overall skin condition is good but needs consistent care.\nEye health is excellent with no signs of issues.",
      predictionNote: "* These values are predicted via nose & face analysis.",
      items: {
        dental: "Dental Health",
        weight: "Weight Mgmt",
        joint: "Joint Health",
        skin: "Skin Cond.",
        eye: "Eye Health",
        heart: "Heart Health",
      },
      dummyValues: {
        good: "Good",
        caution: "Caution",
        check: "Check Req.",
      },
      emailLabel: "Get notified when service launches",
      emailPlaceholder: "Enter your email",
      submit: "Notify Me",
      submitting: "Submitting...",
      successAlert: "You have been added to the waitlist!",
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
