import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { logEvent } from "@/utils/analytics";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // 사이트 접속 추적
    logEvent("Site_Visit");
  }, []);

  const navItems = useMemo(
    () => [
      { label: t("layout.menuMain"), href: "#" },
      { label: t("layout.menuWhyNose"), href: "#why-nose" },
      { label: t("layout.menuHowItWorks"), href: "#how-it-works" },
      { label: t("layout.menuTryIt"), href: "#try-it" },
      { label: "기업회원", href: "/", isRoute: true },
    ],
    [language, t]
  );

  const handleOpenChange = (open: boolean) => {
    setIsMenuOpen(open);
  };

  const handleLinkClick = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
  };

  const handleCloseAutoFocus = (e: Event) => {
    e.preventDefault();
  };

  const renderLanguageToggle = (extraClasses?: string) => (
    <div
      className={`flex items-center gap-2 text-sm font-semibold ${extraClasses || ""}`}
      aria-label="언어 선택"
    >
      <button
        type="button"
        onClick={() => setLanguage("ko")}
        className={`transition-colors ${
          language === "ko" ? "text-orange-600" : "text-gray-500"
        }`}
        aria-pressed={language === "ko"}
      >
        {t("common.languageKo")}
      </button>
      <span className="text-gray-300">|</span>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`transition-colors ${
          language === "en" ? "text-orange-600" : "text-gray-500"
        }`}
        aria-pressed={language === "en"}
      >
        {t("common.languageEn")}
      </button>
    </div>
  );

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

            <div className="flex items-center gap-4">
              <div className="hidden md:flex">{renderLanguageToggle()}</div>

              <Sheet open={isMenuOpen} onOpenChange={handleOpenChange}>
                <div className="flex items-center gap-3 md:hidden">
                  {renderLanguageToggle("md:hidden")}
                  <SheetTrigger asChild>
                    <button
                      className="md:hidden h-auto w-auto"
                      aria-label={t("layout.openMenu")}
                      onClick={() => setIsMenuOpen(true)}
                    >
                      <Menu className="h-6 w-6 stroke-[4]" />
                    </button>
                  </SheetTrigger>
                </div>

                <SheetTrigger asChild>
                  <button
                    className="hidden md:block h-auto w-auto"
                    aria-label={t("layout.openMenu")}
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
                  <div className="flex justify-end mb-4">{renderLanguageToggle()}</div>
                  <nav className="flex flex-col mt-4 space-y-2">
                    {navItems.map((item) => (
                      item.isRoute ? (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="px-4 py-3 rounded-md transition-colors text-base font-medium cursor-pointer text-left"
                          style={{ color: "#111111" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 104, 66, 0.1)";
                            e.currentTarget.style.color = "#FF6842";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "";
                            e.currentTarget.style.color = "#111111";
                          }}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(item.href);
                          }}
                          className="px-4 py-3 rounded-md transition-colors text-base font-medium cursor-pointer text-left"
                          style={{ color: "#111111" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 104, 66, 0.1)";
                            e.currentTarget.style.color = "#FF6842";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "";
                            e.currentTarget.style.color = "#111111";
                          }}
                        >
                          {item.label}
                        </a>
                      )
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
