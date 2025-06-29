import React from "react";
import { TopNavigation } from "./TopNavigation";
import { BottomNavigation } from "./BottomNavigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopNavigation />
      <main className="flex-1 overflow-auto pb-20">
        <div className="max-w-md mx-auto bg-white min-h-full">
          {children}
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}
