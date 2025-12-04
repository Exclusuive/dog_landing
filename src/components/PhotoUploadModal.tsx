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

type UploadStatus = "idle" | "preview" | "uploading" | "success" | "error";
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
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const [processedImageUrl, setProcessedImageUrl] = useState<string>("");
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

        // 미리보기 URL 생성
        const previewUrl = URL.createObjectURL(file);
        setPreviewImageUrl(previewUrl);

        // 사진 확인 단계로 이동
        setStatus("preview");
      },
      "image/jpeg",
      0.95
    );
  };

  const processFile = (file: File) => {
    // 파일 형식 검증
    if (!file.type.match(/^image\/(jpeg|jpg|png)$/i)) {
      setStatus("error");
      setResultType("error");
      setErrorMessage("JPG, PNG 형식의 이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    // 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(file);
    setPreviewImageUrl(previewUrl);

    // 사진 확인 단계로 이동
    setStatus("preview");
  };

  const startUpload = async (file: File) => {
    // 업로드 시작
    setStatus("uploading");
    trackPhotoUploadStart();

    try {
      // localhost:8000으로 이미지 전송
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://ec2-98-92-0-77.compute-1.amazonaws.com:8000/exclusuive/segment-nose",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("이미지 처리에 실패했습니다.");
      }

      // 응답으로 받은 이미지 URL (Blob으로 처리)
      const blob = await response.blob();
      const processedImageUrl = URL.createObjectURL(blob);
      setProcessedImageUrl(processedImageUrl);

      // Supabase에 원본 이미지 업로드
      const uploadResult = await uploadImageToSupabase(file);

      if (!uploadResult) {
        // 에러 발생 시 미리보기 URL 정리
        if (previewImageUrl) {
          URL.revokeObjectURL(previewImageUrl);
          setPreviewImageUrl("");
        }
        if (processedImageUrl) {
          URL.revokeObjectURL(processedImageUrl);
          setProcessedImageUrl("");
        }
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

      // 처리된 이미지를 previewImageUrl로 설정하고 preview 단계로 이동
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
      setPreviewImageUrl(processedImageUrl);

      // preview 단계로 이동하여 처리된 이미지를 보여줌
      setStatus("preview");
      trackPhotoUploadComplete();
    } catch (error) {
      console.error("이미지 처리 중 오류:", error);
      setStatus("error");
      setResultType("error");
      setErrorMessage(
        "잠시 인식 서버에 문제가 발생했어요. 몇 분 뒤 다시 시도해주시겠어요?"
      );
      // 에러 발생 시 URL 정리
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
        setPreviewImageUrl("");
      }
      if (processedImageUrl) {
        URL.revokeObjectURL(processedImageUrl);
        setProcessedImageUrl("");
      }
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
    // 미리보기 URL 정리
    if (previewImageUrl) {
      URL.revokeObjectURL(previewImageUrl);
      setPreviewImageUrl("");
    }
    if (processedImageUrl) {
      URL.revokeObjectURL(processedImageUrl);
      setProcessedImageUrl("");
    }
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
      <DialogContent className="w-[90%] sm:w-3/4 max-w-2xl min-h-[40vh] h-fit overflow-hidden p-0 flex flex-col [&>button[data-slot='dialog-close']]:hidden">
        {status === "idle" && (
          <div className="flex flex-col h-full p-4 sm:p-6">
            <DialogHeader className="mb-4 flex-shrink-0 flex flex-row items-center justify-between">
              <DialogTitle
                className="w-full text-center text-lg sm:text-xl font-bold"
                style={{ color: "#111111" }}
              >
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
                    className="w-16 h-16 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: "#767676" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm mb-4" style={{ color: "#767676" }}>
                    {cameraError}
                  </p>
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
                      style={{ color: "#111111" }}
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
                <div className="flex items-center justify-center h-full min-h-[200px]">
                  <div className="text-center">
                    <div
                      className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
                      style={{ borderColor: "#FF6842" }}
                    ></div>
                    <p className="text-sm" style={{ color: "#767676" }}>
                      카메라를 불러오는 중...
                    </p>
                  </div>
                </div>
              )}
            </div>
            <p
              className="text-sm leading-relaxed text-center mt-2 mb-4"
              style={{ color: "#767676" }}
            >
              밝은 조명에서 정면을 향한 사진이 가장 좋습니다.
            </p>

            {/* Capture Button */}
            {stream && !cameraError && (
              <div className="mb-4">
                <Button
                  onClick={capturePhoto}
                  className="w-full text-white text-sm sm:text-base py-4 h-auto font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group"
                  style={{ backgroundColor: "#FF6842" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#E55A32";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF6842";
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "#FFFFFF" }}
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
                  style={{ color: "#111111" }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "#111111" }}
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

        {status === "preview" && (
          <div className="flex-1 flex flex-col p-4 sm:p-6">
            <DialogHeader className="mb-4 flex-shrink-0">
              <DialogTitle
                className="text-center text-lg sm:text-xl font-bold"
                style={{ color: "#111111" }}
              >
                코 부분을 확인해주세요
              </DialogTitle>
            </DialogHeader>

            {/* 미리보기 이미지 */}
            <div className="flex-1 flex items-center justify-center mb-4">
              {(processedImageUrl || previewImageUrl) && (
                <img
                  src={processedImageUrl || previewImageUrl}
                  alt="촬영한 사진"
                  className="max-w-full max-h-[60vh] object-contain rounded-lg border-2 border-gray-200"
                />
              )}
            </div>

            {/* 버튼 영역 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  if (previewImageUrl) {
                    URL.revokeObjectURL(previewImageUrl);
                    setPreviewImageUrl("");
                  }
                  if (processedImageUrl) {
                    URL.revokeObjectURL(processedImageUrl);
                    setProcessedImageUrl("");
                  }
                  handleReset();
                }}
                variant="outline"
                className="w-full sm:w-auto flex-1 text-sm sm:text-base py-3"
                style={{ color: "#111111" }}
              >
                다시 촬영하기
              </Button>
              <Button
                onClick={async () => {
                  // 처리된 이미지가 있으면 success로, 없으면 업로드 시작
                  if (processedImageUrl) {
                    setResultType("new");
                    setStatus("success");
                  } else if (previewImageUrl) {
                    // 미리보기 URL에서 File 객체 재생성
                    const response = await fetch(previewImageUrl);
                    const blob = await response.blob();
                    const file = new File([blob], "photo.jpg", {
                      type: "image/jpeg",
                    });

                    // 업로드 시작
                    await startUpload(file);
                  }
                }}
                className="w-full sm:w-auto flex-1 text-white text-sm sm:text-base py-3"
                style={{ backgroundColor: "#FF6842" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#E55A32";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FF6842";
                }}
              >
                {processedImageUrl ? "완료하기" : "이 사진으로 진행하기"}
              </Button>
            </div>
          </div>
        )}

        {status === "uploading" && (
          <div className="flex-1 flex items-center justify-center text-center px-6 min-h-[50vh]">
            <div>
              <div className="relative inline-block mb-6">
                {previewImageUrl || capturedImageUrl ? (
                  <img
                    src={previewImageUrl || capturedImageUrl}
                    alt="업로드된 강아지 코 사진"
                    className="w-full sm:w-40 h-32 sm:h-40 object-cover rounded-lg animate-bounce mb-4 mx-auto"
                  />
                ) : (
                  <img
                    src="image 142.png"
                    alt="분석 중"
                    className="w-full sm:w-24 mb-4 animate-bounce mx-auto"
                  />
                )}
                <div
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-ping"
                  style={{ backgroundColor: "#FF6842" }}
                ></div>
              </div>
              <p
                className="text-xl sm:text-2xl font-semibold mb-2"
                style={{ color: "#111111" }}
              >
                반려견의 비문을 분석하고 있어요…
              </p>
              <p className="text-sm sm:text-base" style={{ color: "#767676" }}>
                네트워크에 따라 15~30초 정도 소요됩니다.
              </p>
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
              <h3
                className="text-2xl sm:text-3xl font-bold mb-3"
                style={{ color: "#111111" }}
              >
                인식 실패
              </h3>
              <p
                className="text-base sm:text-lg leading-relaxed max-w-md mx-auto"
                style={{ color: "#767676" }}
              >
                {errorMessage}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full sm:w-auto px-6 py-3"
                style={{ color: "#111111" }}
              >
                다시 시도하기
              </Button>
              <Button
                onClick={handleClose}
                className="w-full sm:w-auto text-white px-6 py-3"
                style={{ backgroundColor: "#111111" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#333333";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#111111";
                }}
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
