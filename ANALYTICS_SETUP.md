# Google Analytics 설정 가이드

이 프로젝트는 Google Analytics 4 (GA4)를 사용하여 사용자 행동을 추적합니다.

## 1. Google Analytics 계정 생성 및 측정 ID 발급

1. [Google Analytics](https://analytics.google.com/)에 접속
2. 계정 생성 또는 기존 계정 선택
3. 속성(Property) 생성 → "웹" 선택
4. 측정 ID 발급 (형식: `G-XXXXXXXXXX`)

## 2. 측정 ID 설정

### 방법 1: 환경 변수 사용 (권장)

프로젝트 루트에 `.env` 파일을 생성하고 측정 ID를 추가하세요:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**주의**: `.env` 파일은 `.gitignore`에 추가되어 있어야 합니다. 실제 측정 ID는 공개 저장소에 커밋하지 마세요.

### 방법 2: main.tsx에서 직접 입력

`src/main.tsx` 파일에서 직접 측정 ID를 입력:

```typescript
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // 여기에 실제 측정 ID 입력
```

**참고**: 환경 변수가 설정되지 않으면 Google Analytics가 자동으로 비활성화됩니다.

## 3. 추적되는 이벤트

다음 이벤트들이 자동으로 추적됩니다:

### 기본 이벤트

- **site_visit**: 사이트 접속 (하루에 한 번만 카운트)
- **page_view**: 페이지 조회

### 사용자 행동 이벤트

- **photo_upload_button_click**: 코 사진 등록 버튼 클릭
- **photo_upload_start**: 사진 업로드 시작
- **photo_upload_complete**: 사진 업로드 완료
- **registration_button_click**: 정식 등록 버튼 클릭
- **registration_complete**: 정식 등록 완료

## 4. Google Analytics에서 데이터 확인

1. Google Analytics 대시보드 접속
2. 보고서 → 참여도 → 이벤트 메뉴로 이동
3. 각 이벤트별 통계 확인 가능

## 5. 로컬 스토리지 백업

모든 이벤트는 로컬 스토리지에도 저장됩니다 (최근 1000개).
개발자 도구 콘솔에서 다음 명령어로 확인 가능:

```javascript
// 통계 조회
import { getAnalyticsStats } from "@/utils/analytics";
console.log(getAnalyticsStats());

// 이벤트 목록 조회
const events = JSON.parse(localStorage.getItem("analytics_events") || "[]");
console.log(events);
```

## 6. 전환율 계산

Google Analytics에서 다음과 같은 전환율을 확인할 수 있습니다:

- **버튼 클릭률**: `photo_upload_button_click / site_visit`
- **업로드 완료율**: `photo_upload_complete / photo_upload_start`
- **등록 전환율**: `registration_complete / registration_button_click`
- **전체 전환율**: `registration_complete / site_visit`

## 7. 커스텀 이벤트 추가

새로운 이벤트를 추가하려면 `src/utils/analytics.ts`에 함수를 추가하고 컴포넌트에서 호출하세요:

```typescript
// analytics.ts에 추가
export const trackCustomEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  trackEvent(eventName, params);
};

// 컴포넌트에서 사용
import { trackCustomEvent } from "@/utils/analytics";
trackCustomEvent("button_click", { button_name: "특정 버튼" });
```
