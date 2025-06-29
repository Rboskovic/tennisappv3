// src/pages/ProfilePage.tsx
import React from "react";
import { Settings, Trophy, Calendar, Star, TrendingUp, Award, Edit } from "lucide-react";

export function ProfilePage() {
  const stats = [
    { label: "Odigrani mečevi", value: 28, icon: Trophy },
    { label: "Pobede", value: 22, icon: Star },
    { label: "Win Rate", value: "79%", icon: TrendingUp },
    { label: "Ranking Points", value: 1247, icon: Award },
  ];

  const recentMatches = [
    { opponent: "Ana J.", result: "W", score: "6-4, 6-2", date: "Pre 2 dana" },
    { opponent: "Marko D.", result: "L", score: "4-6, 3-6", date: "Pre 5 dana" },
    { opponent: "Sara K.", result: "W", score: "7-5, 6-4", date: "Pre 1 nedelje" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
              <span className="text-xl font-bold">MP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Marko Petrović</h1>
              <p className="text-purple-100">Srednji nivo • Baseline član</p>
            </div>
          </div>
          <button className="p-2 bg-white/20 rounded-full">
            <Edit className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">4.8</div>
            <div className="text-purple-100 text-sm">Rejting</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Statistike</h2>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <Icon className="w-6 h-6 text-purple-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Matches */}
      <div className="px-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Poslednji mečevi</h2>
        <div className="space-y-3">
          {recentMatches.map((match, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    match.result === 'W' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    <span className="font-bold text-sm">{match.result}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">vs {match.opponent}</p>
                    <p className="text-gray-600 text-sm">{match.score}</p>
                  </div>
                </div>
                <p className="text-gray-500 text-xs">{match.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="p-6">
        <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <Settings className="w-5 h-5 text-gray-600 mr-3" />
            <span className="font-medium text-gray-900">Podešavanja</span>
          </div>
          <div className="text-gray-400">›</div>
        </button>
      </div>
    </div>
  );
}
