// src/pages/MatchPage.tsx
import React from "react";
import { Users, Search, Zap, Target, Trophy, Star } from "lucide-react";

export function MatchPage() {
  const onlineUsers = [
    { id: 1, name: "Ana J.", rating: 4.8, online: true },
    { id: 2, name: "Marko D.", rating: 4.6, online: true },
    { id: 3, name: "Sara K.", rating: 4.9, online: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">Pronađi Meč</h1>
        <p className="text-blue-100 mb-6">
          Igraj protiv igrača na tvom nivou
        </p>
        
        <button className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-4 rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center justify-center">
          <Search className="w-5 h-5 mr-2" />
          Započni pretragu
        </button>
      </div>

      {/* Match Types */}
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Tip meča</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 border-2 border-orange-200 bg-orange-50">
            <Zap className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-bold text-gray-900 text-sm mb-1">Brzi meč</h3>
            <p className="text-gray-600 text-xs">Pronađi dostupnog protivnika</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <Target className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-gray-900 text-sm mb-1">Takmičarski</h3>
            <p className="text-gray-600 text-xs">Za rangiranje i poene</p>
          </div>
        </div>
      </div>

      {/* Online Players */}
      <div className="px-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Igrači online</h2>
        <div className="space-y-3">
          {onlineUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="font-bold text-gray-600">{user.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    {user.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm text-gray-600">{user.rating}</span>
                    </div>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                  Pozovi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
