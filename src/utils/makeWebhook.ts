interface RegistrationData {
  // 최소 필요 데이터
  email: string; // 서비스 안내를 받을 이메일
  noseID?: string; // 반려견 고유 Nose ID

  // 사진 관련 데이터 (Supabase 등에서 온 값)
  photoUrl?: string;
  photoPath?: string;
  photoTimestamp?: string;

  // 향후 확장용(현재 웹훅 전송에는 사용하지 않음)
  dogName?: string;
  breed?: string;
  age?: string;
  gender?: string;
}

/**
 * Make.com 웹훅에 등록 데이터 전송
 */
export const sendRegistrationToMake = async (
  data: RegistrationData
): Promise<boolean> => {
  const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("Make.com 웹훅 URL이 설정되지 않았습니다.");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // 최소 전송 데이터
        email: data.email || "",
        nose_id: data.noseID || "",

        // 사진 정보
        photo_url: data.photoUrl || "",
        photo_path: data.photoPath || "",
        photo_timestamp: data.photoTimestamp || new Date().toISOString(),

        // 메타데이터 (공통)
        registration_date: new Date().toISOString(), // ISO 날짜
        registration_timestamp: Date.now(), // ms 타임스탬프
        landing_type: "SY", // 어떤 랜딩에서 왔는지 구분용
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Make.com 웹훅 응답:", result);
    return true;
  } catch (error) {
    console.error("Make.com 웹훅 전송 실패:", error);
    return false;
  }
};

/**
 * localStorage에서 사진 URL 가져오기
 */
export const getStoredPhotoData = (): {
  url: string;
  path: string;
  timestamp: string;
} | null => {
  try {
    const photoUrl = localStorage.getItem("dogNosePhotoUrl");
    const photoPath = localStorage.getItem("dogNosePhotoPath");
    const photoTimestamp = localStorage.getItem("dogNosePhotoTimestamp");

    if (photoUrl && photoPath && photoTimestamp) {
      return {
        url: photoUrl,
        path: photoPath,
        timestamp: photoTimestamp,
      };
    }
    return null;
  } catch (error) {
    console.error("사진 데이터 가져오기 실패:", error);
    return null;
  }
};

/**
 * localStorage에서 Puddy ID 가져오기
 */
export const getStoredNoseID = (): string | null => {
  try {
    return localStorage.getItem("dogNoseID");
  } catch (error) {
    console.error("Puddy ID 가져오기 실패:", error);
    return null;
  }
};
