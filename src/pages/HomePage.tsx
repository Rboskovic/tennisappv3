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
              <h1 className="text-2xl font-bold text-white">Dobro jutro, Marko! 🎾</h1>
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

      {/* Upcoming Match Card */}
      <div className="p-6 py-4">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">Sledeći meč</h3>
            <Clock className="w-5 h-5 text-emerald-200" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">vs Ana Jovanović</p>
              <p className="text-emerald-200 text-sm">Danas u 18:00</p>
              <p className="text-emerald-200 text-xs">Teren 2, Baseline Club</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <Trophy className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="px-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Find Match Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 w-fit mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Pronađi Meč</h3>
            <p className="text-gray-600 text-sm mb-3">Nađi protivnika u blizini</p>
            <div className="flex items-center text-blue-600 text-sm font-medium">
              <span>Započni</span>
              <TrendingUp className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Book Court Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-3 w-fit mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Rezerviši Teren</h3>
            <p className="text-gray-600 text-sm mb-3">5 dostupnih terena</p>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <span>Rezerviši</span>
              <Calendar className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>

        {/* Tournament Card */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Award className="w-6 h-6 mr-3" />
              <div>
                <h3 className="font-bold">Belgrade Open 2024</h3>
                <p className="text-purple-200 text-sm">Registracija do 15. maja</p>
              </div>
            </div>
            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
              Prijavi se
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-gray-900 mb-4">Poslednja aktivnost</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <Star className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Pobeda protiv Nikole</p>
                  <p className="text-gray-500 text-xs">Pre 2 dana</p>
                </div>
              </div>
              <span className="text-green-600 font-bold text-sm">+25 poena</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <Trophy className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Rezervisan teren</p>
                  <p className="text-gray-500 text-xs">Pre 3 dana</p>
                </div>
              </div>
              <span className="text-blue-600 font-bold text-sm">Teren 1</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom padding for navigation */}
      <div className="h-24"></div>
    </div>
  );
}
