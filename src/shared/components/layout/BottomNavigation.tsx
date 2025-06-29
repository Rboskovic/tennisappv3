import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Users, MapPin, Trophy } from "lucide-react";

export function BottomNavigation(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      id: "home",
      path: "/",
      label: "Istraži",
      icon: Home,
    },
    {
      id: "match",
      path: "/match",
      label: "Pronađi Meč",
      icon: Users,
    },
    {
      id: "courts",
      path: "/courts",
      label: "Tereni",
      icon: MapPin,
    },
    {
      id: "tournaments",
      path: "/profile",
      label: "Profil",
      icon: Trophy,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="grid grid-cols-4 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                  isActive 
                    ? "text-primary-600" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? "stroke-2" : "stroke-1.5"}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
