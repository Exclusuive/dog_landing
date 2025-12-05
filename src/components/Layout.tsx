import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { trackSiteVisit } from "@/utils/analytics";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    // 사이트 접속 추적
    trackSiteVisit();
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsMenuOpen(open);
  };

  const handleLinkClick = (href: string) => {
    // 해시 링크의 기본 동작을 방지하고 smooth scroll 적용
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    // 약간의 딜레이 후 메뉴 닫기
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
  };

  // Sheet가 닫힐 때 포커스로 인한 스크롤 방지
  const handleCloseAutoFocus = (e: Event) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-orange-50 fixed top-0 left-0 right-0 z-50 shadow-sm w-full py-2 border-b border-gray-200">
        <div className="container mx-auto px-6 w-full">
          <div className="flex justify-between items-center h-12 w-full">
            <Link
              to="/"
              className="flex items-center text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors"
            >
              <img src="/logo.png" alt="Puddy" className="w-32" />
            </Link>

            {/* 데스크톱 메뉴 */}
            <nav className="hidden md:flex items-center space-x-6">
              {/* 여기에 데스크톱 메뉴 항목 추가 가능 */}
            </nav>

            {/* 언어 전환 버튼 */}
            <div className="flex items-center gap-2 mr-2 md:mr-0">
              <button
                onClick={() => setLanguage("ko")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  language === "ko"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                aria-label="한국어로 전환"
              >
                KR
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  language === "en"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            {/* 모바일 햄버거 메뉴 */}
            <Sheet open={isMenuOpen} onOpenChange={handleOpenChange}>
              <SheetTrigger asChild>
                <button
                  className="md:hidden h-auto w-auto"
                  aria-label="메뉴 열기"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Menu className="h-6 w-6 stroke-[4]" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-2/3"
                onCloseAutoFocus={handleCloseAutoFocus}
              >
                <nav className="flex flex-col mt-8 space-y-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("#");
                    }}
                    className="px-4 py-3 rounded-md transition-colors text-base font-medium cursor-pointer text-left"
                    style={{ color: "#111111" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 104, 66, 0.1)";
                      e.currentTarget.style.color = "#FF6842";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.color = "#111111";
                    }}
                  >
                    {t("menu.main")}
                  </a>
                  <a
                    href="#why-nose"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("#why-nose");
                    }}
                    className="px-4 py-3 rounded-md transition-colors text-base font-medium cursor-pointer text-left"
                    style={{ color: "#111111" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 104, 66, 0.1)";
                      e.currentTarget.style.color = "#FF6842";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.color = "#111111";
                    }}
                  >
                    {t("menu.whyNose")}
                  </a>
                  <a
                    href="#how-it-works"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("#how-it-works");
                    }}
                    className="px-4 py-3 rounded-md transition-colors text-base font-medium cursor-pointer text-left"
                    style={{ color: "#111111" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 104, 66, 0.1)";
                      e.currentTarget.style.color = "#FF6842";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.color = "#111111";
                    }}
                  >
                    {t("menu.howItWorks")}
                  </a>
                  <a
                    href="#try-it"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("#try-it");
                    }}
                    className="px-4 py-3 rounded-md transition-colors text-base font-medium cursor-pointer text-left"
                    style={{ color: "#111111" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 104, 66, 0.1)";
                      e.currentTarget.style.color = "#FF6842";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.color = "#111111";
                    }}
                  >
                    {t("menu.tryIt")}
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
