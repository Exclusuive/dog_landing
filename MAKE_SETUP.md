# Make.com 연동 설정 가이드

이 프로젝트는 Make.com을 통해 등록 데이터를 Notion 데이터베이스와 Google Drive에 자동으로 저장합니다.

## 1. Make.com 웹훅 URL 발급

1. [Make.com](https://www.make.com/)에 로그인
2. 새 시나리오 생성
3. 첫 번째 모듈로 **"Webhooks" → "Custom webhook" → "Receive a webhook"** 선택
4. 웹훅 URL 복사 (예: `https://hook.eu1.make.com/xxxxxxxxxxxxx`)

## 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 웹훅 URL을 추가:

```env
VITE_MAKE_WEBHOOK_URL=https://hook.eu1.make.com/xxxxxxxxxxxxx
```

## 3. Make.com 시나리오 구성

### 3.1 웹훅 설정

1. **Webhooks → Custom webhook → Receive a webhook**
   - 웹훅 이름: "Puddy Registration"
   - 데이터 구조는 자동으로 인식됩니다

### 3.2 Google Drive에 사진 저장 (선택사항)

이미지는 Supabase Storage에 저장되므로, Google Drive에 백업하려는 경우에만 다음 단계를 수행하세요.

#### 방법 1: HTTP 요청으로 Supabase에서 이미지 다운로드 후 업로드

1. **HTTP → Make a request** 모듈 추가 (이미지 다운로드)

   - **URL**: `{{photo_url}}`
   - **Method**: GET
   - **Response type**: File

2. **Google Drive → Upload a file** 모듈 추가
   - 연결 설정: Google 계정 연결
   - **Folder**: 원하는 폴더 선택 (예: "Puddy Photos")
   - **File**: 위에서 다운로드한 파일 사용
   - **File name**: `{{dog_name}}_{{nose_id}}_{{registration_timestamp}}.jpg`

#### 방법 2: Notion에 직접 URL 저장 (권장)

Supabase URL을 Notion 데이터베이스에 직접 저장하면 Google Drive 백업이 필요 없습니다.

### 3.3 Notion 데이터베이스에 정보 저장

1. **Notion → Create a database item** 모듈 추가
2. 연결 설정:
   - Notion 계정 연결
   - 데이터베이스 선택 (아래 Notion 데이터베이스 구조 참고)
3. 필드 매핑:
   - **반려견 이름**: `{{dog_name}}`
   - **견종**: `{{breed}}`
   - **나이**: `{{age}}`
   - **성별**: `{{gender}}`
   - **전화번호**: `{{phone}}`
   - **Puddy ID**: `{{nose_id}}`
   - **등록일**: `{{registration_date}}`
   - **사진 URL**: `{{photo_url}}` (Supabase Storage URL)

## 4. Notion 데이터베이스 구조

다음 필드들을 가진 데이터베이스를 생성하세요:

| 필드명      | 타입   | 설명                   |
| ----------- | ------ | ---------------------- |
| 반려견 이름 | Title  | 반려견 이름            |
| 견종        | Text   | 견종                   |
| 나이        | Number | 나이                   |
| 성별        | Select | 수컷/암컷              |
| 전화번호    | Phone  | 보호자 전화번호        |
| Puddy ID    | Text   | 고유 식별번호          |
| 등록일      | Date   | 등록 날짜              |
| 사진 URL    | URL    | Google Drive 사진 링크 |

### Notion 데이터베이스 생성 방법

1. Notion에서 새 페이지 생성
2. `/database` 입력하여 데이터베이스 생성
3. 위 표에 따라 필드 추가
4. 데이터베이스 URL 복사하여 Make.com에 연결

## 5. 전체 시나리오 흐름

```
[웹훅 수신]
    ↓
[Notion 데이터베이스에 정보 저장]
    (사진은 이미 Supabase에 저장되어 있음)
    ↓
[완료]
```

**참고**: 이미지는 이미 Supabase Storage에 업로드되어 있으므로, Make.com에서는 URL만 Notion에 저장하면 됩니다.

## 6. 테스트

1. Make.com 시나리오 실행
2. 웹 애플리케이션에서 등록 테스트
3. Make.com 실행 기록에서 데이터 확인
4. Notion 데이터베이스와 Google Drive에서 결과 확인

## 7. 전송되는 데이터 형식

```json
{
  "dog_name": "뽀삐",
  "breed": "골든 리트리버",
  "age": "3",
  "gender": "수컷",
  "phone": "010-1234-5678",
  "nose_id": "DOG-XXXX-XXXX-XXXX",
  "photo_url": "https://xxxxxxxxxxxxx.supabase.co/storage/v1/object/public/dog-photos/dog-nose-1704067200000-abc123def.jpg",
  "photo_path": "dog-photos/dog-nose-1704067200000-abc123def.jpg",
  "photo_timestamp": "2024-01-01T00:00:00.000Z",
  "registration_date": "2024-01-01T00:00:00.000Z",
  "registration_timestamp": 1704067200000
}
```

**변경 사항**:

- `photo_base64` → `photo_url` 및 `photo_path`로 변경
- 이미지는 Supabase Storage에 저장되며, URL만 전달됩니다

## 8. 문제 해결

### 웹훅이 작동하지 않는 경우

- 환경 변수 `VITE_MAKE_WEBHOOK_URL` 확인
- Make.com 웹훅 URL이 올바른지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### 사진 URL이 없는 경우

- Supabase Storage 업로드가 성공했는지 확인
- 브라우저 콘솔에서 Supabase 업로드 에러 확인
- `photo_url` 필드가 웹훅 데이터에 포함되어 있는지 확인

### Notion에 데이터가 저장되지 않는 경우

- Notion 데이터베이스 권한 확인
- 필드 이름이 정확한지 확인
- Make.com 실행 기록에서 에러 확인

## 9. 보안 고려사항

- 웹훅 URL은 환경 변수로 관리하고 공개 저장소에 커밋하지 마세요
- Google Drive 폴더 접근 권한을 적절히 설정하세요
- Notion 데이터베이스는 필요한 사람에게만 공유하세요
