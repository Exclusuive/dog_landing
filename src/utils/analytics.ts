// 이벤트 추적 유틸리티
// Google Analytics 4와 호환되는 형식으로 작성됨

interface AnalyticsEvent {
  event_name: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

// Google Analytics 4가 설정되어 있는지 확인
const isGA4Available = (): boolean => {
  return (
    typeof window !== "undefined" && typeof (window as any).gtag === "function"
  );
};

// 이벤트 추적 함수
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  // Google Analytics 4에 이벤트 전송
  if (isGA4Available()) {
    (window as any).gtag("event", eventName, params);
  }

  // 로컬 스토리지에 이벤트 저장 (백업 및 분석용)
  const events = JSON.parse(localStorage.getItem("analytics_events") || "[]");
  const eventData: AnalyticsEvent = {
    event_name: eventName,
    timestamp: new Date().toISOString(),
    ...params,
  };
  events.push(eventData);

  // 최근 1000개 이벤트만 저장
  const recentEvents = events.slice(-1000);
  localStorage.setItem("analytics_events", JSON.stringify(recentEvents));
};

// 페이지뷰 추적
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  trackEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

// 사이트 접속 추적
export const trackSiteVisit = () => {
  const visitKey = `visit_${new Date().toDateString()}`;
  const hasVisitedToday = localStorage.getItem(visitKey);

  if (!hasVisitedToday) {
    trackEvent("site_visit", {
      visit_date: new Date().toISOString(),
    });
    localStorage.setItem(visitKey, "true");
  }
};

// 코 사진 등록 버튼 클릭 추적
export const trackPhotoUploadButtonClick = () => {
  trackEvent("photo_upload_button_click", {
    event_category: "engagement",
    event_label: "코 사진 등록 버튼",
  });
};

// 사진 업로드 시작 추적
export const trackPhotoUploadStart = () => {
  trackEvent("photo_upload_start", {
    event_category: "upload",
    event_label: "사진 업로드 시작",
  });
};

// 사진 업로드 완료 추적
export const trackPhotoUploadComplete = () => {
  trackEvent("photo_upload_complete", {
    event_category: "upload",
    event_label: "사진 업로드 완료",
  });
};

// 정식 등록 버튼 클릭 추적
export const trackRegistrationButtonClick = () => {
  trackEvent("registration_button_click", {
    event_category: "conversion",
    event_label: "정식 등록 버튼 클릭",
  });
};

// 정식 등록 완료 추적
export const trackRegistrationComplete = (dogInfo?: {
  name?: string;
  breed?: string;
  age?: string;
  gender?: string;
}) => {
  trackEvent("registration_complete", {
    event_category: "conversion",
    event_label: "정식 등록 완료",
    dog_name: dogInfo?.name,
    breed: dogInfo?.breed,
    age: dogInfo?.age,
    gender: dogInfo?.gender,
  });
};

// 통계 조회 함수 (개발/디버깅용)
export const getAnalyticsStats = () => {
  const events = JSON.parse(localStorage.getItem("analytics_events") || "[]");

  const stats = {
    total_events: events.length,
    site_visits: events.filter(
      (e: AnalyticsEvent) => e.event_name === "site_visit"
    ).length,
    photo_upload_clicks: events.filter(
      (e: AnalyticsEvent) => e.event_name === "photo_upload_button_click"
    ).length,
    photo_uploads_started: events.filter(
      (e: AnalyticsEvent) => e.event_name === "photo_upload_start"
    ).length,
    photo_uploads_completed: events.filter(
      (e: AnalyticsEvent) => e.event_name === "photo_upload_complete"
    ).length,
    registration_clicks: events.filter(
      (e: AnalyticsEvent) => e.event_name === "registration_button_click"
    ).length,
    registrations_completed: events.filter(
      (e: AnalyticsEvent) => e.event_name === "registration_complete"
    ).length,
  };

  return stats;
};

// 통계 초기화 함수
export const clearAnalytics = () => {
  localStorage.removeItem("analytics_events");
  // 날짜별 방문 기록도 초기화
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("visit_")) {
      localStorage.removeItem(key);
    }
  });
};
