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
      imageAlt: "반려견 이미지",
      headlinePrefix: "",
      headlineHighlight: "유전자 검사로",
      headlineSuffix: "알아보는",
      headlineLine2: "우리 아이 건강 관리",
      bullet1Prefix: "유전자 검사를 기반으로",
      bullet1Highlight: "아이의 건강을 미리 살펴봐요.",
      bullet1Suffix: "",
      bullet2Prefix: "AI로",
      bullet2Highlight: "치료비를 예측하고, ",
      bullet2Suffix: "병원 리뷰로 믿을 수 있는 병원을 찾아요.",
      bullet3Prefix: "비슷한 고민을 가진 보호자들과 ",
      bullet3Highlight: "함께 이야기해요.",
      bullet3Suffix: "",
      cta: "무료 유전자 검사 신청하기",
    },
    howItWorks: {
      title: "보험 가입 \n 더 이상 불안할 필요 없어요.",
      subtitle: "아이의 건강을 미리 알고, 딱 맞는 보장만 똑똑하게 선택하세요.",
      features: [
        {
          title: "더 정확한 진료를 위한 통합 관리",
          description:
            "유전자 검사와 진료 기록을 함께 활용해, 아이에게 더 정확한 진료를 받을 수 있어요. 진료 기록을 한 번에 보관해 병원이 바뀌어도 매번 설명할 필요가 없어요.",
          image: "HealthRecords.png",
        },
        {
          title: "미리 아는 치료비, 믿고 고르는 병원",
          description:
            "AI로 치료비를 예측하고, 보호자들의 솔직한 리뷰로 믿을 수 있는 병원을 선택해요.",
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
      imageAlt: "반려견 이미지",
      descriptionLine1: "강아지 건강을 미리 알고,",
      descriptionLine2Prefix: "병원에서는 정확하게 전달하고,",
      descriptionLine2Strong: "",
      descriptionLine3: "중요한 정보는 안전하게 지키기 위해.",
      descriptionLine4: "퍼디는 그렇게 만들어졌습니다.",
      points: [
        {
          title: "무료 유전자 검사",
          description:
            "지금 바로 사전예약하면 유전자 검사를 무료로 제공해드립니다. 우리 아이의 건강을 미리 알아보세요.",
        },
        {
          title: "비문으로 한 번에 인증해요",
          description:
            "병원 갈 때마다 설명하지 않아도 돼요. 코로 신원을 확인하고 아이의 건강을 정확하게 전달할 수 있어요.",
        },
        {
          title: "안전하게 건강 정보를 관리해요.",
          description:
            "블록체인 기술로 아이의 건강 정보를 안전하게 보관해, 언제든 믿고 확인할 수 있어요.",
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
      title: "무료 유전자 검사 신청하기",
      steps: [
        "화면 하단 버튼 클릭",
        "반려견 비문(코) 사진으로 신원 등록",
        "사전예약 완료 시 유전자 검사 무료 제공",
      ],
      cta: "무료 유전자 검사 신청하기",
      note: "※ 지금 등록하면 유전자 검사를 무료로 제공해드립니다.",
    },
    floatingButton: {
      cta: "무료 유전자 검사 신청하기",
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
      reportTitle: "강아지 비문 분석 결과",
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
      emailLabel: "유전자 검사 무료 알림받기",
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
      imageAlt: "Pet image",
      headlinePrefix: "",
      headlineHighlight: "Customized Health Management Pet Care Service",
      headlineSuffix: "",
      headlineLine2:
        "Know your pet's health in advance through genetic testing and choose insurance wisely.",
      bullet1Prefix: "Dual verification with ",
      bullet1Highlight: "genetic testing + nose print",
      bullet1Suffix: " for customized insurance recommendations",
      bullet2Prefix: "Find trusted hospitals with ",
      bullet2Highlight: "real hospital reviews",
      bullet2Suffix: " from satisfied pet owners",
      bullet3Prefix: "Share information with pet owners in ",
      bullet3Highlight: "customized communities",
      bullet3Suffix: " who have similar pets",
      cta: "Start Free Genetic Testing",
    },
    howItWorks: {
      title:
        "The problem of hiding health information before insurance enrollment\nand filing claims immediately after enrollment,\ncan now be solved.",
      features: [
        {
          title:
            "Dual Verification Insurance Recommendation (Genetic Testing + Nose Print)",
          description:
            "Accurately understand health information through genetic testing and verify identity with nose prints to solve post-enrollment insurance issues. Get insurance recommendations that are most suitable for your pet.",
        },
        {
          title: "Real Hospital Reviews from Satisfied Pet Owners",
          description:
            "Check honest hospital reviews from pet owners who actually visited and were satisfied. Compare all information including treatment quality, costs, and services at a glance.",
        },
        {
          title: "Customized Community & Pedigree Verification",
          description:
            "Share information with pet owners who have similar pets, and verify your pet's pedigree through genetic testing. Learn health management tips for the same breed.",
        },
      ],
    },
    whyNose: {
      title: "Why do you need Puddy?",
      imageAlt: "Pet image",
      descriptionLine1:
        "Many pet owners are concerned about the problem of hiding health information before insurance enrollment and filing claims immediately after enrollment.",
      descriptionLine2Prefix: "However, with ",
      descriptionLine2Strong:
        "dual verification through genetic testing and nose prints",
      descriptionLine3:
        ", you can receive optimal insurance recommendations based on accurate health information.",
      points: [
        {
          title: "Free Genetic Testing (Pre-registration)",
          description:
            "We provide free genetic testing when you pre-register on the landing page. Know your pet's health information in advance and choose insurance wisely.",
        },
        {
          title: "Dual Verification (Nose Print + Genetic Testing)",
          description:
            "Verify identity with nose prints and accurately understand health information through genetic testing to solve post-enrollment insurance issues.",
        },
        {
          title: "Pedigree Verification Feature",
          description:
            "Verify your pet's exact breed and pedigree through genetic testing. Receive customized health management information for the same breed.",
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
      title: "Start Free Genetic Testing",
      steps: [
        "Click the button at the bottom",
        "Register identity with your pet's nose print photo",
        "Free genetic testing provided upon pre-registration",
      ],
      cta: "Start Free Genetic Testing",
      note: "※ Free genetic testing is provided upon pre-registration. (Banksalad Genetic Testing)",
    },
    floatingButton: {
      cta: "Start Free Genetic Testing",
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
