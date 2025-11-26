import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UploadResult from "./UploadResult";
import {
  trackPhotoUploadStart,
  trackPhotoUploadComplete,
} from "@/utils/analytics";
import { uploadImageToSupabase } from "@/utils/supabase";

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";
type ResultType = "new" | "matched" | "error";

export default function PhotoUploadModal({
  isOpen,
  onClose,
}: PhotoUploadModalProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [resultType, setResultType] = useState<ResultType>("new");
  const [errorMessage, setErrorMessage] = useState("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string>("");
  const [capturedImageUrl, setCapturedImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 카메라 스트림 시작
  useEffect(() => {
    if (isOpen && status === "idle") {
      const startCamera = async () => {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }, // 후면 카메라 우선
          });
          streamRef.current = mediaStream;
          setStream(mediaStream);
          setCameraError("");
        } catch (error) {
          console.error("카메라 접근 오류:", error);
          setCameraError(
            "카메라에 접근할 수 없습니다. 브라우저 권한을 확인해주세요."
          );
        }
      };

      startCamera();
    }

    // 정리 함수
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        setStream(null);
      }
    };
  }, [isOpen, status]);

  // 비디오 요소에 스트림 연결 및 재생
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((error) => {
        console.error("비디오 재생 오류:", error);
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // 캔버스 크기를 비디오 크기에 맞춤
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 비디오 프레임을 캔버스에 그리기 (좌우 반전 반영)
    context.save();
    context.scale(-1, 1);
    context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    context.restore();

    // 캔버스에서 Blob으로 변환
    canvas.toBlob(
      async (blob) => {
        if (!blob) return;

        // Blob을 File 객체로 변환
        const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

        // 카메라 스트림 정리
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
          setStream(null);
        }

        // 파일 업로드 처리 (Supabase에 업로드)
        await processFile(file);
      },
      "image/jpeg",
      0.95
    );
  };

  const processFile = async (file: File) => {
    // 파일 형식 검증
    if (!file.type.match(/^image\/(jpeg|jpg|png)$/i)) {
      setStatus("error");
      setResultType("error");
      setErrorMessage("JPG, PNG 형식의 이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    setStatus("uploading");
    trackPhotoUploadStart();

    // Supabase에 이미지 업로드
    const uploadResult = await uploadImageToSupabase(file);

    if (!uploadResult) {
      setStatus("error");
      setResultType("error");
      setErrorMessage("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      return;
    }

    // 업로드된 이미지 URL 저장
    setCapturedImageUrl(uploadResult.url);
    localStorage.setItem("dogNosePhotoUrl", uploadResult.url);
    localStorage.setItem("dogNosePhotoPath", uploadResult.path);
    localStorage.setItem("dogNosePhotoTimestamp", new Date().toISOString());

    try {
      // 처리 시뮬레이션 (짧은 딜레이)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 항상 성공으로 처리
      setResultType("new");
      setStatus("success");
      trackPhotoUploadComplete();
    } catch (error) {
      setStatus("error");
      setResultType("error");
      setErrorMessage(
        "잠시 인식 서버에 문제가 발생했어요. 몇 분 뒤 다시 시도해주시겠어요?"
      );
    }
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 카메라 스트림 정리
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setStream(null);
    }

    await processFile(file);
  };

  const handleReset = () => {
    setStatus("idle");
    setResultType("new");
    setErrorMessage("");
    setCameraError("");
    setCapturedImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // 카메라 스트림 재시작은 useEffect에서 처리됨
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[90%] sm:w-3/4 max-w-2xl h-[85vh] overflow-hidden p-0 flex flex-col">
        {status === "idle" && (
          <div className="flex flex-col h-full p-4 sm:p-6">
            <DialogHeader className="mb-4 flex-shrink-0">
              <DialogTitle className="text-lg sm:text-xl text-center font-bold text-black">
                반려견의 코 사진을 업로드해주세요
              </DialogTitle>
            </DialogHeader>

            {/* Camera View */}
            <div
              className="rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm bg-black relative w-full flex-1"
              style={{ height: "60vh", minHeight: "200px" }}
            >
              {cameraError ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <svg
                    className="w-16 h-16 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm text-gray-500 mb-4">{cameraError}</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload">
                    <Button
                      asChild
                      variant="outline"
                      className="cursor-pointer"
                    >
                      <span>파일에서 선택하기</span>
                    </Button>
                  </label>
                </div>
              ) : stream ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                    onLoadedMetadata={(e) => {
                      const video = e.currentTarget;
                      video.play().catch((error) => {
                        console.error("비디오 재생 오류:", error);
                      });
                    }}
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <p className="text-sm text-gray-500">
                      카메라를 불러오는 중...
                    </p>
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed text-center mt-2 mb-4">
              밝은 조명에서 정면을 향한 사진이 가장 좋습니다.
            </p>

            {/* Capture Button */}
            {stream && !cameraError && (
              <div className="mb-4">
                <Button
                  onClick={capturePhoto}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm sm:text-base py-4 h-auto font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    사진 촬영하기
                  </span>
                </Button>
              </div>
            )}

            {/* Upload Button (Fallback) */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileSelect}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload">
                <Button
                  asChild
                  variant="outline"
                  className="w-full text-sm sm:text-base py-4 h-auto font-semibold rounded-xl"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    파일에서 선택하기
                  </span>
                </Button>
              </label>
            </div>
          </div>
        )}

        {status === "uploading" && (
          <div className="py-16 sm:py-20 text-center px-6">
            <div className="relative inline-block mb-6">
              <div className="text-6xl sm:text-7xl mb-4 animate-bounce">🐶</div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 rounded-full animate-ping"></div>
            </div>
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              반려견의 비문을 분석하고 있어요…
            </p>
            <p className="text-sm sm:text-base text-gray-500">
              약 3~5초 소요됩니다
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="flex-1 overflow-y-auto">
            <UploadResult
              imageUrl={capturedImageUrl}
              onReset={handleReset}
              onClose={handleClose}
            />
          </div>
        )}

        {status === "error" && resultType === "error" && (
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                인식 실패
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-md mx-auto">
                {errorMessage}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full sm:w-auto px-6 py-3"
              >
                다시 시도하기
              </Button>
              <Button
                onClick={handleClose}
                className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-6 py-3"
              >
                닫기
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
