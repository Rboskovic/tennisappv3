// src/shared/components/layout/TopNavigation.tsx
import React from "react";
import { useLocation } from "react-router-dom";

export function TopNavigation(): JSX.Element {
  const location = useLocation();

  const getPageTitle = (): string => {
    const path = location.pathname;
    if (path === "/") return "Tennis App";
    if (path.startsWith("/match")) return "Pronađi Meč";
    if (path.startsWith("/courts/reserve")) return "Rezervacija Terena";
    if (path.startsWith("/courts")) return "Tereni";
    if (path.startsWith("/profile")) return "Profil";
    return "Tennis App";
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-center">
          <h1 className="text-lg font-semibold text-gray-900">
            {getPageTitle()}
          </h1>
        </div>
      </div>
    </header>
  );
}
