# Supabase Storage 설정 가이드

이 프로젝트는 Supabase Storage를 사용하여 이미지를 저장하고, 파일 URL만 Make.com으로 전달합니다.

## 1. Supabase 프로젝트 설정

1. [Supabase](https://supabase.com/)에 로그인
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. 프로젝트 설정에서 다음 정보 확인:
   - Project URL (예: `https://xxxxxxxxxxxxx.supabase.co`)
   - Anon Key (공개 키)

## 2. Storage 버킷 생성

1. Supabase 대시보드 → **Storage** 메뉴로 이동
2. **New bucket** 클릭
3. 버킷 설정:
   - **Name**: `dog-photos`
   - **Public bucket**: ✅ 체크 (공개 접근 허용)
   - **File size limit**: 원하는 최대 크기 설정 (예: 5MB)
   - **Allowed MIME types**: `image/jpeg`, `image/png`, `image/jpg`

## 3. Storage 정책 설정 (RLS)

버킷을 생성한 후, 공개 읽기 접근을 허용해야 합니다:

1. **Storage** → **Policies** 메뉴로 이동
2. `dog-photos` 버킷 선택
3. **New Policy** 클릭
4. 정책 설정:

   - **Policy name**: `Public read access`
   - **Allowed operation**: `SELECT`
   - **Policy definition**:
     ```sql
     (bucket_id = 'dog-photos')
     ```
   - **Policy command**: `SELECT`
   - **Target roles**: `public`

5. 업로드 정책 추가:
   - **Policy name**: `Public upload access`
   - **Allowed operation**: `INSERT`
   - **Policy definition**:
     ```sql
     (bucket_id = 'dog-photos')
     ```
   - **Policy command**: `INSERT`
   - **Target roles**: `public`

## 4. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 정보를 추가:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**주의**: `.env` 파일은 `.gitignore`에 추가되어 있어야 합니다.

## 5. 파일 업로드 동작

### 파일명 형식

- 형식: `dog-nose-{timestamp}-{random}.{extension}`
- 예시: `dog-nose-1704067200000-abc123def.jpg`
- 해시 생성: 타임스탬프 + 랜덤 문자열 조합

### 저장 위치

- 버킷: `dog-photos`
- 경로: `dog-photos/dog-nose-{hash}.jpg`

### 공개 URL 형식

```
https://xxxxxxxxxxxxx.supabase.co/storage/v1/object/public/dog-photos/dog-nose-{hash}.jpg
```

## 6. Make.com 연동

이제 Make.com으로 전달되는 데이터는 파일 URL만 포함합니다:

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

### Make.com에서 사진 사용

이제 Make.com 시나리오에서:

1. **Google Drive 업로드** 단계를 제거하거나
2. **HTTP → Make a request** 모듈로 Supabase URL에서 이미지 다운로드 후 Google Drive에 저장

또는 Notion 데이터베이스에 직접 URL을 저장하면 됩니다.

## 7. 문제 해결

### 업로드가 실패하는 경우

- Supabase 환경 변수가 올바른지 확인
- Storage 버킷이 생성되었는지 확인
- 버킷 정책(RLS)이 올바르게 설정되었는지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### 파일이 공개되지 않는 경우

- 버킷의 "Public bucket" 설정 확인
- Storage 정책에서 SELECT 권한 확인

### 파일명 충돌

- 각 파일은 고유한 해시 값을 가지므로 충돌 가능성은 매우 낮습니다
- 만약 충돌이 발생하면 `upsert: false` 설정으로 인해 에러가 발생합니다

## 8. 보안 고려사항

- Anon Key는 공개되어도 되지만, Rate Limiting이 적용됩니다
- 민감한 데이터는 Service Role Key를 사용하는 별도 백엔드에서 처리하세요
- Storage 버킷의 정책을 적절히 설정하여 무단 접근을 방지하세요
