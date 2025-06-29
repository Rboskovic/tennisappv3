import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Bell, Menu, Users, Trophy, Star } from "lucide-react";

interface HeaderProps {
  type?: 'home' | 'page' | 'none';
  title?: string;
  rightContent?: React.ReactNode;
  onBack?: () => void;
  showBackButton?: boolean;
}

export function Header({ 
  type = 'auto', 
  title, 
  rightContent, 
  onBack,
  showBackButton = true 
}: HeaderProps): JSX.Element | null {
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-determine header type based on route
  const getHeaderType = (): 'home' | 'page' | 'none' => {
    if (type !== 'auto') return type;
    
    if (location.pathname === '/') return 'home';
    return 'page';
  };

  const headerType = getHeaderType();

  // Don't render anything for 'none' type
  if (headerType === 'none') return null;

  // Handle back navigation
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  // Get page title automatically
  const getPageTitle = (): string => {
    if (title) return title;
    
    const path = location.pathname;
    if (path.startsWith('/match')) return 'Pronađi Meč';
    if (path.startsWith('/courts')) return 'Rezerviši Teren';
    if (path.startsWith('/profile')) return 'Profil';
    if (path.startsWith('/tournaments')) return 'Turniri & Lige';
    return 'Tennis App';
  };

  // Homepage header with blue background and user greeting
  if (headerType === 'home') {
    return (
      <header className="bg-blue-600 text-white p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">
              Dobro jutro, Marko! 
              <span className="ml-2">👋</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-blue-700 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </button>
            <button className="p-2 hover:bg-blue-700 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* User stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-blue-100">Odigrano mečeva</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-blue-100">Pobeda</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">1,245</div>
            <div className="text-sm text-blue-100">Poena</div>
          </div>
        </div>
      </header>
    );
  }

  // Standard page header with back button
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Back button */}
          {showBackButton && (
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          
          {/* Title */}
          <h1 className={`text-lg font-semibold text-gray-900 ${
            showBackButton ? 'flex-1 text-center' : ''
          }`}>
            {getPageTitle()}
          </h1>
          
          {/* Right content */}
          <div className="flex items-center space-x-2">
            {rightContent}
          </div>
        </div>
      </div>
    </header>
  );
}
