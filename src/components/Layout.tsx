import type { ReactNode } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { trackSiteVisit } from "@/utils/analytics";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // 사이트 접속 추적
    trackSiteVisit();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-orange-50 absolute top-0 z-100 shadow-sm w-full py-2 border-b border-gray-200">
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

            {/* 모바일 햄버거 메뉴 */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="md:hidden h-auto w-auto"
                  aria-label="메뉴 열기"
                >
                  <Menu className="h-6 w-6 stroke-[4]" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-2/3">
                <nav className="flex flex-col mt-8 space-y-2">
                  <SheetClose asChild>
                    <Link
                      to="/"
                      className="px-4 py-3 text-gray-900 hover:bg-orange-100 hover:text-orange-600 rounded-md transition-colors text-base font-medium"
                    >
                      홈
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <a
                      href="#why-nose"
                      className="px-4 py-3 text-gray-900 hover:bg-orange-100 hover:text-orange-600 rounded-md transition-colors text-base font-medium"
                    >
                      왜 비문인식을 해야할까요?
                    </a>
                  </SheetClose>
                  <SheetClose asChild>
                    <a
                      href="#how-it-works"
                      className="px-4 py-3 text-gray-900 hover:bg-orange-100 hover:text-orange-600 rounded-md transition-colors text-base font-medium"
                    >
                      비문 인식 프로세스
                    </a>
                  </SheetClose>
                  <SheetClose asChild>
                    <a
                      href="#try-it"
                      className="px-4 py-3 text-gray-900 hover:bg-orange-100 hover:text-orange-600 rounded-md transition-colors text-base font-medium"
                    >
                      체험해보기
                    </a>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full pt-16 md:pt-0">{children}</main>
    </div>
  );
}
