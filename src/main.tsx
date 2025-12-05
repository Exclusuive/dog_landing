import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LanguageProvider } from "./context/LanguageContext";

// Google Analytics 초기화
const GA_MEASUREMENT_ID = "G-3F1LLYZY5V";

if (GA_MEASUREMENT_ID && typeof window !== "undefined") {
  // Google Analytics 스크립트 동적 로드
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // gtag 초기화
  script1.onload = () => {
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("config", GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
      });
    }
  };
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
