// Supabase 클라이언트 설정
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 전역 변수를 사용하여 싱글톤 보장 (모듈이 여러 번 로드되어도 동일한 인스턴스 사용)
declare global {
  var __supabaseClient: SupabaseClient | undefined;
}

// 싱글톤 패턴으로 클라이언트 생성 (중복 생성 방지)
function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Supabase 환경 변수가 설정되지 않았습니다. VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를 확인하세요."
    );
    return null;
  }

  // URL 검증 (잘못된 형식 방지)
  if (!supabaseUrl.startsWith("https://") || supabaseUrl.includes("/storage")) {
    console.error(
      "Supabase URL이 잘못되었습니다. 형식: https://xxxxx.supabase.co (경로 포함하지 않음)"
    );
    return null;
  }

  // 브라우저 환경에서만 실행 (클라이언트 사이드)
  if (typeof window === "undefined") {
    return null;
  }

  // 전역 변수를 사용하여 싱글톤 보장
  if (!(window as any).__supabaseClient) {
    (window as any).__supabaseClient = createClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        auth: {
          persistSession: false, // 세션을 localStorage에 저장하지 않음
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
        global: {
          headers: {
            "x-client-info": "puddy-landing",
          },
        },
      }
    );
  }
  return (window as any).__supabaseClient;
}

export const supabase = getSupabaseClient();

/**
 * 파일명에 사용할 해시 생성
 */
export const generateFileHash = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}`;
};

/**
 * 이미지를 Supabase Storage에 업로드
 */
export const uploadImageToSupabase = async (
  file: File | Blob,
  fileName?: string
): Promise<{ url: string; path: string } | null> => {
  if (!supabase) {
    console.error("Supabase 클라이언트가 초기화되지 않았습니다.");
    return null;
  }

  try {
    // 파일명 생성 (해시 포함)
    const hash = generateFileHash();
    const date = new Date();
    const fileExtension =
      file instanceof File ? file.name.split(".").pop() || "jpg" : "jpg";
    const finalFileName = fileName || `${hash}_${date.getTime()}.${fileExtension}`;

    // Storage 경로 (버킷 이름: 'images')
    const filePath = `${finalFileName}`;

    // 파일 업로드
    const { error } = await supabase.storage
      .from("images")
      .upload(filePath, file, {
        contentType: file.type || "image/jpeg",
        upsert: false, // 동일한 파일명이 있으면 에러
      });

    if (error) {
      console.error("Supabase 업로드 에러:", error);
      console.error("에러 상세:", {
        message: error.message,
        name: error.name,
      });

      // 버킷이 존재하지 않는 경우
      if (
        error.message?.includes("Bucket") ||
        error.message?.includes("not found")
      ) {
        console.error(
          "Storage 버킷 'images'가 존재하지 않습니다. Supabase 대시보드에서 버킷을 생성해주세요."
        );
      }

      // 권한 오류
      if (
        error.message?.includes("permission") ||
        error.message?.includes("policy")
      ) {
        console.error(
          "Storage 버킷에 대한 업로드 권한이 없습니다. Supabase 대시보드에서 RLS 정책을 확인해주세요."
        );
      }

      return null;
    }

    // 공개 URL 가져오기
    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(filePath);

    return {
      url: publicUrl,
      path: filePath,
    };
  } catch (error) {
    console.error("이미지 업로드 중 오류:", error);
    return null;
  }
};

/**
 * Base64 문자열을 Blob으로 변환
 */
export const base64ToBlob = (base64String: string): Blob | null => {
  try {
    // data URL prefix 제거
    const base64Data = base64String.includes(",")
      ? base64String.split(",")[1]
      : base64String;

    // Base64 디코딩
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // MIME 타입 추출
    const mimeMatch = base64String.match(/data:([^;]+);/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";

    return new Blob([byteArray], { type: mimeType });
  } catch (error) {
    console.error("Base64 to Blob 변환 실패:", error);
    return null;
  }
};
