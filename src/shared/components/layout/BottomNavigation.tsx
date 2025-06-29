import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, MapPin, User } from "lucide-react";
import { cn } from "../../utils/cn";

export function BottomNavigation(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Početna", path: "/" },
    { icon: Users, label: "Meč", path: "/match" },
    { icon: MapPin, label: "Tereni", path: "/courts" },
    { icon: User, label: "Profil", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center py-2 px-3 rounded-lg transition-colors",
                  isActive 
                    ? "text-primary-600 bg-primary-50" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
