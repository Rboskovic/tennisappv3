// src/pages/HomePage.tsx
import React from "react";
import { Users, MapPin, Trophy, Calendar, Star, Clock, TrendingUp, Award } from "lucide-react";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      {/* Hero Section with glassmorphic card */}
      <div className="p-6 pb-0">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Dobro jutro, Marko! ��</h1>
              <p className="text-blue-100">Spreman za sledeći meč?</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">MP</span>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-xs text-blue-100">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-xs text-blue-100">Rank Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.8</div>
              <div className="text-xs text-blue-100">★ Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards and Content */}
      <div className="px-6 py-4 space-y-4">
        {/* Tournament Banner */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg mb-1">Prolećni Turnir</h3>
              <p className="text-orange-100 text-sm mb-2">Prijave do 15. marta</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <Award className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom padding for navigation */}
      <div className="h-24"></div>
    </div>
  );
}
