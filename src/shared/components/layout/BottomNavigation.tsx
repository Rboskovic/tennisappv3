import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, MapPin, Trophy, User } from "lucide-react";
import { cn } from "../../utils/cn";

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const tabs: TabItem[] = [
  {
    id: "home",
    label: "Početna",
    icon: <Home className="w-5 h-5" />,
    path: "/",
  },
  {
    id: "match",
    label: "Meč",
    icon: <Users className="w-5 h-5" />,
    path: "/match",
  },
  {
    id: "courts",
    label: "Tereni",
    icon: <MapPin className="w-5 h-5" />,
    path: "/courts",
  },
  {
    id: "tournaments",
    label: "Turniri",
    icon: <Trophy className="w-5 h-5" />,
    path: "/tournaments",
  },
  {
    id: "profile", 
    label: "Profil",
    icon: <User className="w-5 h-5" />,
    path: "/profile",
  },
];

export function BottomNavigation(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveTab = (path: string): boolean => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleTabClick = (path: string): void => {
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-neutral-200">
      <div className="max-w-md mx-auto px-2 py-1">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = isActiveTab(tab.path);
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.path)}
                className={cn(
                  "flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors",
                  "hover:bg-neutral-100",
                  isActive 
                    ? "text-primary-600" 
                    : "text-neutral-600"
                )}
                aria-label={tab.label}
              >
                <div className={cn(
                  "transition-transform",
                  isActive && "scale-110"
                )}>
                  {tab.icon}
                </div>
                <span className={cn(
                  "text-xs font-medium mt-1",
                  isActive && "font-semibold"
                )}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
