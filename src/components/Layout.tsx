import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b absolutely top-0 z-100 shadow-sm">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="flex justify-center items-center h-12">
            <Link
              to="/"
              className="text-2xl font-bold text-center text-foreground hover:text-primary transition-colors"
            >
              Logo
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full">{children}</main>
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
