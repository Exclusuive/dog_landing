// Make.com 웹훅 연동 유틸리티

interface RegistrationData {
  dogName: string;
  breed: string;
  age: string;
  gender: string;
  email: string;
  noseID?: string;
  photoUrl?: string;
  photoPath?: string;
  photoTimestamp?: string;
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
        // 반려견 정보
        dog_name: data.dogName,
        breed: data.breed,
        age: data.age,
        gender: data.gender === "male" ? "수컷" : "암컷",
        email: data.email,

        // Puddy ID
        nose_id: "001-001-" + Math.floor(Math.random() * 1000000),

        // 사진 정보 (Supabase URL)
        photo_url: data.photoUrl || "",
        photo_path: data.photoPath || "",
        photo_timestamp: data.photoTimestamp || new Date().toISOString(),

        // 메타데이터
        registration_date: new Date().toISOString(),
        registration_timestamp: Date.now(),
        landing_type: "Gene_Dog",
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
