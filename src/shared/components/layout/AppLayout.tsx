import React from "react";
import { Header } from "./Header";
import { BottomNavigation } from "./BottomNavigation";

interface AppLayoutProps {
  children: React.ReactNode;
  headerType?: 'home' | 'page' | 'none';
  headerTitle?: string;
  headerRightContent?: React.ReactNode;
  showBackButton?: boolean;
}

export function AppLayout({ 
  children, 
  headerType,
  headerTitle,
  headerRightContent,
  showBackButton 
}: AppLayoutProps): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        type={headerType}
        title={headerTitle}
        rightContent={headerRightContent}
        showBackButton={showBackButton}
      />
      <main className="flex-1 overflow-auto pb-20">
        <div className="max-w-md mx-auto bg-white min-h-full">
          {children}
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}
