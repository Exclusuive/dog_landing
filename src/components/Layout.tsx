import type { ReactNode } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { trackSiteVisit } from "@/utils/analytics";

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
        <div className="container mx-auto px-8 w-full">
          <div className="flex justify-center items-center md:justify-start h-12">
            <Link
              to="/"
              className="text-2xl font-bold text-center text-gray-900 hover:text-orange-600 transition-colors"
            >
              <img src="/logo.png" alt="Puddy" className="w-full h-8" />
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full pt-16 md:pt-0">{children}</main>
      <footer className="bg-foreground text-background mt-auto">
        <div className="container mx-auto px-8 max-w-7xl py-8">
          <p className="text-center">
            &copy; 2024 Landing Page. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
