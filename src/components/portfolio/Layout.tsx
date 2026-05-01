import { ReactNode } from "react";
import { Nav } from "./Nav";
import { ThemeSettings } from "./ThemeSettings";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Global Background Effects */}
      <div className="global-bg bg-main-gradient" />
      <div className="global-bg halftone-bg" />
      <div className="global-bg grain" />
      <div className="scanline-overlay" />
      
      <Nav />
      
      <main className="relative z-10">
        {children}
      </main>

      <ThemeSettings />
    </div>
  );
};
